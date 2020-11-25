package com.css.app.fyp.routine.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import com.css.app.fyp.routine.entity.ConfigUserDept;
import com.css.app.fyp.routine.service.ConfigUserDeptService;
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


/**
 * 统计配置人员、单位关联表
 * 
 * @author 中软信息系统工程有限公司
 * @email 
 * @date 2020-11-25 17:35:54
 */
@Controller
@RequestMapping("/configuserdept")
public class ConfigUserDeptController {
	@Autowired
	private ConfigUserDeptService configUserDeptService;
	
	/**
	 * 列表
	 */
	@ResponseBody
	@RequestMapping("/list")
	@RequiresPermissions("configuserdept:list")
	public void list(Integer page, Integer limit){
		Map<String, Object> map = new HashMap<>();
		PageHelper.startPage(page, limit);
		
		//查询列表数据
		List<ConfigUserDept> configUserDeptList = configUserDeptService.queryList(map);
		
		PageUtils pageUtil = new PageUtils(configUserDeptList);
		Response.json("page",pageUtil);
	}
	
	
	/**
	 * 信息
	 */
	@ResponseBody
	@RequestMapping("/info/{id}")
	@RequiresPermissions("configuserdept:info")
	public void info(@PathVariable("id") String id){
		ConfigUserDept configUserDept = configUserDeptService.queryObject(id);
		Response.json("configUserDept", configUserDept);
	}
	
	/**
	 * 保存
	 */
	@ResponseBody
	@RequestMapping("/save")
	@RequiresPermissions("configuserdept:save")
	public void save(@RequestBody ConfigUserDept configUserDept){
		configUserDept.setId(UUIDUtils.random());
		configUserDeptService.save(configUserDept);
		
		Response.ok();
	}
	
	/**
	 * 修改
	 */
	@ResponseBody
	@RequestMapping("/update")
	@RequiresPermissions("configuserdept:update")
	public void update(@RequestBody ConfigUserDept configUserDept){
		configUserDeptService.update(configUserDept);
		
		Response.ok();
	}
	
	/**
	 * 删除
	 */
	@ResponseBody
	@RequestMapping("/delete")
	@RequiresPermissions("configuserdept:delete")
	public void delete(@RequestBody String[] ids){
		configUserDeptService.deleteBatch(ids);
		
		Response.ok();
	}
	
}
