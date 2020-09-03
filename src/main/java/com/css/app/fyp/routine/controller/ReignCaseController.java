package com.css.app.fyp.routine.controller;

import com.alibaba.fastjson.JSONObject;
import com.css.addbase.apporgan.entity.BaseAppUser;
import com.css.addbase.apporgan.service.BaseAppOrganService;
import com.css.addbase.apporgan.service.BaseAppUserService;
import com.css.addbase.apporgmapped.service.BaseAppOrgMappedService;
import com.css.addbase.constant.AppConstant;
import com.css.addbase.constant.AppInterfaceConstant;
import com.css.app.fyp.routine.service.*;
import com.css.app.fyp.routine.vo.ReignCaseVo;
import com.css.app.fyp.utils.ResponseValueUtils;
import com.css.base.utils.CrossDomainUtil;
import com.css.base.utils.Response;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import java.util.*;

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
    @Autowired
    private BaseAppOrgMappedService baseAppOrgMappedService;
    @Autowired
    private BaseAppUserService baseAppUserService;

    List<Map<String,Object>> userStateMapList =new ArrayList<Map<String,Object>>();

    List<BaseAppUser> onlineUsers;
    @Autowired
    private UserStateSettingService userStateSettingService;
    @Autowired
    private UserLeaderAccessStateService userLeaderAccessStateService;
    @Autowired
    private UserLeaveSettingService userLeaveSettingService;
    @Autowired
    private BaseAppOrganService baseAppOrganService;
    @Autowired
    private UserManagerSettingService userManagerSettingService;

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
    * @Description 在位情况列表
    * @Author gongan
    * @Date 2020/8/14
    * @Param [afficheType]
    * @Return void
    */
    @ResponseBody
    @RequestMapping("/reignCaseJsonObject")
    public void reignCaseJsonObject(String afficheType) {
        JSONObject list = reignCaseService.reignCaseJsonObject();
        Response.json(new ResponseValueUtils().success(list));
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

    /**
     * 获取人员在位状态数据
     * 加载人员树
     * @param fullName
     * @return
     */
    @ResponseBody
    @RequestMapping("/getTxlInfo")
    public void txlInfo(String fullName) {
        JSONObject fypJson = new JSONObject();
        fypJson.put("txlJson", getTxlJson(fullName));
        fypJson.put("ismain", "true");
        Response.json(fypJson);
    }

    /**
     * 获取txl数据
     */
    private Object getTxlJson(String fullName) {
        // 查询列表数据
        try {
            LinkedMultiValueMap<String, Object> map = new LinkedMultiValueMap<String, Object>();
            map.add("fullName", fullName);
            String url = baseAppOrgMappedService.getWebUrlByType(AppConstant.APP_TXL,
                    AppInterfaceConstant.WEB_INTERFACE_TXL_TO_FYP);
            JSONObject json = CrossDomainUtil.getJsonData(url, map);
            Object str = json.get("info");
            return str;
        } catch (Exception e) {
            System.err.println(e);
            return "";
        }
    }

}
