package com.css.app.fyp.routine.service.impl;

import com.alibaba.fastjson.JSONArray;
import com.alibaba.fastjson.JSONObject;
import com.css.addbase.apporgan.entity.BaseAppOrgan;
import com.css.addbase.apporgan.entity.BaseAppUser;
import com.css.addbase.apporgan.service.BaseAppOrganService;
import com.css.addbase.apporgan.service.BaseAppUserService;
import com.css.addbase.apporgmapped.entity.BaseAppOrgMapped;
import com.css.addbase.apporgmapped.service.BaseAppOrgMappedService;
import com.css.addbase.constant.AppConstant;
import com.css.addbase.constant.AppInterfaceConstant;
import com.css.app.fyp.routine.entity.UserLeaderAccessState;
import com.css.app.fyp.routine.entity.UserLeaveSetting;
import com.css.app.fyp.routine.service.*;
import com.css.app.fyp.routine.vo.ReignCaseVo;
import com.css.base.utils.CrossDomainUtil;
import com.css.base.utils.CurrentUser;
import com.css.base.utils.RestTemplateUtil;
import org.apache.commons.httpclient.HttpClient;
import org.apache.commons.httpclient.NameValuePair;
import org.apache.commons.httpclient.methods.PostMethod;
import org.apache.commons.lang.StringUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.util.LinkedMultiValueMap;

import java.io.IOException;
import java.text.DecimalFormat;
import java.text.SimpleDateFormat;
import java.util.*;
import java.util.stream.Collectors;

/**
 * @ClassName 在位情况
 * @Author gongan
 * @Date 2020/8/14
 */
@Service("reignCaseServiceImpl")
public class ReignCaseServiceImpl implements ReignCaseService {
    private final Logger logger = LoggerFactory.getLogger(ReignCaseServiceImpl.class);
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

    @Value("${qxj.fz}")
    private String qxjfzUrl;
    @Value("${csse.mircoservice.zaiwei}")
    private String urls;

    /**
     * 在线人
     */
    private static List<String> userIdList = null;

    /**
     * 请假人
     */
    private static List<String> leaveUserIdList = null;

    /**
     * 本日峰值
     */
    private static Integer toDayCount = 0;

    private static long executeTime = 0L;

    public void analyseData(String userId, String type, long wantExecuteTime) {
        if(executeTime != 0L && wantExecuteTime - executeTime <= 60000 * 5L) {
            return;
        }
        String url = AppInterfaceConstant.WEB_INTERFACE_GWCL_ONLINE_SPGW;
        String mapperUrl = baseAppOrgMappedService.getUrlByType(userId, type);
        String sendUrl = mapperUrl + url;
        String leaveHref = qxjfzUrl;
        this.userIdList = this.getOnlineSituationApi(sendUrl);
        this.leaveUserIdList = this.getOnlineSituationApi(leaveHref);
        this.executeTime = System.currentTimeMillis();
    }

    /**
     * 获取在线或请假人员ID-LIST
     * @return 返回人员ID
     * @author 龚安
     * @date 2020-08-14
     */
    private List<String> getOnlineSituationApi(String href) {
        List<String> accountList = new ArrayList<String>();
        LinkedMultiValueMap<String, Object> map = new LinkedMultiValueMap<String, Object>();
        try {
            //请假人数远程服务地址(获取在线人数)
            String reJson = CrossDomainUtil.postJSONString(href, map);
            if (StringUtils.isNotEmpty(reJson)) {
                String accounts = reJson.substring(1,reJson.length()-1).replace("\"", "");
                String [] accountArray = accounts.split("\\s*,\\s*");
                accountList = new ArrayList<String>(Arrays.asList(accountArray));
            }
        } catch (Exception e) {
            logger.info("PersonManagementController在线人员ID-LIST");
            e.printStackTrace();
        }
        return accountList;
    }

