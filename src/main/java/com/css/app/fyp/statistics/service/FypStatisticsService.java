package com.css.app.fyp.statistics.service;

import com.css.app.fyp.statistics.entity.FypStatistics;

import java.util.List;
import java.util.Map;

/**
 * 年度统计表
 * 
 * @author 中软信息系统工程有限公司
 * @email 
 * @date 2020-12-11 16:09:16
 */
public interface FypStatisticsService {
	
	FypStatistics queryObject(String id);
	
	List<FypStatistics> queryList(Map<String, Object> map);
	
	void save(FypStatistics fypStatistics);
	
	void update(FypStatistics fypStatistics);
	
	void delete(String id);
	
	void deleteBatch(String[] ids);

    void insertDeptids(String[] deptArr);

	void syncData();

	void pushDesktop();
}
