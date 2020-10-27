package com.css.app.fyp.work.entity;

import com.alibaba.fastjson.annotation.JSONField;
import org.springframework.format.annotation.DateTimeFormat;

import java.io.Serializable;
import java.util.Date;



/**
 * 用户反馈受理情况
 * 
 * @author 中软信息系统工程有限公司
 * @email 
 * @date 2020-08-19 10:10:35
 */
public class FypFeedbackHear implements Serializable {
	private static final long serialVersionUID = 1L;
	
	//
	private String id;
	//提出人id
	private String submitUserId;
	//软件/硬件名称
	private String name;
	//提出的单位id
	private String submitDeptId;
	//提出时间
	@JSONField(format = "yyyy-MM-dd")
	@DateTimeFormat(pattern = "yyyy-MM-dd")
	private Date submitTime;

	@DateTimeFormat(pattern = "yyyy-MM-dd")
	private Date submitTimeBegin;

	@DateTimeFormat(pattern = "yyyy-MM-dd")
	private Date submitTimeEnd;
	//问题分类
	private String type;
	//解决时限
	@JSONField(format = "yyyy-MM-dd")
	@DateTimeFormat(pattern = "yyyy-MM-dd")
	private Date solveTime;
	//问题描述
	private String desc;
	//状态：0：需求论证、1：需求细化、2：解决中、3：已解决待升级、4：已关闭
	private Integer status;
	//提出单位名称
	private String submitDeptName;
	//提出人名称
	private String submitUserName;
	//工作进展
	private String march;

	//软硬件id
	private String softId;

	//问题分类id
	private String typeId;

	public String getSoftId() {
		return softId;
	}

	public void setSoftId(String softId) {
		this.softId = softId;
	}

	public String getTypeId() {
		return typeId;
	}

	public void setTypeId(String typeId) {
		this.typeId = typeId;
	}

	public static long getSerialVersionUID() {
		return serialVersionUID;
	}

	public Date getSubmitTimeBegin() {
		return submitTimeBegin;
	}

	public void setSubmitTimeBegin(Date submitTimeBegin) {
		this.submitTimeBegin = submitTimeBegin;
	}

	public Date getSubmitTimeEnd() {
		return submitTimeEnd;
	}

	public void setSubmitTimeEnd(Date submitTimeEnd) {
		this.submitTimeEnd = submitTimeEnd;
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
	 * 设置：提出人id
	 */
	public void setSubmitUserId(String submitUserId) {
		this.submitUserId = submitUserId;
	}
	/**
	 * 获取：提出人id
	 */
	public String getSubmitUserId() {
		return submitUserId;
	}
	/**
	 * 设置：软件/硬件名称
	 */
	public void setName(String name) {
		this.name = name;
	}
	/**
	 * 获取：软件/硬件名称
	 */
	public String getName() {
		return name;
	}
	/**
	 * 设置：提出的单位id
	 */
	public void setSubmitDeptId(String submitDeptId) {
		this.submitDeptId = submitDeptId;
	}
	/**
	 * 获取：提出的单位id
	 */
	public String getSubmitDeptId() {
		return submitDeptId;
	}
	/**
	 * 设置：提出时间
	 */
	public void setSubmitTime(Date submitTime) {
		this.submitTime = submitTime;
	}
	/**
	 * 获取：提出时间
	 */
	public Date getSubmitTime() {
		return submitTime;
	}
	/**
	 * 设置：问题分类
	 */
	public void setType(String type) {
		this.type = type;
	}
	/**
	 * 获取：问题分类
	 */
	public String getType() {
		return type;
	}
	/**
	 * 设置：解决时限
	 */
	public void setSolveTime(Date solveTime) {
		this.solveTime = solveTime;
	}
	/**
	 * 获取：解决时限
	 */
	public Date getSolveTime() {
		return solveTime;
	}
	/**
	 * 设置：问题描述
	 */
	public void setDesc(String desc) {
		this.desc = desc;
	}
	/**
	 * 获取：问题描述
	 */
	public String getDesc() {
		return desc;
	}
	/**
	 * 设置：状态：0：需求论证、1：需求细化、2：解决中、3：已解决待升级、4：已关闭
	 */
	public void setStatus(Integer status) {
		this.status = status;
	}
	/**
	 * 获取：状态：0：需求论证、1：需求细化、2：解决中、3：已解决待升级、4：已关闭
	 */
	public Integer getStatus() {
		return status;
	}
	/**
	 * 设置：提出单位名称
	 */
	public void setSubmitDeptName(String submitDeptName) {
		this.submitDeptName = submitDeptName;
	}
	/**
	 * 获取：提出单位名称
	 */
	public String getSubmitDeptName() {
		return submitDeptName;
	}
	/**
	 * 设置：提出人名称
	 */
	public void setSubmitUserName(String submitUserName) {
		this.submitUserName = submitUserName;
	}
	/**
	 * 获取：提出人名称
	 */
	public String getSubmitUserName() {
		return submitUserName;
	}
	/**
	 * 设置：工作进展
	 */
	public void setMarch(String march) {
		this.march = march;
	}
	/**
	 * 获取：工作进展
	 */
	public String getMarch() {
		return march;
	}
}
