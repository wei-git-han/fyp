package com.css.addbase.apporgan.controller;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import com.css.app.fyp.work.entity.FypRoleEdit;
import com.css.app.fyp.work.service.FypRoleEditService;
import org.apache.commons.lang.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.alibaba.fastjson.JSONArray;
import com.alibaba.fastjson.JSONObject;
import com.css.addbase.apporgan.entity.BaseAppOrgan;
import com.css.addbase.apporgan.service.BaseAppOrganService;
import com.css.addbase.apporgan.service.BaseAppUserService;
import com.css.addbase.apporgan.util.OrgUtil;
import com.css.addbase.apporgmapped.service.BaseAppOrgMappedService;
import com.css.base.utils.CurrentUser;
import com.css.base.utils.GwPageUtils;
import com.css.base.utils.Response;
import com.github.pagehelper.util.StringUtil;
/**
 * 自定义部门表
 * 
 * @author gengds
 */
@Controller
@RequestMapping("app/base/dept")
public class BaseAppOrganController {
	
	@Autowired
	private BaseAppOrganService baseAppOrganService;
	@Autowired
	private BaseAppUserService baseAppUserService;
	@Autowired
	private BaseAppOrgMappedService baseAppOrgMappedService;
	@Autowired
	private FypRoleEditService fypRoleEditService;

	/**
	 * 获取以当前登录人部门为根节点的部门树(获取全部的叶子节点)
	 * @return
	 */
	@RequestMapping(value = "/tree")
	@ResponseBody
	public Object getDeptTree() {
		//查是否是保障管理员
		FypRoleEdit role = fypRoleEditService.queryTypeByUserId(CurrentUser.getUserId());
		String organId = "root";
		if(role != null){
			organId = "root";
		}else{
			organId = baseAppOrgMappedService.getBareauByUserId(CurrentUser.getUserId());
		}
		List<BaseAppOrgan> organs = baseAppOrganService.queryList(null);
		JSONObject list= OrgUtil.getOrganTree(organs, organId);
		return list;
	}
	
	/**
	 * 获取以当前登录人部门为根节点的部门树(获取全部的叶子节点)
	 * @return
	 */
	@RequestMapping(value = "/tree2")
	@ResponseBody
	public Object getDeptTree2() {
		String organId = baseAppOrgMappedService.getBareauByUserId(CurrentUser.getUserId());
		List<BaseAppOrgan> organs = baseAppOrganService.queryList(null);
		JSONObject list= OrgUtil.getOrganTree(organs, null);
		return list;
	}
	

	/**
	 * 获取以指定部门ID为根节点的部门树(获取全部的叶子节点)
	 * @param organId 指定部门ID
	 * @return
	 */
	@RequestMapping(value = "/spetree")
	@ResponseBody
	public Object getSpeDeptTree(String organId) {
		List<BaseAppOrgan> organs = baseAppOrganService.queryList(null);
		JSONObject list= OrgUtil.getOrganTree(organs, organId);
		return list;
	}
	
	@RequestMapping(value = "/getParent")
	@ResponseBody
	public Object getParent(String organId) {
		List<BaseAppOrgan> organs = baseAppOrganService.queryList(null);
		String orgName= OrgUtil.getParentOrg(organs, organId);
		return orgName;
	}
	
	/**
	 * 只获取root节点下的叶子节点
	 */
	@RequestMapping(value = "/tree_onlyroot")
	@ResponseBody
	public Object getDeptTreeOnlyRootChildren() {
		List<BaseAppOrgan> organs = baseAppOrganService.queryList(null);
		JSONObject list= OrgUtil.getOrganTree(organs,"root",true,true);
		return list;
	}

	/**
	 * 只获取root节点下的叶子节点
	 */
	@RequestMapping(value = "/queryNotCountList")
	@ResponseBody
	public Object queryNotCountList() {
		List<BaseAppOrgan> organs = baseAppOrganService.queryNotCountList(null);
		JSONObject list= OrgUtil.getOrganTree(organs,"root",true,true);
		return list;
	}
	
	/**
	 * 根据部门ID获取子部门信息
	 * @param organId 部门ID
	 */
	@RequestMapping(value = "/list")
	@ResponseBody
	public void list(String organId) {
		List<BaseAppOrgan> depts = baseAppOrganService.findByParentId(organId);
		GwPageUtils pageUtil = new GwPageUtils(depts);
		Response.json(pageUtil);
	}

	/**
	 * 根据部门ID获取部门名称
	 * @param organId
	 */
	@RequestMapping(value = "/deptname")
	@ResponseBody
	public void deptname(String organId){
		if (StringUtils.isNotBlank(organId)) {
			BaseAppOrgan organ = baseAppOrganService.queryObject(organId);
			Response.json("name",organ.getName());
		} 
	}
	
    /**
     * 根据指定的部门ID获取部门字典
     * @param organId
     */
	@ResponseBody
	@RequestMapping("/{organId}")
	public void info(@PathVariable("organId") String organId){
		JSONObject deptDic = new JSONObject();
		JSONArray jsons = new JSONArray();
		List<BaseAppOrgan> depts = baseAppOrganService.findByParentId(organId);
		for (BaseAppOrgan dept:depts) {
			JSONObject json = new JSONObject();
			json.put("value", dept.getId());
			json.put("text", dept.getName());
			jsons.add(json);
		}
		deptDic.put("dept", jsons);
		 Response.json(deptDic);
	}
	

	
	/**
	 * 获取以当所有部门为根节点的部门树(获取全部的叶子节点)
	 * @return
	 */
	@RequestMapping(value = "/allOrgTree")
	@ResponseBody
	public Object allOrgTree(String organId) {
		if(StringUtil.isEmpty(organId)) {
			organId = baseAppOrgMappedService.getBareauByUserId(CurrentUser.getUserId());
		}
		List<BaseAppOrgan> organs = baseAppOrganService.queryList(null);
		List<BaseAppOrgan> listOrg=new ArrayList<BaseAppOrgan>();
		for(BaseAppOrgan org:organs) {
			String[] arr=org.getTreePath().split(",");
			if(arr.length<5) {
				listOrg.add(org);
			}
		}
		
		JSONObject list= OrgUtil.getOrganTree(listOrg, organId);
		return list;
	}
	
	/**
	 * 获取所有局级单位
	 * @return
	 */
	@RequestMapping(value = "/allGeneralOrg")
	@ResponseBody
	public Object allGeneralOrg(String organId) {
		if(StringUtil.isEmpty(organId)) {
			organId = baseAppOrgMappedService.getBareauByUserId(CurrentUser.getUserId());
		}
		List<BaseAppOrgan> organs = baseAppOrganService.queryList(null);
		List<BaseAppOrgan> listOrg=new ArrayList<BaseAppOrgan>();
		for(BaseAppOrgan org:organs) {
			String[] arr=org.getTreePath().split(",");
			if(arr.length<4) {
				listOrg.add(org);
			}
		}
		JSONObject list= OrgUtil.getOrganTree(listOrg, organId);
		return list;
	}


	/**
	 * 获取以指定部门ID为根节点的部门树(获取全部的叶子节点)
	 * @param organId 指定部门ID
	 * @return
	 */
	/*@RequestMapping(value = "/divisiontree")
	@ResponseBody
	public Object divisiontree(String organId) {
		CurrentUser.getUserId().
		List<BaseAppOrgan> organs = baseAppOrganService.queryList(null);
		JSONObject list= OrgUtil.getOrganTree(organs, organId);
		return list;
	}*/

}
