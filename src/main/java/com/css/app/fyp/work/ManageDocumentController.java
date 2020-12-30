package com.css.app.fyp.work;

import com.alibaba.fastjson.JSONObject;
import com.css.addbase.apporgan.entity.BaseAppOrgan;
import com.css.addbase.apporgan.service.BaseAppOrganService;
import com.css.addbase.apporgmapped.service.BaseAppOrgMappedService;
import com.css.addbase.constant.AppConstant;
import com.css.app.fyp.utils.ResponseValueUtils;
import com.css.base.utils.CurrentUser;
import com.css.base.utils.RedisUtil;
import com.css.base.utils.Response;
import com.css.base.utils.StringUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Controller;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.*;

/**
 * 办公效能-办文
 */
@Controller
@RequestMapping("/app/fyp/manageDocument")
public class ManageDocumentController {

    private final Logger logger = LoggerFactory.getLogger(ManageDocumentController.class);

    @Autowired
    private GetJsonData getJsonData;

    @Autowired
    private BaseAppOrgMappedService baseAppOrgMappedService;

    @Autowired
    private RedisUtil redisUtil;

    @Autowired
    private RedisTemplate<String, String> redisTemplate;

    @Autowired
    private BaseAppOrganService baseAppOrganService;

    /**
     * 默认时间
     * 一年
     * @param startTime
     * @param endTime
     * @return
     */
    private Map<String,Object> setDate(Date startTime,Date endTime){
        Calendar instance = Calendar.getInstance();
        int year = instance.get(Calendar.YEAR);
        int month = instance.get(Calendar.MONTH);
        int day = instance.get(Calendar.DAY_OF_MONTH);
        int hour = instance.get(Calendar.HOUR_OF_DAY);
        int minute = instance.get(Calendar.MINUTE);
        int second = instance.get(Calendar.SECOND);
        SimpleDateFormat simpleDateFormat = new SimpleDateFormat("yyyy-MM-ddHH:mm:ss");
        String date = String.valueOf(year-1)+"-"+ String.valueOf(month)+"-"+ String.valueOf(day)+ String.valueOf(hour)+ ":"+String.valueOf(minute) +":"+ String.valueOf(second);
        try {
            Date parse = simpleDateFormat.parse(date);
            startTime = parse;
        } catch (ParseException e) {
            e.printStackTrace();
        }
        SimpleDateFormat sims = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
        HashMap<String, Object> resultMap = new HashMap<>();
        resultMap.put("startTime",sims.format(startTime));
        resultMap.put("endTime",sims.format(new Date()));
        return resultMap;
    }
    /**
     * 办文总量
     * @param type
     * @param time 年
     */
    @ResponseBody
    @RequestMapping("/total")
    public void total(String type,@DateTimeFormat(pattern = "yyyy-MM-dd") Date startTime,@DateTimeFormat(pattern = "yyyy-MM-dd") Date endTime,String deptid) {
        SimpleDateFormat simpleDateFormat = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
        String sTime = null;
        String eTime = null;
        Date date1 = new Date();
        if(null == startTime && null == endTime) {
            Map<String, Object> map = this.setDate(startTime, endTime);
            sTime = (String) map.get("startTime");
            eTime = (String) map.get("endTime");
        }else{
            sTime = simpleDateFormat.format(startTime);
            eTime = simpleDateFormat.format(endTime);
        }
        int minitue = 0;
        SimpleDateFormat format  = new SimpleDateFormat("yyyy-MM-dd HH:mm");
        String currentDeptId = "";
        if(StringUtils.isNotBlank(deptid)){
            currentDeptId = deptid;
        }else {
            currentDeptId = baseAppOrgMappedService.getBareauByUserId(CurrentUser.getUserId());
        }
        String keyName = "fyp_banwen_getGwTotal_"+currentDeptId;
        String json = redisTemplate.opsForValue().get(keyName);
        String data = redisTemplate.opsForValue().get("gwData");
        String curDay = format.format(new Date());
        try{
            long nowData = format.parse(data).getTime();//redis缓存放进去的时间
            long remindTime = format.parse(curDay).getTime();//当前时间
            long minusTime = remindTime - nowData;
            minitue =(int)minusTime/1000;
        }catch (Exception e){
            e.printStackTrace();
        }
        if(StringUtils.isNotBlank(json) && minitue <=20 && minitue > 0){
            JSONObject ret = JSONObject.parseObject(json);
            Response.json(ret);
        }else {
            LinkedMultiValueMap<String, Object> paramMap = new LinkedMultiValueMap<>();
            paramMap.add("title", "办文总量");
            paramMap.add("type", type);
            paramMap.add("deptid", deptid);
            paramMap.add("startTime", sTime);
            paramMap.add("endTime", eTime);
            redisUtil.setString(keyName,new ResponseValueUtils().success(this.getJsonData.getJson(paramMap, "办文")).toJSONString());
            Date date = new Date();
            redisUtil.setString("gwData",format.format(date));
            Response.json(new ResponseValueUtils().success(this.getJsonData.getJson(paramMap, "办文")));
        }
    }

//    @Scheduled(fixedRate=1800000)
//    public void getGwTotal(){
//        LinkedMultiValueMap<String, Object> paramMap = new LinkedMultiValueMap<>();
//        paramMap.add("title","办文总量");
//        paramMap.add("type","0");
//        //paramMap.add("deptid",deptid);
//        Calendar calendar = Calendar.getInstance();
//        paramMap.add("time",String.valueOf(calendar.get(Calendar.YEAR)));
//        List<BaseAppOrgan> appOrganList = baseAppOrganService.getAllDeptIds();
//        if(appOrganList != null && appOrganList.size() > 0){
//            for(int i = 0;i<appOrganList.size();i++){
//                BaseAppOrgan baseAppOrgan = appOrganList.get(i);
//                String deptId = baseAppOrgan.getId();
//                String keyName = "fyp_banwen_getGwTotal_"+deptId;
//                paramMap.add("organId",deptId);
//                redisUtil.setString(keyName,new ResponseValueUtils().success(this.getJsonData.getAllJson(paramMap, "办文")).toJSONString());
//            }
//        }
//
//
//        //Response.json(new ResponseValueUtils().success(this.getJsonData.getJson(paramMap, "办文")));
//    }

