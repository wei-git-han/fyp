package com.css.app.fyp.work.service;

import com.css.app.fyp.work.entity.Dict;

import java.util.List;
import java.util.Map;

/**
 * 
 * 
 * @author 中软信息系统工程有限公司
 * @email 
 * @date 2020-10-26 18:34:32
 */
public interface DictService {
	
	Dict queryObject(String id);
	
	List<Dict> queryList(Map<String, Object> map);
	
	void save(Dict dict);
	
	void update(Dict dict);
	
	void delete(String id);
	
	void deleteBatch(String[] ids);
	//统计单位配置
	void insertConfigDept(String deptids,String type);
	//查询统计单位
	List<Map<String,Object>> findDeptids();
	//统计人员配置
	void insertConfigUser(String userids);
	//查询统计人员
	List<Map<String,Object>> findUserids();

	void deleteUserById(String userid);

}
