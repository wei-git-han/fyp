package com.css.app.fyp.routine.controller;

import com.alibaba.fastjson.JSONObject;
import com.css.app.fyp.routine.service.PersonalTodoService;
import com.css.app.fyp.routine.vo.PersonalTodoVo;
import com.css.app.fyp.utils.ResponseValueUtils;
import com.css.base.utils.Response;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
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
    private final Logger logger = LoggerFactory.getLogger(PersonalTodoController.class);
    @Autowired
    private PersonalTodoService personalTodoService;

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
        JSONObject maps = personalTodoService.backlogFlowStatisticsHeader(applyDate);
        Response.json(new ResponseValueUtils().success(maps));
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
    public void backlogFlowStatisticsDetail(String applyType, @DateTimeFormat(pattern = "yyyy") Date applyDate, String page, String pagesize) {
        JSONObject maps = personalTodoService.backlogFlowStatisticsDetail(applyType, applyDate, page, pagesize);
        Response.json(new ResponseValueUtils().success(maps));
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
        personalTodoService.backlogFlowStatisticsDetailUpdate(personalTodoVo);
        Response.json("result", "success");
    }

}
