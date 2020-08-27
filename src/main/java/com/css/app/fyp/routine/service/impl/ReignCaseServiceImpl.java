package com.css.app.fyp.routine.service.impl;

import com.alibaba.fastjson.JSONArray;
import com.alibaba.fastjson.JSONObject;
import com.css.addbase.apporgan.entity.BaseAppOrgan;
import com.css.addbase.apporgan.entity.BaseAppUser;
import com.css.addbase.apporgan.service.BaseAppUserService;
import com.css.addbase.apporgmapped.service.BaseAppOrgMappedService;
import com.css.addbase.constant.AppConstant;
import com.css.addbase.constant.AppInterfaceConstant;
import com.css.app.fyp.routine.service.ReignCaseService;
import com.css.app.fyp.routine.vo.ReignCaseVo;
import com.css.base.utils.CrossDomainUtil;
import com.css.base.utils.CurrentUser;
import com.css.base.utils.RestTemplateUtil;
import org.apache.commons.lang.StringUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.util.LinkedMultiValueMap;

import java.util.*;

/**
 * @ClassName 在位情况
 * @Author gongan
 * @Date 2020/8/14
 */
@Service("reignCaseServiceImpl")
public class ReignCaseServiceImpl implements ReignCaseService {
    private final Logger logger = LoggerFactory.getLogger(ReignCaseServiceImpl.class);
    @Autowired
    private BaseAppOrgMappedService baseAppOrgMappedService;
    @Autowired
    private BaseAppUserService baseAppUserService;

    /**
     * 在线人
     */
    private static List<String> userIdList = null;

    /**
     * 请假人
     */
    private static List<String> leaveUserIdList = null;

    private static long executeTime = 0L;

    public void analyseData(long wantExecuteTime) {
        if(executeTime != 0L && wantExecuteTime - executeTime <= 60000 * 5L) {
            return;
        }
        String onlineHref = "http://172.16.2.100:10040/api/online/";
        String leaveHref = "http://172.16.2.100:10040/api/online/";
        this.userIdList = this.getOnlineSituationApi(onlineHref);
        this.leaveUserIdList = this.getOnlineSituationApi(leaveHref);
        this.executeTime = System.currentTimeMillis();
    }

    /**
     * 获取在线或请假人员ID-LIST
     * @return 返回人员ID
     * @author 龚安
     * @date 2020-06-09
     */
    private List<String> getOnlineSituationApi(String href) {
        List<String> accountList = new ArrayList<String>();
        LinkedMultiValueMap<String, Object> map = new LinkedMultiValueMap<String, Object>();
        try {
            //请假人数远程服务地址(获取在线人数)
            String reJson = RestTemplateUtil.postJSONString(href, map);
            String accounts = reJson.substring(1,reJson.length()-1).replace("\"", "");
            String [] accountArray = accounts.split("\\s*,\\s*");
            accountList = new ArrayList<String>(Arrays.asList(accountArray));
        } catch (Exception e) {
            logger.info("PersonManagementController在线人员ID-LIST");
            e.printStackTrace();
        }
        return accountList;
    }

    @Override
    public List<ReignCaseVo> reignCaseList(String afficheType) {
        this.analyseData(System.currentTimeMillis());
        JSONArray jsonData = new JSONArray();
        JSONObject jsonObj = new JSONObject();
        String userId = CurrentUser.getUserId();
        BaseAppUser baseAppUser = baseAppUserService.queryObject(userId);
        String organid = baseAppUser.getOrganid();
        //当前用户是否为部首长
        jsonData = this.getJsonArrayData("","", "","","",null, userId, AppConstant.APP_SZBG, AppInterfaceConstant.WEB_INTERFACE_SZBG_HDAP_TO_FYP);
        if (jsonData != null) {
            //部首长
            JSONObject jsonObject = (JSONObject) jsonObj.get("data");
            jsonObject.get("flowCount");
        } else {
            //局用户
            //请假人
            String[] leaveUserIdArr = (String[]) leaveUserIdList.toArray();
            Map<String, Object> leaveMap = new HashMap<String, Object>();
            leaveMap.put("organid", organid);
            leaveMap.put("userIds", leaveUserIdArr);
            List<BaseAppUser> leaveUserIdList = baseAppUserService.queryList(leaveMap);
            List<ReignCaseVo> baseAppUserList = new ArrayList<ReignCaseVo>();
            for (BaseAppUser leaveUser : leaveUserIdList) {
                ReignCaseVo reignCaseVo = new ReignCaseVo();
                reignCaseVo.setReignCaseId(leaveUser.getUserId());
                reignCaseVo.setReignCaseName(leaveUser.getTruename());
                reignCaseVo.setReignCaseType("leave");
                baseAppUserList.add(reignCaseVo);
            }
            //在线数
            String[] userIdArr = (String[]) userIdList.toArray();
            Map<String, Object> onlineMap = new HashMap<String, Object>();
            onlineMap.put("organid", organid);
            onlineMap.put("userIds", userIdArr);
            List<BaseAppUser> userIdList = baseAppUserService.queryList(onlineMap);
            for (BaseAppUser user : userIdList) {
                if (!baseAppUserList.contains(user.getId())) {
                    ReignCaseVo reignCaseVo = new ReignCaseVo();
                    reignCaseVo.setReignCaseId(user.getUserId());
                    reignCaseVo.setReignCaseName(user.getTruename());
                    reignCaseVo.setReignCaseType("online");
                    baseAppUserList.add(reignCaseVo);
                }
            }
            return baseAppUserList;
        }
        return null;
    }

