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

//    @Select("select * " +
//            "from base_app_org_mapped  as a " +
//            "left join config_user_dept as b on a.org_id = b.dept_id " +
//            "where a.org_id is not null and a.org_id!='' and a.org_name is not null and a.org_name !='' and a.type = #{0} and b.type = '1'")
//    List<Map<String,Object>> findAppIdAndDeptIdNameAll(String type);

    @Select("select * from BASE_APP_ORG_MAPPED where type = #{0}")
    List<Map<String,Object>> findAppIdAndDeptIdNameAll(String type);

    @Select("select a.user_id from base_app_user as a " +
            "left join base_app_organ as b on a.organid = b.id " +
            "left join config_user_dept as c on a.id = c.user_id " +
            "where b.tree_path like '%'||#{0}||'%' and c.user_id is not null and c.user_id !=''")
    List<String> findUsersByDeptidAndRoleType(String dpetid);

    @Select("select * from BASE_APP_ORG_MAPPED where TYPE = #{0} and ORG_ID = #{1}")
    BaseAppOrgMapped getUrlByAppId(String appId,String orgId);
}
