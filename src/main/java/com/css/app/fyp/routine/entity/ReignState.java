package com.css.app.fyp.routine.entity;

import java.io.Serializable;
import java.util.Date;
import java.util.List;


/**
 * 在位情况-状态表
 * 
 * @author 中软信息系统工程有限公司
 * @email 
 * @date 2020-12-17 14:51:10
 */
public class ReignState implements Serializable {
	private static final long serialVersionUID = 1L;
	
	//
	private String id;
	//状态字
	private String name;

	private List<ReignState> list;

	public static long getSerialVersionUID() {
		return serialVersionUID;
	}

	public List<ReignState> getList() {
		return list;
	}

	public void setList(List<ReignState> list) {
		this.list = list;
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
	 * 设置：状态字
	 */
	public void setName(String name) {
		this.name = name;
	}
	/**
	 * 获取：状态字
	 */
	public String getName() {
		return name;
	}
}
