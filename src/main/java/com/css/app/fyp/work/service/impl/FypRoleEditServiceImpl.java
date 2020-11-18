package com.css.app.fyp.work.service.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;

import com.css.app.fyp.work.dao.FypRoleEditDao;
import com.css.app.fyp.work.entity.FypRoleEdit;
import com.css.app.fyp.work.service.FypRoleEditService;



@Service("fypRoleEditService")
public class FypRoleEditServiceImpl implements FypRoleEditService {
	@Autowired
	private FypRoleEditDao fypRoleEditDao;
	
	@Override
	public FypRoleEdit queryObject(String id){
		return fypRoleEditDao.queryObject(id);
	}
	
	@Override
	public List<FypRoleEdit> queryList(Map<String, Object> map){
		return fypRoleEditDao.queryList(map);
	}
	
	@Override
	public void save(FypRoleEdit fypRoleEdit){
		fypRoleEditDao.save(fypRoleEdit);
	}
	
	@Override
	public void update(FypRoleEdit fypRoleEdit){
		fypRoleEditDao.update(fypRoleEdit);
	}
	
	@Override
	public void delete(String id){
		fypRoleEditDao.delete(id);
	}
	
	@Override
	public void deleteBatch(String[] ids){
		fypRoleEditDao.deleteBatch(ids);
	}

	@Override
	public List<Map<String, Object>> findDeptAll() {
		return fypRoleEditDao.findDeptAll();
	}

	@Override
	public List<Map<String, Object>> findUserAll(String deptid) {
		return fypRoleEditDao.findUserAll(deptid);
	}

	@Override
	public String queryObjectByUserId(String userId) {
		return fypRoleEditDao.queryObjectByUserId(userId);
	}

	@Override
	public FypRoleEdit  queryTypeByUserId(String userId){
		return fypRoleEditDao.queryTypeByUserId(userId);
	}

}
