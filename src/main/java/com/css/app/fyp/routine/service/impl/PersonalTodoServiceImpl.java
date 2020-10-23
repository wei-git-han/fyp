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
import com.css.base.utils.CrossDomainUtil;
import com.css.base.utils.CurrentUser;
import org.apache.commons.lang.StringUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
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

    @Value("${dzyj.url}")
    private String dzyjUrl;

    @Value("${qxj.url}")
    private String qxjglUrl;

    @Value("${db.url}")
    private String dbglUrl;

    /**
     * @Description 待批公文统计
     * @Author gongan
     * @Date 2020/8/14
     * @Param [applyDate]
     * @Return void
     */
    @Override
    public JSONObject backlogFlowStatisticsHeader(Date applyDate, String page, String pagesize) {
        JSONObject jsonData = new JSONObject();
        JSONObject jsonObjectResult = new JSONObject();
        JSONObject result = new JSONObject();
        JSONObject jsonObject = new JSONObject();
        JSONArray chairmanJsonArray = new JSONArray();
        String userId = CurrentUser.getUserId();
        String bareauByUserId = baseAppOrgMappedService.getBareauByUserId(userId);
        BaseAppOrgan baseAppOrgan = baseAppOrgMappedService.getbyId(bareauByUserId);
        String name = baseAppOrgan.getName();
        //当前用户是否为部首长
        if (StringUtils.equals("部首长",name)) {
            //部首长
            jsonObjectResult = this.getJsonData ("","", "", userId, AppConstant.APP_SZBG, AppInterfaceConstant.WEB_WORK_GET_CHAIRMAN_USER_TREE_FYP, "", applyDate);
            JSONObject rows = (JSONObject)jsonObjectResult.get("rows");
            Object children = rows.get("children");
            jsonObject.put("flowCount", jsonObjectResult.get("rows"));
            jsonObject.put("typeName", "待批公文");
            jsonObject.put("applyType", "1");
            chairmanJsonArray.add(jsonObject);
            jsonData.put("chairmanJsonArray", chairmanJsonArray);
        } else {
            //局用户
            jsonData = this.getJsonData ("","", "", userId, AppConstant.APP_GWCL, AppInterfaceConstant.WEB_INTERFACE_GWCL_GETDOCUMENT_FLOW_SPGW, "", applyDate);
            JSONArray returnJsonArr = new JSONArray();
            if(null != jsonData){
                Object objectResult = jsonData.get("returnJsonArr");
                returnJsonArr = JSON.parseArray(JSONObject.toJSONString(objectResult));
            }
            //即时通讯数量
            BaseAppOrgMapped jstxBaseAppOrgMapped = baseAppOrgMappedService.getUrlByAppId("jstx");
            JSONObject jstxJsonObj = new JSONObject();
            jstxJsonObj.put("flowCount", "5");
            jstxJsonObj.put("typeName", "即时通讯");
            jstxJsonObj.put("applyType", "5");
            if (null != jstxBaseAppOrgMapped) {
                jstxJsonObj.put("appId", jstxBaseAppOrgMapped.getAppId());
                jstxJsonObj.put("appUrlPrefix", jstxBaseAppOrgMapped.getUrl());
                jstxJsonObj.put("appUrlSuffix", jstxBaseAppOrgMapped.getWebUri());
            } else {
                jstxJsonObj.put("appId", "");
                jstxJsonObj.put("appUrlPrefix", "");
                jstxJsonObj.put("appUrlSuffix", "");
            }
            returnJsonArr.add(jstxJsonObj);
            //电子邮件数量
            BaseAppOrgMapped dzyjBaseAppOrgMapped = baseAppOrgMappedService.getUrlByAppId("dzyj");
            JSONObject emailJsonObj = new JSONObject();
            String emailUrl = dzyjUrl;

            JSONObject emailJsonDataUrl = this.getJsonData("", "", "", userId, AppConstant.DZYJ, emailUrl, AppInterfaceConstant.WEB_INTERFACE_DZYJ_GETDOCUMENT_SPGW, applyDate);
            if (null != emailJsonDataUrl) {
                emailJsonObj.put("flowCount", emailJsonDataUrl.get("total"));
            }else {
                emailJsonObj.put("flowCount", "0");
            }
            if (null != dzyjBaseAppOrgMapped) {
                emailJsonObj.put("appId", dzyjBaseAppOrgMapped.getAppId());
                emailJsonObj.put("appUrlPrefix", dzyjBaseAppOrgMapped.getUrl());
                emailJsonObj.put("appUrlSuffix", dzyjBaseAppOrgMapped.getWebUri());
            }else {
                emailJsonObj.put("appId", "");
                emailJsonObj.put("appUrlPrefix", "");
                emailJsonObj.put("appUrlSuffix", "");
            }
            emailJsonObj.put("typeName", "电子邮件");
            emailJsonObj.put("applyType", "6");
            returnJsonArr.add(emailJsonObj);
            //请销假数量
            BaseAppOrgMapped qxjBaseAppOrgMapped = baseAppOrgMappedService.getUrlByAppId("qxj");
            JSONObject qxjJsonObj = new JSONObject();
            String qxjUrl = qxjglUrl;
            JSONObject qxjJsonDataUrl = this.getJsonDataUrl("", "", "", userId, "", qxjUrl, "", applyDate);
            qxjJsonObj.put("appId", "");
            qxjJsonObj.put("appUrl", "url");
            if (null != qxjJsonDataUrl) {
                qxjJsonObj.put("flowCount", qxjJsonDataUrl.get("qxjsp"));
            }else {
                qxjJsonObj.put("flowCount", "0");
            }
            if (null != qxjBaseAppOrgMapped) {
                qxjJsonObj.put("appId", qxjBaseAppOrgMapped.getAppId());
                qxjJsonObj.put("appUrlPrefix", qxjBaseAppOrgMapped.getUrl());
                qxjJsonObj.put("appUrlSuffix", qxjBaseAppOrgMapped.getWebUri());
            }else {
                qxjJsonObj.put("appId", "");
                qxjJsonObj.put("appUrlPrefix", "");
                qxjJsonObj.put("appUrlSuffix", "");
            }
            qxjJsonObj.put("typeName", "请销假");
            qxjJsonObj.put("applyType", "7");

            returnJsonArr.add(qxjJsonObj);
            //督查催办数量
            BaseAppOrgMapped dccbBaseAppOrgMapped = baseAppOrgMappedService.getUrlByAppId("dccb");
            JSONObject dccbJsonObj = new JSONObject();
            String dccbUrl = dbglUrl;
            JSONObject dccbJsonDataUrl = this.getJsonDataUrl("", "", "", userId, "", dccbUrl, "", applyDate);
            dccbJsonObj.put("appId", "");
            if (null != dccbJsonDataUrl) {
                dccbJsonObj.put("flowCount", dccbJsonDataUrl.get("total"));
            }else {
                dccbJsonObj.put("flowCount", "0");
            }
            if (null != dccbBaseAppOrgMapped) {
                dccbJsonObj.put("appId", dccbBaseAppOrgMapped.getAppId());
                dccbJsonObj.put("appUrlPrefix", dccbBaseAppOrgMapped.getUrl());
                dccbJsonObj.put("appUrlSuffix", dccbBaseAppOrgMapped.getWebUri());
            }else {
                dccbJsonObj.put("appId", "");
                dccbJsonObj.put("appUrlPrefix", "");
                dccbJsonObj.put("appUrlSuffix", "");
            }
            dccbJsonObj.put("typeName", "督查催办");
            dccbJsonObj.put("applyType", "8");
            returnJsonArr.add(dccbJsonObj);
            result.put("returnJsonArr", returnJsonArr);
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

    public JSONObject getJsonDataUrl (String applyType, String page, String pagesize, String userId, String type, String url, String documentTopStatus, Date applyDate) {
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
