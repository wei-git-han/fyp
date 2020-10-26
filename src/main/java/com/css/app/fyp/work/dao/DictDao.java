package com.css.app.fyp.work.dao;

import com.css.app.fyp.work.entity.Dict;

import org.apache.ibatis.annotations.Mapper;

import com.css.base.dao.BaseDao;

import java.util.Date;
import java.util.List;
import java.util.Map;

/**
 * 
 * 
 * @author 中软信息系统工程有限公司
 * @email 
 * @date 2020-10-26 18:34:32
 */
@Mapper
public interface DictDao extends BaseDao<Dict> {
    //添加统计单位
    void insertConfigDept(String id, String deptid, Date time,String type);
    //查询统计单位
    List<Map<String,Object>> findDeptids();
    //添加统计人员
    void insertConfigUser(String id,String userid, Date time);
    //查询统计人员
    List<Map<String,Object>> findUserids();
}
