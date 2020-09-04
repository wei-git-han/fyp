package com.css.app.fyp.work.controller;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.*;

import com.alibaba.fastjson.JSON;
import com.css.addbase.apporgan.service.BaseAppUserService;
import com.css.app.fyp.utils.PoiUtils;
import com.css.app.fyp.utils.ResponseValueUtils;
import com.css.base.utils.CurrentUser;
import org.apache.shiro.authz.annotation.RequiresPermissions;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.stereotype.Controller;

import com.css.base.utils.PageUtils;
import com.css.base.utils.UUIDUtils;
import com.github.pagehelper.PageHelper;
import com.css.base.utils.Response;
import com.css.app.fyp.work.entity.FypFeedbackHear;
import com.css.app.fyp.work.service.FypFeedbackHearService;
import org.springframework.web.multipart.MultipartFile;


/**
 * 用户反馈受理情况
 * 
 * @author 中软信息系统工程有限公司
 * @email 
 * @date 2020-08-19 10:10:35
 */
@Controller
@RequestMapping("/fyp/feedbackhear")
public class FypFeedbackHearController {
	@Autowired
	private FypFeedbackHearService fypFeedbackHearService;

	@Autowired
	private BaseAppUserService baseAppUserService;
	
	/**
	 * 列表
	 */
	@ResponseBody
	@RequestMapping("/list")
	public void list(Integer page, Integer limit,FypFeedbackHear fypFeedbackHear){
		Map<String, Object> map = new HashMap<>();
		PageHelper.startPage(page, limit);
		Map<String, Object> paramMap = JSON.parseObject(JSON.toJSONString(fypFeedbackHear), Map.class);
		map.putAll(paramMap);
		if(null!=fypFeedbackHear.getSubmitTimeBegin()&&null!=fypFeedbackHear.getSubmitTimeEnd()) {
			map.put("submitTimeBegin", fypFeedbackHear.getSubmitTimeBegin());
			Calendar submitTimeEndinstance = Calendar.getInstance();
			submitTimeEndinstance.setTime(fypFeedbackHear.getSubmitTimeEnd());
			submitTimeEndinstance.add(Calendar.DAY_OF_MONTH, 1);
			map.put("submitTimeEnd", submitTimeEndinstance.getTime());
		}
		//查询列表数据
		List<FypFeedbackHear> fypFeedbackHearList = fypFeedbackHearService.queryList(map);
		PageUtils pageUtil = new PageUtils(fypFeedbackHearList);
		Response.json(new ResponseValueUtils().success(pageUtil));
	}
	
	
	/**
	 * 信息
	 */
	@ResponseBody
	@RequestMapping("/info")
	public void info(String id){
		FypFeedbackHear fypFeedbackHear = fypFeedbackHearService.queryObject(id);
		Response.json(new ResponseValueUtils().success(fypFeedbackHear));
	}
	
	/**
	 * 保存
	 */
	@ResponseBody
	@RequestMapping("/save")
	public void save(FypFeedbackHear fypFeedbackHear){
		String orgName = CurrentUser.getOrgName();
		fypFeedbackHear.setId(UUIDUtils.random());
		fypFeedbackHear.setSubmitTime(new Date());
		fypFeedbackHearService.save(fypFeedbackHear);
		Response.json(new ResponseValueUtils().success());
	}
	
	/**
	 * 修改
	 */
	@ResponseBody
	@RequestMapping("/update")
	public void update(FypFeedbackHear fypFeedbackHear){
		fypFeedbackHear.setSubmitTime(new Date());
		fypFeedbackHearService.update(fypFeedbackHear);
		Response.json(new ResponseValueUtils().success());
	}
	
	/**
	 * 删除
	 */
	@ResponseBody
	@RequestMapping("/delete")
	public void delete(String[] ids){
		fypFeedbackHearService.deleteBatch(ids);
		Response.json(new ResponseValueUtils().success());
	}

	/**
	 * 导入
	 */
	@ResponseBody
	@RequestMapping("/import")
	public void importExcel(MultipartFile file){
		this.insertImportData(PoiUtils.importExcel(file));
		Response.json(new ResponseValueUtils().success());
	}

	/**
	 * 插入导入数据
	 * @param dataMap
	 */
	private void insertImportData(Map<Object, List<Object>> dataMap){
		FypFeedbackHear fypFeedbackHear = null;
		SimpleDateFormat simpleDateFormat = new SimpleDateFormat("yyyy-MM-dd");
		for (Object key:dataMap.keySet()) {
			List<Object> objects = dataMap.get(key);
			if(null!=objects&&0<objects.size()){
				try {
					fypFeedbackHear = new FypFeedbackHear();
					fypFeedbackHear.setId(UUIDUtils.random());
					fypFeedbackHear.setName(objects.get(0).toString());//软件/硬件名称
					fypFeedbackHear.setDesc(objects.get(1).toString());//问题描述
					fypFeedbackHear.setSubmitTime(simpleDateFormat.parse(objects.get(2).toString()));//提出时间
					fypFeedbackHear.setSubmitUserName(objects.get(3).toString());//提出人
					fypFeedbackHear.setStatus(this.getStatus(objects.get(4).toString()));//状态
					fypFeedbackHear.setType(this.getType(objects.get(5).toString()));//问题分类：完善建议、系统问题
					fypFeedbackHear.setSolveTime(simpleDateFormat.parse(objects.get(6).toString()));//解决时限
					fypFeedbackHearService.save(fypFeedbackHear);
				} catch (ParseException e) {
					e.printStackTrace();
				}
			}
		}
	}

	/**
	 * 状态 string to int
	 * 0：需求论证、1：需求细化、2：解决中、3：已解决待升级、4：已关闭
	 * @param status
	 * @return
	 */
	private int getStatus(String status){
		int i = 0;
		switch (status){
			case "需求论证":
				i = 0;
				break;
			case "需求细化":
				i = 1;
				break;
			case "解决中":
				i = 2;
				break;
			case "已解决待升级":
				i = 3;
				break;
			case "已关闭":
				i = 4;
				break;
		}
		return i;
	}

	private String getType(String type){
		int i = 0;
		switch (type){
			case "完善建议":
				i = 0;
				break;
			case "系统问题":
				i = 1;
				break;
		}
		return String.valueOf(i);
	}
}
