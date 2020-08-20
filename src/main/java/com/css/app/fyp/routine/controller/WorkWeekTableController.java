package com.css.app.fyp.routine.controller;

import com.alibaba.fastjson.JSONArray;
import com.css.app.fyp.routine.service.WorkWeekTableService;
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
 * 工作周表
 */
@Controller
@RequestMapping("app/fyp/workWeekTable")
public class WorkWeekTableController {
    private final Logger logger = LoggerFactory.getLogger(ReignCaseController.class);
    @Autowired
    private WorkWeekTableService workWeekTableService;

    /**
     * 本周周表/个人周表
     */
    @ResponseBody
    @RequestMapping("/statementTablesList")
    public void statementTablesList(String weekTableType, String weekTableDate, String page, String pagesize) {
        JSONArray maps = workWeekTableService.statementTablesList(weekTableType, weekTableDate, page, pagesize);
        Response.json(new ResponseValueUtils().success(maps));
    }

    /**
     * 本周周表/个人周表-新增
     */
    public void statementTablesInsert (@DateTimeFormat(pattern = "yyyy") Date weekTableDate, String weekTableContent, String orgName) {
        workWeekTableService.statementTablesInsert(weekTableDate, weekTableContent, orgName);
        Response.json("result", "success");
    }

}
