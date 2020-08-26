package com.css.app.fyp.routine.controller;

import com.alibaba.fastjson.JSONArray;
import com.alibaba.fastjson.JSONObject;
import com.css.app.fyp.routine.entity.FypPersonageWorkWeek;
import com.css.app.fyp.routine.service.FypPersonageWorkWeekService;
import com.css.app.fyp.routine.service.WorkWeekTableService;
import com.css.app.fyp.routine.vo.FypPersonageWorkWeekVo;
import com.css.app.fyp.utils.ResponseValueUtils;
import com.css.base.utils.CurrentUser;
import com.css.base.utils.PageUtils;
import com.css.base.utils.Response;
import com.css.base.utils.UUIDUtils;
import com.github.pagehelper.PageHelper;
import org.apache.shiro.authz.annotation.RequiresPermissions;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import java.util.Date;
import java.util.HashMap;
import java.util.List;
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
    public void statementTablesList(String weekTableType, String weekTableDate, String page, String pagesize) {
        JSONArray maps = workWeekTableService.statementTablesList(weekTableType, weekTableDate, page, pagesize);
        Response.json(new ResponseValueUtils().success(maps));
    }

    /**
     * 本周周表/个人周表-新增
     */
    public void statementTablesInsert (@DateTimeFormat(pattern = "yyyy") Date weekTableDate, String weekTableContent, String orgName) {
        workWeekTableService.statementTablesInsert(weekTableDate, weekTableContent, orgName);
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
     * 信息
     */
    @ResponseBody
    @RequestMapping("/info/{id}")
    @RequiresPermissions("fyppersonageworkweek:info")
    public void info(@PathVariable("id") String id){
        FypPersonageWorkWeek fypPersonageWorkWeek = fypPersonageWorkWeekService.queryObject(id);
        Response.json("fypPersonageWorkWeek", fypPersonageWorkWeek);
    }

    /**
     * 保存
     */
    @ResponseBody
    @RequestMapping("/save")
    @RequiresPermissions("fyppersonageworkweek:save")
    public void save(@RequestBody FypPersonageWorkWeek fypPersonageWorkWeek){
        fypPersonageWorkWeek.setId(UUIDUtils.random());
        fypPersonageWorkWeekService.save(fypPersonageWorkWeek);
        Response.ok();
    }

    /**
     * 修改
     */
    @ResponseBody
    @RequestMapping("/update")
    @RequiresPermissions("fyppersonageworkweek:update")
    public void update(@RequestBody FypPersonageWorkWeek fypPersonageWorkWeek){
        fypPersonageWorkWeekService.update(fypPersonageWorkWeek);
        Response.ok();
    }

    /**
     * 删除
     */
    @ResponseBody
    @RequestMapping("/delete")
    @RequiresPermissions("fyppersonageworkweek:delete")
    public void delete(@RequestBody String[] ids){
        fypPersonageWorkWeekService.deleteBatch(ids);
        Response.ok();
    }

//    private String getWeekOfDate(long time) {
//        Date date = new Date();
//        String[] weekDays = {"星期日","星期一","星期二","星期三","星期四","星期五","星期六"};
//        Calendar cal = Calendar.getInstance();
//        cal.setTime(date);
//        int w = cal.get(Calendar.DAY_OF_WEEK) - 1;
//        if (w < 0) {
//            w = 0;
//        }
//        return weekDays[w];
//    }

}
