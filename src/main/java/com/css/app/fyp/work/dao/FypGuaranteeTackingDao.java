package com.css.app.fyp.work.dao;

import com.css.app.fyp.work.entity.FypGuaranteeTacking;

import org.apache.ibatis.annotations.Mapper;

import com.css.base.dao.BaseDao;
import org.apache.ibatis.annotations.Select;

import java.util.Map;

/**
 * 保障问题跟踪表
 * 
 * @author 中软信息系统工程有限公司
 * @email 
 * @date 2020-08-13 17:30:50
 */
@Mapper
public interface FypGuaranteeTackingDao extends BaseDao<FypGuaranteeTacking> {

    /**
     * 今日受理
     * @return
     */
    @Select("select count(1) as count from zf_new_fyp_db.fyp_guarantee_tacking where day(WARRANTY_TIME) = day(sysdate)")
    Map<String,Object> toDayAccept();

    /**
     * 已完成
     */
    @Select("select count(1) as count from zf_new_fyp_db.fyp_guarantee_tacking where day(WARRANTY_TIME) = day(sysdate) and status = '2' and day(STATUS_TIME) = day(sysdate)")
    Map<String,Object> toDayComplete();

    /**
     * 累计受理
     * @return
     */
    @Select("select count(1) as count from zf_new_fyp_db.fyp_guarantee_tacking")
    Map<String,Object> countAccept();


}
