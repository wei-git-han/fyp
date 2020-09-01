package com.css.app.fyp.routine.controller;

import com.alibaba.fastjson.JSONObject;
import com.css.app.fyp.routine.service.InformAfficheService;
import com.css.app.fyp.utils.ResponseValueUtils;
import com.css.base.utils.Response;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

/**
 * @ClassName 通知公告
 * @Author gongan
 * @Date 2020/8/13
 */
@Controller
@RequestMapping("app/fyp/informAfficheController")
public class InformAfficheController {
    private final Logger logger = LoggerFactory.getLogger(PersonalTodoController.class);
    @Autowired
    private InformAfficheService informAfficheService;

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
        JSONObject maps = informAfficheService.informAfficheList(afficheType);
        //JSONObject maps = new JSONObject();
        //maps.put("informAfficheContent", "习近平希腊巴西之行");
        //maps.put("informAfficheTime", "2020-08-25");
        Response.json(new ResponseValueUtils().success(maps));
    }

    /**
     * @Description 局公告/部公告/系统公告详情
     * @Author gongan
     * @Date 2020/8/14
     * @Param [afficheType]
     * @Return void
     */
    @ResponseBody
    @RequestMapping("/informAfficheDetailList")
    public void informAfficheDetailList(String contentid) {
        JSONObject maps = informAfficheService.informAfficheDetailList(contentid);
        Response.json(new ResponseValueUtils().success(maps));
    }

}
