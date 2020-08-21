package com.css.app.fyp.work;

import com.css.app.fyp.utils.ResponseValueUtils;
import com.css.base.utils.Response;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * 办公效能-保障
 */
@Controller
@RequestMapping("/app/fyp/ensure")
public class EnsureController {

    private final Logger logger = LoggerFactory.getLogger(EnsureController.class);

    /**
     * 保障问题跟踪
     */
    @ResponseBody
    @RequestMapping("/problem")
    public void problem() {
        Map<String, Object> dataMap = new HashMap<>();
        dataMap.put("todayCount","今日受理总数");
        dataMap.put("completed","已完成总数");
        dataMap.put("count","累计受理总数");
        List<Map<String,String>> objects = new ArrayList<>();
        Map<String, String> paramMap = new HashMap<>();
        paramMap.put("name","用户名称");
        paramMap.put("status","在线状态");
        paramMap.put("phone","联系方式");
        paramMap.put("outTime","反馈时间");
        paramMap.put("source","问题来源");
        paramMap.put("remark","问题描述");
        paramMap.put("deptName","单位名称");
        objects.add(paramMap);
        dataMap.put("users",objects);
        Response.json(new ResponseValueUtils().success(dataMap));
    }

    /**
     * 用户反馈受理情况
     */
    @ResponseBody
    @RequestMapping("/feedback")
    public void feedback() {
        List<Map<String,String>> objects = new ArrayList<>();
        HashMap<String, String> dataMap = new HashMap<>();
        dataMap.put("status","状态");
        dataMap.put("name","姓名");
        dataMap.put("deptName","单位名称");
        dataMap.put("phone","联系电话");
        dataMap.put("submitTime","报修时间");
        dataMap.put("appName","应用名称");
        dataMap.put("remark","需求描述");
        objects.add(dataMap);
        Response.json(new ResponseValueUtils().success(dataMap));
    }


}
