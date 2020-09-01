package com.css.app.fyp.routine.dao;

import com.css.app.fyp.routine.entity.FypPersonageWorkWeek;

import com.css.app.fyp.routine.vo.FypPersonageWorkWeekVo;
import org.apache.ibatis.annotations.Mapper;

import com.css.base.dao.BaseDao;

import java.util.List;
import java.util.Map;

/**
 * 
 * 
 * @author 中软信息系统工程有限公司
 * @email 
 * @date 2020-08-24 16:25:47
 */
@Mapper
public interface FypPersonageWorkWeekDao extends BaseDao<FypPersonageWorkWeek> {

    List<FypPersonageWorkWeekVo> getPersonalWeekTableList(Map<String, Object> map);

    List<String> getWeekWorkDateList(Map<String, Object> map);


}
