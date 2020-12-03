package com.css.app.fyp.work;

import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.JSONArray;
import com.alibaba.fastjson.JSONObject;
import com.css.addbase.apporgan.entity.BaseAppOrgan;
import com.css.addbase.apporgan.service.BaseAppOrganService;
import com.css.addbase.apporgan.service.BaseAppUserService;
import com.css.addbase.apporgmapped.service.BaseAppOrgMappedService;
import com.css.app.fyp.utils.ResponseValueUtils;
import com.css.base.filter.SSOAuthFilter;
import com.css.base.utils.*;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Controller;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import java.text.SimpleDateFormat;
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
    @Autowired
    private BaseAppUserService baseAppUserService;

    @Value("${csse.work.table}")
    private  String url;

    @Autowired
    private BaseAppOrgMappedService baseAppOrgMappedService;

    @Autowired
    private RedisUtil redisUtil;

    @Autowired
    private RedisTemplate<String, String> redisTemplate;

    @Autowired
    private BaseAppOrganService baseAppOrganService;
    /**
     * 督查催办
     * @param deptid
     * @param time 年-月
     */
    @ResponseBody
    @RequestMapping("/dbCount")
    public void dbCount(String deptid,@DateTimeFormat(pattern = "yyyy") Date time) {
        int minitue = 0;
        String currentDeptId = "";
        if(StringUtils.isNotBlank(deptid)){
            currentDeptId = deptid;
        }else {
            currentDeptId = baseAppOrgMappedService.getBareauByUserId(CurrentUser.getUserId());
        }
        String keyName = "dbCoutRedis_" + currentDeptId;
        String json = redisTemplate.opsForValue().get(keyName);
        String data = redisTemplate.opsForValue().get("data");
        SimpleDateFormat format = new SimpleDateFormat("yyyy-MM-dd HH:mm");
        String curDay = format.format(new Date());
        try {
            long nowData = format.parse(data).getTime();//redis缓存放进去的时间
            long remindTime = format.parse(curDay).getTime();//当前时间
            long minusTime = remindTime - nowData;
            minitue = (int) minusTime / (1000 * 3600);
        } catch (Exception e) {
            e.printStackTrace();
        }
        if (StringUtils.isNotBlank(json) && minitue <= 60 && minitue > 0) {
            JSONObject ret = JSONObject.parseObject(json);
            Response.json(ret);
        } else {
            Boolean flag = false;
            String userId = CurrentUser.getUserId();
            String bareauByUserId = baseAppOrgMappedService.getBareauByUserId(userId);
            BaseAppOrgan baseAppOrgan = baseAppOrgMappedService.getbyId(bareauByUserId);
            String name = baseAppOrgan.getName();
            //当前用户是否为部首长
            if (StringUtils.equals("部首长", name) || StringUtils.equals("首长", name)) {
                flag = true;
            }
            LinkedMultiValueMap<String, Object> paramMap = new LinkedMultiValueMap<>();
            List<JSONObject> dataList = new ArrayList<JSONObject>();
            if (flag && StringUtils.isBlank(deptid)) {
                Calendar calendar = Calendar.getInstance();
                calendar.setTime(time);
                paramMap.add("year", String.valueOf(calendar.get(Calendar.YEAR)));//年
                paramMap.add("month", String.valueOf(calendar.get(calendar.MONTH)));//月
                dataList = getJsonData.getJson(paramMap, "首长督查催办");
            } else {
                if (StringUtils.isBlank(deptid)) {
                    deptid = baseAppUserService.getBareauByUserId(CurrentUser.getUserId());
                }
                Calendar calendar = Calendar.getInstance();
                calendar.setTime(time);
                paramMap.add("year", String.valueOf(calendar.get(Calendar.YEAR)));//年
                paramMap.add("month", String.valueOf(calendar.get(calendar.MONTH)));//月
                if (StringUtils.isNotBlank(deptid)) {
                    paramMap.add("organId", deptid);//单位id
                }
                dataList = getJsonData.getJson(paramMap, "督查催办");
            }
            Map<String, Object> dataMap = new HashMap<>();
            dataMap.put("onTime", dataList.get(0).get("onTimebj"));//按时办结
            dataMap.put("timeOutEnd", dataList.get(0).get("overTimebj"));//超时办结
            dataMap.put("timeOutNotEnd", dataList.get(0).get("overTimewbj"));//超时未结
            dataMap.put("working", dataList.get(0).get("onTimeblz"));//时限内在办
            dataMap.put("dayNumber", dataList.get(0).get("aveDays"));//平均办理天数
            String bjl = dataList.get(0).get("wcl").toString();
            dataMap.put("percentage", bjl);//办结率
            dataMap.put("total", dataList.get(0).get("zsl"));//督办总量
            redisUtil.setString(keyName, new ResponseValueUtils().success(dataMap).toJSONString());
            Date date = new Date();
            redisUtil.setString("data", format.format(date));
            Response.json(new ResponseValueUtils().success(dataMap));
        }
    }

