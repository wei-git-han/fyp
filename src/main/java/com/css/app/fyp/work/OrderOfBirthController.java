package com.css.app.fyp.work;

import com.alibaba.fastjson.JSONArray;
import com.alibaba.fastjson.JSONObject;
import com.css.addbase.apporgan.entity.BaseAppUser;
import com.css.addbase.apporgan.service.BaseAppUserService;
import com.css.addbase.apporgmapped.entity.BaseAppOrgMapped;
import com.css.addbase.apporgmapped.service.BaseAppOrgMappedService;
import com.css.addbase.constant.AppConstant;
import com.css.app.fyp.utils.ResponseValueUtils;
import com.css.base.filter.SSOAuthFilter;
import com.css.base.utils.CrossDomainUtil;
import com.css.base.utils.HttpClientUtils;
import com.css.base.utils.Response;
import com.css.base.utils.StringUtils;
import com.google.common.collect.LinkedHashMultimap;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.Mergeable;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.stereotype.Controller;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.thymeleaf.processor.ITextNodeProcessorMatcher;

import java.util.*;

/**
 * 办公效能-排行
 */
@Controller
@RequestMapping("/app/fyp/orderOfBirth")
public class OrderOfBirthController {

    private final Logger logger = LoggerFactory.getLogger(OrderOfBirthController.class);

    @Autowired
    private BaseAppOrgMappedService baseAppOrgMappedService;

    @Autowired
    private BaseAppUserService baseAppUserService;

    @Autowired
    private GetJsonData getJsonData;
    /**
     * 在线率排行
     * @param type
     * @param time 年-月
     */
    @ResponseBody
    @RequestMapping("/onLine")
    public void onLine(String type,@DateTimeFormat(pattern = "yyyy-MM") Date time) {
        List<Map<String,Object>> objects = new ArrayList<>();

        //获取所有参与统计的单位
        List<Map<String, Object>> appIdAndDeptIdNameAll = baseAppOrgMappedService.findAppIdAndDeptIdNameAll(AppConstant.APP_GWCL);
        //获取所有在线数
        List<String> onLineList = getJsonData.getJson("在线");
        //获取所有请假人数
        List<String> leaveList = getJsonData.getJson("请假");

        Map<String,Object> paramMap;
        Map<String,Object> dataMap;
        for(Map<String, Object> map:appIdAndDeptIdNameAll){
            dataMap = new HashMap<>();
            dataMap.put("deptName",map.get("ORG_NAME"));//单位
            //获取所有在编人数
            paramMap = new HashMap<>();
            paramMap.put("organid",map.get("ORG_ID"));
            List<BaseAppUser> baseAppUsers = baseAppUserService.queryListByRole((String)map.get("ORG_ID"));
            if(null!=baseAppUsers){
                dataMap.put("permanentStaffCount",baseAppUsers.size());//在编
            }else{
                dataMap.put("permanentStaffCount",0);//在编
                dataMap.put("onLineCount",0);//在线
                dataMap.put("leaveCount",0);//请假
                dataMap.put("otherCount",0);//其他
                dataMap.put("percentage",0);//在线率
                continue;
            }
            int onlineCount = 0;
            if(onLineList != null && onLineList.size() > 0){
            for(String username:onLineList){
                for(BaseAppUser user:baseAppUsers){
                    if(username.equals(user.getTruename())){
                        onlineCount++;
                    }
                }
            }
            }
            dataMap.put("onLineCount",onlineCount);//在线
            int leaveCount = 0;
            if(null!= leaveList) {
                for (String username : leaveList) {
                    for (BaseAppUser user : baseAppUsers) {
                        if (username.equals(user.getTruename())) {
                            leaveCount++;
                        }
                    }
                }
            }
            dataMap.put("leaveCount",leaveCount);//请假
            dataMap.put("otherCount",baseAppUsers.size() - (onlineCount + leaveCount));//其他
            int t = 0;
            if(baseAppUsers != null && baseAppUsers.size() > 0){
                t = baseAppUsers.size();
            }
            if(t > 0){
                dataMap.put("percentage",(onlineCount / baseAppUsers.size())* 100);//在线率
            }else{
                dataMap.put("percentage",0);//在线率
            }

            objects.add(dataMap);
        }

        Response.json(new ResponseValueUtils().success(objects));
    }

