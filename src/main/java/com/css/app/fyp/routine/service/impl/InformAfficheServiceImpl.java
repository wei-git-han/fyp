package com.css.app.fyp.routine.service.impl;

import com.alibaba.fastjson.JSONObject;
import com.css.addbase.appconfig.entity.BaseAppConfig;
import com.css.addbase.appconfig.service.BaseAppConfigService;
import com.css.addbase.constant.AppConstant;
import com.css.addbase.constant.AppInterfaceConstant;
import com.css.app.fyp.routine.service.InformAfficheService;
import com.css.base.utils.CrossDomainUtil;
import com.css.base.utils.CurrentUser;
import org.apache.commons.lang.StringUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.util.LinkedMultiValueMap;


/**
 * @ClassName 通知公告
 * @Author gongan
 * @Date 2020/8/14
 */
@Service("informAfficheServiceImpl")
public class InformAfficheServiceImpl implements InformAfficheService {
    private final Logger logger = LoggerFactory.getLogger(InformAfficheServiceImpl.class);

    @Autowired
    private BaseAppConfigService baseAppConfigService;

    @Value("${xxfw.url}")
    private String xxfwUrl;

    /**
     * @Description 局公告/部公告/系统公告
     * @Author gongan
     * @Date 2020/8/14
     * @Param [afficheType]
     * @Return void
     */
    @Override
    public JSONObject informAfficheList(String pageSize, String curentPage, String afficheType) {
        JSONObject jsonData = new JSONObject();
        String userId = CurrentUser.getUserId();
        //局用户
        //afficheType = "1";
        jsonData = this.getJsonArrayData(curentPage,pageSize, afficheType, userId, "", AppInterfaceConstant.WEB_INFORMAFFICHE_TO_GWCL_WDYJ_CKSC);
        return jsonData;
    }

    private JSONObject getJsonArrayData (String page, String pagesize, String afficheType, String userId, String type, String url) {
        JSONObject jsonData =new JSONObject();
        LinkedMultiValueMap<String,Object> infoMap = new LinkedMultiValueMap<String,Object>();
        infoMap.add("userId", userId);
        if (StringUtils.isNotEmpty(afficheType)) {
            infoMap.add("ggType", afficheType);
        }
        if (StringUtils.isNotEmpty(type)) {
            infoMap.add("documentTopStatus", type);
        }
        if (StringUtils.isNotEmpty(page)) {
            infoMap.add("page", page);
        }
        if (StringUtils.isNotEmpty(pagesize)) {
            infoMap.add("pagesize", pagesize);
        }
        String mapperUrl = xxfwUrl;

        if (StringUtils.isNotEmpty(mapperUrl)) {
            String sendUrl = mapperUrl + url;
            jsonData = CrossDomainUtil.getJsonData(sendUrl, infoMap);
        } else {
            logger.info("orgId为{}的局的电子保密室的配置数据错误");
            return null;
        }
        return jsonData;
    }

    /**
     * @Description 局公告/部公告/系统公告详情
     * @Author gongan
     * @Date 2020/8/14
     * @Param [afficheType]
     * @Return void
     */
    @Override
    public JSONObject informAfficheDetailList(String contentid) {
        JSONObject jsonData = new JSONObject();
        String userId = CurrentUser.getUserId();
        //局用户
        jsonData = this.getJsonDetailData(contentid, userId, AppConstant.APP_GWCL, AppInterfaceConstant.WEB_INFORM_AFFICHE_VIEWINFO_FYP);
        return jsonData;
    }

    private JSONObject getJsonDetailData (String contentid, String userId, String type, String url) {
        JSONObject jsonData =new JSONObject();
        LinkedMultiValueMap<String,Object> infoMap = new LinkedMultiValueMap<String,Object>();
        infoMap.add("userId", userId);
        if (StringUtils.isNotEmpty(contentid)) {
            infoMap.add("contentid", contentid);
        }
        String mapperUrl = xxfwUrl;
        if (StringUtils.isNotEmpty(mapperUrl)) {
            String sendUrl = mapperUrl + url;
            jsonData = CrossDomainUtil.getJsonData(sendUrl, infoMap);
        } else {
            logger.info("orgId为{}的局的电子保密室的配置数据错误");
            return null;
        }
        return jsonData;
    }
}
