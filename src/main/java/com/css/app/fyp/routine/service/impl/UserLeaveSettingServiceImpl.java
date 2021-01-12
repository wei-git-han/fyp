package com.css.app.fyp.routine.service.impl;

import com.alibaba.fastjson.JSONArray;
import com.alibaba.fastjson.JSONObject;
import com.css.addbase.appconfig.entity.BaseAppConfig;
import com.css.addbase.appconfig.service.BaseAppConfigService;
import com.css.addbase.apporgmapped.entity.BaseAppOrgMapped;
import com.css.addbase.apporgmapped.service.BaseAppOrgMappedService;
import com.css.addbase.constant.AppConstant;
import com.css.addbase.constant.AppInterfaceConstant;
import com.css.app.fyp.routine.dao.UserLeaveSettingDao;
import com.css.app.fyp.routine.entity.UserLeaderAccessState;
import com.css.app.fyp.routine.entity.UserLeaveSetting;
import com.css.app.fyp.routine.service.UserLeaderAccessStateService;
import com.css.app.fyp.routine.service.UserLeaveSettingService;
import com.css.base.utils.CrossDomainUtil;
import com.css.base.utils.CurrentUser;
import com.css.base.utils.StringUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.stereotype.Service;
import org.springframework.util.LinkedMultiValueMap;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;


@Service("userLeaveSettingService")
public class UserLeaveSettingServiceImpl implements UserLeaveSettingService {
	Logger logger = LoggerFactory.getLogger(getClass());
	@Autowired
	private UserLeaveSettingDao userLeaveSettingDao;
	@Autowired
	private UserLeaderAccessStateService userLeaderAccessStateService;
	@Autowired
	private BaseAppOrgMappedService baseAppOrgMappedService;
	@Autowired
	private BaseAppConfigService baseAppConfigService;
	@Autowired
	private RedisTemplate<String, String> redisTemplate;
	
	@Override
	public UserLeaveSetting queryObject(String id){
		return userLeaveSettingDao.queryObject(id);
	}
	
	@Override
	public List<UserLeaveSetting> queryList(Map<String, Object> map){
		return userLeaveSettingDao.queryList(map);
	}
	
	@Override
	public void save(UserLeaveSetting userLeaveSetting){
		userLeaveSettingDao.save(userLeaveSetting);
	}
	
	@Override
	public void update(UserLeaveSetting userLeaveSetting){
		userLeaveSettingDao.update(userLeaveSetting);
	}
	
	@Override
	public void delete(String id){
		userLeaveSettingDao.delete(id);
	}
	
	@Override
	public void deleteBatch(String[] ids){
		userLeaveSettingDao.deleteBatch(ids);
	}

	@Override
	public List<UserLeaveSetting> queryLeaveList(Map<String, Object> map) {
		return userLeaveSettingDao.queryLeaveList(map);
	}

	@Override
	public int queryLeaveListCount(Map<String, Object> map) {
		// TODO Auto-generated method stub
		return userLeaveSettingDao.queryLeaveListCount(map);
	}
	
	/**
	 * 普通人员 获取请销假 数据
	 * 获取清销假的用户ID
	 * 
	 * 
	 * {"jsons":[{"userId":"a1","userName":"张三丰"},{"userId":"a2","userName":"张三丰2"}],
		  "detps":[{orgId:'d1',orgName:"单位1",count:10},{orgId:'d2',orgName:"单位2",count:10}]	
		}
	 * @return
	 */
	public JSONObject getQxjJson() {
		String userId = CurrentUser.getUserId();
		LinkedMultiValueMap<String, Object> map = new LinkedMultiValueMap<String, Object>();
		map.add("userId", userId);
		//TODO 待修改为实际的地址
		//String url = baseAppOrgMappedService.getWebUrlByType(AppConstant.APP_QXJ,AppInterfaceConstant.WEB_INTERFACE_QXJ_TO_FYP);
//		String url = baseAppOrgMappedService.getUrlByType(userId, AppConstant.APP_QXJ);
		BaseAppOrgMapped bm = (BaseAppOrgMapped) baseAppOrgMappedService.orgMappedByOrgId("", "root", AppConstant.APP_QXJ);
		String url = "";
		if( bm != null) {
			url = bm.getUrl();
			url+= AppInterfaceConstant.WEB_INTERFACE_QXJ_TO_FYP;
		}
		//排除的人ID
		List<String> idList = getFilterIds();
		map.add("leaveIds", StringUtils.join(idList,","));
		
		JSONObject obj = CrossDomainUtil.getJsonData(url, map);
		return obj;
	}
	
	/**
	 * 普通人员 获取请销假 数据
	 * 获取清销假的用户ID
	 * 
	 * 
	 * {"jsons":[{"userId":"a1","userName":"张三丰"},{"userId":"a2","userName":"张三丰2"}],
		  "detps":[{orgId:'d1',orgName:"单位1",count:10},{orgId:'d2',orgName:"单位2",count:10}]	
		}
	 * @return
	 */
	public JSONObject getQxjJson_new() {
		List<String> orgIdArray= getAppOrgIdData();
		if(orgIdArray==null || orgIdArray.isEmpty()) {
			logger.error("在表BASE_APP_CONFIG，没有配置key【APP_ORG_DATA】，remark【[{orgId:key,orgName:vlaue}]】数据，安装app的单位ID");
			return null;
		}
		JSONObject obj = new JSONObject();
		JSONArray usersJa = new JSONArray();
		JSONArray deptsJa = new JSONArray();
		for (String orgId : orgIdArray) {
			String key = orgId+"_QXJ_JSON_DATA";
			String value = redisTemplate.opsForValue().get(key);
			if(StringUtils.isNotEmpty(value)) {
				JSONObject valueJo = JSONObject.parseObject(value);
				usersJa.addAll(valueJo.getJSONArray("jsons"));
				deptsJa.addAll(valueJo.getJSONArray("detps"));
			}
		}
		obj.put("jsons", usersJa);
		obj.put("detps", deptsJa);
		return obj;
	}
	private List<String> getAppOrgIdData(){
		List<String> result = new ArrayList<String>();
		BaseAppConfig config =  baseAppConfigService.queryObject("APP_ORG_DATA");
		JSONArray ja = new JSONArray();
		if(config!=null) {
			String json = config.getRemark();
			ja= JSONArray.parseArray(json);
			for (Object object : ja) {
				JSONObject jo = (JSONObject)object;
				result.add(jo.getString("orgId"));
			}
		}
		return result;
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

	@Override
	public JSONObject getSingleQxjJson(String userId) {
		LinkedMultiValueMap<String, Object> map = new LinkedMultiValueMap<String, Object>();
		map.add("leaveId", userId);
		//TODO 待修改为实际的地址
		//String url = baseAppOrgMappedService.getWebUrlByType(AppConstant.APP_QXJ,AppInterfaceConstant.WEB_INTERFACE_QXJ_TO_FYP);
		String url = baseAppOrgMappedService.getUrlByType(userId, AppConstant.APP_QXJ);
		if(StringUtils.isNotBlank(url)) {
			url+= AppInterfaceConstant.WEB_INTERFACE_QXJ_DATA_TO_FYP;
		}
		JSONObject obj = CrossDomainUtil.getJsonData(url, map);
		return obj;
	}
}