    /**
     * 软件排行 -访问量
     */
    @ResponseBody
    @RequestMapping("/appAccess")
    public void appAccess() {
        Map<String, List<Map<String,Object>>> objects = new HashMap<>();

        //安装、访问量
        List<Map<String,Object>> iaData = this.getSoftwareData(AppConstant.SOFTWARE,new LinkedMultiValueMap<>());

        String apps = "";
        for(Map<String,Object> map:iaData){
            apps += (String)map.get("appid,");
        }
        LinkedMultiValueMap<Object, Object> paramMap = new LinkedMultiValueMap<>();
        if(StringUtils.isNotBlank(apps)){
            paramMap.add("apps",apps.substring(apps.length()-1,apps.length()));
        }else{
            paramMap.add("apps","0");
        }

        //应用信息
        List<Map<String,Object>> softwareData = this.getSoftwareData(AppConstant.INFO,paramMap);

        this.sort(iaData,"visit");//访问量排序

        List<Map<String,Object>> accessList = new ArrayList<>();
        Map<String, Object> accessMap = null;
        for(Map<String,Object> map:iaData){
            accessMap = new HashMap<>();
            accessMap.put("appCount",map.get("visit"));//应用访问总数
            String appid = (String)map.get("appid");
//            for(Map<String,Object> infoMap:softwareData){
//                String id = (String) infoMap.get("id");
//                if(appid.equals(id)){
//                    String name = (String)infoMap.get("name");
            String name = "平台应用";
                    accessMap.put("appName",name);//应用名称
//                    break;
//                }
//            }
            accessList.add(accessMap);
        }
        objects.put("access",accessList);

        Response.json(new ResponseValueUtils().success(objects));
    }

    /**
     * 软件排行 -安装量
     */
    @ResponseBody
    @RequestMapping("/appInstall")
    public void appInstall() {
        Map<String, List<Map<String,Object>>> objects = new HashMap<>();
        //安装、访问量
        List<Map<String,Object>> iaData = this.getSoftwareData(AppConstant.SOFTWARE,new LinkedMultiValueMap<>());

        String apps = "";
        for(Map<String,Object> map:iaData){
            apps += (String)map.get("appid,");
        }
        LinkedMultiValueMap<Object, Object> paramMap = new LinkedMultiValueMap<>();
        if(StringUtils.isNotBlank(apps)){
            paramMap.add("apps",apps.substring(apps.length()-1,apps.length()));
        }else{
            paramMap.add("apps","0");
        }
        //应用信息
        List<Map<String,Object>> softwareData = this.getSoftwareData(AppConstant.INFO,paramMap);

        this.sort(iaData,"visit");//访问量排序

        List<Map<String,Object>> accessList = new ArrayList<>();
        Map<String, Object> accessMap = null;
        for(Map<String,Object> map:iaData){
            accessMap = new HashMap<>();
            accessMap.put("appCount",map.get("install"));//应用安装总数
            String appid = (String)map.get("appid");
//            for(Map<String,Object> infoMap:softwareData){
//                String id = (String) infoMap.get("id");
//                if(appid.equals(id)){
//                    String name = (String)infoMap.get("name");
            String name = "平台应用";
                    accessMap.put("appName",name);//应用名称
//                    break;
//                }
//            }
            accessList.add(accessMap);
        }
        objects.put("install",accessList);
        Response.json(new ResponseValueUtils().success(objects));
    }


    /**
     * 获取应用安装量、访问量
     * @return
     */
    private List<Map<String,Object>> getSoftwareData(String type,LinkedMultiValueMap map){
        BaseAppOrgMapped software = (BaseAppOrgMapped)baseAppOrgMappedService.orgMappedByOrgId("","",type);
        String url = software.getUrl() +software.getWebUri();
        String token = SSOAuthFilter.getToken();
        String res = HttpClientUtils.requstByGetMethod(url);
        System.out.println(res);
        JSONObject tokenByJsonData = JSONObject.parseObject(res);
        String field = "data";//访问量、安装量
        if("info".equals(type)){//应用详情
            field = "info";
        }
        return (List<Map<String,Object>>)tokenByJsonData.get(field);
    }

    /**
     * 排序
     * @param maps
     * @param sortField
     */
    private void sort(List<Map<String,Object>> maps,String sortField){
        Collections.sort(maps, new Comparator<Map<String, Object>>() {
            @Override
            public int compare(Map<String, Object> o1, Map<String, Object> o2) {
                Integer small = (Integer)o1.get(sortField);
                Integer big = (Integer)o2.get(sortField);
                return big.compareTo(small);
            }
        });
    }

    /**
     * 开机情况
     */
    @ResponseBody
    @RequestMapping("/computer")
    public void computer() {
        List<Map<String,String>> objects = new ArrayList<>();
        Map<String,String> dataMap = new HashMap<>();
        dataMap.put("deptName","办公厅");//单位名称
        dataMap.put("count","234356");//未开机用户总数
        objects.add(dataMap);
        Response.json(new ResponseValueUtils().success(objects));
    }

}
