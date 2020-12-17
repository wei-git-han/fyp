package com.css.app.fyp.routine.service.impl;

import com.css.base.utils.CurrentUser;
import com.css.base.utils.UUIDUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;
import java.util.UUID;

import com.css.app.fyp.routine.dao.ReignUserDao;
import com.css.app.fyp.routine.entity.ReignUser;
import com.css.app.fyp.routine.service.ReignUserService;



@Service("reignUserService")
public class ReignUserServiceImpl implements ReignUserService {
	@Autowired
	private ReignUserDao reignUserDao;
	
	@Override
	public ReignUser queryObject(String id){
		return reignUserDao.queryObject(id);
	}
	
	@Override
	public List<ReignUser> queryList(Map<String, Object> map){
		return reignUserDao.queryList(map);
	}
	
	@Override
	public void save(ReignUser reignUser){
		reignUserDao.save(reignUser);
	}
	
	@Override
	public void update(ReignUser reignUser){
		reignUserDao.update(reignUser);
	}
	
	@Override
	public void delete(String id){
		reignUserDao.delete(id);
	}
	
	@Override
	public void deleteBatch(String[] ids){
		reignUserDao.deleteBatch(ids);
	}

	@Override
	public void saveOrUpdate(ReignUser reignUser) {
		ReignUser isexist = reignUserDao.queryObject(reignUser.getUserId());
		if(null!=isexist){
			reignUserDao.update(isexist);
		}else{
			reignUser.setId(UUIDUtils.random());
			reignUser.setUserId(CurrentUser.getUserId());
			reignUser.setUserName(CurrentUser.getUsername());
			reignUserDao.save(reignUser);
		}
	}

}
