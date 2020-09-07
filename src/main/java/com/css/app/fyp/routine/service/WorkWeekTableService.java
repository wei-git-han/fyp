package com.css.app.fyp.routine.service;

import com.alibaba.fastjson.JSONArray;

import java.util.Date;

/**
 * 公文审核记录表
 * 
 * @author 中软信息系统工程有限公司
 * @email 
 * @date 2017-10-09 16:06:13
 */
public interface WorkWeekTableService {

	JSONArray statementTablesList(String orgId, String weekTableType, String weekTableDate, String page, String pagesize);

	void statementTablesInsert (Date weekTableDate, String weekTableContent, String orgName);

}
