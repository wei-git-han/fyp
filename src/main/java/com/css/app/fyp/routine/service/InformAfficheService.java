package com.css.app.fyp.routine.service;

import com.alibaba.fastjson.JSONArray;

/**
 * 公文审核记录表
 * 
 * @author 中软信息系统工程有限公司
 * @email 
 * @date 2017-10-09 16:06:13
 */
public interface InformAfficheService {

	JSONArray informAfficheList(String afficheType);

}
