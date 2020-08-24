package com.css.app.fyp.routine.service.impl;

import com.alibaba.fastjson.JSONObject;
import com.css.addbase.constant.AppConstant;
import com.css.addbase.constant.AppInterfaceConstant;
import com.css.app.fyp.routine.service.WorkTrendService;
import com.css.base.utils.CrossDomainUtil;
import com.css.base.utils.CurrentUser;
import org.apache.commons.lang.StringUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import org.springframework.util.LinkedMultiValueMap;

import java.util.*;

/**
 * @ClassName 工作动态
 * @Author gongan
 * @Date 2020/8/14
 */
@Service("workTrendServiceImpl")
public class WorkTrendServiceImpl implements WorkTrendService {
    private final Logger logger = LoggerFactory.getLogger(WorkTrendServiceImpl.class);

    /*
     * @Description 列表
     * @Author gongan
     * @Date 2020/8/21
     * @Param [trendType]
     * @Return com.alibaba.fastjson.JSONArray
     */
    @Override
    public JSONObject workTrendList(String trendType) {
        JSONObject jsonData = new JSONObject();
        JSONObject jsonObj = new JSONObject();
        String userId = CurrentUser.getUserId();
        //当前用户是否为部首长
        jsonData = this.getJsonData(userId, AppConstant.APP_SZBG, AppInterfaceConstant.WEB_INTERFACE_SZBG_HDAP_TO_FYP);
        if (jsonData != null) {
            //部首长
            JSONObject jsonObject = (JSONObject) jsonObj.get("data");
            jsonObject.get("flowCount");
        } else {
            //局用户
            jsonData = this.getJsonData(userId, AppConstant.APP_GWCL, AppInterfaceConstant.WEB_WORK_TREND_VIEWINFO_FYP);
        }
        return jsonData;
    }

