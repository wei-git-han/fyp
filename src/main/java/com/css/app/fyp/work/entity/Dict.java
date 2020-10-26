package com.css.app.fyp.work.entity;

import java.io.Serializable;
import java.util.Date;



/**
 * 
 * 
 * @author 中软信息系统工程有限公司
 * @email 
 * @date 2020-10-26 18:34:32
 */
public class Dict implements Serializable {
	private static final long serialVersionUID = 1L;
	
	//
	private String id;
	//0：自定义 1:系统字典  不允许修改删除
	private Integer type;
	//字典名称
	private String dictName;
	//排序
	private Integer orderNum;
	//字典类型
	private String dictType;
	//
	private String memo;
	//字典值
	private String dictValue;

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
	 * 设置：0：自定义 1:系统字典  不允许修改删除
	 */
	public void setType(Integer type) {
		this.type = type;
	}
	/**
	 * 获取：0：自定义 1:系统字典  不允许修改删除
	 */
	public Integer getType() {
		return type;
	}
	/**
	 * 设置：字典名称
	 */
	public void setDictName(String dictName) {
		this.dictName = dictName;
	}
	/**
	 * 获取：字典名称
	 */
	public String getDictName() {
		return dictName;
	}
	/**
	 * 设置：排序
	 */
	public void setOrderNum(Integer orderNum) {
		this.orderNum = orderNum;
	}
	/**
	 * 获取：排序
	 */
	public Integer getOrderNum() {
		return orderNum;
	}
	/**
	 * 设置：字典类型
	 */
	public void setDictType(String dictType) {
		this.dictType = dictType;
	}
	/**
	 * 获取：字典类型
	 */
	public String getDictType() {
		return dictType;
	}
	/**
	 * 设置：
	 */
	public void setMemo(String memo) {
		this.memo = memo;
	}
	/**
	 * 获取：
	 */
	public String getMemo() {
		return memo;
	}
	/**
	 * 设置：字典值
	 */
	public void setDictValue(String dictValue) {
		this.dictValue = dictValue;
	}
	/**
	 * 获取：字典值
	 */
	public String getDictValue() {
		return dictValue;
	}
}
