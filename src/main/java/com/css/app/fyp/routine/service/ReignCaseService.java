package com.css.app.fyp.routine.service;

import com.alibaba.fastjson.JSONArray;

/**
 * 在位情况
 * 
 * @author 中软信息系统工程有限公司
 * @email 
 * @date 2017-10-09 16:06:13
 */
public interface ReignCaseService {

	JSONArray reignCaseList(String afficheType);

	void reignCaseSave(String trendType) ;

}
