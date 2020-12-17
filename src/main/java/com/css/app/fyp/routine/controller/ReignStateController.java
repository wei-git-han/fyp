package com.css.app.fyp.routine.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

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
import com.css.app.fyp.routine.entity.ReignState;
import com.css.app.fyp.routine.service.ReignStateService;


/**
 * 在位情况-状态表
 * 
 * @author 中软信息系统工程有限公司
 * @email 
 * @date 2020-12-17 14:51:10
 */
@Controller
@RequestMapping("/reignstate")
public class ReignStateController {
	@Autowired
	private ReignStateService reignStateService;
	
	/**
	 * 列表
	 */
	@ResponseBody
	@RequestMapping("/list")
	public void list(Integer page, Integer limit){
		Map<String, Object> map = new HashMap<>();
		//查询列表数据
		List<ReignState> reignStateList = reignStateService.queryList(map);
		Response.json(new ResponseValueUtils().success(reignStateList));
	}
	
	
	/**
	 * 信息
	 */
	@ResponseBody
	@RequestMapping("/info")
	public void info(String id){
		ReignState reignState = reignStateService.queryObject(id);
		Response.json("reignState", reignState);
	}

	/**
	 * 保存
	 */
	@ResponseBody
	@RequestMapping("/saveOrUpdate")
	public void saveOrUpdate(List<ReignState> reignState){
		reignStateService.saveOrUpdate(reignState);
		Response.ok();
	}
	
	/**
	 * 保存
	 */
	@ResponseBody
	@RequestMapping("/save")
	public void save(ReignState reignState){
		reignState.setId(UUIDUtils.random());
		reignStateService.save(reignState);
		Response.ok();
	}
	
	/**
	 * 修改
	 */
	@ResponseBody
	@RequestMapping("/update")
	public void update(ReignState reignState){
		reignStateService.update(reignState);
		
		Response.ok();
	}
	
	/**
	 * 删除
	 */
	@ResponseBody
	@RequestMapping("/delete")
	public void delete(String[] ids){
		reignStateService.deleteBatch(ids);
		
		Response.ok();
	}
	
}
