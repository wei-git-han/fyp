package com.css.app.fyp.routine.service;

import com.css.app.fyp.routine.entity.UserManagerSetting;

import java.util.List;
import java.util.Map;

/**
 * 管理员设置
 * 
 * @author 中软信息系统工程有限公司
 * @email 
 * @date 2018-10-10 10:55:42
 */
public interface UserManagerSettingService {
	
	UserManagerSetting queryObject(String id);
	
	List<UserManagerSetting> queryList(Map<String, Object> map);
	
	void save(UserManagerSetting userManagerSetting);
	
	void update(UserManagerSetting userManagerSetting);
	
	void delete(String id);
	
	void deleteBatch(String[] ids);
	
	UserManagerSetting querySingleObject(Map<String, Object> map);
	
	/**
	 * 获取用户类型 0 普通人  2 部级管理员  1 局管理员   10后台系统管理员 
	 * 仅仅取出 2 局管理员  3 部级管理员
	 */
	public String getUserType(String userId);
}
