package com.css.app.fyp.routine.service;

import com.alibaba.fastjson.JSONObject;
import com.css.app.fyp.routine.entity.UserLeaveSetting;

import java.util.List;
import java.util.Map;

/**
 * 领导请假设置
 * 
 * @author 中软信息系统工程有限公司
 * @email 
 * @date 2018-10-10 13:58:40
 */
public interface UserLeaveSettingService {
	
	UserLeaveSetting queryObject(String id);
	
	List<UserLeaveSetting> queryList(Map<String, Object> map);
	
	void save(UserLeaveSetting userLeaveSetting);
	
	void update(UserLeaveSetting userLeaveSetting);
	
	void delete(String id);
	
	void deleteBatch(String[] ids);
	
	List<UserLeaveSetting> queryLeaveList(Map<String, Object> map);

	int queryLeaveListCount(Map<String, Object> map);
	
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
	public JSONObject getQxjJson();
	
	/**
	 * 普通人员 获取请销假 数据  获取请销假 app中的请假单信息
	 * @param userId
	 * @return
	 */
	public JSONObject getSingleQxjJson(String userId);
}