    @Override
    public ReignCaseVo reignCaseList(String afficheType) {
        String userId = CurrentUser.getUserId();
        this.analyseData(userId, "desktop_online_api", System.currentTimeMillis());
        BaseAppUser baseAppUser = baseAppUserService.queryObject(userId);
        String organid = baseAppUserService.getBareauByUserId(CurrentUser.getUserId());
        //String organid = baseAppUser.getOrganid();
        Map<String,Object> userFilter = new HashMap<>();
        userFilter.put("organid", organid);
        List<BaseAppUser> baseAppUserList = baseAppUserService.queryList(userFilter);
        List<String> userCollect = baseAppUserList.stream().map(BaseAppUser::getAccount).collect(Collectors.toList());
        ReignCaseVo reignCaseVo = new ReignCaseVo();
        //this.analyseData(System.currentTimeMillis());
        try {
            //在编人数
            Map<String,Object> filter = new HashMap<>();
            filter.put("departmentId", organid);
            int userCount = baseAppUserService.queryTotal(filter);
            reignCaseVo.setUserCount(userCount);
            //在线人数
            //List<String> collect = userIdList.stream().filter(item -> userCollect.contains(item)).collect(Collectors.toList());
            List<String> collect = userIdList;
            Integer peopleOnlineCount =  collect.size();
            reignCaseVo.setPeopleOnlineCount(peopleOnlineCount);
            //在线率
            String onlineRate = "";
            if(userCount > 0){
                onlineRate = this.txfloat(peopleOnlineCount,userCount);
            }else {
                onlineRate = "0";
            }
            reignCaseVo.setOnlineRate(onlineRate);
            //本日峰值
            if (peopleOnlineCount > toDayCount) {
                toDayCount = peopleOnlineCount;
            }
            reignCaseVo.setToDayCount(toDayCount);
        } catch (Exception e) {
            e.printStackTrace();
        }
        return reignCaseVo;
    }

    public static String txfloat(int a, Integer b) {
        DecimalFormat df = new DecimalFormat("0.00");
        return df.format((float) a/b);
    }

    private JSONArray getJsonArrayData (String mapperUrl, String page, String pagesize, String applyType, String listType, Date applyDate, String userId, String type, String url) {
        JSONArray jsonData =new JSONArray();
        LinkedMultiValueMap<String,Object> infoMap = new LinkedMultiValueMap<String,Object>();
        infoMap.add("userId", userId);
        if (StringUtils.isNotEmpty(applyType)) {
            infoMap.add("type", applyType);
        }
        if (StringUtils.isNotEmpty(listType)) {
            infoMap.add("documentTopStatus", listType);
        }
        if (applyDate != null) {
            infoMap.add("applyDate", applyDate);
        }
        if (StringUtils.isNotEmpty(page)) {
            infoMap.add("page", page);
        }
        if (StringUtils.isNotEmpty(pagesize)) {
            infoMap.add("pagesize", pagesize);
        }
        if (StringUtils.isNotEmpty(mapperUrl)) {
            String sendUrl = mapperUrl + url;
            jsonData = CrossDomainUtil.getJsonArrayData(sendUrl, infoMap);
        } else {
            logger.info("orgId为{}的局的电子保密室的配置数据错误");
            return null;
        }
        return jsonData;
    }

    @Override
    public void reignCaseSave(String trendType) {

    }

    /**该接口没调用
     * 获取人员在位状态数据
     * 加载人员树
     * @return
     */
    public JSONObject getUserTree() {
        JSONObject jsonData = new JSONObject();
        JSONObject jsonObj = new JSONObject();
        String userId = CurrentUser.getUserId();
        String bareauByUserId = baseAppOrgMappedService.getBareauByUserId(userId);
        BaseAppOrgan baseAppOrgan = baseAppOrgMappedService.getbyId(bareauByUserId);
        String name = baseAppOrgan.getName();
        //当前用户是否为部首长
        if (StringUtils.equals("部首长",name)) {
            //部首长
            jsonData = this.getDataUserTree("","","", "", userId, AppConstant.APP_SZBG, AppInterfaceConstant.WEB_WORK_GET_USER_TREE_FYP);
        } else {
            //局用户
            jsonData = this.getDataUserTree("","","", "", userId, AppConstant.APP_GWCL, AppInterfaceConstant.WEB_WORK_GET_USER_TREE_FYP);
        }
        return jsonData;
    }

