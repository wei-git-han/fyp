package com.css.app.fyp.routine.controller;

import com.alibaba.fastjson.JSONArray;
import com.css.app.fyp.routine.service.ReignCaseService;
import com.css.app.fyp.routine.vo.ReignCaseVo;
import com.css.app.fyp.utils.ResponseValueUtils;
import com.css.base.utils.Response;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import java.util.List;

/**
 * @ClassName 在位情况
 * @Author gongan
 * @Date 2020/8/14
 */
@Controller
@RequestMapping("app/fyp/reignCaseController")
public class ReignCaseController {
    private final Logger logger = LoggerFactory.getLogger(ReignCaseController.class);
    @Autowired
    private ReignCaseService reignCaseService;

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
        List<ReignCaseVo> maps = reignCaseService.reignCaseList(afficheType);
        Response.json(new ResponseValueUtils().success(maps));
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
        reignCaseService.reignCaseSave(trendType);
        Response.json("result", "success");
    }

}
