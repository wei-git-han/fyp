package com.css.app.fyp.routine.service;

import com.alibaba.fastjson.JSONArray;

import java.util.List;
import java.util.Map;

/**
 * 公文审核记录表
 * 
 * @author 中软信息系统工程有限公司
 * @email 
 * @date 2017-10-09 16:06:13
 */
public interface WorkTrendService {

	JSONArray workTrendList(String trendType);

	List<Map<String, Object>> workTrendPublish(String trendType);

	void workTrendSave(String trendType);

	List<Map<String, Object>> workTrendPreview(String trendType);

	List<Map<String, Object>> workTrendPhoneList(String trendType);

	void workTrendPhoneDelete(String trendType);

	void workTrendPhoneSort(String trendType);

}
