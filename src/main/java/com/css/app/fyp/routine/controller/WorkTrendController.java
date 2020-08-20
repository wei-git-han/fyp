package com.css.app.fyp.routine.controller;

import com.alibaba.fastjson.JSONArray;
import com.css.app.fyp.routine.service.WorkTrendService;
import com.css.app.fyp.utils.ResponseValueUtils;
import com.css.base.utils.Response;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

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
     * @Description 今日动态/历史动态
     * @Author gongan
     * @Date 2020/8/14
     * @Param [trendType]
     * @Return void
     */
    @ResponseBody
    @RequestMapping("/workTrendList")
    public void workTrendList(String trendType) {
        JSONArray maps = workTrendService.workTrendList(trendType);
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
    public void workTrendSave(String trendType) {
        workTrendService.workTrendSave(trendType);
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
        List<Map<String, Object>> maps = workTrendService.workTrendPreview(trendType);
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
    public void workTrendPhoneDelete(String trendType) {
        workTrendService.workTrendPhoneDelete(trendType);
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
