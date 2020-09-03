package com.css.app.fyp.routine.service;

import com.css.app.fyp.routine.entity.UserLeaderAccessState;

import java.util.List;
import java.util.Map;

/**
 * 设置领导状态的访问的用户关系表
 * 
 * @author 中软信息系统工程有限公司
 * @email 
 * @date 2018-09-26 14:46:30
 */
public interface UserLeaderAccessStateService {
	
	UserLeaderAccessState queryObject(String id);
	
	List<UserLeaderAccessState> queryList(Map<String, Object> map);
	List<UserLeaderAccessState> queryNotlOOKList(Map<String, Object> map);
	
	void save(UserLeaderAccessState userLeaderAccessState);
	
	void update(UserLeaderAccessState userLeaderAccessState);
	
	void delete(String id);
	
	void deleteBatch(String[] ids);
	
	UserLeaderAccessState querySingleObject(Map<String, Object> map);
	
	/**
	 * 查询请假的数据
	 * @param param
	 * @return
	 */
	List<Map<String,Object>> queryMapData(Map<String, Object> param);
}
