package com.css.app.fyp.routine.service.impl;

import com.alibaba.fastjson.JSONArray;
import com.alibaba.fastjson.JSONObject;
import com.css.addbase.apporgmapped.service.BaseAppOrgMappedService;
import com.css.addbase.constant.AppConstant;
import com.css.addbase.constant.AppInterfaceConstant;
import com.css.addbase.orgservice.UserInfo;
import com.css.app.fyp.routine.service.ReignCaseService;
import com.css.app.fyp.routine.vo.ReignCaseVo;
import com.css.base.filter.SSOAuthFilter;
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

    /**
     * 在线人
     */
    private static List<String> userIdList = null;

    /**
     * 请假人
     */
    private static List<String> leaveUserIdList = null;

//    private static String onlineUserIds = null;
//    private static String leaveUserIdsAndLeaveDateFromQxj = null;
//    public void getInfoFromOtherApp(boolean getInfoFromOtherAppFalg) {
//        if(getInfoFromOtherAppFalg) {
//            onlineUserIds = getAccountListApi("http://172.16.2.100:10040/api/online/");
//            leaveUserIdsAndLeaveDateFromQxj = getAccountListApi("http://172.16.2.100:10040/api/online/");
//        }
//    }

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
//    private String getAccountListApi(String href) {
//        String reJson = null;
//        LinkedMultiValueMap<String, Object> map = new LinkedMultiValueMap<String, Object>();
//        try {
//            //请假人数远程服务地址(获取在线人数)
//            reJson = RestTemplateUtil.postJSONString(href, map);
//        } catch (Exception e) {
//            logger.info("PersonManagementController在线人员ID-LIST");
//            e.printStackTrace();
//        }
//        return reJson;
//    }

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
    public JSONArray reignCaseList(String afficheType) {
        this.analyseData(System.currentTimeMillis());
        JSONArray jsonData = new JSONArray();
        JSONObject jsonObj = new JSONObject();
        String userId = CurrentUser.getUserId();
        //当前用户是否为部首长
        jsonData = this.getJsonArrayData("","", "","","",null, userId, AppConstant.APP_SZBG, AppInterfaceConstant.WEB_INTERFACE_SZBG_HDAP_TO_FYP);
        if (jsonData != null) {
            //部首长
            JSONObject jsonObject = (JSONObject) jsonObj.get("data");
            jsonObject.get("flowCount");
        } else {
            //局用户
            List<String> accountList = new ArrayList<String>();
            List<ReignCaseVo> reignCaseVoList = new ArrayList<ReignCaseVo>();
            //在线数

            //请假人

        }
        return jsonData;
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

}
