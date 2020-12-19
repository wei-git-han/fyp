package com.css.app.fyp.routine.service;

import com.css.app.fyp.routine.entity.ReignUser;
import com.css.app.fyp.work.entity.FypRoleEdit;

import java.util.List;
import java.util.Map;

/**
 * 在位情况-人员状态表
 * 
 * @author 中软信息系统工程有限公司
 * @email 
 * @date 2020-12-17 14:51:10
 */
public interface ReignUserService {
	
	ReignUser queryObject(String id);
	
	List<ReignUser> queryList(Map<String, Object> map);
	
	void save(ReignUser reignUser);
	
	void update(ReignUser reignUser);
	
	void delete(String id);
	
	void deleteBatch(String[] ids);

    void saveOrUpdate(ReignUser reignUser);

	ReignUser queryObjectAll(String userid);

	FypRoleEdit getUserRole(String userId);

	void changeVisual(String userIds);

	List<String> getAllNotVisualUser();
}
