package com.css.app.fyp.routine.controller;

import com.alibaba.fastjson.JSONArray;
import com.css.app.fyp.routine.entity.FypPersonageWorkWeek;
import com.css.app.fyp.routine.service.FypPersonageWorkWeekService;
import com.css.app.fyp.routine.service.WorkWeekTableService;
import com.css.app.fyp.utils.ResponseValueUtils;
import com.css.base.utils.CurrentUser;
import com.css.base.utils.Response;
import com.css.base.utils.UUIDUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

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
     * 本周周表/个人周表-新增
     */
    @ResponseBody
    @RequestMapping("/statementTablesInsert")
    public void statementTablesInsert (@RequestBody FypPersonageWorkWeek fypPersonageWorkWeek) {
        fypPersonageWorkWeek.setId(UUIDUtils.random());
        fypPersonageWorkWeekService.save(fypPersonageWorkWeek);
        Response.ok();
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

}
