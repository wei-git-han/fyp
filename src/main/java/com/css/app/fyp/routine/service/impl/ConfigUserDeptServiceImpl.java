package com.css.app.fyp.routine.service.impl;

import com.css.app.fyp.routine.dao.ConfigUserDeptDao;
import com.css.app.fyp.routine.entity.ConfigUserDept;
import com.css.app.fyp.routine.service.ConfigUserDeptService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;



@Service("configUserDeptService")
public class ConfigUserDeptServiceImpl implements ConfigUserDeptService {
	@Autowired
	private ConfigUserDeptDao configUserDeptDao;
	
	@Override
	public ConfigUserDept queryObject(String id){
		return configUserDeptDao.queryObject(id);
	}
	
	@Override
	public List<ConfigUserDept> queryList(Map<String, Object> map){
		return configUserDeptDao.queryList(map);
	}
	
	@Override
	public void save(ConfigUserDept configUserDept){
		configUserDeptDao.save(configUserDept);
	}
	
	@Override
	public void update(ConfigUserDept configUserDept){
		configUserDeptDao.update(configUserDept);
	}
	
	@Override
	public void delete(String id){
		configUserDeptDao.delete(id);
	}
	
	@Override
	public void deleteBatch(String[] ids){
		configUserDeptDao.deleteBatch(ids);
	}

	@Override
	public ConfigUserDept queryByUserId(String userId){
		return configUserDeptDao.queryByUserId(userId);
	}

	
}
