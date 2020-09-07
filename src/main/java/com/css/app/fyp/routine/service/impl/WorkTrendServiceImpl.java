package com.css.app.fyp.routine.service.impl;

import com.alibaba.fastjson.JSONObject;
import com.css.addbase.apporgmapped.service.BaseAppOrgMappedService;
import com.css.addbase.constant.AppConstant;
import com.css.addbase.constant.AppInterfaceConstant;
import com.css.app.fyp.routine.service.WorkTrendService;
import com.css.base.utils.CrossDomainUtil;
import com.css.base.utils.CurrentUser;
import org.apache.commons.lang.StringUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.web.multipart.MultipartFile;

import java.util.*;

/**
 * @ClassName 工作动态
 * @Author gongan
 * @Date 2020/8/14
 */
@Service("workTrendServiceImpl")
public class WorkTrendServiceImpl implements WorkTrendService {
    private final Logger logger = LoggerFactory.getLogger(WorkTrendServiceImpl.class);

    @Autowired
    private BaseAppOrgMappedService baseAppOrgMappedService;

    /*
     * @Description 列表
     * @Author gongan
     * @Date 2020/8/21
     * @Param [trendType]
     * @Return com.alibaba.fastjson.JSONArray
     */
    @Override
    public JSONObject workTrendList(String trendType) {
        String userId = CurrentUser.getUserId();
        String gwcl_appId = baseAppOrgMappedService.getAppIdByUserId("gwcl");
        //局用户
        JSONObject jsonData = this.getJsonData(userId, AppConstant.APP_GWCL, AppInterfaceConstant.WEB_WORK_TREND_VIEWINFO_FYP);
        return jsonData;
    }

    /**
     * @Description 轮播图展示
     * @Author gongan
     * @Date 2020/8/14
     * @Param [trendType]
     * @Return void
     */
    @Override
    public JSONObject displayRotationPicture() {
        JSONObject jsonData = this.getDisplayRotationPicture(AppConstant.APP_GWCL, AppInterfaceConstant.WEB_WORK_GET_DISPLAY_ROTATION_PICTURE_TREE_FYP);
        return jsonData;
    }

    private JSONObject getDisplayRotationPicture (String type, String url) {
        JSONObject jsonData =new JSONObject();
        LinkedMultiValueMap<String,Object> infoMap = new LinkedMultiValueMap<String,Object>();
        String mapperUrl = "http://172.16.1.19:64004";
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
     * @Description 轮播图展示
     * @Author gongan
     * @Date 2020/8/14
     * @Param [trendType]
     * @Return void
     */
    @Override
    public JSONObject uploadPictures(MultipartFile[] pictureFiles, String groupId) {
        JSONObject jsonData = this.getUploadPictures(pictureFiles, groupId, AppConstant.APP_GWCL, AppInterfaceConstant.WEB_WORK_GET_UPLOAD_PICTURES_TREE_FYP);
        return jsonData;
    }

    private JSONObject getUploadPictures (MultipartFile[] pictureFiles, String groupId, String type, String url) {
        JSONObject jsonData =new JSONObject();
        LinkedMultiValueMap<String,Object> infoMap = new LinkedMultiValueMap<String,Object>();
        if (pictureFiles != null) {
            infoMap.add("pictureFiles", pictureFiles);
        }
        if (StringUtils.isNotEmpty(groupId)) {
            infoMap.add("groupId", groupId);
        }
        String mapperUrl = "http://172.16.1.19:64004";
        if (StringUtils.isNotEmpty(mapperUrl)) {
            String sendUrl = mapperUrl + url;
            jsonData = CrossDomainUtil.getJsonData(sendUrl, infoMap);
        } else {
            logger.info("orgId为{}的局的电子保密室的配置数据错误");
            return null;
        }
        return jsonData;
    }

    private JSONObject getJsonData (String userId, String type, String url) {
        JSONObject jsonData =new JSONObject();
        LinkedMultiValueMap<String,Object> infoMap = new LinkedMultiValueMap<String,Object>();
        infoMap.add("userId", userId);
        String mapperUrl = "http://172.16.1.19:8080";
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
     * @Description 删除图片
     * @Author gongan
     * @Date 2020/8/14
     * @Param [trendType]
     * @Return void
     */
    @Override
    public JSONObject deletePicture(String pictureId) {
        JSONObject jsonData = this.getPicture(pictureId, AppConstant.APP_GWCL, AppInterfaceConstant.WEB_WORK_GET_UPLOAD_PICTURES_TREE_FYP);
        return jsonData;
    }

    private JSONObject getPicture (String pictureId, String type, String url) {
        JSONObject jsonData =new JSONObject();
        LinkedMultiValueMap<String,Object> infoMap = new LinkedMultiValueMap<String,Object>();
        if (pictureId != null) {
            infoMap.add("pictureId", pictureId);
        }
        String mapperUrl = "http://172.16.1.19:64004";
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
     * @Description 保存主题信息
     * @Author gongan
     * @Date 2020/8/14
     * @Param [trendType]
     * @Return void
     */
    @Override
    public JSONObject saveThemeInfo(String groupId, String theme, String themeDesc, Integer timeInterval){
        String userId = CurrentUser.getUserId();
        //局用户
        JSONObject jsonData = this.getThemeInfo(groupId, theme, themeDesc, timeInterval, userId, AppConstant.APP_GWCL, AppInterfaceConstant.WEB_WORK_TREND_DETAIL_VIEWINFO_FYP);
        return jsonData;
    }

    private JSONObject getThemeInfo (String groupId, String theme, String themeDesc, Integer timeInterval, String userId, String type, String url) {
        JSONObject jsonData =new JSONObject();
        LinkedMultiValueMap<String,Object> infoMap = new LinkedMultiValueMap<String,Object>();
        infoMap.add("userId", userId);
        if (StringUtils.isNotEmpty(groupId)) {
            infoMap.add("groupId", groupId);
        }
        if (StringUtils.isNotEmpty(theme)) {
            infoMap.add("theme", theme);
        }
        if (StringUtils.isNotEmpty(themeDesc)) {
            infoMap.add("themeDesc", themeDesc);
        }
        if (timeInterval != null) {
            infoMap.add("timeInterval", timeInterval);
        }
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
        String userId = CurrentUser.getUserId();
        //局用户
        JSONObject jsonData = this.getWorkTrendDetail(channelid, userId, AppConstant.APP_GWCL, AppInterfaceConstant.WEB_WORK_TREND_DETAIL_VIEWINFO_FYP);
        return jsonData;
    }

    private JSONObject getWorkTrendDetail (String channelid, String userId, String type, String url) {
        JSONObject jsonData =new JSONObject();
        LinkedMultiValueMap<String,Object> infoMap = new LinkedMultiValueMap<String,Object>();
        infoMap.add("userId", userId);
        if (StringUtils.isNotEmpty(channelid)) {
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
        String userId = CurrentUser.getUserId();
        //局用户
        this.getWorkTrendDetail(requestBody, userId, AppConstant.APP_GWCL, AppInterfaceConstant.WEB_WORK_TREND_SAVE_VIEWINFO_FYP);
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
        if (StringUtils.isNotEmpty(channelid)) {
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

    /**
     * @Description 动态图片删除
     * @Author gongan
     * @Date 2020/8/14
     * @Param [trendType]
     * @Return void
     */
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
