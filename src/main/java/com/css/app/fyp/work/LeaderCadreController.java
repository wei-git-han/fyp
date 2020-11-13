package com.css.app.fyp.work;

import com.alibaba.fastjson.JSONObject;
import com.css.addbase.apporgmapped.service.BaseAppOrgMappedService;
import com.css.addbase.constant.AppConstant;
import com.css.addbase.constant.AppInterfaceConstant;
import com.css.app.fyp.routine.service.impl.InformAfficheServiceImpl;
import com.css.app.fyp.utils.ResponseValueUtils;
import com.css.app.fyp.work.service.FypRoleEditService;
import com.css.app.fyp.work.service.LeaderCadreService;
import com.css.base.utils.CrossDomainUtil;
import com.css.base.utils.CurrentUser;
import com.css.base.utils.Response;
import org.apache.commons.lang.StringUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/app/fyp/leadercadre")
public class LeaderCadreController {

    @Autowired
    private BaseAppOrgMappedService baseAppOrgMappedService;

    private final Logger logger = LoggerFactory.getLogger(LeaderCadreController.class);

    @Autowired
    private FypRoleEditService fypRoleEditService;

    @Autowired
    private LeaderCadreService leaderCadreService;

    //返回前端一个标识，如果为5，则为首长
    @RequestMapping("/isShouzhang")
    public String isShouzhang(){
        String isSz = fypRoleEditService.queryObjectByUserId(CurrentUser.getUserId());
        return isSz;
    }

    //调用首长版审批阅办列表查询接口
    @RequestMapping("/szList")
    public void a (String year,String month) {
        JSONObject jsonObject = new JSONObject();
        JSONObject jsonObjectResult = new JSONObject();
        jsonObjectResult = leaderCadreService.szList ("1","1000", AppConstant.APP_SZBG, AppInterfaceConstant.WEB_TO_SZ_SPYB);
//        String total = (String)jsonObjectResult.get("total");
//        List list = new ArrayList();
//        List list1 = newA
//        list = (List)jsonObjectResult.get("rows");
//        Object o = list.get(0);
        Response.json(new ResponseValueUtils().success(jsonObjectResult));
    }

}
