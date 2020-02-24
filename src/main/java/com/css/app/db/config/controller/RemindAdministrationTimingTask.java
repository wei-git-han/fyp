package com.css.app.db.config.controller;




import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Timer;
import java.util.TimerTask;

import org.apache.commons.lang.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import com.css.addbase.msg.MSGTipDefined;
import com.css.addbase.msg.MsgTipUtil;
import com.css.addbase.msg.entity.MsgTip;
import com.css.addbase.msg.service.MsgTipService;
import com.css.app.db.business.entity.SubDocInfo;
import com.css.app.db.business.service.SubDocInfoService;
import com.css.app.db.config.entity.RemindAdministration;
import com.css.app.db.config.service.RemindAdministrationService;
import com.css.base.utils.Response;

/**
 * 提醒消息定时任务
 * */
@Component
public class RemindAdministrationTimingTask {
	//java 定时器
	private Timer timer = null;
	//定时器任务
	private static TimerTask timerTask = null;
	//定时器状态：true：定时器开启；false：定时器关闭
	private static boolean status = true;
	@Autowired
	private RemindAdministrationService remindAdministrationService;
	@Autowired
	private SubDocInfoService subDocInfoService;
	@Autowired
	private MsgTipService msgService;
	@Autowired
	private MsgTipUtil msgUtil;
	@Value("${csse.dccb.appId}")
	private  String appId;	
	@Value("${csse.dccb.appSecret}")
	private  String clientSecret;

	/**
	 * 启动程序时默认启动定时同步
	 */
	public RemindAdministrationTimingTask() {
		if (timer == null) {
			 timer = new Timer();
		}
		timer.scheduleAtFixedRate(getInstance(), 3600000,3600000);
	}
	/**
	 * 启动定时器
	 */
	public void start() {
		if (!status) {
			timer.purge();
			timer = new Timer();
			timer.scheduleAtFixedRate(getInstance(), 3600000,3600000);
		}
	}
	
	/**
	 * 获取定时器状态
	 */
	public void status() {
		if (status) {
			//定时器开启
			Response.json("status", true);
		} else {
			//定时器关闭
			Response.json("status",false);
		}
	}
	/**
	 * 停止定时器
	 */
	public void calcel() {
		timer.cancel();
		status = false;
	}
	
	
	/**
	 * 获取定时任务
	 * @return
	 */
	public  TimerTask getInstance() {
		if (timerTask == null || !status) {
			status = true;
			timerTask = new TimerTask(){
				@Override
				public void run() {
					timingTask();
				}
			};
		}
		return timerTask;
	}
	/**
	 * 提醒消息业务代码
	 * */
	public void timingTask() {
		Map<String, Object> map = new HashMap<>();
		map.put("state", "true");
		String newDate = this.getNewDate();
		List<RemindAdministration> queryList = remindAdministrationService.queryList(map);
		for (RemindAdministration remindAdministration : queryList) {
			if(remindAdministration.getType().equals("3")) {//催填提醒
				String remindTime = remindAdministration.getRemindTime();
				if(remindTime.equals(newDate)) {
					List<SubDocInfo> queryTmingTaskList = subDocInfoService.queryTmingTaskList(map);
					for (SubDocInfo subDocInfo : queryTmingTaskList) {
						if(StringUtils.isNotBlank(subDocInfo.getUndertaker())) {
							MsgTip msg = msgService.queryObject(MSGTipDefined.DCCB_CUIBAN_MSG_TITLE);
							this.setMsg(msg, subDocInfo.getUndertaker(), subDocInfo.getInfoId(), subDocInfo.getId(),remindAdministration.getRemindContent());
							
						}
					}
				}
			}else if(remindAdministration.getType().equals("2")) {//未反馈和首轮未反馈
				String remindTime = remindAdministration.getRemindTime();
				if(remindTime.equals(newDate)) {
					List<SubDocInfo> firstNoFeedbackTmingTaskList = subDocInfoService.firstNoFeedbackTmingTaskList();
					for (SubDocInfo subDocInfo : firstNoFeedbackTmingTaskList) {
						MsgTip msg = msgService.queryObject(MSGTipDefined.DCCB_CUIBAN_MSG_TITLE);
						this.setMsg(msg, subDocInfo.getUndertaker(), subDocInfo.getInfoId(), subDocInfo.getId(),remindAdministration.getRemindContent());
					}
					List<SubDocInfo> noFeedbackTmingTaskList = subDocInfoService.NoFeedbackTmingTaskList();
					for (SubDocInfo subDocInfo : noFeedbackTmingTaskList) {
						MsgTip msg = msgService.queryObject(MSGTipDefined.DCCB_CUIBAN_MSG_TITLE);
						this.setMsg(msg, subDocInfo.getUndertaker(), subDocInfo.getInfoId(), subDocInfo.getId(),remindAdministration.getRemindContent());
					}
				}
			}else if(remindAdministration.getType().equals("1")) {//局未转办
				String remindTime = remindAdministration.getRemindTime();
				if(remindTime.equals(newDate)) {
					List<SubDocInfo> notTransferredTmingTaskList = subDocInfoService.notTransferredTmingTaskList();
					for (SubDocInfo subDocInfo : notTransferredTmingTaskList) {
						MsgTip msg = msgService.queryObject(MSGTipDefined.DCCB_BU_ZHUANBAN_MSG_TITLE);
						this.setMsg(msg, subDocInfo.getUndertaker(), subDocInfo.getInfoId(), subDocInfo.getId(),remindAdministration.getRemindContent());
					}
				}
			
			}
			
		}
		
	}
	
	private String getNewDate() {
		Date toDay = new Date();
		SimpleDateFormat f =new SimpleDateFormat("HH");
		String format = f.format(toDay);
		format= format+":00";
		return format;
	}
	private void setMsg(MsgTip msg,String userId,String infoId,String subId,String content) {
		if (msg != null) {
			String msgUrl = msg.getMsgRedirect()+"&fileId="+infoId+"&subId="+subId;
			if(StringUtils.isNotBlank(userId)){
				msgUtil.sendMsg(msg.getMsgTitle(), content, msgUrl, userId, appId,clientSecret, msg.getGroupName(), msg.getGroupRedirect(), "","true");
			}				
		}
	}
	
}
