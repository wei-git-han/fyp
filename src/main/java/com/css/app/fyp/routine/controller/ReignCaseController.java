package com.css.app.fyp.routine.controller;

import com.css.app.fyp.utils.ResponseValueUtils;
import com.css.base.utils.Response;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * @ClassName 在位情况
 * @Author gongan
 * @Date 2020/8/14
 */
@Controller
@RequestMapping("app/fyp/reignCaseController")
public class ReignCaseController {

   /**
    * @Description 在位情况列表
    * @Author gongan
    * @Date 2020/8/14
    * @Param [afficheType]
    * @Return void
    */
    @ResponseBody
    @RequestMapping("/reignCaseList")
    public void reignCaseList(String afficheType) {
        List<Map<String,String>> objects = new ArrayList<>();
        Map<String,String> dataMap = new HashMap<>();
        dataMap.put("reignName","在位人");
        dataMap.put("reignStatus","在线状态");
        objects.add(dataMap);
        Response.json(new ResponseValueUtils().success(objects));
    }

    /**
     * @Description 在位保存
     * @Author gongan
     * @Date 2020/8/14
     * @Param [trendType]
     * @Return void
     */
    @ResponseBody
    @RequestMapping("/reignCaseSave")
    public void reignCaseSave(String trendType) {
        Response.json("result", "success");
    }

}
