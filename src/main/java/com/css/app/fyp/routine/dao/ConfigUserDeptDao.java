package com.css.app.fyp.routine.dao;


import com.css.app.fyp.routine.entity.ConfigUserDept;
import org.apache.ibatis.annotations.Mapper;

import com.css.base.dao.BaseDao;
import org.apache.ibatis.annotations.Select;

/**
 * 统计配置人员、单位关联表
 * 
 * @author 中软信息系统工程有限公司
 * @email 
 * @date 2020-11-25 17:35:54
 */
@Mapper
public interface ConfigUserDeptDao extends BaseDao<ConfigUserDept> {

    @Select("select * from CONFIG_USER_DEPT where USER_ID = #{0} and USER_ID is not null")
    ConfigUserDept queryByUserId(String userId);
}
