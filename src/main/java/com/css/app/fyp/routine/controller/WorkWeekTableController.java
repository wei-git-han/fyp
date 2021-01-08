package com.css.app.fyp.routine.controller;

import com.alibaba.fastjson.JSONArray;
import com.alibaba.fastjson.JSONObject;
import com.css.addbase.apporgan.entity.BaseAppUser;
import com.css.addbase.apporgan.service.BaseAppUserService;
import com.css.app.fyp.routine.entity.FypPersonageWorkWeek;
import com.css.app.fyp.routine.service.FypPersonageWorkWeekService;
import com.css.app.fyp.routine.service.WorkWeekTableService;
import com.css.app.fyp.routine.vo.FypPersonageWorkWeekVo;
import com.css.app.fyp.utils.ResponseValueUtils;
import com.css.base.utils.*;
import com.github.pagehelper.PageHelper;
import org.apache.shiro.authz.annotation.RequiresPermissions;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.stereotype.Controller;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.*;


/**
 * 工作周表
 */
@Controller
@RequestMapping("app/fyp/workWeekTable")
public class WorkWeekTableController {
    private final Logger logger = LoggerFactory.getLogger(ReignCaseController.class);
    @Autowired
    private WorkWeekTableService workWeekTableService;
    @Autowired
    private FypPersonageWorkWeekService fypPersonageWorkWeekService;

    @Value("${csse.work.table}")
    private  String url;

    @Autowired
    private BaseAppUserService baseAppUserService;
    @Autowired
    private RedisUtil redisUtil;

    @ResponseBody
    @RequestMapping("/test")
    public void test(){
        redisUtil.deleteForHkey("fyp_*");
    }
    /**
     * 本周周表/个人周表
     */
    @ResponseBody
    @RequestMapping("/statementTablesList")
    public void statementTablesList(String orgId, String toDate) {
        SimpleDateFormat format = new SimpleDateFormat("yyyy-MM-dd");
        int week = 0;
        int year = 0;
        long time1 =System.currentTimeMillis();
        try {
            Date date = new Date();
            if(StringUtils.isNotBlank(toDate)){
                date = format.parse(toDate);
            }
            Calendar calendar = Calendar.getInstance();
            calendar.setFirstDayOfWeek(Calendar.MONDAY);
            calendar.setTime(date);
            week = calendar.get(Calendar.WEEK_OF_YEAR);
            year = calendar.get(Calendar.YEAR);
        } catch (ParseException e) {
            e.printStackTrace();
        }
        if(StringUtils.isBlank(orgId)){
            orgId = baseAppUserService.getBareauByUserId(CurrentUser.getUserId());
            long time3 =System.currentTimeMillis();
            logger.info("查询组织机构时间============:"+(time3-time1)+"ms");
        }

        long time2 =System.currentTimeMillis();
        logger.info("计算周数时间============:"+(time2-time1)+"ms");

        String keyName = "fyp_gzzb_getStatementTablesList_"+orgId + year + week;
        String json = redisUtil.getString(keyName);
        if(StringUtils.isNotBlank(json)){
            JSONArray ret = JSONArray.parseArray(json);
            Response.json(new ResponseValueUtils().success(ret));
        }else{
            JSONArray maps = workWeekTableService.statementTablesList(orgId, String.valueOf(year), String.valueOf(week));
            if(maps != null){
                redisUtil.setString(keyName,maps.toJSONString());
                redisUtil.expire(keyName,12*60*60);
            }
            Response.json(new ResponseValueUtils().success(maps));
        }

    }

    /**
     * 信息
     */
    @ResponseBody
    @RequestMapping("/getFypPersonageWorkWeek")
    public void getFypPersonageWorkWeek(String id){
        FypPersonageWorkWeek fypPersonageWorkWeek = fypPersonageWorkWeekService.queryObject(id);
        Response.json("fypPersonageWorkWeek", fypPersonageWorkWeek);
    }

    /**
     * 本周周表/个人周表-新增
     */
    @ResponseBody
    @RequestMapping("/statementTablesInsert")
    public void statementTablesInsert (String weekTableContent, @DateTimeFormat(pattern = "yyyy-MM-dd HH:mm") Date createdTime) {
        FypPersonageWorkWeek fypPersonageWorkWeek = new FypPersonageWorkWeek();
        fypPersonageWorkWeek.setId(UUIDUtils.random());
        fypPersonageWorkWeek.setWeekTableContent(weekTableContent);
        fypPersonageWorkWeek.setUserId(CurrentUser.getUserId());
        fypPersonageWorkWeek.setWeekFlag("1");
        fypPersonageWorkWeek.setCreatedTime(createdTime);
        fypPersonageWorkWeek.setUpdatedTime(createdTime);
        fypPersonageWorkWeekService.save(fypPersonageWorkWeek);
        Response.json("result", "success");
    }

    /**
     * 列表
     */
    @ResponseBody
    @RequestMapping("/list")
    public void list(@DateTimeFormat(pattern = "yyyy-MM-dd") Date toDate, Integer page, Integer limit){
        Map<String, Object> map = new HashMap<>();
        String userId = CurrentUser.getUserId();
        //查询列表数据
        List<FypPersonageWorkWeekVo> fypPersonageWorkWeekList = fypPersonageWorkWeekService.getPersonalWeekTableList(toDate, map, userId);
        Response.json(new ResponseValueUtils().success(fypPersonageWorkWeekList));
    }

    /**
     * 修改
     */
    @ResponseBody
    @RequestMapping("/update")
    public void update(String weekTableContent, @DateTimeFormat(pattern = "yyyy-MM-dd HH:mm") Date createdTime, String id){
        FypPersonageWorkWeek fypPersonageWorkWeek = fypPersonageWorkWeekService.queryObject(id);
        fypPersonageWorkWeek.setWeekTableContent(weekTableContent);
        fypPersonageWorkWeek.setCreatedTime(createdTime);
        fypPersonageWorkWeekService.update(fypPersonageWorkWeek);
        Response.json("result", "success");
    }

    /**
     * 负一屏-办公效能-办事-工作报表
     */
    @ResponseBody
    @RequestMapping("/getAllDeptInfo")
    public void getAllDeptInfo(){
        JSONArray jsonArray = new JSONArray();
        LinkedMultiValueMap<String,Object> infoMap = new LinkedMultiValueMap<String,Object>();
        jsonArray = CrossDomainUtil.getJsonArrayData(url, infoMap);
        Response.json(jsonArray);
    }

}
