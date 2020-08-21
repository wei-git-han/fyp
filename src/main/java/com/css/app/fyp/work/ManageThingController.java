package com.css.app.fyp.work;

import com.css.app.fyp.utils.ResponseValueUtils;
import com.css.base.utils.Response;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import java.util.*;

/**
 * 办公效能-办事
 */
@Controller
@RequestMapping("/app/fyp/manageThing")
public class ManageThingController {

    private final Logger logger = LoggerFactory.getLogger(ManageThingController.class);

    /**
     * 督查催办
     * @param deptid
     * @param time 年-月
     */
    @ResponseBody
    @RequestMapping("/dbCount")
    public void dbCount(String deptid,@DateTimeFormat(pattern = "yyyy-MM") Date time) {
        Map<String,String> dataMap = new HashMap<>();
        dataMap.put("onTime","按时办结");
        dataMap.put("timeOutEnd","超时办结");
        dataMap.put("timeOutNotEnd","超时未结");
        dataMap.put("working","时限内在办");
        dataMap.put("dayNumber","平均办理天数");
        dataMap.put("percentage","办结率-90%");
        dataMap.put("total","督办总量");
        Response.json(new ResponseValueUtils().success(dataMap));
    }

    /**
     * 工作周表
     * @param time 年-月
     */
    @ResponseBody
    @RequestMapping("/weeklyTable")
    public void weeklyTable(@DateTimeFormat(pattern = "yyyy-MM") Date time) {
        List<Map<String,String>> objects = new ArrayList<>();
        Map<String,String> dataMap = new HashMap<>();
        dataMap.put("deptName","单位名称");
        dataMap.put("count","周表数");
        objects.add(dataMap);
        Response.json(new ResponseValueUtils().success(objects));
    }

}
