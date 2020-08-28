package com.css.app.fyp.routine.service.impl;

import com.alibaba.fastjson.JSONArray;
import com.alibaba.fastjson.JSONObject;
import com.css.addbase.apporgan.entity.BaseAppOrgan;
import com.css.addbase.apporgan.entity.BaseAppUser;
import com.css.addbase.apporgan.service.BaseAppUserService;
import com.css.addbase.apporgmapped.service.BaseAppOrgMappedService;
import com.css.addbase.constant.AppConstant;
import com.css.addbase.constant.AppInterfaceConstant;
import com.css.app.fyp.routine.service.PersonalTodoService;
import com.css.app.fyp.routine.vo.PersonalTodoVo;
import com.css.base.utils.CrossDomainUtil;
import com.css.base.utils.CurrentUser;
import org.apache.commons.lang.StringUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.util.LinkedMultiValueMap;

import java.util.*;

/**
 * @ClassName 个人待办
 * @Author gongan
 * @Date 2020/8/14
 */
@Service("personalTodoServiceImpl")
public class PersonalTodoServiceImpl implements PersonalTodoService {
    private final Logger logger = LoggerFactory.getLogger(PersonalTodoServiceImpl.class);
    @Autowired
    private BaseAppOrgMappedService baseAppOrgMappedService;
    @Autowired
    private BaseAppUserService baseAppUserService;

    /**
     * @Description 待批公文统计
     * @Author gongan
     * @Date 2020/8/14
     * @Param [applyDate]
     * @Return void
     */
    @Override
    public JSONObject backlogFlowStatisticsHeader(Date applyDate) {
        JSONObject jsonData = new JSONObject();
        JSONObject jsonObjectResult = new JSONObject();
        JSONObject jsonObject = new JSONObject();
        JSONArray chairmanJsonArray = new JSONArray();
        String userId = CurrentUser.getUserId();
        String bareauByUserId = baseAppOrgMappedService.getBareauByUserId(userId);
        BaseAppOrgan baseAppOrgan = baseAppOrgMappedService.getbyId(bareauByUserId);
        String name = baseAppOrgan.getName();
        //当前用户是否为部首长
        if (StringUtils.equals("部首长",name)) {
            //部首长
            String mapperUrl = "http://10.150.110.19";
            jsonObjectResult = this.getJsonData( "", "","", mapperUrl, AppInterfaceConstant.WEB_WORK_GET_CHAIRMAN_USER_TREE_FYP);
            jsonObject.put("flowCount", jsonObjectResult.get("rows"));
            jsonObject.put("typeName", "待批公文");
            jsonObject.put("applyType", "1");
            chairmanJsonArray.add(jsonObject);
            jsonData.put("chairmanJsonArray", chairmanJsonArray);
        } else {
            //局用户
            jsonData = this.getJsonArrayData("","","","", "", applyDate, userId, AppConstant.APP_GWCL, AppInterfaceConstant.WEB_INTERFACE_GWCL_GETDOCUMENT_FLOW_SPGW);
            JSONArray jsonArray = (JSONArray)jsonData.get("returnJsonArr");
            //即时通讯数量
            BaseAppUser baseAppUser = baseAppUserService.queryObject(userId);
            String mapperUrl = "http://10.150.110.19";
            jsonData = this.getJsonData("", "", "no", mapperUrl, AppInterfaceConstant.WEB_INTERFACE_JSTX_GETDOCUMENT_FLOW_LIST);
            JSONObject jstxJsonObj = new JSONObject();
            jstxJsonObj.put("flowCount", jsonData);
            jstxJsonObj.put("typeName", "即时通讯");
            jstxJsonObj.put("applyType", "5");
            jsonArray.add(jstxJsonObj);
        }
        return jsonData;
    }

