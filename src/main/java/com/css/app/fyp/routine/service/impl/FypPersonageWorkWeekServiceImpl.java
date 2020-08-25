package com.css.app.fyp.routine.service.impl;

import com.alibaba.fastjson.JSONArray;
import com.alibaba.fastjson.JSONObject;
import com.css.app.fyp.routine.vo.FypPersonageWorkWeekVo;
import com.css.base.utils.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.*;
import java.util.stream.Collectors;

import com.css.app.fyp.routine.dao.FypPersonageWorkWeekDao;
import com.css.app.fyp.routine.entity.FypPersonageWorkWeek;
import com.css.app.fyp.routine.service.FypPersonageWorkWeekService;



@Service("fypPersonageWorkWeekService")
public class FypPersonageWorkWeekServiceImpl implements FypPersonageWorkWeekService {
	@Autowired
	private FypPersonageWorkWeekDao fypPersonageWorkWeekDao;
	
	@Override
	public FypPersonageWorkWeek queryObject(String id){
		return fypPersonageWorkWeekDao.queryObject(id);
	}
	
	@Override
	public List<FypPersonageWorkWeek> queryList(Map<String, Object> map){
		return fypPersonageWorkWeekDao.queryList(map);
	}

	@Override
	public List<FypPersonageWorkWeekVo> getPersonalWeekTableList(Map<String, Object> map, String userId){
		Map<String, Object> allMap = new HashMap<>();
		allMap.put("userId", userId);
		List<String> fypPersonageWorkWeekVos = fypPersonageWorkWeekDao.getWeekWorkDateList(allMap);

		Map<String, Object> amMap = new HashMap<>();
		amMap.put("userId", userId);
		amMap.put("hourFlag", 0);
		List<FypPersonageWorkWeekVo> amFypPersonageWorkWeekVos = fypPersonageWorkWeekDao.getPersonalWeekTableList(amMap);
		Map<String, FypPersonageWorkWeekVo> amCollect = amFypPersonageWorkWeekVos.stream().collect(Collectors.toMap(FypPersonageWorkWeekVo::getWeekDate, amFypPersonageWorkWeekVo -> amFypPersonageWorkWeekVo));

		Map<String, Object> pmMap = new HashMap<>();
		pmMap.put("userId", userId);
		pmMap.put("hourFlag", 1);
		List<FypPersonageWorkWeekVo> pmFypPersonageWorkWeekVos = fypPersonageWorkWeekDao.getPersonalWeekTableList(pmMap);
		Map<String, FypPersonageWorkWeekVo> pmcollect = pmFypPersonageWorkWeekVos.stream().collect(Collectors.toMap(FypPersonageWorkWeekVo::getWeekDate, pmFypPersonageWorkWeekVo -> pmFypPersonageWorkWeekVo));
		List<FypPersonageWorkWeekVo> fypPersonageWorkWeekVoList = new ArrayList<FypPersonageWorkWeekVo>();
		for (String weekDate : fypPersonageWorkWeekVos) {
			FypPersonageWorkWeekVo fypPersonageWorkWeekVo = new FypPersonageWorkWeekVo();
			fypPersonageWorkWeekVo.setWeekDate(weekDate);
			long amTime = amCollect.get(weekDate).getCreatedTime().getTime();
			fypPersonageWorkWeekVo.setAmWeekTime(amTime+"");
			fypPersonageWorkWeekVo.setAmWeekTableContent(amCollect.get(weekDate).getWeekTableContent());
			long pmTime = pmcollect.get(weekDate).getCreatedTime().getTime();
			fypPersonageWorkWeekVo.setPmWeekTime(pmTime+"");
			fypPersonageWorkWeekVo.setPmWeekTableContent(pmcollect.get(weekDate).getWeekTableContent());
			fypPersonageWorkWeekVoList.add(fypPersonageWorkWeekVo);
		}

		return fypPersonageWorkWeekVoList;
	}

	private String getWeekOfDate(long time) {
		Date date = new Date();
		String[] weekDays = {"星期日","星期一","星期二","星期三","星期四","星期五","星期六"};
		Calendar cal = Calendar.getInstance();
		cal.setTime(date);
		int w = cal.get(Calendar.DAY_OF_WEEK) - 1;
		if (w < 0) {
			w = 0;
		}
		return weekDays[w];
	}

	@Override
	public void save(FypPersonageWorkWeek fypPersonageWorkWeek){
		fypPersonageWorkWeekDao.save(fypPersonageWorkWeek);
	}
	
	@Override
	public void update(FypPersonageWorkWeek fypPersonageWorkWeek){
		fypPersonageWorkWeekDao.update(fypPersonageWorkWeek);
	}
	
	@Override
	public void delete(String id){
		fypPersonageWorkWeekDao.delete(id);
	}
	
	@Override
	public void deleteBatch(String[] ids){
		fypPersonageWorkWeekDao.deleteBatch(ids);
	}
	
}
