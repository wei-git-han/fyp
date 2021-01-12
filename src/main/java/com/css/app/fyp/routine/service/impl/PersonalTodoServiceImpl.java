package com.css.app.fyp.routine.service.impl;

import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.JSONArray;
import com.alibaba.fastjson.JSONObject;
import com.css.addbase.apporgan.entity.BaseAppOrgan;
import com.css.addbase.apporgan.service.BaseAppUserService;
import com.css.addbase.apporgmapped.entity.BaseAppOrgMapped;
import com.css.addbase.apporgmapped.service.BaseAppOrgMappedService;
import com.css.addbase.constant.AppConstant;
import com.css.addbase.constant.AppInterfaceConstant;
import com.css.app.fyp.routine.service.PersonalTodoService;
import com.css.app.fyp.routine.vo.PersonalTodoVo;
import com.css.app.fyp.utils.ResponseValueUtils;
import com.css.base.utils.CrossDomainUtil;
import com.css.base.utils.CurrentUser;
import com.css.base.utils.RedisUtil;
import com.css.base.utils.Response;
import org.apache.commons.lang.StringUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

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

    @Value("${dzyj.url}")
    private String dzyjUrl;

    @Value("${qxj.url}")
    private String qxjglUrl;

    @Value("${db.url}")
    private String dbglUrl;

    @Autowired
    private RedisUtil redisUtil;

    /**
     * @Description 待批公文统计
     * @Author gongan
     * @Date 2020/8/14
     * @Param [applyDate]
     * @Return void
     */
    @Override
    public JSONObject getMenu(Date applyDate, String page, String pagesize, String type) {
        JSONObject jsonData = new JSONObject();
        String userId = CurrentUser.getUserId();
        //局用户
        jsonData = this.getJsonData (type,"", "", userId, AppConstant.APP_GWCL, AppInterfaceConstant.WEB_INTERFACE_GWCL_MENU_SPGW, "", applyDate);
        return jsonData;
    }

