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
 * @ClassName 通知公告
 * @Author gongan
 * @Date 2020/8/13
 */
@Controller
@RequestMapping("app/fyp/informAfficheController")
public class InformAfficheController {

    /**
     * @Description 局公告/部公告/系统公告
     * @Author gongan
     * @Date 2020/8/14
     * @Param [afficheType]
     * @Return void
     */
    @ResponseBody
    @RequestMapping("/informAfficheList")
    public void informAfficheList(String afficheType) {
        List<Map<String,String>> objects = new ArrayList<>();
        Map<String,String> dataMap = new HashMap<>();
        dataMap.put("content","内容");
        dataMap.put("date","时间");
        objects.add(dataMap);
        Response.json(new ResponseValueUtils().success(objects));
    }

}
