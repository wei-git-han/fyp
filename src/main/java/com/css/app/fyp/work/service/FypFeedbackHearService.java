package com.css.app.fyp.work.service;

import com.css.app.fyp.work.entity.FypFeedbackHear;

import java.util.List;
import java.util.Map;

/**
 * 用户反馈受理情况
 * 
 * @author 中软信息系统工程有限公司
 * @email 
 * @date 2020-08-19 10:10:35
 */
public interface FypFeedbackHearService {
	
	FypFeedbackHear queryObject(String id);
	
	List<FypFeedbackHear> queryList(Map<String, Object> map);
	
	void save(FypFeedbackHear fypFeedbackHear);
	
	void update(FypFeedbackHear fypFeedbackHear);
	
	void delete(String id);
	
	void deleteBatch(String[] ids);
}
