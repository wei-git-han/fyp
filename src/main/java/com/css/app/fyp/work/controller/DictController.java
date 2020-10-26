package com.css.app.fyp.work.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import com.alibaba.fastjson.JSONArray;
import com.alibaba.fastjson.JSONObject;
import com.css.addbase.apporgan.entity.BaseAppOrgan;
import com.css.addbase.apporgan.service.BaseAppOrganService;
import com.css.addbase.apporgan.service.BaseAppUserService;
import com.css.addbase.apporgan.util.OrgUtil;
import com.css.addbase.apporgmapped.service.BaseAppOrgMappedService;
import com.css.app.fyp.utils.ResponseValueUtils;
import com.css.base.utils.*;
import org.apache.shiro.authz.annotation.RequiresPermissions;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.stereotype.Controller;

import com.github.pagehelper.PageHelper;
import com.css.app.fyp.work.entity.Dict;
import com.css.app.fyp.work.service.DictService;


/**
 * 
 * 
 * @author 中软信息系统工程有限公司
 * @email 
 * @date 2020-10-26 18:34:32
 */
@RestController
@RequestMapping("/dict")
public class DictController {
	@Autowired
	private DictService dictService;
	@Autowired
	private BaseAppOrganService baseAppOrganService;
	@Autowired
	private BaseAppOrgMappedService baseAppOrgMappedService;
	
	/**
	 * 列表
	 */
	@ResponseBody
	@RequestMapping("/list")
	public void list(Integer page, Integer limit,String type){
		Map<String, Object> map = new HashMap<>();
		PageHelper.startPage(page, limit);
		map.put("type",type);
		
		//查询列表数据
		List<Dict> dictList = dictService.queryList(map);
		
		GwPageUtils pageUtil = new GwPageUtils(dictList);
		Response.json(new ResponseValueUtils().success(pageUtil));
	}
	
	
	/**
	 * 信息
	 */
	@ResponseBody
	@RequestMapping("/info")
	public void info(String id){
		Dict dict = dictService.queryObject(id);
		Response.json("dict", dict);
	}
	
	/**
	 * 保存
	 */
	@ResponseBody
	@RequestMapping("/save")
	public void save(Dict dict){
		dict.setId(UUIDUtils.random());
		dict.setType(0);
		dictService.save(dict);
		
		Response.ok();
	}
	
	/**
	 * 修改
	 */
	@ResponseBody
	@RequestMapping("/update")
	public void update(Dict dict){
		dictService.update(dict);
		
		Response.ok();
	}
	
	/**
	 * 删除
	 */
	@ResponseBody
	@RequestMapping("/delete")
	public void delete(String[] ids){
		dictService.deleteBatch(ids);
		
		Response.ok();
	}

	/**
	 * 统计单位配置添加
	 */
	@ResponseBody
	@RequestMapping(value = "/insertConfigDept")
	public void insertConfigDept(String deptids,String type){
		dictService.insertConfigDept(deptids,type);
		Response.ok();
	}

	/**
	 * 统计单位配置查询
	 */
	@ResponseBody
	@RequestMapping(value = "/findConfigDept")
	public void findConfigDept(){
		List<Map<String,Object>> list = dictService.findDeptids();

		String organId = baseAppOrgMappedService.getBareauByUserId(CurrentUser.getUserId());
		List<BaseAppOrgan> organs = baseAppOrganService.queryList(null);
		JSONObject lists= OrgUtil.getOrganTree(organs, organId);
		JSONArray children = (JSONArray)lists.get("children");
		/*for (:
			 ) {
			
		}*/
		Response.json(new ResponseValueUtils().success(list));
	}

	/**
	 * 统计人员配置添加
	 */
	@ResponseBody
	@RequestMapping(value = "/insertConfigUser")
	public void insertConfigUser(String userids){
		dictService.insertConfigUser(userids);
		Response.ok();
	}

	/**
	 * 统计人员配置查询
	 */
	@ResponseBody
	@RequestMapping(value = "/findConfigUser")
	public void findConfigUser(){
		List<Map<String,Object>> list = dictService.findUserids();
		Response.json(new ResponseValueUtils().success(list));
	}

	/**
	 * 软硬件名称
	 * 问题分类
	 * 查询
	 */



}
