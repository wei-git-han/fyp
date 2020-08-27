package com.css.app.fyp.routine.service.impl;

import com.alibaba.fastjson.JSONArray;
import com.alibaba.fastjson.JSONObject;
import com.css.addbase.apporgan.entity.BaseAppOrgan;
import com.css.addbase.apporgmapped.service.BaseAppOrgMappedService;
import com.css.app.fyp.routine.service.WorkWeekTableService;
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
 * @ClassName 工作周表
 * @Author gongan
 * @Date 2020/8/14
 */
@Service("workWeekTableServiceImpl")
public class WorkWeekTableServiceImpl implements WorkWeekTableService {
    private final Logger logger = LoggerFactory.getLogger(WorkWeekTableServiceImpl.class);
    @Autowired
    private BaseAppOrgMappedService baseAppOrgMappedService;

    @Override
    public JSONArray statementTablesList(String weekTableType, String weekTableDate, String page, String pagesize) {
        JSONArray jsonData = new JSONArray();
        JSONObject jsonObj = new JSONObject();
        String userId = CurrentUser.getUserId();
        String bareauByUserId = baseAppOrgMappedService.getBareauByUserId(userId);
        BaseAppOrgan baseAppOrgan = baseAppOrgMappedService.getbyId(bareauByUserId);
        String name = baseAppOrgan.getName();
        //当前用户是否为部首长
        if (StringUtils.equals("部首长",name)) {
            //部首长
            String WEB_INTERFACE_WORK_WEEK_GETDOCUMENT_FLOW_LIST = "/api/week/item/";
            String zoneId = "";
            if (StringUtils.equals(weekTableType, "2")) {
                zoneId = CurrentUser.getUserId();
            }
            jsonData = this.getJsonArrayData(page, pagesize, userId, weekTableDate, weekTableDate, zoneId, WEB_INTERFACE_WORK_WEEK_GETDOCUMENT_FLOW_LIST);
        } else {
            //局用户
            String WEB_INTERFACE_WORK_WEEK_GETDOCUMENT_FLOW_LIST = "/api/week/item/";
            String zoneId = "";
            if (StringUtils.equals(weekTableType, "2")) {
                zoneId = CurrentUser.getUserId();
            }
            jsonData = this.getJsonArrayData(page, pagesize, userId, weekTableDate, weekTableDate, zoneId, WEB_INTERFACE_WORK_WEEK_GETDOCUMENT_FLOW_LIST);
        }
        return jsonData;
    }

    private JSONArray getWorkWeekData (String page, String pagesize, String applyType, String listType, Date applyDate, String userId, String type, String url) {
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

    private JSONArray getJsonArrayData (String page, String pagesize, String userId, String year, String week, String zoneId, String url) {
        JSONArray jsonData =new JSONArray();
        LinkedMultiValueMap<String,Object> infoMap = new LinkedMultiValueMap<String,Object>();
        if (page != null) {
            infoMap.add("page", page);
        }
        if (pagesize != null) {
            infoMap.add("pagesize", pagesize);
        }
        if (zoneId != null) {
            infoMap.add("zoneId", zoneId);
        }
        if (year != null) {
            infoMap.add("year", year);
        }
        if (week != null) {
            infoMap.add("week", week);
        }
        String mapperUrl = "http://servers:port";
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
    public void statementTablesInsert(Date weekTableDate, String weekTableContent, String orgName) {

    }
}
