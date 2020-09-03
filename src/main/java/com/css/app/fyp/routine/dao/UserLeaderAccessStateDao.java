package com.css.app.fyp.routine.dao;

import com.css.app.fyp.routine.entity.UserLeaderAccessState;
import com.css.base.dao.BaseDao;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;
import java.util.Map;

/**
 * 设置领导状态的访问的用户关系表
 * 
 * @author 中软信息系统工程有限公司
 * @email 
 * @date 2018-09-26 14:46:30
 */
@Mapper
public interface UserLeaderAccessStateDao extends BaseDao<UserLeaderAccessState> {

	List<UserLeaderAccessState> queryNotlOOKList(Map<String, Object> map);
	
	UserLeaderAccessState querySingleObject(Map<String, Object> map);

	/**
	 * 查询请假的数据
	 * @param param
	 * @return
	 */
	List<Map<String,Object>> queryMapData(Map<String, Object> param);
}
