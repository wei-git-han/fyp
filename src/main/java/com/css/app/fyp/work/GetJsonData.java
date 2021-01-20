package com.css.app.fyp.work;

import com.alibaba.fastjson.JSONArray;
import com.alibaba.fastjson.JSONObject;
import com.css.addbase.apporgan.entity.BaseAppOrgan;
import com.css.addbase.apporgan.service.BaseAppOrganService;
import com.css.addbase.apporgan.service.BaseAppUserService;
import com.css.addbase.apporgmapped.entity.BaseAppOrgMapped;
import com.css.addbase.apporgmapped.service.BaseAppOrgMappedService;
import com.css.addbase.constant.AppConstant;
import com.css.addbase.constant.AppInterfaceConstant;
import com.css.addbase.token.TokenConfig;
import com.css.app.fyp.routine.service.impl.ReignCaseServiceImpl;
import com.css.base.filter.SSOAuthFilter;
import com.css.base.utils.CrossDomainUtil;
import com.css.base.utils.CurrentUser;
import com.css.base.utils.StringUtils;
import com.google.gson.JsonObject;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Repository;
import org.springframework.util.LinkedMultiValueMap;

import java.text.SimpleDateFormat;
import java.util.*;
import java.util.concurrent.CountDownLatch;
import java.util.concurrent.Executor;
import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;

/**
 * 调用外部应用获取数据
 */
@Repository
public class GetJsonData {
    private final Logger logger = LoggerFactory.getLogger(GetJsonData.class);
    public GetJsonData() {
    }

    @Autowired
    private BaseAppOrgMappedService baseAppOrgMappedService;

    @Autowired
    private BaseAppUserService baseAppUserService;

    @Autowired
    private BaseAppOrganService baseAppOrganService;

    private ExecutorService cacheThread = Executors.newCachedThreadPool();

    @Value("csse.dccb.appId")
    private String appId;

    @Value("csse.dccb.appSecret")
    private String appSecret;

//    private List<JSONObject> jsons = null;

    private List<String> strs = null;

    /**
     * 获取外部应用请求路径,局
     * @param map
     * @param type
     * @return List<JSONObject>
     */
    public List<JSONObject> getJson(LinkedMultiValueMap<String, Object> map,String type){
        String orgId = baseAppUserService.getBareauByUserId(CurrentUser.getUserId());
        List<JSONObject> jsons = new ArrayList<>();
        String prefix = this.getPrefix(type);
        String token = SSOAuthFilter.getToken();
        if (null != map.get("deptid") && !"".equals(map.get("deptid").get(0))) {
            long time1 =System.currentTimeMillis();
            Map<String, Object> appIdAndDeptIdNameById = baseAppOrganService.findAppIdAndDeptIdNameById(map.get("deptid").get(0).toString());
            long time2 =System.currentTimeMillis();
            logger.info("查询dept时间============:"+(time2-time1)+"ms");
            if(appIdAndDeptIdNameById != null && appIdAndDeptIdNameById.size()>0){
                this.getJsonsDate(type, appIdAndDeptIdNameById, prefix, jsons, token, map, map.get("deptid").toString());
            }

        }else {
            long time1 =System.currentTimeMillis();
            List<Map<String, Object>> appIdAndDeptIdNameAll = baseAppOrganService.queryAllDeptByType("gwclbw");
            long time2 =System.currentTimeMillis();
            logger.info("查询deptList时间============:"+(time2-time1)+"ms");
            for (Map<String, Object> data:appIdAndDeptIdNameAll) {
                this.getJsonsDate(type, data, prefix, jsons, token, map, orgId);
            }

        }
        return jsons;
    }

