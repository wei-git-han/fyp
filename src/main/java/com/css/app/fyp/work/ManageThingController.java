package com.css.app.fyp.work;

import com.alibaba.fastjson.JSONArray;
import com.alibaba.fastjson.JSONObject;
import com.css.addbase.apporgan.service.BaseAppUserService;
import com.css.app.fyp.utils.ResponseValueUtils;
import com.css.base.utils.CrossDomainUtil;
import com.css.base.utils.CurrentUser;
import com.css.base.utils.Response;
import com.css.base.utils.StringUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
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
    @Autowired
    private BaseAppUserService baseAppUserService;

    @Value("${csse.work.table}")
    private  String url;
    /**
     * 督查催办
     * @param deptid
     * @param time 年-月
     */
    @ResponseBody
    @RequestMapping("/dbCount")
    public void dbCount(String deptid,@DateTimeFormat(pattern = "yyyy-MM") Date time) {
        if(StringUtils.isBlank(deptid)){
            deptid = baseAppUserService.getBareauByUserId(CurrentUser.getUserId());
        }
        Calendar calendar = Calendar.getInstance();
        calendar.setTime(time);
        LinkedMultiValueMap<String, Object> paramMap = new LinkedMultiValueMap<>();
        paramMap.add("year",String.valueOf(calendar.get(Calendar.YEAR)));//年
        paramMap.add("month",String.valueOf(calendar.get(calendar.MONTH)));//月
        if(StringUtils.isNotBlank(deptid)) {
            paramMap.add("organId", deptid);//单位id
        }
        List<JSONObject> dataList = getJsonData.getJson(paramMap, "督查催办");
        Map<String,Object> dataMap = new HashMap<>();
        dataMap.put("onTime",dataList.get(0).get("onTimebj"));//按时办结
        dataMap.put("timeOutEnd",dataList.get(0).get("overTimebj"));//超时办结
        dataMap.put("timeOutNotEnd",dataList.get(0).get("overTimewbj"));//超时未结
        dataMap.put("working",dataList.get(0).get("onTimeblz"));//时限内在办
        dataMap.put("dayNumber",dataList.get(0).get("aveDays"));//平均办理天数
        String bjl = dataList.get(0).get("wcl").toString();
        bjl = bjl.substring(0,bjl.lastIndexOf(".")+2);
        dataMap.put("percentage",bjl);//办结率
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
        JSONArray jsonArray = new JSONArray();
        LinkedMultiValueMap<String,Object> infoMap = new LinkedMultiValueMap<String,Object>();
        jsonArray = CrossDomainUtil.getJsonArrayData(url, infoMap);
        Response.json(jsonArray);
    }

}
