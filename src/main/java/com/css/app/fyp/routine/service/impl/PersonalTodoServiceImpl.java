package com.css.app.fyp.routine.service.impl;

import com.alibaba.fastjson.JSONArray;
import com.alibaba.fastjson.JSONObject;
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
    public JSONArray backlogFlowStatisticsHeader(Date applyDate) {
        JSONArray jsonData = new JSONArray();
        JSONObject jsonObj = new JSONObject();
        String userId = CurrentUser.getUserId();
        //当前用户是否为部首长
        jsonData = this.getJsonArrayData("", "","","",null, userId, AppConstant.APP_SZBG, AppInterfaceConstant.WEB_INTERFACE_SZBG_HDAP_TO_FYP);
        if (jsonData != null) {
            //部首长
            JSONObject jsonObject = (JSONObject) jsonObj.get("data");
            jsonObject.get("flowCount");
        } else {
            //局用户
            jsonData = this.getJsonArrayData("","","", "", applyDate, userId, AppConstant.APP_GWCL, AppInterfaceConstant.WEB_INTERFACE_GWCL_GETDOCUMENT_FLOW_SPGW);
        }
        return jsonData;
    }

    private JSONObject getJsonData (String userId, String appLevel, String orgId, String type, String url) {
        JSONObject jsonData =new JSONObject();
        LinkedMultiValueMap<String,Object> infoMap = new LinkedMultiValueMap<String,Object>();
        infoMap.add("userId", userId);
        String mapperUrl = baseAppOrgMappedService.getUrlByType(userId, type);
        if (StringUtils.isNotEmpty(mapperUrl)) {
            String sendUrl = mapperUrl + url;
            jsonData = CrossDomainUtil.getJsonData(sendUrl, infoMap);
        } else {
            logger.info("orgId为{}的局的电子保密室的配置数据错误",orgId);
            return null;
        }
        return jsonData;
    }

    private JSONArray getJsonArrayData (String page, String pagesize, String applyType, String listType, Date applyDate, String userId, String type, String url) {
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
        String mapperUrl = baseAppOrgMappedService.getUrlByType(userId, type);
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
    public JSONArray backlogFlowStatisticsDetail(String applyType, Date applyDate, String page, String pagesize) {
        String userId = CurrentUser.getUserId();
        String documentTopStatus = "daiChuLi";
        String type = null;
        JSONArray jsonData = new JSONArray();
        if (StringUtils.equals(applyType, "1")) {
            type = "wsh";
            jsonData = this.getJsonArrayData(page, pagesize, type, documentTopStatus, applyDate, userId, AppConstant.APP_GWCL, AppInterfaceConstant.WEB_INTERFACE_GWCL_GETDOCUMENT_FLOW_LIST);
        } else if (StringUtils.equals(applyType, "2")) {
            type = "pbwj";
            jsonData = this.getJsonArrayData(page, pagesize, type, documentTopStatus, applyDate, userId, AppConstant.APP_GWCL, AppInterfaceConstant.WEB_INTERFACE_YFB_GETDOCUMENT_FLOW_LIST);
        } else if (StringUtils.equals(applyType, "3")) {
            type = "gwyz";
            jsonData = this.getJsonArrayData(page, pagesize, type, documentTopStatus, applyDate, userId, AppConstant.APP_GWCL, AppInterfaceConstant.WEB_INTERFACE_GWYZ_GETDOCUMENT_FLOW_LIST);
        } else if (StringUtils.equals(applyType, "4")) {
            type = "lwyj";
            jsonData = this.getJsonArrayData(page, pagesize, type, documentTopStatus, applyDate, userId, AppConstant.APP_GWCL, AppInterfaceConstant.WEB_INTERFACE_LWYJ_GETDOCUMENT_FLOW_LIST);
        }
        return jsonData;
    }

    @Override
    public void backlogFlowStatisticsDetailUpdate(PersonalTodoVo personalTodoVo) {

    }
}