    /**
     * 发文情况
     * @param type
     * @param time 年
     */
    @ResponseBody
    @RequestMapping("/overview")
    public void overview(String type,@DateTimeFormat(pattern = "yyyy-MM-dd") Date startTime,@DateTimeFormat(pattern = "yyyy-MM-dd") Date endTime,String deptid) {
        SimpleDateFormat simpleDateFormat = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
        String sTime = null;
        String eTime = null;
        Date date = new Date();
        if(null == startTime && null == endTime) {
            Map<String, Object> map = this.setDate(startTime, endTime);
            sTime = (String) map.get("startTime");
            eTime = (String) map.get("endTime");
        }else{
            sTime = simpleDateFormat.format(startTime);
            eTime = simpleDateFormat.format(endTime);
        }
        LinkedMultiValueMap<String, Object> paramMap = new LinkedMultiValueMap<>();
        paramMap.add("title","发文情况");
        paramMap.add("type",type);
        paramMap.add("deptid",deptid);
        paramMap.add("startTime",sTime);
        paramMap.add("endTime",eTime);
        Response.json(new ResponseValueUtils().success(this.getJsonData.getJson(paramMap, "办文")));
    }

    /**
     * 发展趋势
     * @param type
     * @param time 年
     */
    @ResponseBody
    @RequestMapping("/trend")
    public void trend(String type,@DateTimeFormat(pattern = "yyyy-MM-dd") Date startTime,@DateTimeFormat(pattern = "yyyy-MM-dd") Date endTime,String deptid) {
        SimpleDateFormat simpleDateFormat2 = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
        String sTime = null;
        String eTime = null;
        Date date = new Date();
        if(null == startTime && null == endTime) {
            Map<String, Object> map = this.setDate(startTime, endTime);
            sTime = (String) map.get("startTime");
            eTime = (String) map.get("endTime");
        }else{
            sTime = simpleDateFormat2.format(startTime);
            eTime = simpleDateFormat2.format(endTime);
            //eTime = simpleDateFormat2.format(endTime);
        }
        LinkedMultiValueMap<String, Object> paramMap = new LinkedMultiValueMap<>();
        paramMap.add("title","发展趋势");
        paramMap.add("type",type);
        if("root".equals(deptid)){
            deptid="";
        }
        paramMap.add("deptid",deptid);
        SimpleDateFormat simpleDateFormat = new SimpleDateFormat("yyyy-MM-dd HH-mm-ss");
        paramMap.add("startTime",sTime);
        paramMap.add("endTime",eTime);
        List<JSONObject> dataList = this.getJsonData.getJson(paramMap, "办文");
        Object data = new Object();
        if(null!=dataList&&dataList.size()>0){
            data = dataList.get(0).get("list");
        }else{
            data = null;
        }
        Response.json(new ResponseValueUtils().success(data));
    }

