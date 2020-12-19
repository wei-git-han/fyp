package com.css.app.fyp.routine.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import com.alibaba.fastjson.JSONObject;
import com.css.app.fyp.utils.ResponseValueUtils;
import com.css.app.fyp.work.entity.FypRoleEdit;
import com.css.base.utils.*;
import com.github.pagehelper.util.StringUtil;
import org.apache.shiro.authz.annotation.RequiresPermissions;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.stereotype.Controller;

import com.github.pagehelper.PageHelper;
import com.css.app.fyp.routine.entity.ReignUser;
import com.css.app.fyp.routine.service.ReignUserService;


/**
 * 在位情况-人员状态表
 * 
 * @author 中软信息系统工程有限公司
 * @email 
 * @date 2020-12-17 14:51:10
 */
@Controller
@RequestMapping("/reignuser")
public class ReignUserController {
	@Autowired
	private ReignUserService reignUserService;
	
	/**
	 * 列表
	 */
	@ResponseBody
	@RequestMapping("/list")
	public void list(){
		//查询列表数据
		List<ReignUser> reignUserList = reignUserService.queryList(new HashMap<>());
		Response.json(new ResponseValueUtils().success(reignUserList));
	}
	
	
	/**
	 * 信息
	 */
	@ResponseBody
	@RequestMapping("/info")
	public void info(){
		ReignUser reignUser = reignUserService.queryObject(CurrentUser.getUserId());
		if(null!=reignUser && StringUtils.isBlank(reignUser.getStateName()) && StringUtils.isNotBlank(reignUser.getStateId())){
		    reignUser.setStateId("");
        }
		if(null==reignUser ){
			reignUser = new ReignUser();
		}
		if(null == reignUser.getUserId()){
			reignUser.setUserId(CurrentUser.getUserId());
			reignUser.setUserName(CurrentUser.getUsername());
		}
		Response.json(new ResponseValueUtils().success(reignUser));
	}

	/**
	 * 新增或修改
	 */
	@ResponseBody
	@RequestMapping("/saveOrUpdate")
	public void saveOrUpdate(ReignUser reignUser){
		reignUserService.saveOrUpdate(reignUser);

		Response.ok();
	}

	/**
	 * 保存
	 */
	@ResponseBody
	@RequestMapping("/save")
	public void save(ReignUser reignUser){
		reignUser.setId(UUIDUtils.random());
		reignUserService.save(reignUser);
		Response.ok();
	}
	
	/**
	 * 修改
	 */
	@ResponseBody
	@RequestMapping("/update")
	public void update(ReignUser reignUser){
		reignUserService.update(reignUser);
		
		Response.ok();
	}
	
	/**
	 * 删除
	 */
	@ResponseBody
	@RequestMapping("/delete")
	public void delete(String[] ids){
		reignUserService.deleteBatch(ids);
		
		Response.ok();
	}

	/**
	 * 改变用户状态，不显示
	 * @param userids
	 */
	@ResponseBody
	@RequestMapping(value = "/changeState")
	public void changeState(String userids){
		if(StringUtils.isNotBlank(userids)) {
			String[] split = userids.split(",");
			for (String userid : split) {
				ReignUser reignUser = reignUserService.queryObjectAll(userid);
				if (null != reignUser) {
					reignUser.setIsdelete(1);
					reignUserService.update(reignUser);
				}
			}
		}else{
			reignUserService.updateAll(0);
		}
	}

    /**
     * 获取当前登录人角色
     * return roleType 当前人角色 0:保障管理员；1:系统管理员；2:局管理员；3:在编人员
     */
    @ResponseBody
    @RequestMapping(value = "/getUserRole")
    public void getUserRole(){
        FypRoleEdit roleEdit =  reignUserService.getUserRole(CurrentUser.getUserId());
        Response.json(new ResponseValueUtils().success(roleEdit));
    }

    /**
     * 添加人员不可见状态
     */
    @ResponseBody
    @RequestMapping(value = "/changeVisual")
    public void changeVisual(String userIds){
        reignUserService.changeVisual(userIds);
        Response.ok();
    }

	/**
	 * 获取所有不可见人员id
	 */
	@ResponseBody
	@RequestMapping(value = "/getAllNotVisualUser")
	public void getAllNotVisualUser(){
		List<String> users = reignUserService.getAllNotVisualUser();
		Response.json(new ResponseValueUtils().success(users));
	}
}
