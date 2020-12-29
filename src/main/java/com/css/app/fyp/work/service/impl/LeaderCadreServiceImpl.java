package com.css.app.fyp.work.service.impl;

import com.alibaba.fastjson.JSONObject;
import com.css.addbase.apporgmapped.entity.BaseAppOrgMapped;
import com.css.addbase.apporgmapped.service.BaseAppOrgMappedService;
import com.css.app.fyp.work.LeaderCadreController;
import com.css.app.fyp.work.service.LeaderCadreService;
import com.css.base.utils.CrossDomainUtil;
import com.css.base.utils.CurrentUser;
import com.css.base.utils.Response;
import org.apache.commons.lang.StringUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.util.LinkedMultiValueMap;

@Service("LeaderCadreServiceImpl")
public class LeaderCadreServiceImpl implements LeaderCadreService {

    @Autowired
    private BaseAppOrgMappedService baseAppOrgMappedService;

    private final Logger logger = LoggerFactory.getLogger(LeaderCadreController.class);

    @Override
    public JSONObject szList(String s, String s1, String appSzbg, String url) {
        JSONObject jsonData =new JSONObject();
        LinkedMultiValueMap<String,Object> infoMap = new LinkedMultiValueMap<String,Object>();
        infoMap.add("page","1");
        infoMap.add("pagesize","1000");
        String type = "szbg";
        BaseAppOrgMapped baseAppOrgMapped = baseAppOrgMappedService.queryByType(type);
        String mapperUrl = "";
        if(baseAppOrgMapped != null){
            mapperUrl = baseAppOrgMapped.getUrl();
        }
        if (StringUtils.isNotEmpty(mapperUrl)) {
            String sendUrl = mapperUrl + url;
            jsonData = CrossDomainUtil.getJsonData(sendUrl, infoMap);
        } else {
            logger.info("orgId为{}的局的信息服务的配置数据错误");
            Response.error("orgId为{}的局的信息服务的配置数据错误");
        }
        return jsonData;
    }
}
