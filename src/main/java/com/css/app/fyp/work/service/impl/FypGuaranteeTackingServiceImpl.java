package com.css.app.fyp.work.service.impl;

import com.css.base.utils.StringUtils;
import com.css.base.utils.UUIDUtils;
import org.apache.poi.hssf.usermodel.*;
import org.apache.poi.ss.usermodel.Sheet;
import org.apache.poi.ss.usermodel.Workbook;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.io.InputStream;
import java.text.SimpleDateFormat;
import java.util.*;

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

	@Override
	public void importExcle(InputStream inputStream) throws IOException {
		List<FypGuaranteeTacking> list = new ArrayList<>();
		Workbook wb =new HSSFWorkbook(inputStream);
		Sheet sheet = wb.getSheetAt(0);
		for(int i = 1 ;i<=sheet.getLastRowNum(); i ++) {
			FypGuaranteeTacking fypGuaranteeTacking = new FypGuaranteeTacking();
			fypGuaranteeTacking.setId(UUIDUtils.random());
			String steCell0 = sheet.getRow(i).getCell(0).getStringCellValue(); //姓名
			String steCell1 = sheet.getRow(i).getCell(1).getStringCellValue(); //单位名称
			Double steCell2 = sheet.getRow(i).getCell(2).getNumericCellValue(); //联系电话
			Date steCell3 = sheet.getRow(i).getCell(3).getDateCellValue(); //报修时间
			String steCell4 = sheet.getRow(i).getCell(4).getStringCellValue()+""; //问题来源
			String steCell5 = sheet.getRow(i).getCell(5).getStringCellValue()+""; //问题描述
			String steCell6 = sheet.getRow(i).getCell(6).getStringCellValue()+""; //状态
			Date steCell7 = sheet.getRow(i).getCell(7).getDateCellValue(); //更新时间
			String steCell8 = sheet.getRow(i).getCell(8).getStringCellValue()+""; //处理措施
			String phone = String.valueOf(steCell2);
			fypGuaranteeTacking.setName(steCell0);
			fypGuaranteeTacking.setDeptName(steCell1);
			fypGuaranteeTacking.setPhone(phone.substring(0,phone.indexOf(".")));
			fypGuaranteeTacking.setWarrantyTime(steCell3);
			fypGuaranteeTacking.setSource(steCell4);
			fypGuaranteeTacking.setRemark(steCell5);
			fypGuaranteeTacking.setStatus(steCell6);
			fypGuaranteeTacking.setStatusTime(steCell7);
			fypGuaranteeTacking.setMeasures(steCell8);
			fypGuaranteeTackingDao.save(fypGuaranteeTacking);
		}
		wb.close();
		inputStream.close();
	}

}
