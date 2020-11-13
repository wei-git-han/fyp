package com.css.app.fyp.routine.service;

import com.alibaba.fastjson.JSONObject;

/**
 * 公文审核记录表
 * 
 * @author 中软信息系统工程有限公司
 * @email 
 * @date 2017-10-09 16:06:13
 */
public interface InformAfficheService {

	JSONObject informAfficheList(String pageSize, String curentPage, String afficheType);

	JSONObject informAfficheDetailList(String contentid);

	JSONObject getNotReadCount();
}
