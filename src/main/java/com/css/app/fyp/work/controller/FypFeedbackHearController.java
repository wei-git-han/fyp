package com.css.app.fyp.work.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import com.alibaba.fastjson.JSON;
import com.css.app.fyp.utils.ResponseValueUtils;
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
		fypFeedbackHear.setId(UUIDUtils.random());
		fypFeedbackHearService.save(fypFeedbackHear);
		Response.json(new ResponseValueUtils().success());
	}
	
	/**
	 * 修改
	 */
	@ResponseBody
	@RequestMapping("/update")
	public void update(FypFeedbackHear fypFeedbackHear){
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
	
}
