package com.css.app.fyp.work;

import com.alibaba.fastjson.JSONArray;
import com.alibaba.fastjson.JSONObject;
import com.css.addbase.apporgmapped.entity.BaseAppOrgMapped;
import com.css.addbase.apporgmapped.service.BaseAppOrgMappedService;
import com.css.app.fyp.utils.ResponseValueUtils;
import com.css.base.filter.SSOAuthFilter;
import com.css.base.utils.HttpClientUtils;
import com.css.base.utils.Response;
import com.css.base.utils.StringUtils;
import com.css.base.utils.DateUtil;
import javafx.scene.input.DataFormat;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.stereotype.Controller;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import java.io.File;
import java.text.ParseException;
import java.text.SimpleDateFormat;
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
    @Autowired
    private BaseAppOrgMappedService baseAppOrgMappedService;

    /**
     * 日常会议
     * @param time
     *
     */
    @ResponseBody
    @RequestMapping("/common")
    public void common(@DateTimeFormat(pattern = "yyyy-MM") Date time) {
        ArrayList<Map<String, Object>> objects = new ArrayList<>();
        Map<String, Object> dataMap = null;
        LinkedMultiValueMap<String, Object> paramMap = new LinkedMultiValueMap<>();
        SimpleDateFormat simpleDateFormat = new SimpleDateFormat("yyyy-MM-dd");
        String fromDate = simpleDateFormat.format(DateUtil.getMonthFirstDay(time));
        String endTime = simpleDateFormat.format(DateUtil.getMonthLastDay(time));
        paramMap.add("fromDate",fromDate);
        paramMap.add("toDate",endTime);
        List<JSONObject> dataJson = getJsonData.getJson(paramMap, "办会");
//        System.out.println("dataJson===="+dataJson+"=====");
//        for (JSONObject data:dataJson) {
//            List<Map<String,Object>> list = (ArrayList)data.get("data");
//            dataMap = new HashMap<>();
//            int min = 0;
//            if(null!=list) {
//                for (Map<String, Object> map : list) {
//                    if ("0".equals(map.get("videoEnable"))) {//未开启视频
//                        min += Integer.parseInt(this.getMin((Date) map.get("endTime"), (Date) map.get("startTime")));
//                    }
//                }
//            }
//            dataMap.put("deptName",data.get("deptName"));
//            dataMap.put("count",min);
//            objects.add(dataMap);
//        }
//        HashMap<String, Object> map = new HashMap<>();
//        map.put("deptName","办公厅");
//        map.put("count",4646);
//        objects.add(map);
//        Response.json(new ResponseValueUtils().success(objects));
        Response.json(dataJson);
    }

    /**
     * 视频会议
     * @param time 年-月
     */
    @ResponseBody
    @RequestMapping("/video")
    public void video(@DateTimeFormat(pattern = "yyyy") Date time) {
        BaseAppOrgMapped bm = (BaseAppOrgMapped) baseAppOrgMappedService.orgMappedByOrgId("", "", "zhldsphy");
        String res = "";
        Calendar calendar = Calendar.getInstance();
        calendar.setTime(time);
        int year = calendar.get(Calendar.YEAR);
        if (bm != null) {
            String sendUrl = bm.getUrl() + bm.getWebUri();
            sendUrl+="?access_token=" + SSOAuthFilter.getToken() + "&year=" + year;
            res = HttpClientUtils.requstByGetMethod(sendUrl);
        }
//        ArrayList<Map<String, Object>> objects = new ArrayList<>();
//        Map<String, Object> dataMap = null;
//        LinkedMultiValueMap<String, Object> paramMap = new LinkedMultiValueMap<>();
//        //中宏利达开始时间结束时间传入参数,当前时间与time的时间差
//        paramMap.add("endDiff",this.getMin(new Date(),time));
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
//        HashMap<String, Object> map = new HashMap<>();
//        map.put("deptName","办公厅");
//        map.put("meetingTimeCount",36);
//        map.put("meetingCount",3636);
//        objects.add(map);
        JSONArray jsonData = new JSONArray();
//        System.out.println("res===="+res+"=====");
        if(StringUtils.isNotBlank(res)){
            jsonData = JSONArray.parseArray(res);
        }
        JSONObject result = new JSONObject();
        result.put("list",jsonData);
        Response.json("data",result);
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
