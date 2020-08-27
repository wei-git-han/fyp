package com.css.app.fyp.routine.service.impl;

import com.alibaba.fastjson.JSONArray;
import com.alibaba.fastjson.JSONObject;
import com.css.addbase.apporgan.entity.BaseAppOrgan;
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
            jsonObjectResult = this.getJsonData( "","1","1", "", "", AppConstant.APP_SZBG, AppInterfaceConstant.WEB_WORK_GET_CHAIRMAN_USER_TREE_FYP);
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
            JSONObject jstxJsonObj = new JSONObject();
            jstxJsonObj.put("flowCount", "5");
            jstxJsonObj.put("typeName", "即时通讯");
            jstxJsonObj.put("applyType", "5");
            jsonArray.add(jstxJsonObj);
        }
        return jsonData;
    }

    private JSONObject getJsonData (String userId, String page, String pagesize, String appLevel, String orgId, String type, String url) {
        JSONObject jsonData =new JSONObject();
        LinkedMultiValueMap<String,Object> infoMap = new LinkedMultiValueMap<String,Object>();
        infoMap.add("userId", userId);
        if (page != null) {
            infoMap.add("page", page);
        }
        if (pagesize != null) {
            infoMap.add("pagesize", pagesize);
        }
        String mapperUrl = "172.16.1.19:11004";
        if (StringUtils.isNotEmpty(mapperUrl)) {
            String sendUrl = mapperUrl + url;
            jsonData = CrossDomainUtil.getJsonData(sendUrl, infoMap);
        } else {
            logger.info("orgId为{}的局的电子保密室的配置数据错误",orgId);
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
        if (page != null) {
            infoMap.add("page", page);
        }
        if (pagesize != null) {
            infoMap.add("pagesize", pagesize);
        }
        if (pagesize != null) {
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
