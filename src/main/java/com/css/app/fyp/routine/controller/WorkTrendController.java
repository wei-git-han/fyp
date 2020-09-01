package com.css.app.fyp.routine.controller;

import com.alibaba.fastjson.JSONObject;
import com.css.app.fyp.routine.service.WorkTrendService;
import com.css.app.fyp.utils.ResponseValueUtils;
import com.css.base.utils.Response;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;
import java.util.Map;

/**
 * @ClassName 工作动态
 * @Author gongan
 * @Date 2020/8/14
 */
@Controller
@RequestMapping("app/fyp/workTrendController")
public class WorkTrendController {
    private final Logger logger = LoggerFactory.getLogger(ReignCaseController.class);
    @Autowired
    private WorkTrendService workTrendService;

    /**
     * @Description 工作动态
     * @Author gongan
     * @Date 2020/8/14
     * @Param [trendType]
     * @Return void
     */
    @ResponseBody
    @RequestMapping("/workTrendList")
    public void workTrendList(String trendType) {
        JSONObject maps = workTrendService.workTrendList(trendType);
        Response.json(new ResponseValueUtils().success(maps));
    }

    /**
     * @Description 轮播图展示
     * @Author gongan
     * @Date 2020/8/14
     * @Param [trendType]
     * @Return void
     */
    @RequestMapping("/displayRotationPicture")
    public void displayRotationPicture(){
        JSONObject maps = workTrendService.displayRotationPicture();
        Response.json(new ResponseValueUtils().success(maps));
    }

    /**
     * @Description 上传图片集合
     * @Author gongan
     * @Date 2020/8/14
     * @Param [trendType]
     * @Return void
     */
//    @RequestMapping("/displayRotationPicture")
//    public void uploadPictures(@RequestParam(value = "pictureFiles", required = false) MultipartFile[] pictureFiles, String groupId){
//        JSONObject maps = workTrendService.uploadPictures(pictureFiles, groupId);
//        Response.json(new ResponseValueUtils().success(maps));
//    }

    /**
     *  删除图片
     * @param pictureId  图片ID
     */
    @RequestMapping("/deletePicture")
    public void deletePicture(String pictureId){
        JSONObject maps = workTrendService.deletePicture(pictureId);
        Response.json(new ResponseValueUtils().success(maps));
    }

    /**
     * @Description 保存主题信息
     * @Author gongan
     * @Date 2020/8/14
     * @Param [trendType]
     * @Return void
     */
    @RequestMapping("/saveThemeInfo")
    public void saveThemeInfo(String groupId, String theme, String themeDesc, Integer timeInterval){
        JSONObject maps = workTrendService.saveThemeInfo(groupId, theme, themeDesc, timeInterval);
        Response.json(new ResponseValueUtils().success(maps));
    }

    /**
     * @Description 工作动态详情
     * @Author gongan
     * @Date 2020/8/14
     * @Param [trendType]
     * @Return void
     */
    @ResponseBody
    @RequestMapping("/workTrendDetail")
    public void workTrendDetail(String channelid) {
        JSONObject maps = workTrendService.workTrendDetail(channelid);
        Response.json(new ResponseValueUtils().success(maps));
    }

    /**
     * @Description 动态发布
     * @Author gongan
     * @Date 2020/8/14
     * @Param [trendType]
     * @Return void
     */
    @ResponseBody
    @RequestMapping("/workTrendPublish")
    public void workTrendPublish(String trendType) {
        List<Map<String, Object>> maps = workTrendService.workTrendPublish(trendType);
        Response.json(new ResponseValueUtils().success(maps));
    }

    /**
     * @Description 动态保存
     * @Author gongan
     * @Date 2020/8/14
     * @Param [trendType]
     * @Return void
     */
    @ResponseBody
    @RequestMapping("/workTrendSave")
    public void workTrendSave(@RequestBody String requestBody) {
        workTrendService.workTrendSave(requestBody);
        Response.json("result", "success");
    }

    /**
     * @Description 动态预览
     * @Author gongan
     * @Date 2020/8/14
     * @Param [trendType]
     * @Return void
     */
    @ResponseBody
    @RequestMapping("/workTrendPreview")
    public void workTrendPreview(String trendType) {
        JSONObject maps = workTrendService.workTrendPreview(trendType);
        Response.json(new ResponseValueUtils().success(maps));
    }

    /**
     * @Description 动态图片列表
     * @Author gongan
     * @Date 2020/8/14
     * @Param [trendType]
     * @Return void
     */
    @ResponseBody
    @RequestMapping("/workTrendPhoneList")
    public void workTrendPhoneList(String trendType) {
        List<Map<String, Object>> maps = workTrendService.workTrendPhoneList(trendType);
        Response.json(new ResponseValueUtils().success(maps));
    }

    /**
     * @Description 动态图片删除
     * @Author gongan
     * @Date 2020/8/14
     * @Param [trendType]
     * @Return void
     */
    @ResponseBody
    @RequestMapping("/workTrendPhoneDelete")
    public void workTrendPhoneDelete(String channelid) {
        workTrendService.workTrendPhoneDelete(channelid);
        Response.json("result", "success");
    }

    /**
     * @Description 动态图片排序
     * @Author gongan
     * @Date 2020/8/14
     * @Param [trendType]
     * @Return void
     */
    @ResponseBody
    @RequestMapping("/workTrendPhoneSort")
    public void workTrendPhoneSort(String trendType) {
        workTrendService.workTrendPhoneSort(trendType);
        Response.json("result", "success");
    }

}