    private JSONArray getJsonArrayData (String mapperUrl, String page, String pagesize, String applyType, String listType, Date applyDate, String userId, String type, String url) {
        JSONArray jsonData =new JSONArray();
        LinkedMultiValueMap<String,Object> infoMap = new LinkedMultiValueMap<String,Object>();
        infoMap.add("userId", userId);
        if (applyType != null) {
            infoMap.add("type", applyType);
        }
        if (listType != null) {
            infoMap.add("documentTopStatus", listType);
        }
        if (applyDate != null) {
            infoMap.add("applyDate", applyDate);
        }
        if (page != null) {
            infoMap.add("page", page);
        }
        if (pagesize != null) {
            infoMap.add("pagesize", pagesize);
        }
        if (StringUtils.isNotEmpty(mapperUrl)) {
            String sendUrl = mapperUrl + url;
            jsonData = CrossDomainUtil.getJsonArrayData(sendUrl, infoMap);
        } else {
            logger.info("orgId为{}的局的电子保密室的配置数据错误");
            return null;
        }
        return jsonData;
    }

    @Override
    public void reignCaseSave(String trendType) {

    }

    /**
     * 获取人员在位状态数据
     * 加载人员树
     * @return
     */
    public JSONObject getUserTree() {
        JSONObject jsonData = new JSONObject();
        JSONObject jsonObj = new JSONObject();
        String userId = CurrentUser.getUserId();
        String bareauByUserId = baseAppOrgMappedService.getBareauByUserId(userId);
        BaseAppOrgan baseAppOrgan = baseAppOrgMappedService.getbyId(bareauByUserId);
        String name = baseAppOrgan.getName();
        //当前用户是否为部首长
        if (StringUtils.equals("部首长",name)) {
            //部首长
            jsonData = this.getDataUserTree("","","", "", userId, AppConstant.APP_SZBG, AppInterfaceConstant.WEB_WORK_GET_USER_TREE_FYP);
        } else {
            //局用户
            jsonData = this.getDataUserTree("","","", "", userId, AppConstant.APP_GWCL, AppInterfaceConstant.WEB_WORK_GET_USER_TREE_FYP);
        }
        return jsonData;
    }

    private JSONObject getDataUserTree (String page, String pagesize, String applyType, String listType, String userId, String type, String url) {
        JSONObject jsonData =new JSONObject();
        LinkedMultiValueMap<String,Object> infoMap = new LinkedMultiValueMap<String,Object>();
        infoMap.add("userId", userId);
        if (applyType != null) {
            infoMap.add("type", applyType);
        }
        if (listType != null) {
            infoMap.add("documentTopStatus", listType);
        }
        if (page != null) {
            infoMap.add("page", page);
        }
        if (pagesize != null) {
            infoMap.add("pagesize", pagesize);
        }
        //String mapperUrl = baseAppOrgMappedService.getUrlByType(userId, type);
        String mapperUrl = "http://172.16.1.19:64004";
        if (StringUtils.isNotEmpty(mapperUrl)) {
            String sendUrl = mapperUrl + url;
            jsonData = CrossDomainUtil.getJsonData(sendUrl, infoMap);
        } else {
            logger.info("orgId为{}的局的电子保密室的配置数据错误");
            return null;
        }
        return jsonData;
    }

}
