package com.css.app.fyp.work;

import com.css.app.fyp.utils.ResponseValueUtils;
import com.css.base.utils.Response;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import java.util.*;

/**
 * 办公效能-排行
 */
@Controller
@RequestMapping("/app/fyp/orderOfBirth")
public class OrderOfBirthController {

    private final Logger logger = LoggerFactory.getLogger(OrderOfBirthController.class);

    /**
     * 在线率排行
     * @param type
     * @param time 年-月
     */
    @ResponseBody
    @RequestMapping("/onLine")
    public void onLine(String type,@DateTimeFormat(pattern = "yyyy-MM") Date time) {
        List<Map<String,String>> objects = new ArrayList<>();
        Map<String,String> dataMap = new HashMap<>();
        dataMap.put("deptName","办公厅");//来文办理总件数
        dataMap.put("count","656");//呈批公文总件数
        dataMap.put("permanentStaffCount","123");//在编
        dataMap.put("onLineCount","234");//在线
        dataMap.put("leaveCount","345");//请假
        dataMap.put("otherCount","345");//其他
        dataMap.put("percentage","345");//在线率
        objects.add(dataMap);
        Response.json(new ResponseValueUtils().success(objects));
    }

    /**
     * 软件排行 -访问量
     * @param deptid
     */
    @ResponseBody
    @RequestMapping("/appAccess")
    public void appAccess(String deptid) {
        Map<String, List<Map<String,String>>> objects = new HashMap<>();
        //访问量
        ArrayList<Map<String, String>> accessList = new ArrayList<>();
        Map<String, String> accessMap = new HashMap<>();
        accessMap.put("appName","模拟1");//应用名称
        accessMap.put("appCount","654");//应用访问总数
        accessMap.put("appImg","path");//应用图片路径
        accessList.add(accessMap);
        objects.put("access",accessList);
        Response.json(new ResponseValueUtils().success(objects));
    }

    /**
     * 软件排行 -安装量
     * @param deptid
     */
    @ResponseBody
    @RequestMapping("/appInstall")
    public void appInstall(String deptid,@DateTimeFormat(pattern = "yyyy-MM") Date time) {
        Map<String, List<Map<String,String>>> objects = new HashMap<>();
        //安装量
        ArrayList<Map<String, String>> installList = new ArrayList<>();
        Map<String, String> installMap = new HashMap<>();
        installMap.put("appName","模拟安装1");//应用名称
        installMap.put("appCount","456");//应用安装总数
        installList.add(installMap);
        objects.put("install",installList);
        Response.json(new ResponseValueUtils().success(objects));
    }

    /**
     * 开机情况
     */
    @ResponseBody
    @RequestMapping("/computer")
    public void computer() {
        List<Map<String,String>> objects = new ArrayList<>();
        Map<String,String> dataMap = new HashMap<>();
        dataMap.put("deptName","办公厅");//单位名称
        dataMap.put("count","234356");//未开机用户总数
        objects.add(dataMap);
        Response.json(new ResponseValueUtils().success(objects));
    }

}
