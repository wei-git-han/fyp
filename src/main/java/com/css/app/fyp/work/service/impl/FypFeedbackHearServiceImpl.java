package com.css.app.fyp.work.service.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;

import com.css.app.fyp.work.dao.FypFeedbackHearDao;
import com.css.app.fyp.work.entity.FypFeedbackHear;
import com.css.app.fyp.work.service.FypFeedbackHearService;



@Service("fypFeedbackHearService")
public class FypFeedbackHearServiceImpl implements FypFeedbackHearService {
	@Autowired
	private FypFeedbackHearDao fypFeedbackHearDao;
	
	@Override
	public FypFeedbackHear queryObject(String id){
		return fypFeedbackHearDao.queryObject(id);
	}
	
	@Override
	public List<FypFeedbackHear> queryList(Map<String, Object> map){
		return fypFeedbackHearDao.queryList(map);
	}
	
	@Override
	public void save(FypFeedbackHear fypFeedbackHear){
		fypFeedbackHearDao.save(fypFeedbackHear);
	}
	
	@Override
	public void update(FypFeedbackHear fypFeedbackHear){
		fypFeedbackHearDao.update(fypFeedbackHear);
	}
	
	@Override
	public void delete(String id){
		fypFeedbackHearDao.delete(id);
	}
	
	@Override
	public void deleteBatch(String[] ids){
		fypFeedbackHearDao.deleteBatch(ids);
	}
	
}
