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

import java.util.*;

/**
 * 办公效能-办会
 */
@Controller
@RequestMapping("/app/fyp/manageMeeting")
public class ManageMeetingController {

    private final Logger logger = LoggerFactory.getLogger(ManageMeetingController.class);

    @Autowired
    private GetJsonData getJsonData;

    /**
     * 日常会议
     * @param time 年-月
     */
    @ResponseBody
    @RequestMapping("/common")
    public void common(@DateTimeFormat(pattern = "yyyy-MM") Date time) {
        ArrayList<Map<String, Object>> objects = new ArrayList<>();
        Map<String, Object> dataMap = null;

        LinkedMultiValueMap<String, Object> paramMap = new LinkedMultiValueMap<>();
        //中宏利达开始时间结束时间传入参数,当前时间与time的时间差
        paramMap.add("endDiff",this.getMin(new Date(),time));
       /* List<JSONObject> dataJson = getJsonData.getJson(paramMap, "办会");
        for (JSONObject data:dataJson) {
            List<Map<String,Object>> list = (ArrayList)data.get("list");
            dataMap = new HashMap<>();
            int min = 0;
            if(null!=list) {
                for (Map<String, Object> map : list) {
                    if ("0".equals(map.get("videoEnable"))) {//未开启视频
                        min += Integer.parseInt(this.getMin((Date) map.get("endTime"), (Date) map.get("startTime")));
                    }
                }
            }
            dataMap.put("deptName",data.get("deptName"));
            dataMap.put("count",min);
            objects.add(dataMap);
        }*/
        HashMap<String, Object> map = new HashMap<>();
        map.put("deptName","办公厅");
        map.put("meetingTimeCount",46);
        map.put("meetingCount",4646);
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
        ArrayList<Map<String, Object>> objects = new ArrayList<>();
        Map<String, Object> dataMap = null;

        LinkedMultiValueMap<String, Object> paramMap = new LinkedMultiValueMap<>();
        //中宏利达开始时间结束时间传入参数,当前时间与time的时间差
        paramMap.add("endDiff",this.getMin(new Date(),time));
        /*List<JSONObject> dataJson = getJsonData.getJson(paramMap, "办会");
        for (JSONObject data:dataJson) {
            List<Map<String,Object>> list = (ArrayList)data.get("list");
            dataMap = new HashMap<>();
            int min = 0;
            int count = 0;
            if(null!=list) {
                for (Map<String, Object> map : list) {
                    if ("1".equals(map.get("videoEnable"))) {//开启视频
                        min += Integer.parseInt(this.getMin((Date) map.get("endTime"), (Date) map.get("startTime")));
                        count++;
                    }
                }
            }
            dataMap.put("deptName",data.get("deptName"));
            dataMap.put("meetingTimeCount",min);
            dataMap.put("meetingCount",count);
            objects.add(dataMap);
        }*/
        HashMap<String, Object> map = new HashMap<>();
        map.put("deptName","办公厅");
        map.put("meetingTimeCount",36);
        map.put("meetingCount",3636);
        objects.add(dataMap);
        Response.json(new ResponseValueUtils().success(objects));
    }

    /**
     *  时间差/分钟
     * @param endTime
     * @param statyTime
     * @return
     */
    private String getMin(Date endTime,Date statyTime){
        long diffSeconds =  (endTime.getTime() - statyTime.getTime()) / 1000;
        long day = diffSeconds / (24*60*60);
        long hour = (diffSeconds / (60*60) -day *24);
        long min = ((diffSeconds/ (60)) -day *24 *60 -hour *60 );
        return String.valueOf(min);
    }

}