    private JSONObject getDataUserTree (String page, String pagesize, String applyType, String listType, String userId, String type, String url) {
        JSONObject jsonData =new JSONObject();
        LinkedMultiValueMap<String,Object> infoMap = new LinkedMultiValueMap<String,Object>();
        infoMap.add("userId", userId);
        if (StringUtils.isNotEmpty(applyType)) {
            infoMap.add("type", applyType);
        }
        if (StringUtils.isNotEmpty(listType)) {
            infoMap.add("documentTopStatus", listType);
        }
        if (StringUtils.isNotEmpty(page)) {
            infoMap.add("page", page);
        }
        if (StringUtils.isNotEmpty(pagesize)) {
            infoMap.add("pagesize", pagesize);
        }
        //String mapperUrl = baseAppOrgMappedService.getUrlByType(userId, type);
        String mapperUrl = "http://172.16.1.19:64004";
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
     * 获取人员在位状态数据
     * 加载人员树
     * @return
     */
    public JSONObject reignCaseJsonObject() {
        userStateMapList = getUserStateMapList();
        //获取在线人对象集合
        long time1 =System.currentTimeMillis();
        logger.info("============time1:"+time1);
        onlineUsers = getOnlineUsers();
        long time2 =System.currentTimeMillis();
        logger.info("============time2:"+time2);
        logger.info("============time2-time1:"+(time2-time1)+"ms");
        String orgid = baseAppOrgMappedService.getBareauByUserId(CurrentUser.getUserId());
        if (com.css.base.utils.StringUtils.isNotEmpty(orgid)) {
            JSONObject list=  getUserTreeFyp(orgid);
            return list;
        } else {
            JSONObject list=  getUserTreeFyp("root");
            System.out.println(list);
            return list;
        }
    }

    /**
     * 获取在线人对象集合
     * @return
     */
    private List<BaseAppUser> getOnlineUsers() {
        List<BaseAppUser> userList =new ArrayList<BaseAppUser>();
        String orgId = CurrentUser.getDepartmentId();
        String type = "desktop_online_api";
        Object obj = baseAppOrgMappedService.orgMappedByOrgId("", "", type);
        BaseAppOrgMapped mapper=null;
        if(obj!=null && obj instanceof BaseAppOrgMapped) {
            mapper =(BaseAppOrgMapped)obj;
        }
        if(mapper==null) {
            System.err.println("desktop_online_api映射关系  配置错误...检查配置");
            throw new RuntimeException("desktop_online_api映射关系  配置错误...检查配置");
        }
        String url = mapper.getUrl();
//		if(!url.endsWith("/")) {
//			url+="/";
//		}
        url+=mapper.getWebUri();
        final HttpClient client = new HttpClient();
        final PostMethod post = new PostMethod(url);       //arch=arm64
        post.setRequestBody(new NameValuePair[] { new NameValuePair("arch", "arm64") });
        try {
            client.executeMethod(post);
            int statusCode = post.getStatusCode();
            System.out.println("post.getStatusCode()======="+post.getStatusCode());
            if(statusCode!=200) {
                System.err.println("URL:"+url+"请求返回错误，错误代码statusCode:"+statusCode);
                throw new RuntimeException("URL:"+url+"请求返回错误，错误代码statusCode:"+statusCode);
            }
            String response = post.getResponseBodyAsString();
            //response="[\"chims\",\"jiangcm\"]";
            if(com.css.base.utils.StringUtils.isNotBlank(response) && response.length()>2) {
                String accounts = response.substring(1,response.length()-1).replace("\"", "");
                String []accountArray = accounts.split("\\s*,\\s*");
                List<BaseAppUser> tempUserList = baseAppUserService.queryObjectByAccounts(accountArray);
                List<String> fileterIds =getFilterIds();

                for (BaseAppUser o : tempUserList) {
                    if(!fileterIds.contains(o.getUserId())) {
                        userList.add(o);
                    }
                }
            }
        }
        catch (final IOException e) {
            System.err.println(e.getMessage());
        }finally {
            post.releaseConnection();
        }
        return userList;
    }

//    JSONObject jsonObj = null;

    private JSONObject getUserTreeFyp(String id){
        String userId=CurrentUser.getUserId();
//		long time1 =System.currentTimeMillis();
//		logger.info("============time1:"+time1);
//		//获取在线人对象集合
//		List<BaseAppUser> onlineUsers = getOnlineUsers();
//
//		long time2 =System.currentTimeMillis();
//		logger.info("============time2:"+time2);
//		logger.info("============time2-time1:"+(time2-time1)+"ms");
//		List<BaseAppUser> onlineUsers = new ArrayList<>();
        //在线人员Id 集合
        List<String> onlineUserIds=getOnlineUserIds(onlineUsers);

//        if(jsonObj==null){
        JSONObject jsonObj =  userLeaveSettingService.getQxjJson();
//        }
//        JSONObject jsonObj =  userLeaveSettingService.getQxjJson();
        JSONArray ja1=new JSONArray();
        JSONArray ja2=new JSONArray();
        if(jsonObj!=null) {
            ja1 =jsonObj.getJSONArray("jsons");
            ja2 =jsonObj.getJSONArray("detps");
        }

        String userIds =getQxjUserIds(ja1);
        List<String> qjIdList =new ArrayList<String>();
        if(com.css.base.utils.StringUtils.isNotBlank(userIds)) {
            qjIdList=Arrays.asList(userIds.split(","));
        }
        JSONObject result = new JSONObject();
        JSONArray jsons = new JSONArray();
        BaseAppOrgan dept = baseAppOrganService.queryObject(id);
        result.put("id", id);
        result.put("text", dept.getName());
        result.put("flag", "1");

        //查询总数
        //int sumCount = baseAppUserService.getUserCountByOrgId(id);
        int sumCount = baseAppUserService.getUserCountByOrgIdExclude(id,userId);
        //查询机构ID 下的总人数
        result.put("number", sumCount);

        //在线机构ID 对应的在线人总数
        //Map<String,Object> dataMap =getOrgOnlineUserCount(onlineUsers);
        Map<String,Object> dataMap =getOrgCountMap(onlineUsers);

        Integer zxCount = 0;
        if(!dataMap.isEmpty()) {
            Object value = dataMap.get(id);
            if(value!=null) {
                zxCount= Integer.parseInt(value.toString());
            }
        }
        //离线人数  总人数 - 在线人数
        int lxCount = sumCount-zxCount;
        if(lxCount<0) {lxCount=0;}
        //请假人数	普通人请假
        String qjCount = getOrgQxjCount(ja2, dept.getId());
        //局长请假统计数 2018年10月10日16:23:35
        String jzqjCount=getJzQxjCount(dept.getId(), userId);

        result.put("zx", zxCount);
        result.put("lx", lxCount);
        //result.put("qj", qjCount);
        int qjSum = Integer.parseInt(qjCount)+Integer.parseInt(jzqjCount);

        result.put("qj", qjSum);

        //办公数量   总数-请假的数 =办公的数
        //（目前和 暂时和在线离线 一样，  当前无出差APP 统计的情况 ）
        //2019年1月22日11:02:04
        //int bgSum=sumCount-qjSum;
        int bgSum=zxCount-qjSum;
        if(bgSum<0) {bgSum=0;}
        result.put("bg", bgSum);


//		List<BaseAppUser> sysUsers = baseAppUserService.findByOrganid(id);
        List<BaseAppUser> sysUsers = baseAppUserService.findByOrganidExclude(id,userId);

        //局长请假id集合 2018年10月10日19:37:36
        List<String> jzqxjUserIds=getJzQxjUserIds(dept.getId(), userId);
        //添加请销假 集合中区
        //qjIdList.addAll(jzqxjUserIds);
        //
        //List<Map<String,Object>> userStateMapList = getUserStateMapList();
        for (BaseAppUser sysUser:sysUsers) {
            //if (!StringUtils.contains("admin,sysadmin,secadmin,audadmin", sysUser.getAccount())) {
            JSONObject jsonUser = new JSONObject();
            jsonUser.put("id", sysUser.getUserId());
            jsonUser.put("text", sysUser.getTruename());
            jsonUser.put("flag", "0");
            jsonUser.put("deptid", sysUser.getOrganid());
            jsonUser.put("tel", sysUser.getMobile());
            jsonUser.put("usertype", userManagerSettingService.getUserType(sysUser.getUserId()));
            //代表人0离线、1在线、2请假
            String zwzt = "0";
            //是否请假 0未请假  1 请假
            String ifqj="0";
            //List<String> filterIdList = getFileterIds();

            //请假IdList 普通人
            //添加局长请假人
            if(qjIdList.contains(sysUser.getUserId()) || jzqxjUserIds.contains(sysUser.getUserId())) {
                ifqj="1";
            }
            if(onlineUserIds.contains(sysUser.getUserId())) {
                zwzt="1";
            }

            jsonUser.put("status", zwzt);
            jsonUser.put("ifqj", ifqj);

            //查询其他状态  自定的状态  2019年1月22日11:26:31
            Map<String,Object> stateMap = getUserStateMap(userStateMapList,sysUser.getUserId());
            jsonUser.put("statename", stateMap.get("state"));
            jsonUser.put("begintime", stateMap.get("begintime"));
            jsonUser.put("endtime", stateMap.get("endtime"));
            //添加额外的状态

            jsons.add(jsonUser);
            //}
        }

        List<BaseAppOrgan> organs = baseAppOrganService.findByParentId(id);
        for (BaseAppOrgan organ:organs) {
            jsons.add(getUserTreeFyp(organ.getId()));
        }

        if (jsons.size()>0) {
            result.put("child", jsons);
        }
        return result;
    }

    /**
     * 获取在线的人员id集合
     * @param userList
     * @return
     */
    private List<String> getOnlineUserIds(List<BaseAppUser> userList){
        List<String> idList =new ArrayList<String>();
        for (BaseAppUser baseAppUser : userList) {
            idList.add(baseAppUser.getId());
        }
        return idList;
    }

    /**
     * 获取请销假 人员ids
     * @param jsons
     * @return
     */
    private String getQxjUserIds(JSONArray jsons) {
        List<String> list= new ArrayList<String>();
        if(jsons!=null) {
            for (Object object : jsons) {
                JSONObject jo = (JSONObject)object;
                list.add(jo.getString("userId"));
            }
        }
        return com.css.base.utils.StringUtils.join(list,",");
    }

    /**
     * 统计单位ID下 在线的人总数
     * @param userList
     * @return
     */
    private Map<String,Object> getOrgCountMap(List<BaseAppUser> userList) {
        Map<String,Object> map =new HashMap<String,Object>();
        for (BaseAppUser user : userList) {
            String organId = user.getOrganid();
            BaseAppOrgan org= baseAppOrganService.queryObject(organId);
            String treepath =org.getTreePath();
            //取出 root 后面orgId
            String []orgIds = treepath.split(",");
            for(int i=1;i<orgIds.length;i++) {
                String key = orgIds[i];
                Object countObj = map.get(key);
                Integer count =0;
                if(countObj!=null) {
                    count=Integer.parseInt(countObj.toString());
                }
                map.put(orgIds[i],(count+1));
            }
        }
        return map;
    }

    /**
     * 统计单位请假人数
     * @param jsons
     * @param orgId
     * @return
     */
    private String getOrgQxjCount(JSONArray jsons,String orgId) {
        String count = "0";
        if(jsons!=null) {
            for (Object object : jsons) {
                JSONObject jo = (JSONObject)object;
                if(orgId.equals(jo.getString("orgId"))) {
                    count=jo.getInteger("count")+"";
                    break;
                }
            }
        }
        return count;
    }

    /**
     * 统计 局长请销假 数量
     * @param orgId
     * @return
     */
    private String getJzQxjCount(String orgId,String userId) {
        Map<String, Object> map = new HashMap<String, Object>();
        map.put("userId", userId);
        map.put("orgId", orgId);
        int count = userLeaveSettingService.queryLeaveListCount(map);
        return count+"";
    }

    /**
     * 统计 局长请销假 数量
     * @param orgId
     * @return
     */
    private List<String> getJzQxjUserIds(String orgId,String userId) {
        Map<String, Object> map = new HashMap<String, Object>();
        map.put("userId", userId);
        map.put("orgId", orgId);
        List<UserLeaveSetting> userList = userLeaveSettingService.queryLeaveList(map);
        List<String> userIds = new ArrayList<String>();
        for (UserLeaveSetting o : userList) {
            userIds.add(o.getUserId());
        }
        return userIds;
    }

    /**
     * *status  --只有人有，代表人0离线、1在线、2请假
     * ifqj 0未请假  1请假
     * @param id
     * @return
     */
    private JSONObject getUserTree(String id){
        String userId=CurrentUser.getUserId();
        //在线人员Id 集合
        List<String> onlineUserIds = new ArrayList<>();
        if (null != onlineUsers && onlineUsers.size() > 0) {
            onlineUserIds=getOnlineUserIds(onlineUsers);
        }

        JSONObject jsonObj =  userLeaveSettingService.getQxjJson();
        JSONArray ja1=new JSONArray();
        JSONArray ja2=new JSONArray();
        if(jsonObj!=null) {
            ja1 =jsonObj.getJSONArray("jsons");
            ja2 =jsonObj.getJSONArray("detps");
        }

        String userIds =getQxjUserIds(ja1);
        List<String> qjIdList =new ArrayList<String>();
        if(com.css.base.utils.StringUtils.isNotBlank(userIds)) {
            qjIdList=Arrays.asList(userIds.split(","));
        }
        JSONObject result = new JSONObject();
        JSONArray jsons = new JSONArray();
        BaseAppOrgan dept = baseAppOrganService.queryObject(id);
        result.put("id", id);
        result.put("text", dept.getName());
        result.put("flag", "1");
        //查询总数
        int sumCount = baseAppUserService.getUserCountByOrgIdExclude(id,userId);
        //查询机构ID 下的总人数
        result.put("number", sumCount);
        //在线机构ID 对应的在线人总数
        Map<String,Object> dataMap = new HashMap<>();
        if (null != onlineUsers && onlineUsers.size() > 0) {
            dataMap =getOrgCountMap(onlineUsers);
        }
        Integer zxCount = 0;
//        if(!dataMap.isEmpty()) {
//            Object value = dataMap.get(id);
//            if(value!=null) {
//                zxCount= Integer.parseInt(value.toString());
//            }
//        }
        List<String> listZxCout = getZxUser();
        if(listZxCout != null && listZxCout.size() > 0){
            zxCount = listZxCout.size();
        }
        //离线人数  总人数 - 在线人数
        int lxCount = sumCount-zxCount;
        if(lxCount<0) {lxCount=0;}
        //请假人数	普通人请假
        String qjCount = getOrgQxjCount(ja2, dept.getId());
        //局长请假统计数 2018年10月10日16:23:35
        String jzqjCount=getJzQxjCount(dept.getId(), userId);
        result.put("zx", zxCount);
        result.put("lx", lxCount);
        int qjSum = Integer.parseInt(qjCount)+Integer.parseInt(jzqjCount);
        int qj = (Integer) jsonObj.get("num");
        result.put("qj", qj);
        //办公数量   总数-请假的数 =办公的数
        //（目前和 暂时和在线离线 一样，  当前无出差APP 统计的情况 ）
        int bgSum=zxCount-qjSum;
        if(bgSum<0) {bgSum=0;}
        result.put("bg", bgSum);
        List<BaseAppUser> sysUsers = baseAppUserService.findByOrganidExclude(id,userId);
        //局长请假id集合 2018年10月10日19:37:36
        List<String> jzqxjUserIds=getJzQxjUserIds(dept.getId(), userId);
        //添加请销假 集合中区
        for (BaseAppUser sysUser:sysUsers) {
            JSONObject jsonUser = new JSONObject();
            jsonUser.put("id", sysUser.getUserId());
            jsonUser.put("text", sysUser.getTruename());
            jsonUser.put("flag", "0");
            jsonUser.put("deptid", sysUser.getOrganid());
            jsonUser.put("tel", sysUser.getMobile());
            jsonUser.put("usertype", userManagerSettingService.getUserType(sysUser.getUserId()));
            //代表人0离线、1在线、2请假
            String zwzt = "0";
            //是否请假 0未请假  1 请假
            String ifqj="0";
            //请假IdList 普通人
            //添加局长请假人
            if(qjIdList.contains(sysUser.getUserId()) || jzqxjUserIds.contains(sysUser.getUserId())) {
                ifqj="1";
            }
            if(onlineUserIds.contains(sysUser.getUserId())) {
                zwzt="1";
            }
            jsonUser.put("status", zwzt);
            jsonUser.put("ifqj", ifqj);
            //查询其他状态  自定的状态  2019年1月22日11:26:31
            Map<String,Object> stateMap = getUserStateMap(userStateMapList,sysUser.getUserId());
            jsonUser.put("statename", stateMap.get("state"));
            jsonUser.put("begintime", stateMap.get("begintime"));
            jsonUser.put("endtime", stateMap.get("endtime"));
            //添加额外的状态
            jsons.add(jsonUser);
        }
        List<BaseAppOrgan> organs = baseAppOrganService.findByParentId(id);
//        for (BaseAppOrgan organ:organs) {
//            jsons.add(getUserTree(organ.getId()));
//        }
        if (jsons.size()>0) {
            result.put("child", jsons);
        }
        return result;
    }

    private List<String> getUserArray() {
        List<String> accountList = new ArrayList<String>();
        LinkedMultiValueMap<String, Object> infoMap = new LinkedMultiValueMap<String, Object>();
        infoMap.add("_content_type", "application/x-www-form-urlencoded");
        String url = urls + AppInterfaceConstant.WEB_INTERFACE_XLGLZXR;
        try {
            // 请假人数远程服务地址(获取在线人数)
            String reJson = RestTemplateUtil.postJSONString(url, infoMap);
            String accounts = reJson.substring(1, reJson.length() - 1).replace("\"", "");
            String[] accountArray = accounts.split("\\s*,\\s*");
            accountList = new ArrayList<String>(Arrays.asList(accountArray));
        } catch (Exception e) {
            // logger.info("PersonManagementController在线人员ID-LIST");
            e.printStackTrace();
        }
        return accountList;

    }

    private JSONObject statistics(){
        LinkedMultiValueMap<String, Object> map = new LinkedMultiValueMap<String, Object>();

        List<String> list = getUserArray();
        JSONObject jsonData = this.getNumber(map);
        int userIdList = 0;
        userIdList=this.userIdNumber(null, list);// 实际在位人数
        Integer object = 0;
        Integer num = 0;
        if (jsonData != null) {
            Object object2 = jsonData.get("yzwrs");
            object = (Integer) object2;// 应在位人数
            Object object3 = jsonData.get("qjrs");
            num = (Integer) object3;
        }
        jsonData.put("sjzwrs", userIdList);
        Integer sum = object - num;
        if (userIdList == 0 && object == 0 && object != null) {
            jsonData.put("zwlv", "0");
        } else {
            DecimalFormat decimalFormat = new DecimalFormat("0.00");
            if (userIdList > 0) {
                if (sum > 0) {
                    // float zwRate = (float) ((new BigDecimal((float) object /
                    // userIdList).setScale(2, BigDecimal.ROUND_HALF_UP).doubleValue()) * 100);
                    float zwRate = ((float) userIdList / (float) sum) * 100;
                    String format = decimalFormat.format(zwRate);
                    if (zwRate > 0) {
                        jsonData.put("zwlv", format);
                    } else {
                        jsonData.put("zwlv", "0");
                    }
                }else {
                    jsonData.put("zwlv", "0");
                }
                // long zwr =((long)userIdList /(long)yzwrs);
                // float zwRate = zwr*100; //人员在位率

            } else {
                jsonData.put("zwlv", "0");
            }
        }
        return jsonData;
    }

    private int userIdNumber(String organId, List<String> list) {
        int i = 0;
        if (com.css.base.utils.StringUtils.isNotBlank(organId)) {
            Map<String, Object> map = new HashMap<String, Object>();
            map.put("orgId", organId);
            map.put("departmentId", organId);
            List<BaseAppUser> queryListByOrganid = baseAppUserService.queryByOrganidTREEPATH(map);
            for (int j = 0; j < list.size(); j++) {
                for (BaseAppUser baseAppUser : queryListByOrganid) {
                    if(baseAppUser.getAccount().equals(list.get(j))) {
                        i++;
                    }
                }
            }
        } else {
            if (list.size() > 0) {
                i = list.size();
            }
        }

        return i;
    }

    private JSONObject getNumber(LinkedMultiValueMap<String, Object> map) {
        // 获取清销假app的接口
        String elecPath = baseAppOrgMappedService.getWebUrl(AppConstant.APP_QXJGL,
                AppInterfaceConstant.WEB_INTERFACE_QXJ_statistics);
        JSONObject jsonData = CrossDomainUtil.getJsonData(elecPath, map);
        return jsonData;
    }

    private List<String> getZxUser() {
        List<String> accountList = new ArrayList<String>();
        LinkedMultiValueMap<String, Object> infoMap = new LinkedMultiValueMap<String, Object>();
        infoMap.add("_content_type", "application/x-www-form-urlencoded");
        String url = urls + AppInterfaceConstant.WEB_INTERFACE_XLGLZXR;
        try {
            // 请假人数远程服务地址(获取在线人数)
            String reJson = RestTemplateUtil.postJSONString(url, infoMap);
            String accounts = reJson.substring(1, reJson.length() - 1).replace("\"", "");
            String[] accountArray = accounts.split("\\s*,\\s*");
            accountList = new ArrayList<String>(Arrays.asList(accountArray));
        } catch (Exception e) {
            // logger.info("PersonManagementController在线人员ID-LIST");
            e.printStackTrace();
        }
        return accountList;

    }

    private List<Map<String,Object>> getUserStateMapList() {
        Map<String,Object> paramMap = new HashMap<String,Object>();
        String time = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss").format(new Date());
        paramMap.put("time", time);
        List<Map<String, Object>> mapList = userStateSettingService.getUserStateDataMap(paramMap);
        System.out.println("###########################################################");
        return mapList;
    }

    private Map<String,Object> getUserStateMap(List<Map<String,Object>> mapList,String userId) {
        Map<String,Object> ret = new HashMap<String,Object>();
        for (Map<String, Object> map : mapList) {
            if(userId.equals(map.get("userId"))) {
                ret = map;
                break;
            }
        }
        return ret;
    }

    /**
     * 获取在线人对象集合
     * @return
     */
    /*private List<BaseAppUser> getOnlineUsers() {
        List<BaseAppUser> userList =new ArrayList<BaseAppUser>();
        String type = "desktop_online_api";
        Object obj = baseAppOrgMappedService.orgMappedByOrgId("", "", type);
        BaseAppOrgMapped mapper=null;
        if(obj!=null && obj instanceof BaseAppOrgMapped) {
            mapper =(BaseAppOrgMapped)obj;
        }
        if(mapper==null) {
            System.err.println("desktop_online_api映射关系  配置错误...检查配置");
            throw new RuntimeException("desktop_online_api映射关系  配置错误...检查配置");
        }
        String url = mapper.getUrl();
        url+=mapper.getWebUri();
        final HttpClient client = new HttpClient();
        final PostMethod post = new PostMethod(url);
        post.setRequestBody(new NameValuePair[] { new NameValuePair("arch", "arm64") });
        try {
            client.executeMethod(post);
            int statusCode = post.getStatusCode();
            System.out.println("post.getStatusCode()======="+post.getStatusCode());
            if(statusCode!=200) {
                System.err.println("URL:"+url+"请求返回错误，错误代码statusCode:"+statusCode);
                throw new RuntimeException("URL:"+url+"请求返回错误，错误代码statusCode:"+statusCode);
            }
            String response = post.getResponseBodyAsString();
            if(com.css.base.utils.StringUtils.isNotBlank(response) && response.length()>2) {
                String accounts = response.substring(1,response.length()-1).replace("\"", "");
                String []accountArray = accounts.split("\\s*,\\s*");
                List<BaseAppUser> tempUserList = baseAppUserService.queryObjectByAccounts(accountArray);
                List<String> fileterIds =getFilterIds();
                for (BaseAppUser o : tempUserList) {
                    if(!fileterIds.contains(o.getUserId())) {
                        userList.add(o);
                    }
                }
            }
        }
        catch (final IOException e) {
            System.err.println(e.getMessage());
        }finally {
            post.releaseConnection();
        }
        return userList;
    }*/

    private JSONArray getOnlineUsersObject (String url) {
        JSONArray jsonData =new JSONArray();
        LinkedMultiValueMap<Object, Object> infoMap = new LinkedMultiValueMap<Object,Object>();
        String mapperUrl = "http://172.16.1.19:64004";
        if (StringUtils.isNotEmpty(mapperUrl)) {
            String sendUrl = mapperUrl + url;
            jsonData = CrossDomainUtil.getNewJsonArrayData(url, infoMap);
        } else {
            logger.info("orgId为{}的局的电子保密室的配置数据错误");
            return null;
        }
        return jsonData;
    }

    /**
     * 当前人可用查看的领导ID
     * @return
     */
    private List<String> getFilterIds(){
        List<String> idList =new ArrayList<>();
        Map<String,Object> map = new HashMap<String,Object>();
        map.put("userid", CurrentUser.getUserId());
        List<UserLeaderAccessState> list = userLeaderAccessStateService.queryNotlOOKList(map);
        for (UserLeaderAccessState o : list) {
            idList.add(o.getLeaderId());
        }
        return idList;
    }

}
