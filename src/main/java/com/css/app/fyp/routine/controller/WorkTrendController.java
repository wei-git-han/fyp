package com.css.app.fyp.routine.controller;

import com.css.app.fyp.utils.ResponseValueUtils;
import com.css.base.utils.Response;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import java.util.ArrayList;
import java.util.HashMap;
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
        List<Map<String,String>> objects = new ArrayList<>();
        Map<String,String> dataMap = new HashMap<>();
        dataMap.put("phoneUrl","图片");
        dataMap.put("contentHead","内容头");
        dataMap.put("contentDetail","内容详情");
        dataMap.put("contentDate","时间");
        dataMap.put("contentCount","阅读量");
        objects.add(dataMap);
        Response.json(new ResponseValueUtils().success(objects));
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
        List<Map<String,String>> objects = new ArrayList<>();
        Map<String,String> dataMap = new HashMap<>();
        dataMap.put("phoneUrl","图片");
        dataMap.put("contentHead","内容头");
        dataMap.put("contentDetail","内容详情");
        dataMap.put("contentDetail","时间");
        dataMap.put("contentDetail","阅读量");
        objects.add(dataMap);
        Response.json(new ResponseValueUtils().success(objects));
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
        List<Map<String,String>> objects = new ArrayList<>();
        Map<String,String> dataMap = new HashMap<>();
        dataMap.put("phoneUrl","图片");
        dataMap.put("contentHead","内容头");
        dataMap.put("contentDetail","内容详情");
        dataMap.put("contentDetail","时间");
        dataMap.put("contentDetail","阅读量");
        objects.add(dataMap);
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
        List<Map<String,String>> objects = new ArrayList<>();
        Map<String,String> dataMap = new HashMap<>();
        dataMap.put("phoneUrl","图片");
        dataMap.put("contentHead","内容头");
        dataMap.put("contentDetail","内容详情");
        dataMap.put("contentDetail","时间");
        dataMap.put("contentDetail","阅读量");
        objects.add(dataMap);
        Response.json(new ResponseValueUtils().success(objects));
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
        List<Map<String,String>> objects = new ArrayList<>();
        Map<String,String> dataMap = new HashMap<>();
        dataMap.put("phoneUrl","图片");
        dataMap.put("contentHead","内容头");
        dataMap.put("contentDetail","内容详情");
        dataMap.put("contentDetail","时间");
        dataMap.put("contentDetail","阅读量");
        objects.add(dataMap);
        Response.json(new ResponseValueUtils().success(objects));
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
        List<Map<String,String>> objects = new ArrayList<>();
        Map<String,String> dataMap = new HashMap<>();
        dataMap.put("phoneUrl","图片");
        dataMap.put("contentHead","内容头");
        dataMap.put("contentDetail","内容详情");
        dataMap.put("contentDetail","时间");
        dataMap.put("contentDetail","阅读量");
        objects.add(dataMap);
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
        List<Map<String,String>> objects = new ArrayList<>();
        Map<String,String> dataMap = new HashMap<>();
        dataMap.put("phoneUrl","图片");
        dataMap.put("contentHead","内容头");
        dataMap.put("contentDetail","内容详情");
        dataMap.put("contentDetail","时间");
        dataMap.put("contentDetail","阅读量");
        objects.add(dataMap);
        Response.json("result", "success");
    }

}
