package com.css.app.fyp.routine.vo;

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
public class FypPersonageWorkWeekVo implements Serializable {
	private static final long serialVersionUID = 1L;
	
	private String id;
	//上午周表内容
	private String weekTableContent;
	//上午周表内容
	private String amWeekTableContent;
	//上午周表内容
	private String pmWeekTableContent;
	//用户ID
	private String userId;
	//am,pm标识
	private String hourFlag;
	//时间
	private String weekTime;
	//上午时间
	private String amWeekTime;
	//下午时间
	private String pmWeekTime;
	//日期
	private String weekDate;
	//创建时间
	@DateTimeFormat(pattern="yyyy-MM-dd HH:mm:ss")
	private Date createdTime;
	//修改时间
	@DateTimeFormat(pattern="yyyy-MM-dd HH:mm:ss")
	private Date updatedTime;

	public String getId() {
		return id;
	}

	public void setId(String id) {
		this.id = id;
	}

	public String getWeekTableContent() {
		return weekTableContent;
	}

	public void setWeekTableContent(String weekTableContent) {
		this.weekTableContent = weekTableContent;
	}

	public String getAmWeekTableContent() {
		return amWeekTableContent;
	}

	public void setAmWeekTableContent(String amWeekTableContent) {
		this.amWeekTableContent = amWeekTableContent;
	}

	public String getPmWeekTableContent() {
		return pmWeekTableContent;
	}

	public void setPmWeekTableContent(String pmWeekTableContent) {
		this.pmWeekTableContent = pmWeekTableContent;
	}

	public String getUserId() {
		return userId;
	}

	public void setUserId(String userId) {
		this.userId = userId;
	}

	public String getHourFlag() {
		return hourFlag;
	}

	public void setHourFlag(String hourFlag) {
		this.hourFlag = hourFlag;
	}

	public String getWeekTime() {
		return weekTime;
	}

	public void setWeekTime(String weekTime) {
		this.weekTime = weekTime;
	}

	public String getAmWeekTime() {
		return amWeekTime;
	}

	public void setAmWeekTime(String amWeekTime) {
		this.amWeekTime = amWeekTime;
	}

	public String getPmWeekTime() {
		return pmWeekTime;
	}

	public void setPmWeekTime(String pmWeekTime) {
		this.pmWeekTime = pmWeekTime;
	}

	public String getWeekDate() {
		return weekDate;
	}

	public void setWeekDate(String weekDate) {
		this.weekDate = weekDate;
	}

	public Date getCreatedTime() {
		return createdTime;
	}

	public void setCreatedTime(Date createdTime) {
		this.createdTime = createdTime;
	}

	public Date getUpdatedTime() {
		return updatedTime;
	}

	public void setUpdatedTime(Date updatedTime) {
		this.updatedTime = updatedTime;
	}
}
