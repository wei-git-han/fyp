package com.css.app.fyp.routine.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import com.css.app.fyp.routine.vo.FypPersonageWorkWeekVo;
import com.css.base.utils.CurrentUser;
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
import com.css.app.fyp.routine.entity.FypPersonageWorkWeek;
import com.css.app.fyp.routine.service.FypPersonageWorkWeekService;


/**
 * 
 * 
 * @author 中软信息系统工程有限公司
 * @email 
 * @date 2020-08-24 16:25:47
 */
@Controller
@RequestMapping("/fyppersonageworkweek")
public class FypPersonageWorkWeekController {
	@Autowired
	private FypPersonageWorkWeekService fypPersonageWorkWeekService;
	
	/**
	 * 列表
	 */
	@ResponseBody
	@RequestMapping("/list")
	@RequiresPermissions("fyppersonageworkweek:list")
	public void list(Integer page, Integer limit){
		String userId = CurrentUser.getUserId();
		Map<String, Object> map = new HashMap<>();
		PageHelper.startPage(page, limit);
		//查询列表数据
		List<FypPersonageWorkWeekVo> fypPersonageWorkWeekList = fypPersonageWorkWeekService.getPersonalWeekTableList(map, userId);
		PageUtils pageUtil = new PageUtils(fypPersonageWorkWeekList);
		Response.json("page",pageUtil);
	}
	
	
	/**
	 * 信息
	 */
	@ResponseBody
	@RequestMapping("/info/{id}")
	@RequiresPermissions("fyppersonageworkweek:info")
	public void info(@PathVariable("id") String id){
		FypPersonageWorkWeek fypPersonageWorkWeek = fypPersonageWorkWeekService.queryObject(id);
		Response.json("fypPersonageWorkWeek", fypPersonageWorkWeek);
	}
	
	/**
	 * 保存
	 */
	@ResponseBody
	@RequestMapping("/save")
	@RequiresPermissions("fyppersonageworkweek:save")
	public void save(@RequestBody FypPersonageWorkWeek fypPersonageWorkWeek){
		fypPersonageWorkWeek.setId(UUIDUtils.random());
		fypPersonageWorkWeekService.save(fypPersonageWorkWeek);
		
		Response.ok();
	}
	
	/**
	 * 修改
	 */
	@ResponseBody
	@RequestMapping("/update")
	@RequiresPermissions("fyppersonageworkweek:update")
	public void update(@RequestBody FypPersonageWorkWeek fypPersonageWorkWeek){
		fypPersonageWorkWeekService.update(fypPersonageWorkWeek);
		
		Response.ok();
	}
	
	/**
	 * 删除
	 */
	@ResponseBody
	@RequestMapping("/delete")
	@RequiresPermissions("fyppersonageworkweek:delete")
	public void delete(@RequestBody String[] ids){
		fypPersonageWorkWeekService.deleteBatch(ids);
		
		Response.ok();
	}
	
}
