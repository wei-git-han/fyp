package com.css.app.fyp.work.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import com.alibaba.fastjson.JSON;
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
@RequestMapping("/fypguaranteetacking")
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
		//查询列表数据
		List<FypGuaranteeTacking> fypGuaranteeTackingList = fypGuaranteeTackingService.queryList(map);
		
		PageUtils pageUtil = new PageUtils(fypGuaranteeTackingList);
		Response.json("page",pageUtil);
	}
	
	
	/**
	 * 信息
	 */
	@ResponseBody
	@RequestMapping("/info/{id}")
	public void info(@PathVariable("id") String id){
		FypGuaranteeTacking fypGuaranteeTacking = fypGuaranteeTackingService.queryObject(id);
		Response.json("fypGuaranteeTacking", fypGuaranteeTacking);
	}
	
	/**
	 * 保存
	 */
	@ResponseBody
	@RequestMapping("/save")
	public void save(@RequestBody FypGuaranteeTacking fypGuaranteeTacking){
		fypGuaranteeTacking.setId(UUIDUtils.random());
		fypGuaranteeTackingService.save(fypGuaranteeTacking);
		
		Response.ok();
	}
	
	/**
	 * 修改
	 */
	@ResponseBody
	@RequestMapping("/update")
	public void update(@RequestBody FypGuaranteeTacking fypGuaranteeTacking){
		fypGuaranteeTackingService.update(fypGuaranteeTacking);
		
		Response.ok();
	}
	
	/**
	 * 删除
	 */
	@ResponseBody
	@RequestMapping("/delete")
	public void delete(@RequestBody String[] ids){
		fypGuaranteeTackingService.deleteBatch(ids);

		Response.ok();
	}
	
}
