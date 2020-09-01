package com.css.app.fyp.work.entity;

import org.springframework.format.annotation.DateTimeFormat;

import java.io.Serializable;
import java.util.Date;



/**
 * 业务配置表、角色表
 * 
 * @author 中软信息系统工程有限公司
 * @email 
 * @date 2020-08-19 14:42:47
 */
public class FypRoleEdit implements Serializable {
	private static final long serialVersionUID = 1L;
	
	//
	private String id;
	//用户id
	private String userId;
	//单位名称
	private String deptName;
	//单位id
	private String deptId;
	//用户名称
	private String userName;
	//创建时间
	private Date createTime;
	//当前人角色 0:超级管理员；1:系统管理员；2:局管理员；3:在编人员
	private Integer roleType;
	//配置人
	private String editUserId;
	//配置时间
	@DateTimeFormat(pattern = "yyyy-MM-dd hh:mm")
	private Date editTime;

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
	 * 设置：单位名称
	 */
	public void setDeptName(String deptName) {
		this.deptName = deptName;
	}
	/**
	 * 获取：单位名称
	 */
	public String getDeptName() {
		return deptName;
	}
	/**
	 * 设置：单位id
	 */
	public void setDeptId(String deptId) {
		this.deptId = deptId;
	}
	/**
	 * 获取：单位id
	 */
	public String getDeptId() {
		return deptId;
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
	 * 设置：当前人角色 0:超级管理员；1:系统管理员；2:局管理员；3:在编人员
	 */
	public void setRoleType(Integer roleType) {
		this.roleType = roleType;
	}
	/**
	 * 获取：当前人角色 0:超级管理员；1:系统管理员；2:局管理员；3:在编人员
	 */
	public Integer getRoleType() {
		return roleType;
	}
	/**
	 * 设置：配置人
	 */
	public void setEditUserId(String editUserId) {
		this.editUserId = editUserId;
	}
	/**
	 * 获取：配置人
	 */
	public String getEditUserId() {
		return editUserId;
	}
	/**
	 * 设置：配置时间
	 */
	public void setEditTime(Date editTime) {
		this.editTime = editTime;
	}
	/**
	 * 获取：配置时间
	 */
	public Date getEditTime() {
		return editTime;
	}
}
