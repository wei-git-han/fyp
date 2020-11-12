package com.css.app.fyp.work.controller;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.*;

import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.JSONObject;
import com.css.addbase.apporgan.entity.BaseAppOrgan;
import com.css.addbase.apporgan.service.BaseAppOrganService;
import com.css.addbase.apporgan.util.OrgUtil;
import com.css.addbase.apporgmapped.entity.BaseAppOrgMapped;
import com.css.addbase.apporgmapped.service.BaseAppOrgMappedService;
import com.css.addbase.constant.AppInterfaceConstant;
import com.css.app.fyp.utils.PoiUtils;
import com.css.app.fyp.utils.ResponseValueUtils;
import com.css.app.fyp.work.entity.FypFeedbackHear;
import com.css.base.filter.SSOAuthFilter;
import com.css.base.utils.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.stereotype.Controller;

import com.github.pagehelper.PageHelper;
import com.css.app.fyp.work.entity.FypGuaranteeTacking;
import com.css.app.fyp.work.service.FypGuaranteeTackingService;
import org.springframework.web.multipart.MultipartFile;


/**
 * 保障问题跟踪表
 *
 * @author 中软信息系统工程有限公司
 * @email
 * @date 2020-08-13 17:30:50
 */
@Controller
@RequestMapping("/fyp/guaranteetacking")
public class FypGuaranteeTackingController {
	@Autowired
	private FypGuaranteeTackingService fypGuaranteeTackingService;
	@Autowired
	private BaseAppOrganService baseAppOrganService;
	@Autowired
	private BaseAppOrgMappedService baseAppOrgMappedService;
	
	/**
	 * 列表
	 */
	@ResponseBody
	@RequestMapping("/list")
	public void list(Integer page, Integer limit,FypGuaranteeTacking tacking){

        Map<String, Object> paramMap = JSON.parseObject(JSON.toJSONString(tacking), Map.class);

		Map<String, Object> map = new HashMap<>();
		PageHelper.startPage(page, limit);
        map.putAll(paramMap);
		if(null!=tacking.getWarrantyTimeBegin()&&null!=tacking.getWarrantyTimeEnd()) {
			map.put("warrantyTimeBegin", tacking.getWarrantyTimeBegin());
			Calendar warrantyTimeEndinstance = Calendar.getInstance();
			warrantyTimeEndinstance.setTime(tacking.getWarrantyTimeEnd());
			warrantyTimeEndinstance.add(Calendar.DAY_OF_MONTH, 1);
			map.put("warrantyTimeEnd", warrantyTimeEndinstance.getTime());
		}
		//查询列表数据
		List<FypGuaranteeTacking> fypGuaranteeTackingList = fypGuaranteeTackingService.queryList(map);
		String organId = "";
		for(FypGuaranteeTacking f : fypGuaranteeTackingList) {
			organId = f.getDeptId();
			if(null!=organId) {
				List<BaseAppOrgan> organs = baseAppOrganService.queryList(null);
				String orgName = OrgUtil.getParentOrg(organs, organId);
				String orgNameR = orgName.replace(",", "-");
				f.setDeptName(orgNameR);
			}
		}
		PageUtils pageUtil = new PageUtils(fypGuaranteeTackingList);
        Response.json(new ResponseValueUtils().success(pageUtil));
	}

	
	/**
	 * 信息
	 */
	@ResponseBody
	@RequestMapping("/info")
	public void info(String id){
		FypGuaranteeTacking fypGuaranteeTacking = fypGuaranteeTackingService.queryObject(id);
		Response.json(new ResponseValueUtils().success(fypGuaranteeTacking));
	}
	
	/**
	 * 保存
	 */
	@ResponseBody
	@RequestMapping("/save")
	public void save(FypGuaranteeTacking fypGuaranteeTacking){
		fypGuaranteeTacking.setId(UUIDUtils.random());
		fypGuaranteeTacking.setWarrantyTime(new Date());
		fypGuaranteeTacking.setStatusTime(new Date());
		fypGuaranteeTackingService.save(fypGuaranteeTacking);

		Response.json(new ResponseValueUtils().success());
	}
	
