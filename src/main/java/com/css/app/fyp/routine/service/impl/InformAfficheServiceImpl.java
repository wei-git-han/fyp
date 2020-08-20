package com.css.app.fyp.routine.service.impl;

import com.alibaba.fastjson.JSONArray;
import com.alibaba.fastjson.JSONObject;
import com.css.addbase.constant.AppConstant;
import com.css.addbase.constant.AppInterfaceConstant;
import com.css.app.fyp.routine.service.InformAfficheService;
import com.css.base.utils.CrossDomainUtil;
import com.css.base.utils.CurrentUser;
import org.apache.commons.lang.StringUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import org.springframework.util.LinkedMultiValueMap;

import java.util.*;

/**
 * @ClassName 通知公告
 * @Author gongan
 * @Date 2020/8/14
 */
@Service("informAfficheServiceImpl")
public class InformAfficheServiceImpl implements InformAfficheService {
    private final Logger logger = LoggerFactory.getLogger(InformAfficheServiceImpl.class);

    /**
     * @Description 局公告/部公告/系统公告
     * @Author gongan
     * @Date 2020/8/14
     * @Param [afficheType]
     * @Return void
     */
    @Override
    public JSONArray informAfficheList(String afficheType) {
        JSONArray jsonData = new JSONArray();
        JSONObject jsonObj = new JSONObject();
        String userId = CurrentUser.getUserId();
        //当前用户是否为部首长
        jsonData = this.getJsonArrayData("", "","","",null, userId, AppConstant.APP_SZBG, AppInterfaceConstant.WEB_INTERFACE_SZBG_HDAP_TO_FYP);
        if (jsonData != null) {
            //部首长
            JSONObject jsonObject = (JSONObject) jsonObj.get("data");
            jsonObject.get("flowCount");
        } else {
            //局用户
            jsonData = this.getJsonArrayData("","","", "", null, userId, AppConstant.APP_GWCL, AppInterfaceConstant.WEB_INTERFACE_GWCL_GETDOCUMENT_FLOW_SPGW);
        }
        return jsonData;
    }

    private JSONArray getJsonArrayData (String page, String pagesize, String applyType, String listType, Date applyDate, String userId, String type, String url) {
        JSONArray jsonData =new JSONArray();
        LinkedMultiValueMap<String,Object> infoMap = new LinkedMultiValueMap<String,Object>();
        infoMap.add("userId", userId);
        if (applyType != null) {
            infoMap.add("type", applyType);
        }
        if (listType != null) {
            infoMap.add("documentTopStatus", listType);
        }
        if (applyDate != null) {
            infoMap.add("applyDate", applyDate);
        }
        if (page != null) {
            infoMap.add("page", page);
        }
        if (pagesize != null) {
            infoMap.add("pagesize", pagesize);
        }
        String mapperUrl = "http://172.16.201.140:10040";
        if (StringUtils.isNotEmpty(mapperUrl)) {
            String sendUrl = mapperUrl + url;
            jsonData = CrossDomainUtil.getJsonArrayData(sendUrl, infoMap);
        } else {
            logger.info("orgId为{}的局的电子保密室的配置数据错误");
            return null;
        }
        return jsonData;
    }
}
