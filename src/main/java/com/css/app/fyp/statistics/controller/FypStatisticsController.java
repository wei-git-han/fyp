package com.css.app.fyp.statistics.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import com.css.app.fyp.utils.ResponseValueUtils;
import com.css.base.utils.CurrentUser;
import org.apache.shiro.authz.annotation.RequiresPermissions;
import org.json.JSONObject;
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
import com.css.app.fyp.statistics.entity.FypStatistics;
import com.css.app.fyp.statistics.service.FypStatisticsService;


/**
 * 年度统计表
 * 
 * @author 中软信息系统工程有限公司
 * @email 
 * @date 2020-12-11 16:09:16
 */
@Controller
@RequestMapping("/fypstatistics")
public class FypStatisticsController {
	@Autowired
	private FypStatisticsService fypStatisticsService;
	
	/**
	 * 列表
	 */
	@ResponseBody
	@RequestMapping("/list")
	public void list(){
		HashMap<String, Object> paramMap = new HashMap<>();
		paramMap.put("userId", CurrentUser.getUserId());
		//查询列表数据
		List<FypStatistics> fypStatisticsList = fypStatisticsService.queryList(paramMap);
		
//		PageUtils pageUtil = new PageUtils(fypStatisticsList);
		Response.json(new ResponseValueUtils().success(fypStatisticsList));
	}
	
	
	/**
	 * 信息
	 */
	@ResponseBody
	@RequestMapping("/isShow")
	public void info(){
	    //根据当前登录人id查询是否展示统计页
		FypStatistics fypStatistics = fypStatisticsService.queryObject(CurrentUser.getUserId());
		Response.json(new ResponseValueUtils().success(fypStatistics));
	}
	
	/**-、
	 * 保存
	 */
	@ResponseBody
	@RequestMapping("/save")
	public void save(@RequestBody FypStatistics fypStatistics){
		fypStatistics.setId(UUIDUtils.random());
		fypStatisticsService.save(fypStatistics);
		
		Response.ok();
	}
	
	/**
	 * 修改
	 */
	@ResponseBody
	@RequestMapping("/update")
	public void update(@RequestBody FypStatistics fypStatistics){
		fypStatisticsService.update(fypStatistics);
		
		Response.ok();
	}
	
	/**
	 * 删除
	 */
	@ResponseBody
	@RequestMapping("/delete")
	public void delete(@RequestBody String[] ids){
		fypStatisticsService.deleteBatch(ids);
		
		Response.ok();
	}


	/**
	 * 手动同步数据接口
	 */
	@RequestMapping(value = "/syncData")
	@ResponseBody
	public void syncData(){
		fypStatisticsService.syncData();
		Response.json(new ResponseValueUtils().success());
	}

	/**
	 * 统计单位-添加
	 * 局单位
	 */
	public void deptInsert(String deptids){
		String[] deptArr = null;
		String[] split = deptids.split(",");
		if(0<split.length){
			deptArr = split;
		}else{
			deptArr = new String[0];
			deptArr[0] = deptids;
		}
		fypStatisticsService.insertDeptids(deptArr);
		JSONObject jsonObject = new JSONObject();
		jsonObject.put("result","success");
		Response.json(jsonObject);
	}

}
