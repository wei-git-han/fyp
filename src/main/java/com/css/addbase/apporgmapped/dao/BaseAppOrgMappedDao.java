package com.css.addbase.apporgmapped.dao;

import org.apache.ibatis.annotations.Mapper;

import com.css.addbase.apporgmapped.entity.BaseAppOrgMapped;
import com.css.base.dao.BaseDao;
import org.apache.ibatis.annotations.Select;

import java.util.List;
import java.util.Map;

/**
 * 部门表
 * 
 * @author 中软信息系统工程有限公司
 * @email 
 * @date 2017-11-29 15:10:13
 */
@Mapper
public interface BaseAppOrgMappedDao extends BaseDao<BaseAppOrgMapped> {

    @Select("select * from zf_new_fyp_db.base_app_org_mapped where org_id is not null and org_id!='' and org_name is not null and org_name !='' and type = #{0}")
    List<Map<String,Object>> findAppIdAndDeptIdNameAll(String type);
}
