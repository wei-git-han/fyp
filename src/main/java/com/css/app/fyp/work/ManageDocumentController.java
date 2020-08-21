package com.css.app.fyp.work;

import com.alibaba.fastjson.JSONObject;
import com.css.app.fyp.utils.ResponseValueUtils;
import com.css.base.utils.Response;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.stereotype.Controller;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

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

    /**
     * 办文总量
     * @param type
     * @param time 年
     */
    @ResponseBody
    @RequestMapping("/total")
    public void total(String type,@DateTimeFormat(pattern = "yyyy") Date time) {
        LinkedMultiValueMap<String, Object> paramMap = new LinkedMultiValueMap<>();
        paramMap.add("title","办文总量");
        paramMap.add("type",type);
        paramMap.add("time",this.getJsonData.getStringDate(time));
        Response.json(new ResponseValueUtils().success(this.getJsonData.getJson(paramMap, "办文")));
    }

    /**
     * 发文情况
     * @param type
     * @param time 年
     */
    @ResponseBody
    @RequestMapping("/overview")
    public void overview(String type,@DateTimeFormat(pattern = "yyyy") Date time) {
        LinkedMultiValueMap<String, Object> paramMap = new LinkedMultiValueMap<>();
        paramMap.add("title","发文情况");
        paramMap.add("type",type);
        paramMap.add("time",this.getJsonData.getStringDate(time));
        Response.json(new ResponseValueUtils().success(this.getJsonData.getJson(paramMap, "办文")));
    }

    /**
     * 发展趋势
     * @param type
     * @param time 年
     */
    @ResponseBody
    @RequestMapping("/trend")
    public void trend(String type,@DateTimeFormat(pattern = "yyyy") Date time) {
        LinkedMultiValueMap<String, Object> paramMap = new LinkedMultiValueMap<>();
        paramMap.add("title","发展趋势");
        paramMap.add("type",type);
        paramMap.add("time",this.getJsonData.getStringDate(time));
        Response.json(new ResponseValueUtils().success(this.getJsonData.getJson(paramMap, "办文")));
    }

    /**
     * 呈批效率
     * @param type
     * @param time 年-月
     */
    @ResponseBody
    @RequestMapping("/submitEfficiency")
    public void submitEfficiency(String type,@DateTimeFormat(pattern = "yyyy-MM") Date time) {
        LinkedMultiValueMap<String, Object> paramMap = new LinkedMultiValueMap<>();
        paramMap.add("title","呈批效率");
        paramMap.add("type",type);
        paramMap.add("time",this.getJsonData.getStringDate(time));
        Response.json(new ResponseValueUtils().success(this.getJsonData.getJson(paramMap, "办文")));
    }

    /**
     * 办件效率
     * @param type
     * @param time 年-月
     */
    @ResponseBody
    @RequestMapping("/handleEfficiency")
    public void handleEfficiency(String type,@DateTimeFormat(pattern = "yyyy-MM") Date time) {
        LinkedMultiValueMap<String, Object> paramMap = new LinkedMultiValueMap<>();
        paramMap.add("title","办件效率");
        paramMap.add("type",type);
        paramMap.add("time",this.getJsonData.getStringDate(time));
        Response.json(new ResponseValueUtils().success(this.getJsonData.getJson(paramMap, "办文")));
    }

    /**
     * 阅件效率
     * @param type
     * @param time 年-月
     */
    @ResponseBody
    @RequestMapping("/readEfficiency")
    public void readEfficiency(String type,@DateTimeFormat(pattern = "yyyy-MM") Date time) {
        LinkedMultiValueMap<String, Object> paramMap = new LinkedMultiValueMap<>();
        paramMap.add("title","阅件效率");
        paramMap.add("type",type);
        paramMap.add("time",this.getJsonData.getStringDate(time));
        Response.json(new ResponseValueUtils().success(this.getJsonData.getJson(paramMap, "办文")));
    }


}
