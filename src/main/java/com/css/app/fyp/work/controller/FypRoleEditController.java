package com.css.app.fyp.work.controller;

import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.JSONObject;
import com.css.app.fyp.utils.ResponseValueUtils;
import com.css.app.fyp.work.entity.FypGuaranteeTacking;
import org.apache.shiro.authz.annotation.RequiresPermissions;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.stereotype.Controller;

import com.css.base.utils.CurrentUser;
import com.css.base.utils.PageUtils;
import com.css.base.utils.UUIDUtils;
import com.github.pagehelper.PageHelper;
import com.css.base.utils.Response;
import com.css.app.fyp.work.entity.FypRoleEdit;
import com.css.app.fyp.work.service.FypRoleEditService;
// import sun.util.resources.cldr.fr.CalendarData_fr_YT;


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
		if(fypRoleEditList != null && fypRoleEditList.size() > 0){
			for(FypRoleEdit fypRoleEdit : fypRoleEditList){
				String deptId = fypRoleEdit.getDeptId();
			}
		}
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
	 * 用户角色信息
	 */
	@ResponseBody
	@RequestMapping("/getRole")
	public void getRole(){
		String currentUserId = CurrentUser.getUserId();
		Map<String, Object> map = new HashMap<>();
		map.put("userId", currentUserId);
		List<FypRoleEdit> fypRoleEdit = fypRoleEditService.queryList(map);
		JSONObject json = new JSONObject();
		String flag = "1";
		for(FypRoleEdit r : fypRoleEdit) {
			if(r.getRoleType() == 0 || r.getRoleType() == 1 || r.getRoleType() == 2) {
				flag = "0";
				break;
			}
		}
		json.put("flag", flag);
		Response.json(json);
	}
	
	/**
	 * 保存
	 */
	@ResponseBody
	@RequestMapping("/save")
	public void save( String[] userId,String[] userName,Integer roleType,String deptId,String deptName) {
		if (userId != null && userId.length > 0) {
			for (int i = 0; i < userId.length; i++) {
				FypRoleEdit fypRoleEdit = new FypRoleEdit();
				fypRoleEdit.setId(UUIDUtils.random());
				fypRoleEdit.setCreateTime(new Date());
				fypRoleEdit.setUserId(userId[i]);
				fypRoleEdit.setUserName(userName[i]);
				fypRoleEdit.setRoleType(roleType);
				fypRoleEdit.setDeptId(deptId);
				fypRoleEdit.setDeptName(deptName);
				fypRoleEdit.setEditUserId(CurrentUser.getUserId());
				fypRoleEdit.setEditUserName(CurrentUser.getUsername());
				fypRoleEditService.save(fypRoleEdit);
			}
		}
		Response.json(new ResponseValueUtils().success());
	}
	
	/**
	 * 修改
	 */
	@ResponseBody
	@RequestMapping("/update")
	public void update( FypRoleEdit fypRoleEdit){
		fypRoleEdit.setCreateTime(new Date());
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
