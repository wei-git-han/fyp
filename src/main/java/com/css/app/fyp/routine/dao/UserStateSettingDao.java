package com.css.app.fyp.routine.dao;

import com.css.app.fyp.routine.entity.UserStateSetting;
import com.css.base.dao.BaseDao;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;
import java.util.Map;

/**
 * 用户状态设置
 * 
 * @author 中软信息系统工程有限公司
 * @email 
 * @date 2019-01-21 14:34:23
 */
@Mapper
public interface UserStateSettingDao extends BaseDao<UserStateSetting> {
	/**
	 * 获取用户设置的状态  按照时间区间查询
	 * @param paramMap
	 * @return
	 */
	List<Map<String,Object>> getUserStateDataMap(Map<String, Object> paramMap);
}
