package com.css.app.fyp.routine.entity;

import java.io.Serializable;
import java.util.Date;



/**
 * 统计配置人员、单位关联表
 * 
 * @author 中软信息系统工程有限公司
 * @email 
 * @date 2020-11-25 17:35:54
 */
public class ConfigUserDept implements Serializable {
	private static final long serialVersionUID = 1L;
	
	//
	private String id;
	//用户id
	private String userId;
	//单位id
	private String deptId;
	//状态，0关，1开
	private String type;
	//创建时间
	private Date createTime;

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
	 * 设置：状态，0关，1开
	 */
	public void setType(String type) {
		this.type = type;
	}
	/**
	 * 获取：状态，0关，1开
	 */
	public String getType() {
		return type;
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
}
