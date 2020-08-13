package com.css.app.fyp.work;

import com.css.app.db.business.controller.DocumentAddXbController;
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
 * 办公效能-办文
 */
@Controller
@RequestMapping("/app/fyp/manageDocument")
public class ManageDocumentController {

    private final Logger logger = LoggerFactory.getLogger(DocumentAddXbController.class);

    /**
     * 办文总量
     * @param type
     * @param time 年
     */
    @ResponseBody
    @RequestMapping("/total")
    public void total(String type,@DateTimeFormat(pattern = "yyyy") Date time) {
        List<Map<String,String>> objects = new ArrayList<>();
        Map<String,String> dataMap = new HashMap<>();
        dataMap.put("deptName","单位名称");
        dataMap.put("count","办文总件数");
        objects.add(dataMap);
        Response.json(new ResponseValueUtils().success(objects));
    }

    /**
     * 发文情况
     * @param type
     * @param time 年
     */
    @ResponseBody
    @RequestMapping("/overview")
    public void overview(String type,@DateTimeFormat(pattern = "yyyy") Date time) {
        List<Map<String,String>> objects = new ArrayList<>();
        Map<String,String> dataMap = new HashMap<>();
        dataMap.put("deptName","单位名称");
        dataMap.put("count","发文情况总件数");
        objects.add(dataMap);
        Response.json(new ResponseValueUtils().success(objects));
    }

    /**
     * 发展趋势
     * @param type
     * @param time 年
     */
    @ResponseBody
    @RequestMapping("/trend")
    public void trend(String type,@DateTimeFormat(pattern = "yyyy") Date time) {
        List<Map<String,String>> objects = new ArrayList<>();
        Map<String,String> dataMap = new HashMap<>();
        dataMap.put("month","月份");
        dataMap.put("receiveCount","来文办理总件数");
        dataMap.put("submitCount","呈批公文总件数");
        objects.add(dataMap);
        Response.json(new ResponseValueUtils().success(objects));
    }

    /**
     * 呈批效率
     * @param type
     * @param time 年-月
     */
    @ResponseBody
    @RequestMapping("/submitEfficiency")
    public void submitEfficiency(String type,@DateTimeFormat(pattern = "yyyy-MM") Date time) {
        List<Map<String,String>> objects = new ArrayList<>();
        Map<String,String> dataMap = new HashMap<>();
        dataMap.put("timeCount","公文呈批平均处理时长");
        dataMap.put("notEnd","超期未结");
        dataMap.put("percentage","办结率");
        objects.add(dataMap);
        Response.json(new ResponseValueUtils().success(objects));
    }

    /**
     * 办件效率
     * @param type
     * @param time 年-月
     */
    @ResponseBody
    @RequestMapping("/handleEfficiency")
    public void handleEfficiency(String type,@DateTimeFormat(pattern = "yyyy-MM") Date time) {
        List<Map<String,String>> objects = new ArrayList<>();
        Map<String,String> dataMap = new HashMap<>();
        dataMap.put("timeCount","来文办理平均处理时长");
        dataMap.put("notEnd","超期未结");
        dataMap.put("percentage","延期率");
        objects.add(dataMap);
        Response.json(new ResponseValueUtils().success(objects));
    }

    /**
     * 阅件效率
     * @param type
     * @param time 年-月
     */
    @ResponseBody
    @RequestMapping("/readEfficiency")
    public void readEfficiency(String type,@DateTimeFormat(pattern = "yyyy-MM") Date time) {
        List<Map<String,String>> objects = new ArrayList<>();
        Map<String,String> dataMap = new HashMap<>();
        dataMap.put("timeCount","阅读平均时长");
        dataMap.put("notRead","长期未读");
        dataMap.put("percentage","阅件完成率");
        objects.add(dataMap);
        Response.json(new ResponseValueUtils().success(objects));
    }

}
