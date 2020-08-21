package com.css.app.fyp.work.service.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

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
	
}