    private JSONObject getJsonData (String userId, String type, String url) {
        JSONObject jsonData =new JSONObject();
        LinkedMultiValueMap<String,Object> infoMap = new LinkedMultiValueMap<String,Object>();
        infoMap.add("userId", userId);
        String mapperUrl = "http://172.16.201.140:8080";
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
     * @Description 工作动态详情
     * @Author gongan
     * @Date 2020/8/21
     * @Param [trendType]
     * @Return java.util.List<java.util.Map<java.lang.String,java.lang.Object>>
     */
    @Override
    public JSONObject workTrendDetail(String channelid) {
        JSONObject jsonData = new JSONObject();
        JSONObject jsonObj = new JSONObject();
        String userId = CurrentUser.getUserId();
        //当前用户是否为部首长
        jsonData = this.getWorkTrendDetail(channelid, userId, AppConstant.APP_SZBG, AppInterfaceConstant.WEB_INTERFACE_SZBG_HDAP_TO_FYP);
        if (jsonData != null) {
            //部首长
            JSONObject jsonObject = (JSONObject) jsonObj.get("data");
            jsonObject.get("flowCount");
        } else {
            //局用户
            jsonData = this.getWorkTrendDetail(channelid, userId, AppConstant.APP_GWCL, AppInterfaceConstant.WEB_WORK_TREND_DETAIL_VIEWINFO_FYP);
        }
        return jsonData;
    }

    private JSONObject getWorkTrendDetail (String channelid, String userId, String type, String url) {
        JSONObject jsonData =new JSONObject();
        LinkedMultiValueMap<String,Object> infoMap = new LinkedMultiValueMap<String,Object>();
        infoMap.add("userId", userId);
        if (channelid != null) {
            infoMap.add("channelid", channelid);
        }
        String mapperUrl = "http://172.16.201.140:8080";
        if (StringUtils.isNotEmpty(mapperUrl)) {
            String sendUrl = mapperUrl + url+channelid+userId;
            jsonData = CrossDomainUtil.getJsonData(sendUrl, infoMap);
        } else {
            logger.info("orgId为{}的局的电子保密室的配置数据错误");
            return null;
        }
        return jsonData;
    }

    @Override
    public List<Map<String, Object>> workTrendPublish(String trendType) {
        List<Map<String,Object>> objects = new ArrayList<>();
        Map<String,Object> dataMap = new HashMap<>();
        dataMap.put("phoneUrl","图片");
        dataMap.put("contentHead","内容头");
        dataMap.put("contentDetail","内容详情");
        dataMap.put("contentDetail","时间");
        dataMap.put("contentDetail","阅读量");
        objects.add(dataMap);
        return objects;
    }

    @Override
    public void workTrendSave(String requestBody) {
        JSONObject jsonData = new JSONObject();
        JSONObject jsonObj = new JSONObject();
        String userId = CurrentUser.getUserId();
        //当前用户是否为部首长
        jsonData = this.getWorkTrendDetail(requestBody, userId, AppConstant.APP_SZBG, AppInterfaceConstant.WEB_INTERFACE_SZBG_HDAP_TO_FYP);
        if (jsonData != null) {
            //部首长
            JSONObject jsonObject = (JSONObject) jsonObj.get("data");
            jsonObject.get("flowCount");
        } else {
            //局用户
            jsonData = this.getWorkTrendDetail(requestBody, userId, AppConstant.APP_GWCL, AppInterfaceConstant.WEB_WORK_TREND_SAVE_VIEWINFO_FYP);
        }
    }

    /**
     * @Description 动态预览
     * @Author gongan
     * @Date 2020/8/21
     * @Param [trendType]
     * @Return java.util.List<java.util.Map<java.lang.String,java.lang.Object>>
     */
    @Override
    public JSONObject workTrendPreview(String channelid) {
        JSONObject jsonData = new JSONObject();
        JSONObject jsonObj = new JSONObject();
        String userId = CurrentUser.getUserId();
        //当前用户是否为部首长
        jsonData = this.getWorkTrendPreview(channelid, userId, AppConstant.APP_SZBG, AppInterfaceConstant.WEB_INTERFACE_SZBG_HDAP_TO_FYP);
        if (jsonData != null) {
            //部首长
            JSONObject jsonObject = (JSONObject) jsonObj.get("data");
            jsonObject.get("flowCount");
        } else {
            //局用户
            jsonData = this.getWorkTrendPreview(channelid, userId, AppConstant.APP_GWCL, AppInterfaceConstant.WEB_WORK_TREND_YL_VIEWINFO_FYP);
        }
        return jsonData;
    }

    private JSONObject getWorkTrendPreview (String channelid, String userId, String type, String url) {
        JSONObject jsonData =new JSONObject();
        LinkedMultiValueMap<String,Object> infoMap = new LinkedMultiValueMap<String,Object>();
        infoMap.add("userId", userId);
        if (channelid != null) {
            infoMap.add("channelid", channelid);
        }
        String mapperUrl = "http://172.16.201.140:10040";
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
    public List<Map<String, Object>> workTrendPhoneList(String trendType) {
        List<Map<String,Object>> objects = new ArrayList<>();
        Map<String,Object> dataMap = new HashMap<>();
        dataMap.put("phoneUrl","图片");
        dataMap.put("contentHead","内容头");
        dataMap.put("contentDetail","内容详情");
        dataMap.put("contentDetail","时间");
        dataMap.put("contentDetail","阅读量");
        objects.add(dataMap);
        return objects;
    }

    @Override
    public void workTrendPhoneDelete(String channelid) {
        JSONObject jsonData = new JSONObject();
        JSONObject jsonObj = new JSONObject();
        String userId = CurrentUser.getUserId();
        //当前用户是否为部首长
        jsonData = this.getWorkTrendDetail(channelid, userId, AppConstant.APP_SZBG, AppInterfaceConstant.WEB_INTERFACE_SZBG_HDAP_TO_FYP);
        if (jsonData != null) {
            //部首长
            JSONObject jsonObject = (JSONObject) jsonObj.get("data");
            jsonObject.get("flowCount");
        } else {
            //局用户
            this.getWorkTrendDetail(channelid, userId, AppConstant.APP_GWCL, AppInterfaceConstant.WEB_WORK_TREND_DELETE_VIEWINFO_FYP);
        }
    }

    @Override
    public void workTrendPhoneSort(String trendType) {

    }
}
