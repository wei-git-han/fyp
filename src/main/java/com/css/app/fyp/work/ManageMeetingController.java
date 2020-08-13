package com.css.app.fyp.work;

import com.css.app.db.business.controller.DocumentAddXbController;
import com.css.app.fyp.utils.ResponseValueUtils;
import com.css.base.utils.Response;
import org.apache.shiro.crypto.hash.Hash;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import java.util.*;

/**
 * 办公效能-办会
 */
@Controller
@RequestMapping("/app/fyp/manageMeeting")
public class ManageMeetingController {

    private final Logger logger = LoggerFactory.getLogger(DocumentAddXbController.class);

    /**
     * 日常会议
     * @param time 年-月
     */
    @ResponseBody
    @RequestMapping("/common")
    public void common(@DateTimeFormat(pattern = "yyyy-MM") Date time) {
        ArrayList<Map<String, String>> objects = new ArrayList<>();
        Map<String, String> dataMap = new HashMap<>();
        dataMap.put("deptName","单位名称");
        dataMap.put("count","会议总时长");
        objects.add(dataMap);
        Response.json(new ResponseValueUtils().success(objects));
    }

    /**
     * 视频会议
     * @param time 年-月
     */
    @ResponseBody
    @RequestMapping("/video")
    public void video(@DateTimeFormat(pattern = "yyyy-MM") Date time) {
        ArrayList<Map<String, String>> objects = new ArrayList<>();
        Map<String, String> dataMap = new HashMap<>();
        dataMap.put("deptName","单位名称");
        dataMap.put("meetingTimeCount","会议总时长");
        dataMap.put("meetingCount","会议场次总数");
        objects.add(dataMap);
        Response.json(new ResponseValueUtils().success(objects));
    }

}
