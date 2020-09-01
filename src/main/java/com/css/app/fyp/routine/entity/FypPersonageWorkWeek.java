package com.css.app.fyp.routine.entity;

import org.springframework.format.annotation.DateTimeFormat;

import java.io.Serializable;
import java.util.Date;



/**
 * 
 * 
 * @author 中软信息系统工程有限公司
 * @email 
 * @date 2020-08-24 16:25:47
 */
public class FypPersonageWorkWeek implements Serializable {
	private static final long serialVersionUID = 1L;
	
	//
	private String id;
	//周表内容
	private String weekTableContent;
	//用户ID
	private String userId;
	//创建时间
	@DateTimeFormat(pattern="yyyy-MM-dd HH:mm:ss")
	private Date createdTime;
	//修改时间
	@DateTimeFormat(pattern="yyyy-MM-dd HH:mm:ss")
	private Date updatedTime;

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
	 * 设置：周表内容
	 */
	public void setWeekTableContent(String weekTableContent) {
		this.weekTableContent = weekTableContent;
	}
	/**
	 * 获取：周表内容
	 */
	public String getWeekTableContent() {
		return weekTableContent;
	}
	/**
	 * 设置：用户ID
	 */
	public void setUserId(String userId) {
		this.userId = userId;
	}
	/**
	 * 获取：用户ID
	 */
	public String getUserId() {
		return userId;
	}
	/**
	 * 设置：创建时间
	 */
	public void setCreatedTime(Date createdTime) {
		this.createdTime = createdTime;
	}
	/**
	 * 获取：创建时间
	 */
	public Date getCreatedTime() {
		return createdTime;
	}
	/**
	 * 设置：修改时间
	 */
	public void setUpdatedTime(Date updatedTime) {
		this.updatedTime = updatedTime;
	}
	/**
	 * 获取：修改时间
	 */
	public Date getUpdatedTime() {
		return updatedTime;
	}
}
