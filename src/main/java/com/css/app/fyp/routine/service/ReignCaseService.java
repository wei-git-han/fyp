package com.css.app.fyp.routine.service;

import com.alibaba.fastjson.JSONObject;
import com.css.app.fyp.routine.vo.ReignCaseVo;
import com.css.base.utils.GwPageUtils;

import java.util.List;

/**
 * 在位情况
 * 
 * @author 中软信息系统工程有限公司
 * @email 
 * @date 2017-10-09 16:06:13
 */
public interface ReignCaseService {

    ReignCaseVo reignCaseList(String afficheType);

    GwPageUtils reignOnlineUserList(Integer page, Integer limit,String afficheType);

	void reignCaseSave(String trendType) ;

    JSONObject getUserTree() ;

    JSONObject reignCaseJsonObject() ;

}
