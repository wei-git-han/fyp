package com.css.app.fyp.work.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import com.alibaba.fastjson.JSONArray;
import com.alibaba.fastjson.JSONObject;
import com.css.addbase.apporgan.entity.BaseAppOrgan;
import com.css.addbase.apporgan.entity.BaseAppUser;
import com.css.addbase.apporgan.service.BaseAppOrganService;
import com.css.addbase.apporgan.service.BaseAppUserService;
import com.css.addbase.apporgan.util.OrgUtil;
import com.css.addbase.apporgmapped.service.BaseAppOrgMappedService;
import com.css.app.fyp.utils.ResponseValueUtils;
import com.css.app.fyp.work.entity.FypRoleEdit;
import com.css.app.fyp.work.service.FypRoleEditService;
import com.css.base.utils.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.github.pagehelper.PageHelper;
import com.css.app.fyp.work.entity.Dict;
import com.css.app.fyp.work.service.DictService;

import javax.servlet.http.HttpServletRequest;


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
	@Autowired
	private BaseAppUserService baseAppUserService;
	@Autowired
	private FypRoleEditService fypRoleEditService;

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
	public void delete(String id){
		dictService.delete(id);

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
	public void getDeptList(HttpServletRequest request) {
		JSONObject result = new JSONObject();
		JSONArray jsons = new JSONArray();
		//查是否是保障管理员
		FypRoleEdit role = fypRoleEditService.queryTypeByUserId(CurrentUser.getUserId());
		String organId = "root";
		if(role != null){
			organId = "root";
		}else{
			organId = baseAppOrgMappedService.getBareauByUserId(CurrentUser.getUserId());
		}
		JSONArray list=  getUserList(organId,jsons);
		Map<String,Object> map=new HashMap<String,Object>();
		map.put("parentId", organId);
		int depts_count= baseAppOrganService.queryTotal(map);
		map=new HashMap<String,Object>();
		map.put("departmentId", organId);
		int users_count= baseAppUserService.queryTotal(map);

		result.put("total", depts_count + users_count);
		result.put("rows", list);
		GwPageUtils pageUtil = new GwPageUtils(list);
		Response.json("page",pageUtil);
	}

	/**
	 * 在编人员配置查询
	 */
	@ResponseBody
	@RequestMapping(value = "/getAllUserList")
	public void getAllUserList(HttpServletRequest request) {
		JSONObject result = new JSONObject();
		JSONArray jsons = new JSONArray();
		//查是否是保障管理员
		FypRoleEdit role = fypRoleEditService.queryTypeByUserId(CurrentUser.getUserId());
		String organId = "root";
		if(role != null){
			organId = "root";
		}else{
			organId = baseAppOrgMappedService.getBareauByUserId(CurrentUser.getUserId());
		}
		JSONArray list=  getAllUsers(organId,jsons);
		Map<String,Object> map=new HashMap<String,Object>();
		map.put("parentId", organId);
		int depts_count= baseAppOrganService.queryTotal(map);
		map=new HashMap<String,Object>();
		map.put("departmentId", organId);
		int users_count= baseAppUserService.queryTotal(map);

		result.put("total", depts_count + users_count);
		result.put("rows", list);
		//Response.json(result);
		GwPageUtils pageUtil = new GwPageUtils(list);
		Response.json("page",pageUtil);
	}

	public JSONArray getUserList(String id,JSONArray jsons) {
		List<Map<String, Object>> list = dictService.findDeptids();
		List<BaseAppOrgan> depts = baseAppOrganService.findByParentId(id);
		String organid = baseAppOrgMappedService.getBareauByUserId(CurrentUser.getUserId());
		for (int i = 0; i < depts.size(); i++) {
			BaseAppOrgan dept = depts.get(i);
			JSONObject json = new JSONObject();
			json.put("id", dept.getId());
			json.put("name", dept.getName());
			json.put("rownum", i + 1);
			json.put("phone", "");
			json.put("auth", "");
			json.put("lx", "dept");
			json.put("state", "closed");
			json.put("dictType", "0");
			if (organid.equals(dept.getParentId())) {
				json.put("_parentId", "");
			} else {
				json.put("_parentId", id);
			}
			if (list != null && list.size() > 0) {
				for (Map<String, Object> map : list) {
					if (dept.getId().toString().equals(map.get("DEPT_ID").toString())) {
						json.put("dictType", "1");
					}
				}
			}
			jsons.add(json);
			getUserList(dept.getId(), jsons);
		}
		if (organid.equals(id)) {
			jsonObject(jsons, id);
		}
		return jsons;
	}

	public JSONArray getAllUsers(String id,JSONArray jsons) {
		List<Map<String, Object>> list = dictService.findDeptids();
		List<BaseAppOrgan> depts = baseAppOrganService.findByParentId(id);
		String organid = baseAppOrgMappedService.getBareauByUserId(CurrentUser.getUserId());
		for (int i = 0; i < depts.size(); i++) {
			BaseAppOrgan dept = depts.get(i);
			JSONObject json = new JSONObject();
			json.put("id", dept.getId());
			json.put("name", dept.getName());
			json.put("rownum", i + 1);
			json.put("phone", "");
			json.put("auth", "");
			json.put("lx", "dept");
			json.put("state", "closed");
			json.put("dictType", "0");
			if (organid.equals(dept.getParentId())) {
				json.put("_parentId", "");
			} else {
				json.put("_parentId", id);
			}
			if (list != null && list.size() > 0) {
				for (Map<String, Object> map : list) {
					if (dept.getId().toString().equals(map.get("DEPT_ID").toString())) {
						json.put("dictType", "1");
					}
				}
			}
			jsons.add(json);
			getAllUsers(dept.getId(), jsons);
		}
		if (organid.equals(id)) {
			jsonObject(jsons, id);
		}
		return jsons;
	}


	@ResponseBody
	@RequestMapping("/getAllUser")
	public void getAllUser(String id) {
		JSONObject result = new JSONObject();
		JSONArray jsons = new JSONArray();
		List<BaseAppUser> list = dictService.findAllUsers();
		List<BaseAppUser> appUserList = baseAppUserService.queryAllUserByDeptId(id);//查出该部门所有的人
		if (appUserList != null && appUserList.size() > 0) {
			for (int j = 0; j < appUserList.size(); j++) {
				BaseAppUser baseAppUser = appUserList.get(j);
				String userId = baseAppUser.getUserId();
				JSONObject json = new JSONObject();
				json.put("id", baseAppUser.getUserId());
				json.put("name", baseAppUser.getTruename());
				json.put("type", "1");
				json.put("dictType", "0");
				if (list != null && list.size() > 0) {
					for (int i = 0; i < list.size(); i++) {
						if (userId.equals(list.get(i).getUserId())) {
							json.put("dictType", "1");
						}
					}
				}
				jsons.add(json);
			}

		}
		result.put("rows", jsons);
		Response.json(result);
	}





	private void jsonObject(JSONArray jsons, String id) {
		List<BaseAppUser> users = baseAppUserService.findByDepartmentId(id);
		for (BaseAppUser user:users) {
			JSONObject json = new JSONObject();
			json.put("id", user.getId());
			json.put("name", user.getTruename());
			json.put("phone", user.getMobile());
			json.put("newadd", "ok");
			json.put("auth", "");
			json.put("type", "1");
			//授权
			String roleNames = "";
			json.put("auth",roleNames);
			json.put("lx","user");
			String organid = baseAppOrgMappedService.getBareauByUserId(CurrentUser.getUserId());
			if (!organid.equals(id)) {
				json.put("_parentId", id);
			}
			jsons.add(json);
		}
	}

	/**
	 * 统计人员配置添加
	 */
	@ResponseBody
	@RequestMapping(value = "/insertConfigUser")
	public void insertConfigUser(String userids, String type){
		if("1".equals(type)){
			dictService.insertConfigUser(userids);
		}else{
			dictService.deleteUserById(userids);
		}
		Response.ok();
	}

	/**
	 * 统计人员配置查询
	 */
	@ResponseBody
	@RequestMapping(value = "/findConfigUser")
	public void findConfigUser(){
		List<Map<String,Object>> list = dictService.findUserids();
		JSONObject result = new JSONObject();
		JSONArray jsons = new JSONArray();

		result.put("total", list.size());
		result.put("rows", list);
		Response.json(result);
//		Response.json(new ResponseValueUtils().success(list));
	}
}
