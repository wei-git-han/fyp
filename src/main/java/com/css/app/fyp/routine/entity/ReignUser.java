package com.css.app.fyp.routine.entity;

import org.springframework.format.annotation.DateTimeFormat;

import java.io.Serializable;
import java.util.Date;



/**
 * 在位情况-人员状态表
 * 
 * @author 中软信息系统工程有限公司
 * @email 
 * @date 2020-12-17 14:51:10
 */
public class ReignUser implements Serializable {
	private static final long serialVersionUID = 1L;
	
	//
	private String id;
	//用户id
	private String userId;
	//用户名称
	private String userName;
	//持续时间-结束
	@DateTimeFormat(pattern = "yyyy-MM-ddHH:mm:ss")
	private Date endTime;
	//持续时间-开始
	@DateTimeFormat(pattern = "yyyy-MM-ddHH:mm:ss")
	private Date startTime;
	//状态关联id
	private String stateId;

	//状态名称
	private String stateName;

	public static long getSerialVersionUID() {
		return serialVersionUID;
	}

	public String getStateName() {
		return stateName;
	}

	public void setStateName(String stateName) {
		this.stateName = stateName;
	}

	/**
	 * 设置：
	 */
	public void setId(String id) {
		this.id = id;
	}
	/**
	 * 获取：
	 */
	public String getId() {
		return id;
	}
	/**
	 * 设置：用户id
	 */
	public void setUserId(String userId) {
		this.userId = userId;
	}
	/**
	 * 获取：用户id
	 */
	public String getUserId() {
		return userId;
	}
	/**
	 * 设置：用户名称
	 */
	public void setUserName(String userName) {
		this.userName = userName;
	}
	/**
	 * 获取：用户名称
	 */
	public String getUserName() {
		return userName;
	}
	/**
	 * 设置：持续时间-结束
	 */
	public void setEndTime(Date endTime) {
		this.endTime = endTime;
	}
	/**
	 * 获取：持续时间-结束
	 */
	public Date getEndTime() {
		return endTime;
	}
	/**
	 * 设置：持续时间-开始
	 */
	public void setStartTime(Date startTime) {
		this.startTime = startTime;
	}
	/**
	 * 获取：持续时间-开始
	 */
	public Date getStartTime() {
		return startTime;
	}
	/**
	 * 设置：状态关联id
	 */
	public void setStateId(String stateId) {
		this.stateId = stateId;
	}
	/**
	 * 获取：状态关联id
	 */
	public String getStateId() {
		return stateId;
	}
}
