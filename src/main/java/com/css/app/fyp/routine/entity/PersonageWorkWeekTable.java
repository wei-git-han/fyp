package com.css.app.fyp.routine.entity;

import org.springframework.format.annotation.DateTimeFormat;

import java.io.Serializable;
import java.util.Date;

/**
 * 公文基本信息表
 * 
 * @author 中软信息系统工程有限公司
 * @email 
 * @date 2017-10-06 14:37:25
 */
public class PersonageWorkWeekTable implements Serializable {

	private static final long serialVersionUID = 7803764158488177143L;
	//主键
	private String id;
	//个人周表内容
	private String weekTableContent;
	//创建用户
	private String userId;
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

	public String getUserId() {
		return userId;
	}

	public void setUserId(String userId) {
		this.userId = userId;
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
