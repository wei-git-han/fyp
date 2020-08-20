package com.css.app.fyp.routine.controller;

import com.alibaba.fastjson.JSONArray;
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
        JSONArray maps = informAfficheService.informAfficheList(afficheType);
        Response.json(new ResponseValueUtils().success(maps));
    }

}