    private JSONObject getJsonData (String user, String passkey, String onlyinbox, String mapperUrl, String url) {
        JSONObject jsonData =new JSONObject();
        LinkedMultiValueMap<String,Object> infoMap = new LinkedMultiValueMap<String,Object>();
        if (StringUtils.isNotEmpty(user)) {
            infoMap.add("user", user);
        }
        if (StringUtils.isNotEmpty(passkey)) {
            infoMap.add("passkey", passkey);
        }
        if (StringUtils.isNotEmpty(onlyinbox)) {
            infoMap.add("onlyinbox", onlyinbox);
        }
        if (StringUtils.isNotEmpty(mapperUrl)) {
            String sendUrl = mapperUrl + url;
            jsonData = CrossDomainUtil.getJsonData(sendUrl, infoMap);
        } else {
            logger.info("orgId为{}的局的电子保密室的配置数据错误");
            return null;
        }
        return jsonData;
    }

    private JSONObject getJsonArrayData (String organId, String page, String pagesize, String applyType, String listType, Date applyDate, String userId, String type, String url) {
        JSONObject jsonData =new JSONObject();
        LinkedMultiValueMap<String,Object> infoMap = new LinkedMultiValueMap<String,Object>();
        infoMap.add("userId", userId);
        if (StringUtils.isNotEmpty(applyType)) {
            infoMap.add("type", applyType);
        }
        if (StringUtils.isNotEmpty(listType)) {
            infoMap.add("documentTopStatus", listType);
        }
        if (applyDate != null) {
            infoMap.add("applyDate", applyDate);
        }
        if (StringUtils.isNotEmpty(page)) {
            infoMap.add("page", page);
        }
        if (StringUtils.isNotEmpty(pagesize)) {
            infoMap.add("pagesize", pagesize);
        }
        if (StringUtils.isNotEmpty(organId)) {
            infoMap.add("organId", organId);
        }
        String mapperUrl = baseAppOrgMappedService.getUrlByType(userId, type);
        if (StringUtils.isNotEmpty(mapperUrl)) {
            String sendUrl = mapperUrl + url;
            jsonData = CrossDomainUtil.getJsonData(sendUrl, infoMap);
        } else {
            logger.info("orgId为{}的局的电子保密室的配置数据错误");
            return null;
        }
        return jsonData;
    }

    /**
     * @Description 待批公文统计明细
     * @Author gongan
     * @Date 2020/8/14
     * @Param [applyType, applyDate]
     * @Return void
     */
    @Override
    public JSONObject backlogFlowStatisticsDetail(String applyType, Date applyDate, String page, String pagesize) {
        String userId = CurrentUser.getUserId();
        String documentTopStatus = "daiChuLi";
        String type = null;
        JSONObject jsonData = new JSONObject();
        if (StringUtils.equals(applyType, "1")) {
            type = "wsh";
            jsonData = this.getJsonArrayData("", page, pagesize, type, documentTopStatus, applyDate, userId, AppConstant.APP_GWCL, AppInterfaceConstant.WEB_INTERFACE_GWCL_GETDOCUMENT_FLOW_LIST);
        } else if (StringUtils.equals(applyType, "2")) {
            type = "pbwj";
            jsonData = this.getJsonArrayData("", page, pagesize, type, documentTopStatus, applyDate, userId, AppConstant.APP_GWCL, AppInterfaceConstant.WEB_INTERFACE_YFB_GETDOCUMENT_FLOW_LIST);
        } else if (StringUtils.equals(applyType, "3")) {
            type = "gwyz";
            jsonData = this.getJsonArrayData("", page, pagesize, type, documentTopStatus, applyDate, userId, AppConstant.APP_GWCL, AppInterfaceConstant.WEB_INTERFACE_GWYZ_GETDOCUMENT_FLOW_LIST);
        } else if (StringUtils.equals(applyType, "4")) {
            type = "lwyj";
            jsonData = this.getJsonArrayData("", page, pagesize, type, documentTopStatus, applyDate, userId, AppConstant.APP_GWCL, AppInterfaceConstant.WEB_INTERFACE_LWYJ_GETDOCUMENT_FLOW_LIST);
        }
        return jsonData;
    }

    @Override
    public void backlogFlowStatisticsDetailUpdate(PersonalTodoVo personalTodoVo) {

    }
}
