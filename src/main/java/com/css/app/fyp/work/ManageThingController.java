package com.css.app.fyp.work;

import com.alibaba.fastjson.JSONObject;
import com.css.app.fyp.utils.ResponseValueUtils;
import com.css.base.utils.Response;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.stereotype.Controller;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.*;

/**
 * 办公效能-办事
 */
@Controller
@RequestMapping("/app/fyp/manageThing")
public class ManageThingController {

    private final Logger logger = LoggerFactory.getLogger(ManageThingController.class);

    @Autowired
    private GetJsonData getJsonData;
    /**
     * 督查催办
     * @param deptid
     * @param time 年-月
     */
    @ResponseBody
    @RequestMapping("/dbCount")
    public void dbCount(String deptid,@DateTimeFormat(pattern = "yyyy-MM") Date time) {
        Calendar calendar = Calendar.getInstance();
        calendar.setTime(time);
        LinkedMultiValueMap<String, Object> paramMap = new LinkedMultiValueMap<>();
        paramMap.add("year",String.valueOf(calendar.get(Calendar.YEAR)));//年
        paramMap.add("month",String.valueOf(calendar.get(calendar.MONTH)));//月
        paramMap.add("organId",deptid);//单位id
        List<JSONObject> dataList = getJsonData.getJson(paramMap, "督查催办");
        Map<String,Object> dataMap = new HashMap<>();
        dataMap.put("onTime",dataList.get(0).get("onTimebj"));//按时办结
        dataMap.put("timeOutEnd",dataList.get(0).get("overTimebj"));//超时办结
        dataMap.put("timeOutNotEnd",dataList.get(0).get("overTimewbj"));//超时未结
        dataMap.put("working",dataList.get(0).get("onTimeblz"));//时限内在办
        dataMap.put("dayNumber",dataList.get(0).get("aveDays"));//平均办理天数
        dataMap.put("percentage",dataList.get(0).get("wcl"));//办结率
        dataMap.put("total",dataList.get(0).get("zsl"));//督办总量
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
