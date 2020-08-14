package com.css.app.fyp.routine.controller;

import com.css.app.fyp.routine.vo.PersonalTodoVo;
import com.css.app.fyp.utils.ResponseValueUtils;
import com.css.base.utils.Response;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import java.util.*;

/**
 * @ClassName 个人待办
 * @Author gongan
 * @Date 2020/8/14
 */
@Controller
@RequestMapping("app/fyp/personalTodo")
public class PersonalTodoController {

    /**
     * @Description 待批公文统计
     * @Author gongan
     * @Date 2020/8/14
     * @Param [applyDate]
     * @Return void
     */
    @ResponseBody
    @RequestMapping("/backlogFlowStatisticsHeader")
    public void backlogFlowStatisticsHeader(@DateTimeFormat(pattern = "yyyy") Date applyDate) {
        List<Map<String,String>> objects = new ArrayList<>();
        Map<String,String> dataMap = new HashMap<>();
        dataMap.put("flowCount","待办公文数量");
        dataMap.put("applyType","应用类型");
        dataMap.put("applyId","明细ID");
        objects.add(dataMap);
        Response.json(new ResponseValueUtils().success(objects));
    }

    /**
     * @Description 待批公文统计明细
     * @Author gongan
     * @Date 2020/8/14
     * @Param [applyType, applyDate]
     * @Return void
     */
    @ResponseBody
    @RequestMapping("/backlogFlowStatisticsDetail")
    public void backlogFlowStatisticsDetail(String applyType, @DateTimeFormat(pattern = "yyyy") Date applyDate) {
        List<Map<String,String>> objects = new ArrayList<>();
        Map<String,String> dataMap = new HashMap<>();
        dataMap.put("detailId","列表ID");
        dataMap.put("applyName","应用名称");
        dataMap.put("applyContent","应用内容");
        dataMap.put("sendUserName","发起人");
        dataMap.put("createdTime","时间");
        objects.add(dataMap);
        Response.json(new ResponseValueUtils().success(objects));
    }

    /**
     * @Description 待批公文统计修改
     * @Author gongan
     * @Date 2020/8/14
     * @Param [personalTodoVo]
     * @Return void
     */
    @ResponseBody
    @RequestMapping("/backlogFlowStatisticsDetailUpdate")
    public void backlogFlowStatisticsDetailUpdate (PersonalTodoVo personalTodoVo) {
        Response.json("result", "success");
    }

}
