package com.css.app.fyp.routine.service;

import com.css.app.fyp.routine.entity.ReignState;

import java.util.List;
import java.util.Map;

/**
 * 在位情况-状态表
 * 
 * @author 中软信息系统工程有限公司
 * @email 
 * @date 2020-12-17 14:51:10
 */
public interface ReignStateService {
	
	ReignState queryObject(String id);
	
	List<ReignState> queryList(Map<String, Object> map);
	
	void save(ReignState reignState);
	
	void update(ReignState reignState);
	
	void delete(String id);
	
	void deleteBatch(String[] ids);

    void saveOrUpdate(List<ReignState> reignState);
}
