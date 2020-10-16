package com.css.app.fyp.routine.controller;

import com.alibaba.fastjson.JSONArray;
import com.alibaba.fastjson.JSONObject;
import com.css.app.fyp.routine.entity.FypPersonageWorkWeek;
import com.css.app.fyp.routine.service.FypPersonageWorkWeekService;
import com.css.app.fyp.routine.service.WorkWeekTableService;
import com.css.app.fyp.utils.ResponseValueUtils;
import com.css.base.utils.CrossDomainUtil;
import com.css.base.utils.CurrentUser;
import com.css.base.utils.Response;
import com.css.base.utils.UUIDUtils;
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

import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;


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

    /**
     * 本周周表/个人周表
     */
    @ResponseBody
    @RequestMapping("/statementTablesList")
    public void statementTablesList(String orgId, String weekTableType, String weekTableDate, String page, String pagesize) {
        JSONArray maps = workWeekTableService.statementTablesList(orgId, weekTableType, weekTableDate, page, pagesize);
        Response.json(new ResponseValueUtils().success(maps));
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
    public void list(Integer page, Integer pagesize){
        Map<String, Object> map = new HashMap<>();
        String userId = CurrentUser.getUserId();
        //查询列表数据
        JSONArray fypPersonageWorkWeekList = fypPersonageWorkWeekService.getPersonalWeekTableList(map, userId);
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
