package com.css.app.fyp.routine.service.impl;

import com.alibaba.fastjson.JSONArray;
import com.alibaba.fastjson.JSONObject;
import com.css.app.fyp.routine.vo.FypPersonageWorkWeekVo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.*;
import java.util.stream.Collectors;
import java.util.stream.Stream;

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

    private List<FypPersonageWorkWeekVo> resultFypPersonageWorkWeekList (Date beginDayOfWeek, Date endDayOfWeek) {
        List<FypPersonageWorkWeekVo> resultFypPersonageWorkWeekList = new ArrayList<>();
        FypPersonageWorkWeekVo MonDate = new FypPersonageWorkWeekVo();
        MonDate.setWeekDate("一");
        resultFypPersonageWorkWeekList.add(MonDate);
        FypPersonageWorkWeekVo TueDate = new FypPersonageWorkWeekVo();
        TueDate.setWeekDate("二");
        resultFypPersonageWorkWeekList.add(TueDate);
        FypPersonageWorkWeekVo WedDate = new FypPersonageWorkWeekVo();
        WedDate.setWeekDate("三");
        resultFypPersonageWorkWeekList.add(WedDate);
        FypPersonageWorkWeekVo ThurDate = new FypPersonageWorkWeekVo();
        ThurDate.setWeekDate("四");
        resultFypPersonageWorkWeekList.add(ThurDate);
        FypPersonageWorkWeekVo FriDate = new FypPersonageWorkWeekVo();
        FriDate.setWeekDate("五");
        resultFypPersonageWorkWeekList.add(FriDate);
        FypPersonageWorkWeekVo SatDate = new FypPersonageWorkWeekVo();
        SatDate.setWeekDate("六");
        resultFypPersonageWorkWeekList.add(SatDate);
        FypPersonageWorkWeekVo SunDate = new FypPersonageWorkWeekVo();
        SunDate.setWeekDate("七");
        resultFypPersonageWorkWeekList.add(SunDate);
        Calendar calendar = Calendar.getInstance();
        calendar.setTime(beginDayOfWeek);
        if (null == beginDayOfWeek || null == endDayOfWeek) {
            return resultFypPersonageWorkWeekList;
        }
        int index = 0;
        while (beginDayOfWeek.getTime() < endDayOfWeek.getTime()) {
            beginDayOfWeek = calendar.getTime();
            String[] f = new SimpleDateFormat("yyyy-MM-dd").format(beginDayOfWeek).toString().split("-");
            Integer month = Integer.parseInt(f[1]);//月
            Integer day = Integer.parseInt(f[2]);//日
            resultFypPersonageWorkWeekList.get(index).setWeekMonth(month);
            resultFypPersonageWorkWeekList.get(index).setWeekDay(day);
            calendar.add(Calendar.DAY_OF_MONTH, 1);
            index += 1;
        }
        return resultFypPersonageWorkWeekList;
    }
    @Override
    public List<FypPersonageWorkWeekVo> getPersonalWeekTableList(Date toDate, Map<String, Object> map, String userId){
        Map<String, Object> allMap = new HashMap<>();
        allMap.put("userId", userId);
        Date beginDayOfWeek = new Date();
        Date endDayOfWeek = new Date();
        if (null != toDate) {
            beginDayOfWeek = this.getBeginDayOfWeek(toDate);
            endDayOfWeek = this.getEndDayOfWeek(toDate);
            allMap.put("beginDayOfWeek", beginDayOfWeek);
            allMap.put("endDayOfWeek", endDayOfWeek);
        }
        List<FypPersonageWorkWeekVo> resultFypPersonageWorkWeekVos = this.resultFypPersonageWorkWeekList(beginDayOfWeek, endDayOfWeek);
        List<String> fypPersonageWorkWeekVos = fypPersonageWorkWeekDao.getWeekWorkDateList(allMap);
        List<FypPersonageWorkWeekVo> fypPersonageWorkWeekVoList = new ArrayList<>();
        for (String weekDate : fypPersonageWorkWeekVos) {
            FypPersonageWorkWeekVo fypPersonageWorkWeek = new FypPersonageWorkWeekVo();
            String week = this.getWeekOfDate(weekDate);//获取周
            Date date = this.stringToDate(weekDate);//日期格式
            String[] f = new SimpleDateFormat("yyyy-MM-dd").format(date).toString().split("-");
            Integer month = Integer.parseInt(f[1]);//月
            Integer day = Integer.parseInt(f[2]);//日
            Map<String, Object> amMap = new HashMap<>();
            amMap.put("userId", userId);
            amMap.put("weekDate", weekDate);
            List<FypPersonageWorkWeekVo> amFypPersonageWorkWeekVos = fypPersonageWorkWeekDao.getPersonalWeekTableList(amMap);
            List<FypPersonageWorkWeek> amFypPersonageWorkWeekList = new ArrayList<>();
            List<FypPersonageWorkWeek> pmFypPersonageWorkWeekList = new ArrayList<>();
            for (FypPersonageWorkWeekVo fypPersonageWorkWeekVo : amFypPersonageWorkWeekVos) {
                String hourFlag = fypPersonageWorkWeekVo.getHourFlag();
                switch (hourFlag) {
                    //AM
                    case "0":
                        FypPersonageWorkWeek amFypPersonageWorkWeek = new FypPersonageWorkWeek();
                        amFypPersonageWorkWeek.setWeekTableContent(fypPersonageWorkWeekVo.getWeekTableContent());
                        amFypPersonageWorkWeek.setCreatedTime(fypPersonageWorkWeekVo.getCreatedTime());
                        amFypPersonageWorkWeek.setId(fypPersonageWorkWeekVo.getId());
                        amFypPersonageWorkWeekList.add(amFypPersonageWorkWeek);
                        break;
                    //PM
                    case "1":
                        FypPersonageWorkWeek pmFypPersonageWorkWeek = new FypPersonageWorkWeek();
                        pmFypPersonageWorkWeek.setWeekTableContent(fypPersonageWorkWeekVo.getWeekTableContent());
                        pmFypPersonageWorkWeek.setCreatedTime(fypPersonageWorkWeekVo.getCreatedTime());
                        pmFypPersonageWorkWeek.setId(fypPersonageWorkWeekVo.getId());
                        pmFypPersonageWorkWeekList.add(pmFypPersonageWorkWeek);
                        break;
                }
            }
            fypPersonageWorkWeek.setAmFypPersonageWorkWeekList(amFypPersonageWorkWeekList);
            fypPersonageWorkWeek.setPmFypPersonageWorkWeekList(pmFypPersonageWorkWeekList);
            fypPersonageWorkWeek.setWeekDate(week);
            fypPersonageWorkWeek.setWeekMonth(month);
            fypPersonageWorkWeek.setWeekDay(day);
            fypPersonageWorkWeekVoList.add(fypPersonageWorkWeek);
        }
        Map<String, FypPersonageWorkWeekVo> collect = fypPersonageWorkWeekVoList.stream().collect(Collectors.toMap(FypPersonageWorkWeekVo::getWeekDate, fypPersonageWorkWeekVo -> fypPersonageWorkWeekVo));
        resultFypPersonageWorkWeekVos.forEach(
                n -> {
                    if (collect.containsKey(n.getWeekDate())) {
                        FypPersonageWorkWeekVo fypPersonageWorkWeekVo = collect.get(n.getWeekDate());
                        n.setAmFypPersonageWorkWeekList(fypPersonageWorkWeekVo.getAmFypPersonageWorkWeekList());
                        n.setPmFypPersonageWorkWeekList(fypPersonageWorkWeekVo.getPmFypPersonageWorkWeekList());
                        n.setWeekDate(fypPersonageWorkWeekVo.getWeekDate());
                        n.setWeekMonth(fypPersonageWorkWeekVo.getWeekMonth());
                        n.setWeekDay(fypPersonageWorkWeekVo.getWeekDay());                    }
                }
        );
        return resultFypPersonageWorkWeekVos;
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

    // 获取本周的开始时间
    public Date getBeginDayOfWeek(Date date) {
	    SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");
	    Calendar cal = Calendar.getInstance();
	    cal.setTime(date);
	    int dayWeek = cal.get(Calendar.DAY_OF_WEEK);
	    if (1 == dayWeek) {
	        cal.add(Calendar.DAY_OF_MONTH, -1);
        }
        cal.setFirstDayOfWeek(Calendar.MONDAY);
	    int day = cal.get(Calendar.DAY_OF_WEEK);
	    cal.add(Calendar.DATE, cal.getFirstDayOfWeek() - day);
        return cal.getTime();
    }

    // 获取本周的开始时间
    public Date getEndDayOfWeek(Date date) {
	    SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");
	    Calendar cal = Calendar.getInstance();
	    cal.setTime(date);
	    int dayWeek = cal.get(Calendar.DAY_OF_WEEK);
	    if (1 == dayWeek) {
	        cal.add(Calendar.DAY_OF_MONTH, -1);
        }
        cal.setFirstDayOfWeek(Calendar.MONDAY);
	    int day = cal.get(Calendar.DAY_OF_WEEK);
	    cal.add(Calendar.DATE, cal.getFirstDayOfWeek() - day);
	    cal.add(Calendar.DATE, 6);
        return cal.getTime();
    }

    public Date getDayEndTime(Date date) {
	    Calendar todayEnd = new GregorianCalendar();
	    todayEnd.setTime(date);
	    todayEnd.set(Calendar.HOUR_OF_DAY, 23);
	    todayEnd.set(Calendar.MINUTE, 59);
	    todayEnd.set(Calendar.SECOND, 59);
	    todayEnd.set(Calendar.MILLISECOND, 999);
	    return todayEnd.getTime();
    }

    public Date getDayStartTime(Date date) {
	    Calendar todayStart = new GregorianCalendar();
        todayStart.setTime(date);
        todayStart.set(Calendar.HOUR_OF_DAY, 0);
        todayStart.set(Calendar.MINUTE, 0);
        todayStart.set(Calendar.SECOND, 0);
        todayStart.set(Calendar.MILLISECOND, 0);
	    return todayStart.getTime();
    }

    public Date getMondayStartTime() {
	    return getDayStartTime(getCurrentMonday());
    }

    public Date getCurrentMonday() {
        return getCalendar().getTime();
    }

    public Date getSundayEndTime() {
	    return getDayEndTime(getCurrentSunday());
    }

    public Date getCurrentSunday () {
	    Calendar cal = getCalendar();
	    cal.add(Calendar.DATE, 6);
	    return cal.getTime();
    }

    private Calendar getCalendar() {
	    Calendar cal = Calendar.getInstance();
	    cal.set(Calendar.DAY_OF_WEEK, Calendar.MONDAY);
	    return cal;
    }

    //判断选择的日期是否是本周
    public boolean isThisWeek(Date time) {
	    Date mondayStartTime = getMondayStartTime();
	    Date sondayEndTime = getSundayEndTime();
	    if(mondayStartTime.getTime() <= time.getTime() && sondayEndTime.getTime() >= time.getTime()) {
	        return true;
        }
        return false;
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