    private void getJsonsDate (String type, Map<String, Object> data, String prefix, List<JSONObject> jsons,String token, LinkedMultiValueMap<String, Object> map, String orgId) {
        String url = "";
        switch (type){
            case "办文":
                //公文处理
                BaseAppOrgMapped document = (BaseAppOrgMapped)baseAppOrgMappedService.orgMappedByOrgId("",data.get("ORG_ID").toString(),prefix);
                if(document ==null){
                    BaseAppOrgan baseAppOrgan = baseAppOrganService.queryDeptIdById(String.valueOf(data.get("ORG_ID")));
                    String deptId = baseAppOrgan.getParentId();
                    document = (BaseAppOrgMapped)baseAppOrgMappedService.orgMappedByOrgId("",deptId,prefix);
                }
                if(document == null){
                    break;
                }
                url = document.getUrl()+AppInterfaceConstant.WEB_INERFACE_GWCL_DO_DOCUMENT;
                if(StringUtils.isNotBlank(data.get("ORG_ID").toString())) {
                    map.add("deptid", findUsersByDeptidNotConfig(data.get("ORG_ID").toString()));
                }
                long time1 =System.currentTimeMillis();
                setData(data,url,map,token,jsons);
                long time2 =System.currentTimeMillis();
                logger.info("办文total/overview/trend/submitEfficiency/handleEfficiency/readEfficiency请求接口时间============:"+(time2-time1)+"ms");
                break;
            case "办会":
                //会见
                BaseAppOrgMapped meeting = (BaseAppOrgMapped)baseAppOrgMappedService.orgMappedByOrgId("","",prefix);
                map.add("appId",meeting.getAppId());
                map.add("secretKey",meeting.getAppSecret());
                url = meeting.getUrl()+meeting.getWebUri();
                time1 =System.currentTimeMillis();
                setData(data,url,map,token,jsons);
                time2 =System.currentTimeMillis();
                logger.info("办会请求接口时间============:"+(time2-time1)+"ms");
                break;
            case "首长督查催办":
                //首长督查催办
                BaseAppOrgMapped szThing = (BaseAppOrgMapped)baseAppOrgMappedService.orgMappedByOrgId("","",prefix);
                url = szThing.getUrl()+AppInterfaceConstant.WEB_INERFACE_SZDCCB_MANAGETHING;
                time1 =System.currentTimeMillis();
                setData(data,url,map,token,jsons);
                time2 =System.currentTimeMillis();
                logger.info("首长督查催办dbcount请求接口时间============:"+(time2-time1)+"ms");
                break;
            case "督查催办":
                //督查催办
                BaseAppOrgMapped manageThing = (BaseAppOrgMapped)baseAppOrgMappedService.orgMappedByOrgId("","",prefix);
                url = manageThing.getUrl()+AppInterfaceConstant.WEB_INERFACE_DCCB_MANAGETHING;
                List<Object> organIds = map.get("organId");
                if(null==organIds && organIds.contains(data.get("ORG_ID").toString())){
                    map.remove("organId");
                    map.add("organId", orgId);
                }
                //默认查配置的全部局
                if(null == organIds){
                    map.add("organId", orgId);
                }
                time1 =System.currentTimeMillis();
                setData(data,url,map,token,jsons);
                time2 =System.currentTimeMillis();
                logger.info("督查催办dbcount请求接口时间============:"+(time2-time1)+"ms");
                break;
        }
    }

    /**
     * 获取外部应用请求路径,部
     * @param type
     * @return List<String>
     */
    public List<String> getJson(String type){
        String prefix = this.getPrefix(type);
        String token = SSOAuthFilter.getToken();
        String url = "";
        switch (type){
            case "在线":
                //在线率排行-在线数
                BaseAppOrgMapped onLine = (BaseAppOrgMapped)baseAppOrgMappedService.orgMappedByOrgId("","",prefix);
                url = onLine.getUrl()+onLine.getWebUri();
                setZxData(url,new LinkedMultiValueMap(),token);
                break;
            case "请假":
                //在线率排行-请假数
                BaseAppOrgMapped leave = (BaseAppOrgMapped)baseAppOrgMappedService.orgMappedByOrgId("","",prefix);
                url = leave.getUrl()+leave.getWebUri();
                setQjData(url,new LinkedMultiValueMap(),token);
                break;

        }
        return this.getDataAll();
    }

