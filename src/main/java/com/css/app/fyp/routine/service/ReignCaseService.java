package com.css.app.fyp.routine.service;

import com.alibaba.fastjson.JSONArray;
import com.css.app.fyp.routine.vo.ReignCaseVo;

import java.util.List;

/**
 * 在位情况
 * 
 * @author 中软信息系统工程有限公司
 * @email 
 * @date 2017-10-09 16:06:13
 */
public interface ReignCaseService {

	List<ReignCaseVo> reignCaseList(String afficheType);

	void reignCaseSave(String trendType) ;

}
