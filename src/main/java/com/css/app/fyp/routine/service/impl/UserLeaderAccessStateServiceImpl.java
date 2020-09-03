package com.css.app.fyp.routine.service.impl;

import com.css.app.fyp.routine.dao.UserLeaderAccessStateDao;
import com.css.app.fyp.routine.entity.UserLeaderAccessState;
import com.css.app.fyp.routine.service.UserLeaderAccessStateService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;


@Service("userLeaderAccessStateService")
public class UserLeaderAccessStateServiceImpl implements UserLeaderAccessStateService {
	@Autowired
	private UserLeaderAccessStateDao userLeaderAccessStateDao;
	
	@Override
	public UserLeaderAccessState queryObject(String id){
		return userLeaderAccessStateDao.queryObject(id);
	}
	
	@Override
	public List<UserLeaderAccessState> queryList(Map<String, Object> map){
		return userLeaderAccessStateDao.queryList(map);
	}
	
	@Override
	public void save(UserLeaderAccessState userLeaderAccessState){
		userLeaderAccessStateDao.save(userLeaderAccessState);
	}
	
	@Override
	public void update(UserLeaderAccessState userLeaderAccessState){
		userLeaderAccessStateDao.update(userLeaderAccessState);
	}
	
	@Override
	public void delete(String id){
		userLeaderAccessStateDao.delete(id);
	}
	
	@Override
	public void deleteBatch(String[] ids){
		userLeaderAccessStateDao.deleteBatch(ids);
	}

	@Override
	public List<UserLeaderAccessState> queryNotlOOKList(Map<String, Object> map) {
		// TODO Auto-generated method stub
		return userLeaderAccessStateDao.queryNotlOOKList(map);
	}

	@Override
	public UserLeaderAccessState querySingleObject(Map<String, Object> map) {
		// TODO Auto-generated method stub
		return userLeaderAccessStateDao.querySingleObject(map);
	}
	
	/**
	 * 查询请假的数据
	 * @param param
	 * @return
	 */
	public List<Map<String,Object>> queryMapData(Map<String,Object> param){
		return userLeaderAccessStateDao.queryMapData(param);
	}
}