    /**
     * 获取传入值前缀
     */
    private String getPrefix(String type){
        String data = "";
        switch (type){
            case "办文":
                //公文处理
                data = AppConstant.APP_GWCL_BW;
                break;
            case "办会":
                //中宏利达会议
                data = AppConstant.ZHLD;
                break;
            case "督查催办":
                //督查催办
                data = AppConstant.DCCB;
                break;
            case "在线":
                //在线率排行-在线数
                data = AppConstant.ONLINE;
                break;
            case "请假":
                //在线率排行-在线数
                data = AppConstant.LEAVE;
                break;
            case "首长督查催办":
                data = AppConstant.SZDCCB;
                break;
        }
        return data;
    }

    /**
     * 获取外部应用返回数据,局
     * @param url
     * @param map
     * @return JSONObject
     */
    private void setData(Map<String,Object> datamap, String url, LinkedMultiValueMap<String, Object> map, String token, List<JSONObject> jsons){
        JSONObject jsonData = CrossDomainUtil.getTokenByJsonData(url,map,token);
        if(jsonData!=null){
            jsonData.put("deptName",datamap.get("ORG_NAME"));
            jsons.add(jsonData);
        }
        map.remove("deptid");
    }

    private void setZxData(String url, LinkedMultiValueMap<String, Object> map,String token){
        strs = new ArrayList<>();
        String data = CrossDomainUtil.getTokenByStringData(url,map,token);
        if(StringUtils.isNotBlank(data)){
            JSONObject jsonObject = JSONObject.parseObject(data);
            Map  map1 = new HashMap();
            map1 = (Map) jsonObject.get("onlineUser");
            Set<String> keySet = map1.keySet();
            Iterator<String> iterator = keySet.iterator();
            while (iterator.hasNext()){
                String key = iterator.next();
                strs.add(key);
            }
        }

    }

    private void setQjData(String url, LinkedMultiValueMap<String, Object> map,String token){
        String reJson = CrossDomainUtil.getTokenByStringData(url,map,token);
        if (StringUtils.isNotEmpty(reJson)) {
            String accounts = reJson.substring(1,reJson.length()-1).replace("\"", "");
            String [] accountArray = accounts.split("\\s*,\\s*");
            strs = new ArrayList<String>(Arrays.asList(accountArray));
        }
    }

    /**
     * 返回所有部数据
     * @return List<String>
     */
    private List<String> getDataAll(){
        return strs;
    }

    /**
     * 获取所有单位不为空的mapped信息
     * @return
     */
    private List<Map<String,Object>> getAppIdAndDeptIdNameAll(String type){
        return baseAppOrgMappedService.findAppIdAndDeptIdNameAll(type);
    }

    /**
     * date to string
     * @param time
     * @return
     */
    public String getStringDate(Date time){
        SimpleDateFormat simpleDateFormat = new SimpleDateFormat("yyyy-MM-dd hh-mm-ss");
        return simpleDateFormat.format(time);
    }

    private String getUsers(String dpetid){
        //获取单位下且在编的人员
        List<String> userList = baseAppOrgMappedService.findUsersByDeptidAndRoleType(dpetid);
        StringBuilder sb = new StringBuilder();
        for (String userid: userList) {
            sb.append(userid+",");
        }
        if(StringUtils.isBlank(sb.toString())) {
            return "";
        }
        return sb.toString().substring(0,sb.length()-1);
    }

    private String getGwclUsers(String dpetid){
        //获取单位下且在编的人员
        List<String> userList = baseAppOrgMappedService.findUsersByDeptidAndRoleType(dpetid);
        StringBuilder sb = new StringBuilder();
        for (String userid: userList) {
            sb.append(userid+",");
        }
        if(StringUtils.isBlank(sb.toString())) {
            return "";
        }
        return sb.toString().substring(0,sb.length()-1);
    }

    private String findUsersByDeptidNotConfig(String dpetid){
        //获取单位下且在编的人员
        List<String> userList = baseAppOrgMappedService.findUsersByDeptidNotConfig(dpetid);
        StringBuilder sb = new StringBuilder();
        for (String userid: userList) {
            sb.append(userid+",");
        }
        if(StringUtils.isBlank(sb.toString())) {
            return "";
        }
        return sb.toString().substring(0,sb.length()-1);
    }

}
