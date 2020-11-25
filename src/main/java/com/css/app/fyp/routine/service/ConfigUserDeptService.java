package com.css.app.fyp.routine.service;


import com.css.app.fyp.routine.entity.ConfigUserDept;

import java.util.List;
import java.util.Map;

/**
 * 统计配置人员、单位关联表
 * 
 * @author 中软信息系统工程有限公司
 * @email 
 * @date 2020-11-25 17:35:54
 */
public interface ConfigUserDeptService {
	
	ConfigUserDept queryObject(String id);
	
	List<ConfigUserDept> queryList(Map<String, Object> map);
	
	void save(ConfigUserDept configUserDept);
	
	void update(ConfigUserDept configUserDept);
	
	void delete(String id);
	
	void deleteBatch(String[] ids);

	ConfigUserDept queryByUserId(String userId);
}
