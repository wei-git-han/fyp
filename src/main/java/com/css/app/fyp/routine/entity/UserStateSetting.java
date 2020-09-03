package com.css.app.fyp.routine.entity;

import java.io.Serializable;
import java.util.Date;


/**
 * 用户状态设置
 * 
 * @author 中软信息系统工程有限公司
 * @email 
 * @date 2019-01-21 14:34:23
 */
public class UserStateSetting implements Serializable {
	private static final long serialVersionUID = 1L;
	
	//
	private String id;
	//
	private String userid;
	//
	private String username;
	//
	private String begintime;
	//
	private String endtime;
	//与BASE_DICT关联查询
	private String state;
	//
	private String memo;
	//
	private Date createdtime;
	//
	private Date updtime;
	
	private String resultCode;
	
	private String stateName;

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
	 * 设置：
	 */
	public void setUserid(String userid) {
		this.userid = userid;
	}
	/**
	 * 获取：
	 */
	public String getUserid() {
		return userid;
	}
	/**
	 * 设置：
	 */
	public void setUsername(String username) {
		this.username = username;
	}
	/**
	 * 获取：
	 */
	public String getUsername() {
		return username;
	}
	/**
	 * 设置：
	 */
	public void setBegintime(String begintime) {
		this.begintime = begintime;
	}
	/**
	 * 获取：
	 */
	public String getBegintime() {
		return begintime;
	}
	/**
	 * 设置：
	 */
	public void setEndtime(String endtime) {
		this.endtime = endtime;
	}
	/**
	 * 获取：
	 */
	public String getEndtime() {
		return endtime;
	}
	/**
	 * 设置：与BASE_DICT关联查询
	 */
	public void setState(String state) {
		this.state = state;
	}
	/**
	 * 获取：与BASE_DICT关联查询
	 */
	public String getState() {
		return state;
	}
	/**
	 * 设置：
	 */
	public void setMemo(String memo) {
		this.memo = memo;
	}
	/**
	 * 获取：
	 */
	public String getMemo() {
		return memo;
	}
	/**
	 * 设置：
	 */
	public void setCreatedtime(Date createdtime) {
		this.createdtime = createdtime;
	}
	/**
	 * 获取：
	 */
	public Date getCreatedtime() {
		return createdtime;
	}
	/**
	 * 设置：
	 */
	public void setUpdtime(Date updtime) {
		this.updtime = updtime;
	}
	/**
	 * 获取：
	 */
	public Date getUpdtime() {
		return updtime;
	}
	public String getResultCode() {
		return resultCode;
	}
	public void setResultCode(String resultCode) {
		this.resultCode = resultCode;
	}
	public String getStateName() {
		return stateName;
	}
	public void setStateName(String stateName) {
		this.stateName = stateName;
	}
	
	
}