    /**
     * 呈批效率
     * @param type
     * @param time 年-月
     */
    @ResponseBody
    @RequestMapping("/submitEfficiency")
    public void submitEfficiency(String type,@DateTimeFormat(pattern = "yyyy-MM-dd") Date startTime,@DateTimeFormat(pattern = "yyyy-MM-dd") Date endTime,String deptid) {
        SimpleDateFormat simpleDateFormat2 = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
        String sTime = null;
        String eTime = null;
        Date date = new Date();
        if(null == startTime && null == endTime) {
            Map<String, Object> map = this.setDate(startTime, endTime);
            sTime = (String) map.get("startTime");
            eTime = (String) map.get("endTime");
        }else{
            sTime = simpleDateFormat2.format(startTime);
            eTime = simpleDateFormat2.format(endTime);
        }
        LinkedMultiValueMap<String, Object> paramMap = new LinkedMultiValueMap<>();
        paramMap.add("title","呈批效率");
        paramMap.add("type",type);
        if("root".equals(deptid)){
            deptid = "";
        }
        paramMap.add("deptid",deptid);
        paramMap.add("startTime",sTime);
        paramMap.add("endTime",eTime);
        Response.json(new ResponseValueUtils().success(this.getJsonData.getJson(paramMap, "办文")));
    }

    /**
     * 办件效率
     * @param type
     * @param time 年-月
     */
    @ResponseBody
    @RequestMapping("/handleEfficiency")
    public void handleEfficiency(String type,@DateTimeFormat(pattern = "yyyy-MM-dd") Date startTime,@DateTimeFormat(pattern = "yyyy-MM-dd") Date endTime,String deptid) {
        SimpleDateFormat simpleDateFormat2 = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
        String sTime = null;
        String eTime = null;
        Date date = new Date();
        if(null == startTime && null == endTime) {
            Map<String, Object> map = this.setDate(startTime, endTime);
            sTime = (String) map.get("startTime");
            eTime = (String) map.get("endTime");
        }else{
            sTime = simpleDateFormat2.format(startTime);
            eTime = simpleDateFormat2.format(endTime);
        }
        LinkedMultiValueMap<String, Object> paramMap = new LinkedMultiValueMap<>();
        paramMap.add("title","办件效率");
        paramMap.add("type",type);
        if("root".equals(deptid)){
            deptid = "";
        }
        paramMap.add("deptid",deptid);
        paramMap.add("startTime",sTime);
        paramMap.add("endTime",eTime);
        Response.json(new ResponseValueUtils().success(this.getJsonData.getJson(paramMap, "办文")));
    }

    /**
     * 阅件效率
     * @param type
     * @param time 年-月
     */
    @ResponseBody
    @RequestMapping("/readEfficiency")
    public void readEfficiency(String type,@DateTimeFormat(pattern = "yyyy-MM-dd") Date startTime,@DateTimeFormat(pattern = "yyyy-MM-dd") Date endTime,String deptid) {
        SimpleDateFormat simpleDateFormat2 = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
        String sTime = null;
        String eTime = null;
        Date date = new Date();
        if(null == startTime && null == endTime) {
            Map<String, Object> map = this.setDate(startTime, endTime);
            sTime = (String) map.get("startTime");
            eTime = (String) map.get("endTime");
        }else{
            sTime = simpleDateFormat2.format(startTime);
            eTime = simpleDateFormat2.format(endTime);
        }
        LinkedMultiValueMap<String, Object> paramMap = new LinkedMultiValueMap<>();
        paramMap.add("title","阅件效率");
        paramMap.add("type",type);
        if("root".equals(deptid)){
            deptid = "";
        }
        paramMap.add("deptid",deptid);
        paramMap.add("startTime",sTime);
        paramMap.add("endTime",eTime);
        Response.json(new ResponseValueUtils().success(this.getJsonData.getJson(paramMap, "办文")));
    }


    /**
     * 获取单位下的用户id
     * @param dpetid
     * @return
     */
    private String getUsers(String dpetid){
        //获取单位下且在编的人员
        List<String> userList = baseAppOrgMappedService.findUsersByDeptidAndRoleType(dpetid);
        StringBuilder sb = new StringBuilder();
        for (String userid: userList) {
            sb.append(userid+",");
        }
        String ss = "";
        if (StringUtils.isNotBlank(sb.toString())){
            ss = sb.toString().substring(0,sb.length()-1);
        }
        return ss;
    }

    /**
     * 获取单位下的用户id
     * @param dpetid
     * @return
     */
    private String findUsersByDeptidNotConfig(String dpetid){
        //获取单位下且在编的人员
        List<String> userList = baseAppOrgMappedService.findUsersByDeptidNotConfig(dpetid);
        StringBuilder sb = new StringBuilder();
        for (String userid: userList) {
            sb.append(userid+",");
        }
        String ss = "";
        if (StringUtils.isNotBlank(sb.toString())){
            ss = sb.toString().substring(0,sb.length()-1);
        }
        return ss;
    }
}
