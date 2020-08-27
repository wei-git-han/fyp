package com.css.app.fyp.routine.service;

import com.alibaba.fastjson.JSONArray;
import com.alibaba.fastjson.JSONObject;
import org.springframework.web.multipart.MultipartFile;

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

	JSONObject workTrendList(String trendType);

	JSONObject displayRotationPicture();

	JSONObject uploadPictures(MultipartFile[] pictureFiles, String groupId);

	JSONObject deletePicture(String pictureId);

	JSONObject saveThemeInfo(String groupId, String theme, String themeDesc, Integer timeInterval);

	JSONObject workTrendDetail(String channelid);

	List<Map<String, Object>> workTrendPublish(String trendType);

	void workTrendSave(String requestBody);

	JSONObject workTrendPreview(String trendType);

	List<Map<String, Object>> workTrendPhoneList(String trendType);

	void workTrendPhoneDelete(String channelid);

	void workTrendPhoneSort(String trendType);

}
