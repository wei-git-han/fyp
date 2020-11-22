package com.css.app.fyp.routine.service;

import com.alibaba.fastjson.JSONObject;
import com.css.app.fyp.routine.vo.PersonalTodoVo;

import java.util.Date;

/**
 * 公文审核记录表
 * 
 * @author 中软信息系统工程有限公司
 * @email 
 * @date 2017-10-09 16:06:13
 */
public interface PersonalTodoService {

	JSONObject backlogFlowStatisticsHeader(Date applyDate, String page, String pagesize, String type);

	JSONObject getMenu(Date applyDate, String page, String pagesize, String type);

	JSONObject backlogFlowStatisticsDetail(String applyType, Date applyDate, String page, String pagesize);

	void backlogFlowStatisticsDetailUpdate(PersonalTodoVo personalTodoVo);

}
