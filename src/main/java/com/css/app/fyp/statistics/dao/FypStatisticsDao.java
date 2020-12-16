package com.css.app.fyp.statistics.dao;

import com.css.app.fyp.statistics.entity.FypStatistics;

import org.apache.ibatis.annotations.Mapper;

import com.css.base.dao.BaseDao;
import org.apache.ibatis.annotations.Select;

import java.util.List;
import java.util.Map;

/**
 * 年度统计表
 * 
 * @author 中软信息系统工程有限公司
 * @email 
 * @date 2020-12-11 16:09:16
 */
@Mapper
public interface FypStatisticsDao extends BaseDao<FypStatistics> {

    //添加统计单位表
    @Select("insert into fyp_statistics_dept(id,name,DEPT_ID) values (#{0},(select name from BASE_APP_ORGAN where id =#{1}),#{1})")
    void insertDept(String id,String deptid);

    @Select("select dept_id from FYP_STATISTICS_DEPT")
    List<String> findDeptid();

    void insertBatch(List<Map<String, Object>> datas);

    @Select("select value from base_app_config where type = 'lawDays'")
    String getConfigLayDyas();

    @Select("select id from BASE_APP_ORGAN  where parent_id in (select dept_id from FYP_STATISTICS_DEPT)")
    List<String> findDivision();
    @Select("select user_id from BASE_APP_USER where organid = #{0}")
    List<String> findUsersByDivision(String divisionId);
}
