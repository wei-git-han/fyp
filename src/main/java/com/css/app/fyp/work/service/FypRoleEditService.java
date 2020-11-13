package com.css.app.fyp.work.service;

import com.css.app.fyp.work.entity.FypRoleEdit;

import java.util.List;
import java.util.Map;

/**
 * 业务配置表、角色表
 * 
 * @author 中软信息系统工程有限公司
 * @email 
 * @date 2020-08-19 14:42:47
 */
public interface FypRoleEditService {
	
	FypRoleEdit queryObject(String id);
	
	List<FypRoleEdit> queryList(Map<String, Object> map);
	
	void save(FypRoleEdit fypRoleEdit);
	
	void update(FypRoleEdit fypRoleEdit);
	
	void delete(String id);
	
	void deleteBatch(String[] ids);
	//获取所有单位信息
	List<Map<String,Object>> findDeptAll();
	//获取所有用户信息
	List<Map<String,Object>> findUserAll(String deptid);
	//获取是否为首长标识
	String queryObjectByUserId(String userId);
}
