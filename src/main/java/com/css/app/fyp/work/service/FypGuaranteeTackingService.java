package com.css.app.fyp.work.service;

import com.css.app.fyp.work.entity.FypGuaranteeTacking;

import java.util.List;
import java.util.Map;

/**
 * 保障问题跟踪表
 * 
 * @author 中软信息系统工程有限公司
 * @email 
 * @date 2020-08-13 17:30:50
 */
public interface FypGuaranteeTackingService {
	
	FypGuaranteeTacking queryObject(String id);
	
	List<FypGuaranteeTacking> queryList(Map<String, Object> map);
	
	void save(FypGuaranteeTacking fypGuaranteeTacking);
	
	void update(FypGuaranteeTacking fypGuaranteeTacking);
	
	void delete(String id);
	
	void deleteBatch(String[] ids);
}
