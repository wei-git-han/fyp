package com.css.app.fyp.work.controller;

import java.util.*;

import com.alibaba.fastjson.JSON;
import com.css.app.fyp.utils.ResponseValueUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.stereotype.Controller;

import com.css.base.utils.PageUtils;
import com.css.base.utils.UUIDUtils;
import com.github.pagehelper.PageHelper;
import com.css.base.utils.Response;
import com.css.app.fyp.work.entity.FypGuaranteeTacking;
import com.css.app.fyp.work.service.FypGuaranteeTackingService;


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
	
}
