package com.css.app.fyp.routine.service.impl;

import com.css.app.fyp.routine.dao.UserManagerSettingDao;
import com.css.app.fyp.routine.entity.UserManagerSetting;
import com.css.app.fyp.routine.service.UserManagerSettingService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;


@Service("userManagerSettingService")
public class UserManagerSettingServiceImpl implements UserManagerSettingService {
	@Autowired
	private UserManagerSettingDao userManagerSettingDao;
	
	@Override
	public UserManagerSetting queryObject(String id){
		return userManagerSettingDao.queryObject(id);
	}
	
	@Override
	public List<UserManagerSetting> queryList(Map<String, Object> map){
		return userManagerSettingDao.queryList(map);
	}
	
	@Override
	public void save(UserManagerSetting userManagerSetting){
		userManagerSettingDao.save(userManagerSetting);
	}
	
	@Override
	public void update(UserManagerSetting userManagerSetting){
		userManagerSettingDao.update(userManagerSetting);
	}
	
	@Override
	public void delete(String id){
		userManagerSettingDao.delete(id);
	}
	
	@Override
	public void deleteBatch(String[] ids){
		userManagerSettingDao.deleteBatch(ids);
	}

	@Override
	public UserManagerSetting querySingleObject(Map<String, Object> map) {
		return userManagerSettingDao.querySingleObject(map);
	}
	
	/**
	 * 获取用户类型 0 普通人  10后台系统管理员 1 部级管理员  2 局管理员  
	 * 仅仅取出 2 局管理员  1 部级管理员
	 */
	@Override
	public String getUserType(String userId) {
		Map<String,Object> map = new HashMap<String,Object>();
		map.put("userId", userId);
		List<UserManagerSetting> list = userManagerSettingDao.queryList(map);
		Integer userType = 0;
		if(list!=null && !list.isEmpty()) {
			boolean xtgly=isCurUserType(list, UserManagerSetting.USERTYPE_XTGLY);
			boolean bjgly=isCurUserType(list, UserManagerSetting.USERTYPE_BJGLY);
			boolean jjgly=isCurUserType(list, UserManagerSetting.USERTYPE_JJGLY);
			if(xtgly) {
				userType=UserManagerSetting.USERTYPE_XTGLY;
			}else if(bjgly) {
				userType=UserManagerSetting.USERTYPE_BJGLY;
			}else if(jjgly) {
				userType=UserManagerSetting.USERTYPE_JJGLY;
			}
		}
		return String.valueOf(userType);
	}
	/**
	 * 是否该类型的用户
	 * @param list
	 * @param userType
	 * @return
	 */
	private boolean isCurUserType(List<UserManagerSetting> list,Integer userType) {
		boolean result = false;
		for (UserManagerSetting o : list) {
			if(o.getUserType()==userType) {
				result = true;
			}
		}
		return result;
	}
}
