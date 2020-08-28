package com.css.app.fyp.routine.service.impl;

import com.alibaba.fastjson.JSONArray;
import com.alibaba.fastjson.JSONObject;
import com.css.app.fyp.routine.vo.FypPersonageWorkWeekVo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.*;

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
    public JSONArray getPersonalWeekTableList(Map<String, Object> map, String userId){
        Map<String, Object> allMap = new HashMap<>();
        allMap.put("userId", userId);
        List<String> fypPersonageWorkWeekVos = fypPersonageWorkWeekDao.getWeekWorkDateList(allMap);
        JSONArray jsonArray = new JSONArray();
        for (String weekDate : fypPersonageWorkWeekVos) {
            JSONObject jsonObject = new JSONObject();
            JSONArray itemList = new JSONArray();
            String week = this.getWeekOfDate(weekDate);
            Date date = this.stringToDate(weekDate);
            String[] f = new SimpleDateFormat("yyyy-MM-dd").format(date).toString().split("-");
            Integer month = Integer.parseInt(f[1]);
            Integer day = Integer.parseInt(f[2]);
            JSONObject jsonObjectResult = new JSONObject();
            Map<String, Object> amMap = new HashMap<>();
            amMap.put("userId", userId);
            amMap.put("weekDate", weekDate);
            List<FypPersonageWorkWeekVo> amFypPersonageWorkWeekVos = fypPersonageWorkWeekDao.getPersonalWeekTableList(amMap);
            JSONArray amItem = new JSONArray();
            JSONArray pmItem = new JSONArray();
            for (FypPersonageWorkWeekVo fypPersonageWorkWeekVo : amFypPersonageWorkWeekVos) {
                String time = new SimpleDateFormat("HH:mm").format(Calendar.getInstance().getTime());
                String hourFlag = fypPersonageWorkWeekVo.getHourFlag();
                switch (hourFlag) {
                    //AM
                    case "0":
                        JSONObject amJsonObject = new JSONObject();
                        amJsonObject.put("content", fypPersonageWorkWeekVo.getWeekTableContent());
                        amJsonObject.put("createdTime",time);
                        amItem.add(amJsonObject);
                        break;
                    //PM
                    case "1":
                        JSONObject pmJsonObject = new JSONObject();
                        pmJsonObject.put("content",fypPersonageWorkWeekVo.getWeekTableContent());
                        pmJsonObject.put("createdTime",time);
                        pmItem.add(pmJsonObject);
                        break;
                }
            }
            jsonObjectResult.put("amCounts",amItem.size());
            jsonObjectResult.put("day",day);
            jsonObjectResult.put("month",month);
            jsonObjectResult.put("pmCounts",pmItem.size());
            jsonObjectResult.put("week",week);
            jsonObjectResult.put("pmItem",pmItem);
            jsonObjectResult.put("amItem",amItem);
            itemList.add(jsonObjectResult);
            jsonObject.put("itemList",itemList);
            jsonArray.add(jsonObject);
        }
        return jsonArray;
    }

	private String getWeekOfDate(String dateTime) {
        SimpleDateFormat f = new SimpleDateFormat("yyy-MM-dd");
        String[] weekDays = {"日","一","二","三","四","五","六"};
        Calendar cal = Calendar.getInstance();
        Date datet = null;
        try {
            datet = f.parse(dateTime);
            cal.setTime(datet);
        }catch (ParseException e) {
            e.printStackTrace();
        }
        int w = cal.get(Calendar.DAY_OF_WEEK) - 1;
        if (w < 0)
            w = 0;
        return weekDays[w];
	}

	private Date stringToDate(String dateTime) {
        SimpleDateFormat simpleDateFormat = new SimpleDateFormat("yyyy-MM-dd");
        Date parse = null;
        try {
            parse = simpleDateFormat.parse(dateTime);
        } catch (ParseException e) {
            e.printStackTrace();
        }
        return parse;
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
