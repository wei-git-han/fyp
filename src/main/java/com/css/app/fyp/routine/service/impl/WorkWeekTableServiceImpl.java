package com.css.app.fyp.routine.service.impl;

import com.alibaba.fastjson.JSONArray;
import com.css.addbase.apporgan.entity.BaseAppOrgan;
import com.css.addbase.apporgmapped.entity.BaseAppOrgMapped;
import com.css.addbase.apporgmapped.service.BaseAppOrgMappedService;
import com.css.app.fyp.routine.service.WorkWeekTableService;
import com.css.base.filter.SSOAuthFilter;
import com.css.base.utils.CrossDomainUtil;
import com.css.base.utils.CurrentUser;
import com.css.base.utils.HttpClientUtils;
import org.apache.commons.lang.StringUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.util.LinkedMultiValueMap;

import java.io.File;
import java.util.*;

/**
 * @ClassName 工作周表
 * @Author gongan
 * @Date 2020/8/14
 */
@Service("workWeekTableServiceImpl")
public class WorkWeekTableServiceImpl implements WorkWeekTableService {
    private final Logger logger = LoggerFactory.getLogger(WorkWeekTableServiceImpl.class);
    @Autowired
    private BaseAppOrgMappedService baseAppOrgMappedService;

    @Override
    public JSONArray statementTablesList(String orgId, String weekTableType, String weekTableDate) {
        String userId = CurrentUser.getUserId();
        String zoneId = orgId;
        JSONArray jsonData = this.getJsonArrayData( userId, weekTableType, weekTableDate, zoneId);
        return jsonData;
    }

    private JSONArray getJsonArrayData (String userId, String year, String week, String zoneId) {
        JSONArray jsonData =new JSONArray();
        LinkedMultiValueMap<String,Object> infoMap = new LinkedMultiValueMap<String,Object>();
        String type = "fypzb";
        BaseAppOrgMapped bm = (BaseAppOrgMapped)baseAppOrgMappedService.orgMappedByOrgId("","root",type);
        String res = "";
        if (bm != null) {
//            String sendUrl = mapperUrl + url;
            String sendUrl = bm.getUrl() + bm.getWebUri();
            userId = userId.replace("-","");
            zoneId = zoneId.replace("-","");
            sendUrl += File.separator + userId + File.separator + year + File.separator + week + File.separator + zoneId;
            sendUrl+="?access_token=" + SSOAuthFilter.getToken();
            res = HttpClientUtils.requstByGetMethod(sendUrl);
        } else {
            logger.info("orgId为{}的局的电子保密室的配置数据错误");
            return null;
        }
        if(StringUtils.isNotBlank(res)){
            jsonData = JSONArray.parseArray(res);
        }
        return jsonData;
    }

    @Override
    public void statementTablesInsert(Date weekTableDate, String weekTableContent, String orgName) {

    }
}
