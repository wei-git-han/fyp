package com.css.app.fyp.routine.dao;

import com.css.app.fyp.routine.entity.ReignUser;

import org.apache.ibatis.annotations.Mapper;

import com.css.base.dao.BaseDao;
import org.apache.ibatis.annotations.Select;

import java.util.List;

/**
 * 在位情况-人员状态表
 * 
 * @author 中软信息系统工程有限公司
 * @email 
 * @date 2020-12-17 14:51:10
 */
@Mapper
public interface ReignUserDao extends BaseDao<ReignUser> {

    @Select("select b.name as stateName,* from REIGN_USER as a left join REIGN_STATE as b on a.state_id = b.id where a.user_id = #{0} ")
    ReignUser queryObjectAll(String userid);

    @Select("select user_id from reign_user where isdelete = '1'")
    List<String> getAllNotVisualUser();

    void updateAll(ReignUser reignUser);
}
