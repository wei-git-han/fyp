package com.css.app.fyp.work.dao;

import com.css.app.fyp.work.entity.FypRoleEdit;

import org.apache.ibatis.annotations.Mapper;

import com.css.base.dao.BaseDao;
import org.apache.ibatis.annotations.Select;

import java.util.List;
import java.util.Map;

/**
 * 业务配置表、角色表
 * 
 * @author 中软信息系统工程有限公司
 * @email 
 * @date 2020-08-19 14:42:47
 */
@Mapper
public interface FypRoleEditDao extends BaseDao<FypRoleEdit> {

    /**
     * 获取所有单位信息
     * @return
     */
    @Select("select * from base_app_organ")
    List<Map<String,Object>> findDeptAll();

    /**
     * 获取所有用户信息
     * @param deptid
     * @return
     */
    @Select("<script> " +
            "select * " +
            "from base_app_user " +
            "where 1=1 " +
            "<if test='#{0 != null} and #{0 != \"\"}'>" +
            "and organid = #{0}" +
            "</if>" +
            "</script>")
    List<Map<String,Object>> findUserAll(String deptid);
}