//    @Scheduled(fixedRate=180)
//    @ResponseBody
//    @RequestMapping("/ddd")
//    public void dbCoutRedis() {
//        LinkedMultiValueMap<String, Object> paramMap = new LinkedMultiValueMap<>();
//        List<JSONObject> dataList = new ArrayList<JSONObject>();
//        Calendar calendar = Calendar.getInstance();
//        paramMap.add("year", String.valueOf(calendar.get(Calendar.YEAR)));//年
//        paramMap.add("month", String.valueOf(calendar.get(calendar.MONTH)));//月
//        List<BaseAppOrgan> appOrganList = baseAppOrganService.getAllDeptIds();
//        if (appOrganList != null && appOrganList.size() > 0) {
//            for (int i = 0; i < appOrganList.size(); i++) {
//                BaseAppOrgan baseAppOrgan = appOrganList.get(i);
//                String deptid = baseAppOrgan.getId();
//                if (StringUtils.isNotBlank(deptid)) {
//                    paramMap.add("organId", deptid);//单位id
//                }
//                dataList = getJsonData.getAllJson(paramMap, "督查催办");
//                Map<String, Object> dataMap = new HashMap<>();
//                dataMap.put("onTime", dataList.get(0).get("onTimebj"));//按时办结
//                dataMap.put("timeOutEnd", dataList.get(0).get("overTimebj"));//超时办结
//                dataMap.put("timeOutNotEnd", dataList.get(0).get("overTimewbj"));//超时未结
//                dataMap.put("working", dataList.get(0).get("onTimeblz"));//时限内在办
//                dataMap.put("dayNumber", dataList.get(0).get("aveDays"));//平均办理天数
//                String bjl = dataList.get(0).get("wcl").toString();
//                //bjl = bjl.substring(0,bjl.lastIndexOf(".")+2)+"%";
//                dataMap.put("percentage", bjl);//办结率
//                dataMap.put("total", dataList.get(0).get("zsl"));//督办总量
//                String keyName = "dbCoutRedis_" + deptid;
//                redisUtil.setString(keyName, new ResponseValueUtils().success(dataMap).toJSONString());
//            }
//
//
//        }
//        //String keyName = "dbCoutRedis";
//        //redisUtil.setString(keyName,new ResponseValueUtils().success(dataMap).toJSONString());
//        //Response.json(new ResponseValueUtils().success(dataMap));
//    }

    /**
     * 工作周表
     * @param time 年-月
     */
    @ResponseBody
    @RequestMapping("/weeklyTable")
    public void weeklyTable(@DateTimeFormat(pattern = "yyyy-MM") Date time) {
        JSONArray jsonArray = new JSONArray();
        LinkedMultiValueMap<String,Object> infoMap = new LinkedMultiValueMap<String,Object>();
        url+="?access_token=" + SSOAuthFilter.getToken();
        String res = HttpClientUtils.requstByGetMethod(url);
//        jsonArray = CrossDomainUtil.getJsonArrayData(url, infoMap);
        jsonArray = JSONArray.parseArray(res);
        JSONObject result = new JSONObject();
        result.put("list",jsonArray);
        Response.json("data",result);
    }

}
