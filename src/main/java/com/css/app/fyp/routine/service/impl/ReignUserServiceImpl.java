package com.css.app.fyp.routine.service.impl;

import com.css.addbase.apporgan.dao.BaseAppUserDao;
import com.css.addbase.apporgan.entity.BaseAppUser;
import com.css.app.fyp.work.dao.FypRoleEditDao;
import com.css.app.fyp.work.entity.FypRoleEdit;
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
	@Autowired
	private FypRoleEditDao fypRoleEditDao;
	@Autowired
	private BaseAppUserDao baseAppUserDao;
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
		ReignUser isexist = reignUserDao.queryObjectAll(CurrentUser.getUserId());
		if(null!=isexist){
			reignUser.setIsdelete(isexist.getIsdelete());
			reignUserDao.update(reignUser);
		}else{
			reignUser.setId(UUIDUtils.random());
			reignUser.setUserId(CurrentUser.getUserId());
			reignUser.setUserName(CurrentUser.getUsername());
			reignUser.setIsdelete(0);
			reignUserDao.save(reignUser);
		}
	}

	@Override
	public ReignUser queryObjectAll(String userid) {
		return reignUserDao.queryObjectAll(userid);
	}

	@Override
	public FypRoleEdit getUserRole(String userId) {
		return fypRoleEditDao.queryTypeByUserId(userId);
	}

	@Override
	public void changeVisual(String userIds) {
		String[] split = userIds.split(",");
		for (String userid:split) {
			ReignUser reignUser = reignUserDao.queryObjectAll(userid);
			if(null!=reignUser){
				reignUser.setIsdelete(1);
				reignUserDao.update(reignUser);
			}else{
				reignUser = new ReignUser();
				reignUser.setIsdelete(1);
				reignUser.setId(UUIDUtils.random());
				reignUser.setUserId(userid);
				BaseAppUser baseAppUser = baseAppUserDao.queryObject(userid);
				reignUser.setUserName(baseAppUser.getTruename());
				reignUserDao.save(reignUser);
			}
		}
	}

	@Override
	public List<String> getAllNotVisualUser() {
		return reignUserDao.getAllNotVisualUser();
	}

}
