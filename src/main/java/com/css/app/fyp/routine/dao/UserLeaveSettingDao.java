package com.css.app.fyp.routine.dao;

import com.css.app.fyp.routine.entity.UserLeaveSetting;
import com.css.base.dao.BaseDao;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;
import java.util.Map;

/**
 * 领导请假设置
 * 
 * @author 中软信息系统工程有限公司
 * @email 
 * @date 2018-10-10 13:58:40
 */
@Mapper
public interface UserLeaveSettingDao extends BaseDao<UserLeaveSetting> {
	List<UserLeaveSetting> queryLeaveList(Map<String, Object> map);
	int queryLeaveListCount(Map<String, Object> map);
}
