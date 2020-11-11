package com.css.app.fyp.routine.service.impl;

import com.alibaba.fastjson.JSONArray;
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
    public JSONArray statementTablesList(String orgId, String weekTableType, String weekTableDate, String page, String pagesize) {
        JSONArray jsonData = new JSONArray();
        String userId = CurrentUser.getUserId();
        String bareauByUserId = baseAppOrgMappedService.getBareauByUserId(userId);
        BaseAppOrgan baseAppOrgan = baseAppOrgMappedService.getbyId(bareauByUserId);
        String name = baseAppOrgan.getName();
        //当前用户是否为部首长
        if (StringUtils.equals("部首长",name)) {
            //部首长
            String WEB_INTERFACE_WORK_WEEK_GETDOCUMENT_FLOW_LIST = "/api/week/count/publish";
            String zoneId = orgId;
            jsonData = this.getJsonArrayData(page, pagesize, userId, weekTableDate, weekTableDate, zoneId, WEB_INTERFACE_WORK_WEEK_GETDOCUMENT_FLOW_LIST);
        } else {
            //局用户
            String WEB_INTERFACE_WORK_WEEK_GETDOCUMENT_FLOW_LIST = "/api/week/count/publish";
            String zoneId = orgId;
            jsonData = this.getJsonArrayData(page, pagesize, userId, weekTableDate, weekTableDate, zoneId, WEB_INTERFACE_WORK_WEEK_GETDOCUMENT_FLOW_LIST);
        }
        return jsonData;
    }

    private JSONArray getWorkWeekData (String page, String pagesize, String applyType, String listType, Date applyDate, String userId, String type, String url) {
        JSONArray jsonData =new JSONArray();
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
        if (StringUtils.isNotEmpty(page)) {
            infoMap.add("page", page);
        }
        if (StringUtils.isNotEmpty(pagesize)) {
            infoMap.add("pagesize", pagesize);
        }
        if (StringUtils.isNotEmpty(zoneId)) {
            infoMap.add("zoneId", zoneId);
        }
        if (StringUtils.isNotEmpty(year)) {
            infoMap.add("year", year);
        }
        if (StringUtils.isNotEmpty(week)) {
            infoMap.add("week", week);
        }
        //String mapperUrl = "http://servers:port";
        String type = "fypzb";
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
    public void statementTablesInsert(Date weekTableDate, String weekTableContent, String orgName) {

    }
}
