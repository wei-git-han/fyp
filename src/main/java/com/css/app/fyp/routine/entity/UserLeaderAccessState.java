package com.css.app.fyp.routine.entity;

import java.io.Serializable;


/**
 * 设置领导状态的访问的用户关系表
 * 
 * @author 中软信息系统工程有限公司
 * @email 
 * @date 2018-09-26 14:46:30
 */
public class UserLeaderAccessState implements Serializable {
	private static final long serialVersionUID = 1L;
	
	//
	private String id;
	//领导id
	private String leaderId;
	//领导姓名
	private String leaderName;
	//用户id
	private String userId;
	//用户姓名
	private String userName;
	//状态 0关闭 1开启
	private Integer state;

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
	 * 设置：领导id
	 */
	public void setLeaderId(String leaderId) {
		this.leaderId = leaderId;
	}
	/**
	 * 获取：领导id
	 */
	public String getLeaderId() {
		return leaderId;
	}
	/**
	 * 设置：领导姓名
	 */
	public void setLeaderName(String leaderName) {
		this.leaderName = leaderName;
	}
	/**
	 * 获取：领导姓名
	 */
	public String getLeaderName() {
		return leaderName;
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
	 * 设置：用户姓名
	 */
	public void setUserName(String userName) {
		this.userName = userName;
	}
	/**
	 * 获取：用户姓名
	 */
	public String getUserName() {
		return userName;
	}
	/**
	 * 设置：状态 0关闭 1开启
	 */
	public void setState(Integer state) {
		this.state = state;
	}
	/**
	 * 获取：状态 0关闭 1开启
	 */
	public Integer getState() {
		return state;
	}
}
