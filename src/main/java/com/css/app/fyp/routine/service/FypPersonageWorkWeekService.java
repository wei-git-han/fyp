package com.css.app.fyp.routine.service;

import com.alibaba.fastjson.JSONArray;
import com.css.app.fyp.routine.entity.FypPersonageWorkWeek;
import com.css.app.fyp.routine.vo.FypPersonageWorkWeekVo;

import java.util.Date;
import java.util.List;
import java.util.Map;

/**
 * 
 * 
 * @author 中软信息系统工程有限公司
 * @email 
 * @date 2020-08-24 16:25:47
 */
public interface FypPersonageWorkWeekService {
	
	FypPersonageWorkWeek queryObject(String id);
	
	List<FypPersonageWorkWeek> queryList(Map<String, Object> map);

	List<FypPersonageWorkWeekVo> getPersonalWeekTableList(Date startDate, Map<String, Object> map, String userId);

	void save(FypPersonageWorkWeek fypPersonageWorkWeek);
	
	void update(FypPersonageWorkWeek fypPersonageWorkWeek);
	
	void delete(String id);
	
	void deleteBatch(String[] ids);
}
