package com.css.app.fyp.utils;

import com.alibaba.fastjson.JSONObject;
import com.css.addbase.apporgmapped.service.BaseAppOrgMappedService;
import com.css.app.fyp.routine.controller.PersonalTodoController;
import com.css.base.utils.CrossDomainUtil;
import org.apache.commons.lang.StringUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.util.LinkedMultiValueMap;

/**
 *  统一接口返回
 */
public class ResponseRoutineUtils {
    private final Logger logger = LoggerFactory.getLogger(PersonalTodoController.class);

    @Autowired
    private BaseAppOrgMappedService baseAppOrgMappedService;

    public JSONObject getJsonData (String page, String pagesize, String userId, String type, String url, String documentTopStatus, String applyDate) {
        JSONObject jsonData =new JSONObject();
        LinkedMultiValueMap<String,Object> infoMap = new LinkedMultiValueMap<String,Object>();
        if (StringUtils.isNotEmpty(page)) {
            infoMap.add("page", page);
        }
        if (StringUtils.isNotEmpty(pagesize)) {
            infoMap.add("pagesize", pagesize);
        }
        if (StringUtils.isNotEmpty(userId)) {
            infoMap.add("userId", userId);
        }
        if (StringUtils.isNotEmpty(type)) {
            infoMap.add("type", type);
        }
        if (StringUtils.isNotEmpty(url)) {
            infoMap.add("url", url);
        }
        if (StringUtils.isNotEmpty(documentTopStatus)) {
            infoMap.add("documentTopStatus", documentTopStatus);
        }
        if (StringUtils.isNotEmpty(applyDate)) {
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



}