	/**
	 * 修改
	 */
	@ResponseBody
	@RequestMapping("/update")
	public void update(FypGuaranteeTacking fypGuaranteeTacking){
		fypGuaranteeTacking.setStatusTime(new Date());
		fypGuaranteeTackingService.update(fypGuaranteeTacking);

		Response.json(new ResponseValueUtils().success());
	}
	
	/**
	 * 删除
	 */
	@ResponseBody
	@RequestMapping("/delete")
	public void delete(String[] ids){
		fypGuaranteeTackingService.deleteBatch(ids);

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
		FypGuaranteeTacking fypGuaranteeTacking = null;
		SimpleDateFormat simpleDateFormat = new SimpleDateFormat("yyyy-MM-dd");
		for (Object key:dataMap.keySet()) {
			List<Object> objects = dataMap.get(key);
			if(null!=objects&&0<objects.size()){
				try {


					fypGuaranteeTacking = new FypGuaranteeTacking();
					fypGuaranteeTacking.setId(UUIDUtils.random());

					//单位名称
					fypGuaranteeTacking.setDeptName(objects.get(0).toString());
					//用户名称
					fypGuaranteeTacking.setUserName(objects.get(1).toString());
					//问题来源
					fypGuaranteeTacking.setSource(objects.get(2).toString());
					//状态
					fypGuaranteeTacking.setStatus(objects.get(3).toString());
					//联系电话
					fypGuaranteeTacking.setPhone(objects.get(4).toString());
					//问题描述
					fypGuaranteeTacking.setRemark(objects.get(5).toString());
					//处理措施
					fypGuaranteeTacking.setMeasures(objects.get(6).toString());
					//报修时间
					fypGuaranteeTacking.setWarrantyTime(new Date());
					//更新时间
					fypGuaranteeTacking.setStatusTime(new Date());
					fypGuaranteeTackingService.save(fypGuaranteeTacking);
				} catch (Exception e) {
					e.printStackTrace();
				}
			}
		}
	}

	/**
	 * 根据用户获取通讯录信息
	 */
	@RequestMapping(value = "/findUserInfoByUserId")
	@ResponseBody
	public void findUserInfoByUserId(String userid){
		JSONObject jsonObject = new JSONObject();
		try {
			JSONObject txlInfo = this.getTxlInfo(userid);
			jsonObject.put("result","success");
			if(null!=txlInfo) {
				List<Map<String,Object>> rows = (List<Map<String,Object>>)txlInfo.get("rows");
				jsonObject.put("telePhone", rows.get(0).get("telephone"));
				jsonObject.put("phone", rows.get(0).get("mobile"));
			}
			Response.json(jsonObject);
		}catch (Exception e){
			jsonObject.put("result","fail");
			Response.json(jsonObject);
		}
	}

	/**
	 * 调用通讯录获取选中的电话信息
	 */
	private JSONObject getTxlInfo(String userid){
		LinkedMultiValueMap<String, Object> objectObjectLinkedMultiValueMap = new LinkedMultiValueMap<>();
		objectObjectLinkedMultiValueMap.add("userId",userid);
		objectObjectLinkedMultiValueMap.add("page","1");
		objectObjectLinkedMultiValueMap.add("rows","10");
		BaseAppOrgMapped document = (BaseAppOrgMapped)baseAppOrgMappedService.orgMappedByOrgId("","","txl");
		JSONObject jsonData = CrossDomainUtil.getTokenByJsonData(document.getUrl() + AppInterfaceConstant.WEB_INERFACE_TXL_MANAGETHING, objectObjectLinkedMultiValueMap, SSOAuthFilter.getToken());
		return jsonData;
	}
}
