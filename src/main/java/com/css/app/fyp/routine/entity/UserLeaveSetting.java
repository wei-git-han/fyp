package com.css.app.fyp.routine.entity;

import java.io.Serializable;
import java.util.Date;


/**
 * 领导请假设置
 * 
 * @author 中软信息系统工程有限公司
 * @email 
 * @date 2018-10-10 13:58:40
 */
public class UserLeaveSetting implements Serializable {
	private static final long serialVersionUID = 1L;
	
	//
	private String id;
	//请假人id
	private String userId;
	//请假人name
	private String userName;
	//orgId
	private String orgId;
	//orgName
	private String orgName;
	//开始时间
	private String startTime;
	//结束时间
	private String endTime;
	//创建人
	private String creator;
	//创建人id
	private String creatorId;
	//创建时间
	private Date createTime;
	//备注
	private String memo;
	//1请假中 0 已经销假
	private String state;
	//请假地点
	private String place;
	//拟乘交通工具
	private String vehicle;
	//联系人
	private String lxr;
	//联系电话
	private String lxdh;
	//原因事由
	private String reason;

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
	 * 设置：请假人id
	 */
	public void setUserId(String userId) {
		this.userId = userId;
	}
	/**
	 * 获取：请假人id
	 */
	public String getUserId() {
		return userId;
	}
	/**
	 * 设置：请假人name
	 */
	public void setUserName(String userName) {
		this.userName = userName;
	}
	/**
	 * 获取：请假人name
	 */
	public String getUserName() {
		return userName;
	}
	/**
	 * 设置：开始时间
	 */
	public void setStartTime(String startTime) {
		this.startTime = startTime;
	}
	/**
	 * 获取：开始时间
	 */
	public String getStartTime() {
		return startTime;
	}
	/**
	 * 设置：结束时间
	 */
	public void setEndTime(String endTime) {
		this.endTime = endTime;
	}
	/**
	 * 获取：结束时间
	 */
	public String getEndTime() {
		return endTime;
	}
	/**
	 * 设置：创建人
	 */
	public void setCreator(String creator) {
		this.creator = creator;
	}
	/**
	 * 获取：创建人
	 */
	public String getCreator() {
		return creator;
	}
	/**
	 * 设置：创建人id
	 */
	public void setCreatorId(String creatorId) {
		this.creatorId = creatorId;
	}
	/**
	 * 获取：创建人id
	 */
	public String getCreatorId() {
		return creatorId;
	}
	/**
	 * 设置：创建时间
	 */
	public void setCreateTime(Date createTime) {
		this.createTime = createTime;
	}
	/**
	 * 获取：创建时间
	 */
	public Date getCreateTime() {
		return createTime;
	}
	/**
	 * 设置：备注
	 */
	public void setMemo(String memo) {
		this.memo = memo;
	}
	/**
	 * 获取：备注
	 */
	public String getMemo() {
		return memo;
	}
	/**
	 * 设置：1请假中 0 已经销假
	 */
	public void setState(String state) {
		this.state = state;
	}
	/**
	 * 获取：1请假中 0 已经销假
	 */
	public String getState() {
		return state;
	}
	/**
	 * 设置：请假地点
	 */
	public void setPlace(String place) {
		this.place = place;
	}
	/**
	 * 获取：请假地点
	 */
	public String getPlace() {
		return place;
	}
	/**
	 * 设置：拟乘交通工具
	 */
	public void setVehicle(String vehicle) {
		this.vehicle = vehicle;
	}
	/**
	 * 获取：拟乘交通工具
	 */
	public String getVehicle() {
		return vehicle;
	}
	/**
	 * 设置：联系人
	 */
	public void setLxr(String lxr) {
		this.lxr = lxr;
	}
	/**
	 * 获取：联系人
	 */
	public String getLxr() {
		return lxr;
	}
	/**
	 * 设置：联系电话
	 */
	public void setLxdh(String lxdh) {
		this.lxdh = lxdh;
	}
	/**
	 * 获取：联系电话
	 */
	public String getLxdh() {
		return lxdh;
	}
	/**
	 * 设置：原因事由
	 */
	public void setReason(String reason) {
		this.reason = reason;
	}
	/**
	 * 获取：原因事由
	 */
	public String getReason() {
		return reason;
	}
	public String getOrgId() {
		return orgId;
	}
	public void setOrgId(String orgId) {
		this.orgId = orgId;
	}
	public String getOrgName() {
		return orgName;
	}
	public void setOrgName(String orgName) {
		this.orgName = orgName;
	}
}
