package com.css.app.fyp.routine.controller;

import com.css.app.fyp.utils.ResponseValueUtils;
import com.css.base.utils.Response;
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

    /**
     * 本周周表/个人周表
     */
    @ResponseBody
    @RequestMapping("/statementTablesList")
    public void statementTablesList(String weekTableType, Date weekTableDate) {
        List<Map<String,String>> objects = new ArrayList<>();
        Map<String,String> dataMap = new HashMap<>();
        dataMap.put("flowCount","日期");
        dataMap.put("am","上午");
        dataMap.put("pm","下午");
        objects.add(dataMap);
        Response.json(new ResponseValueUtils().success(objects));
    }

    /**
     * 本周周表/个人周表-新增
     */
    public void statementTablesInsert (@DateTimeFormat(pattern = "yyyy") Date weekTableDate, String weekTableContent, String orgName) {

        Response.json("result", "success");
    }

}
