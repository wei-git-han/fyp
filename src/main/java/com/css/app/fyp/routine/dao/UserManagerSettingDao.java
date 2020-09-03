package com.css.app.fyp.routine.dao;

import com.css.app.fyp.routine.entity.UserManagerSetting;
import com.css.base.dao.BaseDao;
import org.apache.ibatis.annotations.Mapper;

import java.util.Map;

/**
 * 管理员设置
 * 
 * @author 中软信息系统工程有限公司
 * @email 
 * @date 2018-10-10 10:55:42
 */
@Mapper
public interface UserManagerSettingDao extends BaseDao<UserManagerSetting> {
	UserManagerSetting querySingleObject(Map<String, Object> map);
}
