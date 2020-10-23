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

    @Select("select a.user_id from zf_new_fyp_db.base_app_user as a \n" +
            "left join zf_new_fyp_db.base_app_organ as b on a.organid = b.id \n" +
            "left join zf_new_fyp_db.fyp_role_edit as c on a.user_id = c.user_id\n" +
            "where b.tree_path like '%'||#{0}||'%' and c.role_type = '3'")
    List<String> findUsersByDeptidAndRoleType(String dpetid);

    @Select("select * from BASE_APP_ORG_MAPPED where APP_ID = #{0}")
    BaseAppOrgMapped getUrlByAppId(String appId);
}
