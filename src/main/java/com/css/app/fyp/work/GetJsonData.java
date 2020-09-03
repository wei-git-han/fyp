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
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Map;
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

    /**
     * 获取外部应用请求路径
     * @param map
     * @param type
     * @return
     */
    public List<JSONObject> getJson(LinkedMultiValueMap<String, Object> map,String type){
        jsons = new ArrayList<>();
        List<Map<String, Object>> appIdAndDeptIdNameAll = this.getAppIdAndDeptIdNameAll();
        String token = SSOAuthFilter.getToken();
        for (Map<String, Object> data:appIdAndDeptIdNameAll) {
            cacheThread.execute(new Runnable() {
                @Override
                public void run() {
                    String url = "";
                    switch (type){
                        case "办文":
                            //公文处理
                            BaseAppOrgMapped document = (BaseAppOrgMapped)baseAppOrgMappedService.orgMappedByOrgId("","",AppConstant.APP_GWCL);
                            url = document.getUrl()+AppInterfaceConstant.WEB_INERFACE_GWCL_DO_DOCUMENT;
                            break;
                        case "办会":
                            //中宏利达会议
                            BaseAppOrgMapped meeting = (BaseAppOrgMapped)baseAppOrgMappedService.orgMappedByOrgId("","",AppConstant.ZHLD);
                            url = meeting.getUrl()+AppInterfaceConstant.WEB_INERFACE_ZHLD_MEETING;
                            break;
                        case "督查催办":
                            //督查催办
                            BaseAppOrgMapped manageThing = (BaseAppOrgMapped)baseAppOrgMappedService.orgMappedByOrgId("","",AppConstant.DCCB);
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
     * 获取外部应用返回数据
     * @param url
     * @param map
     * @return
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
     * 返回所有局数据
     * @param size
     * @return
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
     * 获取所有单位不为空的mapped信息
     * @return
     */
    private List<Map<String,Object>> getAppIdAndDeptIdNameAll(){
        return baseAppOrgMappedService.findAppIdAndDeptIdNameAll();
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
