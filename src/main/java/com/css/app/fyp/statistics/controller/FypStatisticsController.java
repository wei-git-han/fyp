package com.css.app.fyp.statistics.controller;

import java.util.*;

import com.css.app.fyp.utils.ResponseValueUtils;
import com.css.base.utils.CurrentUser;
import org.apache.shiro.authz.annotation.RequiresPermissions;
import org.json.JSONObject;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.PropertySource;
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

import javax.annotation.PostConstruct;


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
	private final Logger logger = LoggerFactory.getLogger(FypStatisticsController.class);

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
	 * 推送至平台数据测试列表
	 */
	@ResponseBody
	@RequestMapping("/desktopList")
	public void desktopList(){
		fypStatisticsService.pushDesktop();
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
	
	/**
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
		logger.info("开始接口----------------------------------");
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


	@PostConstruct
	public void timer(){
/*		Calendar instance = Calendar.getInstance();
		instance.set(Calendar.HOUR_OF_DAY,2);//控制时
		instance.set(Calendar.MINUTE,0);//控制分
		instance.set(Calendar.SECOND,0);//控制秒
		Date date = instance.getTime();
		//第一次执行任务的时间，默认第二天执行，否则会立即执行
		if(date.before(new Date())){
			date = this.addDay(date,1);
		}
		Timer timer = new Timer();
		//毫秒
		timer.schedule(new TimerTask() {
			@Override
			public void run() {
				try {
					fypStatisticsService.syncData();
				} catch (Exception e) {
					e.printStackTrace();
				}
			}
		},120000);//延时每天固定执行*/
		// date,1000*60*60*168
	}

	/**
	 * 增加或减少天数
	 */
	public Date addDay(Date date,int num){
		Calendar startDT = Calendar.getInstance();
		startDT.setTime(date);
		startDT.add(Calendar.DAY_OF_MONTH,num);
		return startDT.getTime();
	}

}