//    /**
//     * @Description 待批公文统计
//     * @Author gongan
//     * @Date 2020/8/14
//     * @Param [applyDate]
//     * @Return void
//     */
//    @Override
//    public JSONObject backlogFlowStatisticsHeader(Date applyDate, String page, String pagesize, String type) {
//        JSONObject result = new JSONObject();
//        String userId = CurrentUser.getUserId();
//
//        JSONArray returnJsonArr = new JSONArray();
//        if (StringUtils.equals(type, "qxj")) {
//            //请销假数量
//            BaseAppOrgMapped qxjBaseAppOrgMapped = baseAppOrgMappedService.getUrlByAppId(type,"root");
//            JSONObject qxjJsonObj = new JSONObject();
//            String qxjUrl = qxjglUrl;
//            JSONObject qxjJsonDataUrl = this.getJsonDataUrl("", "", "", qxjUrl, "", applyDate);
//            qxjJsonObj.put("appId", "");
//            qxjJsonObj.put("appUrl", "url");
//            if (null != qxjJsonDataUrl) {
//                qxjJsonObj.put("flowCount", qxjJsonDataUrl.get("qxjsp"));
//            }else {
//                qxjJsonObj.put("flowCount", "0");
//            }
//            if (null != qxjBaseAppOrgMapped) {
//                qxjJsonObj.put("appId", qxjBaseAppOrgMapped.getAppId());
//                qxjJsonObj.put("appUrlPrefix", qxjBaseAppOrgMapped.getUrl());
//                qxjJsonObj.put("appUrlSuffix", qxjBaseAppOrgMapped.getWebUri());
//            }else {
//                qxjJsonObj.put("appId", "");
//                qxjJsonObj.put("appUrlPrefix", "");
//                qxjJsonObj.put("appUrlSuffix", "");
//            }
//            qxjJsonObj.put("typeName", "请销假");
//            qxjJsonObj.put("applyType", "7");
//            returnJsonArr.add(qxjJsonObj);
//        } else if (StringUtils.equals(type, "dccb")) {
//            //督查催办数量
//            BaseAppOrgMapped dccbBaseAppOrgMapped = baseAppOrgMappedService.getUrlByAppId(type,"root");
//            JSONObject dccbJsonObj = new JSONObject();
//            String dccbUrl = dbglUrl;
//            JSONObject dccbJsonDataUrl = this.getJsonDataUrl("", "", "", dccbUrl, "", applyDate);
//            dccbJsonObj.put("appId", "");
//            if (null != dccbJsonDataUrl) {
//                dccbJsonObj.put("flowCount", dccbJsonDataUrl.get("count"));
//            }else {
//                dccbJsonObj.put("flowCount", "0");
//            }
//            if (null != dccbBaseAppOrgMapped) {
//                dccbJsonObj.put("appId", dccbBaseAppOrgMapped.getAppId());
//                dccbJsonObj.put("appUrlPrefix", dccbBaseAppOrgMapped.getUrl());
//                dccbJsonObj.put("appUrlSuffix", dccbBaseAppOrgMapped.getWebUri());
//            }else {
//                dccbJsonObj.put("appId", "");
//                dccbJsonObj.put("appUrlPrefix", "");
//                dccbJsonObj.put("appUrlSuffix", "");
//            }
//            dccbJsonObj.put("typeName", "督查催办");
//            dccbJsonObj.put("applyType", "8");
//            returnJsonArr.add(dccbJsonObj);
//        } else if (StringUtils.equals(type, "dzyj")) {
//            //电子邮件数量
//            BaseAppOrgMapped dzyjBaseAppOrgMapped = baseAppOrgMappedService.getUrlByAppId(type,"root");
//            JSONObject emailJsonObj = new JSONObject();
//            String emailUrl = dzyjUrl;
//            JSONObject emailJsonDataUrl = this.getJsonDataUrl("", "", "", emailUrl, "", applyDate);
////            JSONObject emailJsonDataUrl = this.getJsonData("", "", "", userId, AppConstant.DZYJ, emailUrl, AppInterfaceConstant.WEB_INTERFACE_DZYJ_GETDOCUMENT_SPGW, applyDate);
//            if (null != emailJsonDataUrl) {
//                emailJsonObj.put("flowCount", emailJsonDataUrl.get("total"));
//            }else {
//                emailJsonObj.put("flowCount", "0");
//            }
//            if (null != dzyjBaseAppOrgMapped) {
//                emailJsonObj.put("appId", dzyjBaseAppOrgMapped.getAppId());
//                emailJsonObj.put("appUrlPrefix", dzyjBaseAppOrgMapped.getUrl());
//                emailJsonObj.put("appUrlSuffix", dzyjBaseAppOrgMapped.getWebUri());
//            }else {
//                emailJsonObj.put("appId", "");
//                emailJsonObj.put("appUrlPrefix", "");
//                emailJsonObj.put("appUrlSuffix", "");
//            }
//            emailJsonObj.put("typeName", "电子邮件");
//            emailJsonObj.put("applyType", "6");
//            returnJsonArr.add(emailJsonObj);
//        } else if (StringUtils.equals(type, "jstx")) {
//            //即时通讯数量
//            BaseAppOrgMapped jstxBaseAppOrgMapped = baseAppOrgMappedService.getUrlByAppId(type,"root");
//            JSONObject jstxJsonObj = new JSONObject();
//            jstxJsonObj.put("flowCount", "5");
//            jstxJsonObj.put("typeName", "即时通讯");
//            jstxJsonObj.put("applyType", "5");
//            if (null != jstxBaseAppOrgMapped) {
//                jstxJsonObj.put("appId", jstxBaseAppOrgMapped.getAppId());
//                jstxJsonObj.put("appUrlPrefix", jstxBaseAppOrgMapped.getUrl());
//                jstxJsonObj.put("appUrlSuffix", jstxBaseAppOrgMapped.getWebUri());
//            } else {
//                jstxJsonObj.put("appId", "");
//                jstxJsonObj.put("appUrlPrefix", "");
//                jstxJsonObj.put("appUrlSuffix", "");
//            }
//            returnJsonArr.add(jstxJsonObj);
//        } else {
//            //局用户
//            JSONObject jsonData = this.getJsonData(type,"", "", userId, AppConstant.APP_GWCL, AppInterfaceConstant.WEB_INTERFACE_GWCL_GETDOCUMENT_FLOW_SPGW, "", applyDate);
//            if(null != jsonData){
//                Object objectResult = jsonData.get("returnJsonArr");
//                returnJsonArr = JSON.parseArray(JSONObject.toJSONString(objectResult));
//            }
//            if(returnJsonArr ==null){
//                returnJsonArr = new JSONArray();
//            }
//        }
//        result.put("returnJsonArr", returnJsonArr);
//        return result;
//    }

    @Override
    public JSONObject backlogFlowStatisticsHeader(Date applyDate, String page, String pagesize, String type) {
        JSONObject result = getAllJson(applyDate,type);
        return result;
    }

    private JSONObject getAllJson(Date applyDate, String type){
        String userId = CurrentUser.getUserId();
        JSONObject result = new JSONObject();
        if(StringUtils.equals("gwcl",type)){
            String[] types = {"wdgw","pbgw","gwyz","lwyj"};
            for(String typeg : types){
                JSONArray returnJsonArr = new JSONArray();
                JSONObject jsonData = this.getJsonData(typeg,"", "", userId, AppConstant.APP_GWCL, AppInterfaceConstant.WEB_INTERFACE_GWCL_GETDOCUMENT_FLOW_SPGW, "", applyDate);
                if(null != jsonData){
                    Object objectResult = jsonData.get("returnJsonArr");
                    returnJsonArr = JSON.parseArray(JSONObject.toJSONString(objectResult));
                }
                if(returnJsonArr != null){
                    result.put(typeg,returnJsonArr);
                }
            }
            //公文发布后启动
//            JSONObject jsonData = this.getJsonData("","", "", userId, AppConstant.APP_GWCL, AppInterfaceConstant.WEB_INTERFACE_GWCL_GETDOCUMENT_FLOW_SPGW, "", applyDate);
//            if(jsonData != null){
//                result.putAll(jsonData);
//            }
        }else{
            String keyName = "fyp_banwen_getBacklogFlowStatisticsHeader";
            String json = redisUtil.getString(keyName);
            if(com.css.base.utils.StringUtils.isNotBlank(json)){
                result = JSONObject.parseObject(json);
            }else{
                String[] types = {"qxj","dccb","dzyj","jstx"};

                String url = "";
                String typeName = "";
                String applyType = "";
                String flowCount = "";

                for(String typeh : types){
                    switch (typeh){
                        case "qxj":
                            url = qxjglUrl;
                            typeName = "请销假";
                            applyType = "7";
                            flowCount = "qxjsp";
                            break;
                        case "dccb":
                            url = dbglUrl;
                            typeName = "督查催办";
                            applyType = "8";
                            flowCount = "count";
                            break;
                        case "dzyj":
                            url = dzyjUrl;
                            typeName = "电子邮件";
                            applyType = "6";
                            flowCount = "total";
                            break;
                        case "jstx":
                            url = "";
                            typeName = "即时通讯";
                            applyType = "5";
                            flowCount = "";
                            break;

                    }

                    JSONObject jsonObj = new JSONObject();
                    JSONArray returnJsonArr = new JSONArray();
                    JSONObject jsonDataUrl = null;
                    BaseAppOrgMapped baseAppOrgMapped = baseAppOrgMappedService.getUrlByAppId(typeh,"root");
                    if(StringUtils.isNotBlank(url)){
                        jsonDataUrl = this.getJsonDataUrl("", "", "", url, "", applyDate);
                    }
                    jsonObj.put("appId", "");
                    jsonObj.put("appUrl", "url");

                    if (null != jsonDataUrl) {
                        jsonObj.put("flowCount", jsonDataUrl.get(flowCount));
                    }else {
                        jsonObj.put("flowCount", "0");
                    }
                    if (null != baseAppOrgMapped) {
                        jsonObj.put("appId", baseAppOrgMapped.getAppId());
                        jsonObj.put("appUrlPrefix", baseAppOrgMapped.getUrl());
                        jsonObj.put("appUrlSuffix", baseAppOrgMapped.getWebUri());
                    }else {
                        jsonObj.put("appId", "");
                        jsonObj.put("appUrlPrefix", "");
                        jsonObj.put("appUrlSuffix", "");
                    }
                    jsonObj.put("typeName", typeName);
                    jsonObj.put("applyType", applyType);
                    returnJsonArr.add(jsonObj);
                    result.put(typeh,returnJsonArr);
                }
                redisUtil.setString(keyName,result.toJSONString());
                redisUtil.expire(keyName,2*60*60);
            }
        }


        return result;
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
            jsonData = this.getJsonData (type, page, pagesize, userId, AppConstant.APP_GWCL, AppInterfaceConstant.WEB_INTERFACE_GWCL_GETDOCUMENT_FLOW_LIST, documentTopStatus, applyDate);
        } else if (StringUtils.equals(applyType, "2")) {
            type = "pbwj";
            jsonData = this.getJsonData (type, page, pagesize, userId, AppConstant.APP_GWCL, AppInterfaceConstant.WEB_INTERFACE_YFB_GETDOCUMENT_FLOW_LIST, documentTopStatus, applyDate);
        } else if (StringUtils.equals(applyType, "3")) {
            type = "gwyz";
            jsonData = this.getJsonData (type, page, pagesize, userId, AppConstant.APP_GWCL, AppInterfaceConstant.WEB_INTERFACE_GWYZ_GETDOCUMENT_FLOW_LIST, documentTopStatus, applyDate);
        } else if (StringUtils.equals(applyType, "4")) {
            type = "lwyj";
            jsonData = this.getJsonData (type, page, pagesize, userId, AppConstant.APP_GWCL, AppInterfaceConstant.WEB_INTERFACE_LWYJ_GETDOCUMENT_FLOW_LIST, documentTopStatus, applyDate);
        }
        return jsonData;
    }

    public JSONObject getJsonData (String applyType, String page, String pagesize, String userId, String type, String url, String documentTopStatus, Date applyDate) {
        JSONObject jsonData =new JSONObject();
        LinkedMultiValueMap<String,Object> infoMap = new LinkedMultiValueMap<String,Object>();
        if (StringUtils.isNotEmpty(applyType)) {
            infoMap.add("applyType", applyType);
        }
        if (StringUtils.isNotEmpty(page)) {
            infoMap.add("page", page);
        }
        if (StringUtils.isNotEmpty(pagesize)) {
            infoMap.add("pagesize", pagesize);
        }
        if (StringUtils.isNotEmpty(documentTopStatus)) {
            infoMap.add("documentTopStatus", documentTopStatus);
        }
        if (applyDate != null) {
            infoMap.add("applyDate", applyDate);
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

    public JSONObject getJsonDataUrl (String applyType, String page, String pagesize, String url, String documentTopStatus, Date applyDate) {
        JSONObject jsonData =new JSONObject();
        LinkedMultiValueMap<String,Object> infoMap = new LinkedMultiValueMap<String,Object>();
        if (StringUtils.isNotEmpty(applyType)) {
            infoMap.add("applyType", applyType);
        }
        if (StringUtils.isNotEmpty(page)) {
            infoMap.add("page", page);
        }
        if (StringUtils.isNotEmpty(pagesize)) {
            infoMap.add("pagesize", pagesize);
        }
        if (StringUtils.isNotEmpty(documentTopStatus)) {
            infoMap.add("documentTopStatus", documentTopStatus);
        }
        if (applyDate != null) {
            infoMap.add("year", applyDate);
        }
        if (StringUtils.isNotEmpty(url)) {
            jsonData = CrossDomainUtil.getJsonData(url, infoMap);
        } else {
            logger.info("orgId为{}的局的电子保密室的配置数据错误");
            return null;
        }
        return jsonData;
    }

    @Override
    public void backlogFlowStatisticsDetailUpdate(PersonalTodoVo personalTodoVo) {

    }
}
