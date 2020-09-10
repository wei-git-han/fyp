package com.css.app.fyp.work;

import com.alibaba.fastjson.JSONObject;
import com.css.addbase.apporgmapped.entity.BaseAppOrgMapped;
import com.css.addbase.apporgmapped.service.BaseAppOrgMappedService;
import com.css.addbase.constant.AppConstant;
import com.css.addbase.constant.AppInterfaceConstant;
import com.css.base.filter.SSOAuthFilter;
import com.css.base.utils.CrossDomainUtil;
import org.springframework.beans.factory.annotation.Autowired;
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

    public GetJsonData() {
    }

    @Autowired
    private BaseAppOrgMappedService baseAppOrgMappedService;

    private ExecutorService cacheThread = Executors.newCachedThreadPool();

    private List<JSONObject> jsons = null;

    private List<String> strs = null;

    /**
     * 获取外部应用请求路径,局
     * @param map
     * @param type
     * @return List<JSONObject>
     */
    public List<JSONObject> getJson(LinkedMultiValueMap<String, Object> map,String type){
        jsons = new ArrayList<>();
        String prefix = this.getPrefix(type);
        List<Map<String, Object>> appIdAndDeptIdNameAll = this.getAppIdAndDeptIdNameAll(prefix);
        String token = SSOAuthFilter.getToken();
        for (Map<String, Object> data:appIdAndDeptIdNameAll) {
            cacheThread.execute(new Runnable() {
                @Override
                public void run() {
                    String url = "";
                    switch (type){
                        case "办文":
                            //公文处理
                            BaseAppOrgMapped document = (BaseAppOrgMapped)baseAppOrgMappedService.orgMappedByOrgId("","",prefix);
                            url = document.getUrl()+AppInterfaceConstant.WEB_INERFACE_GWCL_DO_DOCUMENT;
                            break;
                        case "办会":
                            //中宏利达会议
                            BaseAppOrgMapped meeting = (BaseAppOrgMapped)baseAppOrgMappedService.orgMappedByOrgId("","",prefix);
                            url = meeting.getUrl()+AppInterfaceConstant.WEB_INERFACE_ZHLD_MEETING;
                            break;
                        case "督查催办":
                            //督查催办
                            BaseAppOrgMapped manageThing = (BaseAppOrgMapped)baseAppOrgMappedService.orgMappedByOrgId("","",prefix);
                            url = manageThing.getUrl()+AppInterfaceConstant.WEB_INERFACE_DCCB_MANAGETHING;
                            break;
                    }
                    setData(data,url,map,token);
                }
            });
        }
        return this.getDataAll(appIdAndDeptIdNameAll.size());
    }

    /**
     * 获取外部应用请求路径,部
     * @param type
     * @return List<String>
     */
    public List<String> getJson(String type){
        jsons = new ArrayList<>();
        String prefix = this.getPrefix(type);
        List<Map<String, Object>> appIdAndDeptIdNameAll = this.getAppIdAndDeptIdNameAll(prefix);
        String token = SSOAuthFilter.getToken();
        cacheThread.execute(new Runnable() {
            @Override
            public void run() {
                String url = "";
                switch (type){
                    case "在线":
                        //在线率排行-在线数
                        BaseAppOrgMapped onLine = (BaseAppOrgMapped)baseAppOrgMappedService.orgMappedByOrgId("","",prefix);
                        url = onLine.getUrl()+onLine.getWebUri();
                        break;
                    case "请假":
                        //在线率排行-请假数
                        BaseAppOrgMapped leave = (BaseAppOrgMapped)baseAppOrgMappedService.orgMappedByOrgId("","",prefix);
                        url = leave.getUrl()+leave.getWebUri();
                        break;
                }
                setData(url,new LinkedMultiValueMap(),token);
            }
        });
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
                data = AppConstant.APP_GWCL;
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
        }
        return data;
    }

    /**
     * 获取外部应用返回数据,局
     * @param url
     * @param map
     * @return JSONObject
     */
    private void setData(Map<String,Object> datamap,String url, LinkedMultiValueMap<String, Object> map,String token){
        JSONObject jsonData = null;
        if(CrossDomainUtil.getTokenByJsonData(url,map,token)!=null){
            jsonData = CrossDomainUtil.getTokenByJsonData(url,map,token);
            jsonData.put("appId",datamap.get("APP_ID"));
            jsonData.put("appSecret",datamap.get("APP_SECRET"));
            jsonData.put("deptId",datamap.get("ORG_ID"));
            jsonData.put("deptName",datamap.get("ORG_NAME"));
            jsons.add(jsonData);
        }
    }

    /**
     * 获取外部应用返回数据,部
     * @param url
     * @param map
     * @return String
     */
    private void setData(String url, LinkedMultiValueMap<String, Object> map,String token){
        if(CrossDomainUtil.getTokenByStringData(url,map,token)!=null){
            String data = CrossDomainUtil.getTokenByStringData(url,map,token);
            strs = Arrays.asList(data.split(","));
        }
    }

    /**
     * 返回所有局数据
     * @param size
     * @return List<JSONObject>
     */
    private List<JSONObject> getDataAll(int size){
        while (true){
            if(jsons.size()==size){
                break;
            }else{
                try {
                    Thread.sleep(10);
                } catch (InterruptedException e) {
                    e.printStackTrace();
                }
            }
        }
        return jsons;
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

}
