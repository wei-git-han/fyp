package com.css.app.fyp.routine.service;

import com.css.app.fyp.routine.entity.UserStateSetting;

import java.util.List;
import java.util.Map;

/**
 * 用户状态设置
 * 
 * @author 中软信息系统工程有限公司
 * @email 
 * @date 2019-01-21 14:34:23
 */
public interface UserStateSettingService {
	
	UserStateSetting queryObject(String id);
	
	List<UserStateSetting> queryList(Map<String, Object> map);
	
	void save(UserStateSetting userStateSetting);
	
	void update(UserStateSetting userStateSetting);
	
	void delete(String id);
	
	void deleteBatch(String[] ids);
	
	int queryTotal(Map<String, Object> map);
	/**
	 * 获取用户设置的状态  按照时间区间查询
	 * @param paramMap
	 * @return
	 */
	List<Map<String,Object>> getUserStateDataMap(Map<String, Object> paramMap);
}
