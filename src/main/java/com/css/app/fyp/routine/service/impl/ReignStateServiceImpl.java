package com.css.app.fyp.routine.service.impl;

import com.css.base.utils.UUIDUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;

import com.css.app.fyp.routine.dao.ReignStateDao;
import com.css.app.fyp.routine.entity.ReignState;
import com.css.app.fyp.routine.service.ReignStateService;



@Service("reignStateService")
public class ReignStateServiceImpl implements ReignStateService {
	@Autowired
	private ReignStateDao reignStateDao;
	
	@Override
	public ReignState queryObject(String id){
		return reignStateDao.queryObject(id);
	}
	
	@Override
	public List<ReignState> queryList(Map<String, Object> map){
		return reignStateDao.queryList(map);
	}
	
	@Override
	public void save(ReignState reignState){
		reignStateDao.save(reignState);
	}
	
	@Override
	public void update(ReignState reignState){
		reignStateDao.update(reignState);
	}
	
	@Override
	public void delete(String id){
		reignStateDao.delete(id);
	}
	
	@Override
	public void deleteBatch(String[] ids){
		reignStateDao.deleteBatch(ids);
	}

	@Override
	public void saveOrUpdate(List<ReignState> reignState) {
		for (ReignState state : reignState) {
			if(null == state.getId()){
				state.setId(UUIDUtils.random());
				reignStateDao.save(state);
			}else{
				reignStateDao.update(state);
			}
		}
	}

}
