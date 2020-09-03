package com.css.app.fyp.work.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import com.alibaba.fastjson.JSON;
import com.css.app.fyp.utils.ResponseValueUtils;
import com.css.app.fyp.work.entity.FypGuaranteeTacking;
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
import com.css.app.fyp.work.entity.FypRoleEdit;
import com.css.app.fyp.work.service.FypRoleEditService;


/**
 * 业务配置表、角色表
 * 
 * @author 中软信息系统工程有限公司
 * @email 
 * @date 2020-08-19 14:42:47
 */
@Controller
@RequestMapping("/fyp/roleedit")
public class FypRoleEditController {
	@Autowired
	private FypRoleEditService fypRoleEditService;
	
	/**
	 * 列表
	 */
	@ResponseBody
	@RequestMapping("/list")
	public void list(Integer page, Integer limit, FypRoleEdit FypRoleEdit){
		Map<String, Object> map = new HashMap<>();
		PageHelper.startPage(page, limit);
		Map<String, Object> paramMap = JSON.parseObject(JSON.toJSONString(FypRoleEdit), Map.class);
		map.putAll(paramMap);
		//查询列表数据
		List<FypRoleEdit> fypRoleEditList = fypRoleEditService.queryList(map);
		
		PageUtils pageUtil = new PageUtils(fypRoleEditList);
		Response.json(new ResponseValueUtils().success(pageUtil));
	}
	
	
	/**
	 * 信息
	 */
	@ResponseBody
	@RequestMapping("/info")
	public void info(String id){
		FypRoleEdit fypRoleEdit = fypRoleEditService.queryObject(id);
		Response.json(new ResponseValueUtils().success(fypRoleEdit));
	}
	
	/**
	 * 保存
	 */
	@ResponseBody
	@RequestMapping("/save")
	public void save( FypRoleEdit fypRoleEdit){
		fypRoleEdit.setId(UUIDUtils.random());
		fypRoleEditService.save(fypRoleEdit);
		Response.json(new ResponseValueUtils().success());
	}
	
	/**
	 * 修改
	 */
	@ResponseBody
	@RequestMapping("/update")
	public void update( FypRoleEdit fypRoleEdit){
		fypRoleEditService.update(fypRoleEdit);
		Response.json(new ResponseValueUtils().success());
	}
	
	/**
	 * 删除
	 */
	@ResponseBody
	@RequestMapping("/delete")
	public void delete( String[] ids){
		fypRoleEditService.deleteBatch(ids);
		Response.json(new ResponseValueUtils().success());
	}

	/**
	 * 获取所有单位信息
	 */
	@ResponseBody
	@RequestMapping("/findDeptAll")
	public void findDeptAll(){
		List<Map<String,Object>> list = fypRoleEditService.findDeptAll();
		Response.json(new ResponseValueUtils().success(list));
	}

	/**
	 * 获取所有用户信息
	 */
	@ResponseBody
	@RequestMapping("/findUserAll")
	public void findUserAll(String deptid){
		List<Map<String,Object>> list = fypRoleEditService.findUserAll(deptid);
		Response.json(new ResponseValueUtils().success(list));
	}
}
