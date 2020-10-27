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

    @Select("select * \n" +
            "from zf_new_fyp_db.base_app_org_mapped  as a\n" +
            "left join zf_new_fyp_db.config_user_dept as b on a.org_id = b.dept_id \n" +
            "where a.org_id is not null and a.org_id!='' and a.org_name is not null and a.org_name !='' and a.type = #{0} and b.type = '1'\n")
    List<Map<String,Object>> findAppIdAndDeptIdNameAll(String type);

    @Select("select a.user_id from zf_new_fyp_db.base_app_user as a\n" +
            "left join zf_new_fyp_db.base_app_organ as b on a.organid = b.id\n" +
            "left join zf_new_fyp_db.config_user_dept as c on a.id = c.user_id\n" +
            "where b.tree_path like '%'||#{0}||'%' and c.user_id is not null and c.user_id !=''")
    List<String> findUsersByDeptidAndRoleType(String dpetid);

    @Select("select * from BASE_APP_ORG_MAPPED where APP_ID = #{0}")
    BaseAppOrgMapped getUrlByAppId(String appId);
}
