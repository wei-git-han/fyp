package com.css.app.fyp.work.service.impl;

import com.css.base.utils.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import com.css.app.fyp.work.dao.FypGuaranteeTackingDao;
import com.css.app.fyp.work.entity.FypGuaranteeTacking;
import com.css.app.fyp.work.service.FypGuaranteeTackingService;



@Service("fypGuaranteeTackingService")
public class FypGuaranteeTackingServiceImpl implements FypGuaranteeTackingService {
	@Autowired
	private FypGuaranteeTackingDao fypGuaranteeTackingDao;
	
	@Override
	public FypGuaranteeTacking queryObject(String id){
		return fypGuaranteeTackingDao.queryObject(id);
	}
	
	@Override
	public List<FypGuaranteeTacking> queryList(Map<String, Object> map){
		return fypGuaranteeTackingDao.queryList(map);
	}
	
	@Override
	public void save(FypGuaranteeTacking fypGuaranteeTacking){
		fypGuaranteeTackingDao.save(fypGuaranteeTacking);
	}
	
	@Override
	public void update(FypGuaranteeTacking fypGuaranteeTacking){
		fypGuaranteeTackingDao.update(fypGuaranteeTacking);
	}
	
	@Override
	public void delete(String id){
		fypGuaranteeTackingDao.delete(id);
	}
	
	@Override
	public void deleteBatch(String[] ids){
		fypGuaranteeTackingDao.deleteBatch(ids);
	}

	@Override
	public Map<String, Object> findCount() {
		Map<String, Object> dataMap = new HashMap<>();
		Object todayCount = fypGuaranteeTackingDao.toDayAccept().get("COUNT");
		Object completed = fypGuaranteeTackingDao.toDayComplete().get("COUNT");
		Object count = fypGuaranteeTackingDao.countAccept().get("COUNT");
		dataMap.put("todayCount",  todayCount== null?0:todayCount);
		dataMap.put("completed", completed== null?0:completed);
		dataMap.put("count", count== null?0:count);
		return dataMap;
	}

}
