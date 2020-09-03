package com.css.app.fyp.routine.service.impl;

import com.css.app.fyp.routine.dao.UserStateSettingDao;
import com.css.app.fyp.routine.entity.UserStateSetting;
import com.css.app.fyp.routine.service.UserStateSettingService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;


@Service("userStateSettingService")
public class UserStateSettingServiceImpl implements UserStateSettingService {
	@Autowired
	private UserStateSettingDao userStateSettingDao;
	
	@Override
	public UserStateSetting queryObject(String id){
		return userStateSettingDao.queryObject(id);
	}
	
	@Override
	public List<UserStateSetting> queryList(Map<String, Object> map){
		return userStateSettingDao.queryList(map);
	}
	
	@Override
	public void save(UserStateSetting userStateSetting){
		userStateSettingDao.save(userStateSetting);
	}
	
	@Override
	public void update(UserStateSetting userStateSetting){
		userStateSettingDao.update(userStateSetting);
	}
	
	@Override
	public void delete(String id){
		userStateSettingDao.delete(id);
	}
	
	@Override
	public void deleteBatch(String[] ids){
		userStateSettingDao.deleteBatch(ids);
	}

	@Override
	public List<Map<String, Object>> getUserStateDataMap(Map<String, Object> paramMap) {
		return userStateSettingDao.getUserStateDataMap(paramMap);
	}

	@Override
	public int queryTotal(Map<String, Object> map) {
		return userStateSettingDao.queryTotal(map);
	}
	
}
