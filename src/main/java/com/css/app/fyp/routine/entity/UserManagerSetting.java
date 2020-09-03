package com.css.app.fyp.routine.entity;

import java.io.Serializable;


/**
 * 管理员设置
 * 
 * @author 中软信息系统工程有限公司
 * @email 
 * @date 2018-10-10 10:55:42
 */
public class UserManagerSetting implements Serializable {
	private static final long serialVersionUID = 1L;
	
	//
	private String id;
	//用户id
	private String userId;
	//用户名称
	private String userName;
	//机构id
	private String orgId;
	//机构名称
	private String orgName;
	//用户类型 0 普通人  1 部级管理员 2 局管理员  10后台系统管理员    普通人员不用设置  
	private Integer userType;
	
	public final static Integer USERTYPE_XTGLY=10;
	public final static Integer USERTYPE_PYYH=0;
	public final static Integer USERTYPE_BJGLY=1;
	public final static Integer USERTYPE_JJGLY=2;
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
	 * 设置：机构id
	 */
	public void setOrgId(String orgId) {
		this.orgId = orgId;
	}
	/**
	 * 获取：机构id
	 */
	public String getOrgId() {
		return orgId;
	}
	/**
	 * 设置：机构名称
	 */
	public void setOrgName(String orgName) {
		this.orgName = orgName;
	}
	/**
	 * 获取：机构名称
	 */
	public String getOrgName() {
		return orgName;
	}
	/**
	 * 设置：用户类型 0 普通人  1后台系统管理员  2 局管理员  3 部级管理员
普通人员不用设置
	 */
	public void setUserType(Integer userType) {
		this.userType = userType;
	}
	/**
	 * 获取：用户类型 0 普通人  1后台系统管理员  2 局管理员  3 部级管理员
普通人员不用设置
	 */
	public Integer getUserType() {
		return userType;
	}
}
