package com.css.app.fyp.work.entity;

import org.springframework.format.annotation.DateTimeFormat;

import java.io.Serializable;
import java.util.Date;



/**
 * 保障问题跟踪表
 * 
 * @author 中软信息系统工程有限公司
 * @email 
 * @date 2020-08-13 17:30:50
 */
public class FypGuaranteeTacking implements Serializable {
	private static final long serialVersionUID = 1L;
	
	//
	private String id;
	//姓名
	private String name;
	//用户id
	private String userId;
	//单位名称
	private String deptName;
	//单位id
	private String deptId;
	//联系电话
	private String phone;
	//报修时间
	@DateTimeFormat(pattern = "yyyy-MM-dd hh:mm")
	private Date warrantyTime;
	//报修时间 - 开始
	@DateTimeFormat(pattern = "yyyy-MM-dd hh:mm")
	private Date warrantyTimeBegin;
	//报修时间 - 结束
	@DateTimeFormat(pattern = "yyyy-MM-dd hh:mm")
	private Date warrantyTimeEnd;
	//问题来源
	private String source;
	//问题描述
	private String remark;
	//状态
	private String status;
	//状态更新时间
	private Date statusTime;
	//处理措施
	private String measures;

	private String userName;

	public void setUserName(String userName) {
		this.name = userName;
	}

	public static long getSerialVersionUID() {
		return serialVersionUID;
	}

	public String getUserId() {
		return userId;
	}

	public void setUserId(String userId) {
		this.userId = userId;
	}

	public Date getWarrantyTimeBegin() {
		return warrantyTimeBegin;
	}

	public void setWarrantyTimeBegin(Date warrantyTimeBegin) {
		this.warrantyTimeBegin = warrantyTimeBegin;
	}

	public Date getWarrantyTimeEnd() {
		return warrantyTimeEnd;
	}

	public void setWarrantyTimeEnd(Date warrantyTimeEnd) {
		this.warrantyTimeEnd = warrantyTimeEnd;
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
	 * 设置：姓名
	 */
	public void setName(String name) {
		this.name = name;
	}
	/**
	 * 获取：姓名
	 */
	public String getName() {
		return name;
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
	 * 设置：联系电话
	 */
	public void setPhone(String phone) {
		this.phone = phone;
	}
	/**
	 * 获取：联系电话
	 */
	public String getPhone() {
		return phone;
	}
	/**
	 * 设置：报修时间
	 */
	public void setWarrantyTime(Date warrantyTime) {
		this.warrantyTime = warrantyTime;
	}
	/**
	 * 获取：报修时间
	 */
	public Date getWarrantyTime() {
		return warrantyTime;
	}
	/**
	 * 设置：问题来源
	 */
	public void setSource(String source) {
		this.source = source;
	}
	/**
	 * 获取：问题来源
	 */
	public String getSource() {
		return source;
	}
	/**
	 * 设置：问题描述
	 */
	public void setRemark(String remark) {
		this.remark = remark;
	}
	/**
	 * 获取：问题描述
	 */
	public String getRemark() {
		return remark;
	}
	/**
	 * 设置：状态
	 */
	public void setStatus(String status) {
		this.status = status;
	}
	/**
	 * 获取：状态
	 */
	public String getStatus() {
		return status;
	}
	/**
	 * 设置：状态更新时间
	 */
	public void setStatusTime(Date statusTime) {
		this.statusTime = statusTime;
	}
	/**
	 * 获取：状态更新时间
	 */
	public Date getStatusTime() {
		return statusTime;
	}
	/**
	 * 设置：处理措施
	 */
	public void setMeasures(String measures) {
		this.measures = measures;
	}
	/**
	 * 获取：处理措施
	 */
	public String getMeasures() {
		return measures;
	}
}
