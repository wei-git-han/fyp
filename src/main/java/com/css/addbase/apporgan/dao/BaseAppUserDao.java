package com.css.addbase.apporgan.dao;

import java.util.List;
import java.util.Map;

import org.apache.ibatis.annotations.Delete;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Select;

import com.css.addbase.apporgan.entity.BaseAppUser;
import com.css.base.dao.BaseDao;

/**
 * 人员表
 * 
 * @author 中软信息系统工程有限公司
 * @email 
 * @date 2017-11-29 15:10:13
 */
@Mapper
public interface BaseAppUserDao extends BaseDao<BaseAppUser> {
	
	int queryTotal(Map<String,Object> map);
	
	/**
	 * 根据用户ID获取人员信息
	 * @author gengds
	 * @date 2017年6月17日
	 */
	@Select("select * from BASE_APP_USER where USER_ID = #{userId}")
	List<BaseAppUser> findByUserId(String userId);

	/**
	 * 根据用户ID获取人员信息
	 * @return
	 */
	List<BaseAppUser> queryObjectByAccounts(String[] accounts);
	
	/**
	 * 根据部门ID获取人员信息
	 * @author gengds
	 * @date 2017年6月17日
	 */
	@Select("select * from BASE_APP_USER where ISDELETE=0 and ORGANID = #{organid} order by SORT")
	List<BaseAppUser> findByDepartmentId(String organid);
	
	/**
	 * 根据用户ID删除人员信息
	 * @author gengds
	 */
	@Delete("delete from BASE_APP_USER where USER_ID = #{userId}")
	List<BaseAppUser> deleteByUserId(String userId);

	/**
	 * 获取某个部门下的总人数  排除不能查看的查看的用户
	 * @param deptId
	 * @return
	 */
	@Select("select count(id) from BASE_APP_USER t where t.account not in('admin','sysadmin','secadmin','audadmin') and t.organId in (select id from BASE_APP_ORGAN start with id= #{0} connect by prior id = parent_id) and t.organId not in (select DEPT_ID from CONFIG_USER_DEPT where DEPT_ID is not null)   and ("
			+ "user_id not in (select LEADER_ID from  USER_LEADER_ACCESS_STATE  where state=1 ) "
			+ "or user_id = #{1}"
			+ "or user_id in (select LEADER_ID from  USER_LEADER_ACCESS_STATE  where state=1  and user_id =#{1})  "
			+ " ) ")
	int getUserCountByOrgIdExclude(String deptId,String user_id);
	
	/**
	 * 根据部门ID获取人员信息
	 * @author gengds
	 * @date 2017年6月17日
	 */
	@Select("select a.*,b.name as organid from BASE_APP_USER a,BASE_APP_ORGAN b where a.ISDELETE=0 and b.ISDELETE=0 and a.ORGANID = #{organid} and b.ID=a.ORGANID order by a.SORT")
	List<BaseAppUser> findByOrganid(String organid);
	
	/**
	 * 根据用户ID获取人员信息
	 * @param userIds
	 * @return
	 */
	List<BaseAppUser> queryObjectByUserIds(String[] userIds);
	
	/**
	 * 根据部门ID获取人员信息
	 * @param userIds
	 * @return
	 */
	List<BaseAppUser> queryObjectByDeptIds(String[] deptIds);
	
	/**
	 * 获取某个部门下的总人数
	 * @param deptId
	 * @return
	 */
	@Select("select count(uuid) from TASK_USER where user_dept_id in (select uuid from TASK_DEPT start with uuid= #{deptId} connect by prior uuid = dept_parent)")
	int queryCountUser(String deptId);
	
	/**
	 * 清空组织人员
	 */
	@Delete("delete from BASE_APP_USER")
	void clearUser();

	List<BaseAppUser> queryListBySet(Map<String, Object> map);

	List<BaseAppUser> queryUserByName(String name);
	
	/**
	 * @description:获取同一单位下名字为XX的人员
	 * @author:zhangyw
	 * @date:2019年5月23日
	 * @Version v1.0
	 */
	List<BaseAppUser> selectUserByNameAndUnitId(String name,String unitId);

	/**
	 * 根据部门ID获取人员信息  排除一些人员
	 * @author
	 * @date
	 */
	@Select("select a.*,b.name as organid from BASE_APP_USER a,BASE_APP_ORGAN b where a.account not in('admin','sysadmin','secadmin','audadmin') and a.ORGANID = #{0} and b.ID=a.ORGANID and a.ORGANID not in (select DEPT_ID from CONFIG_USER_DEPT where DEPT_ID is not null) and ("
			+ "user_id not in (select LEADER_ID from  USER_LEADER_ACCESS_STATE  where state=1 ) "
			+ "or user_id = #{1}"
			+ "or user_id in (select LEADER_ID from  USER_LEADER_ACCESS_STATE  where state=1  and user_id =#{1})  "
			+ " ) order by a.SORT")
	List<BaseAppUser> findByOrganidExclude(String organid,String user_id);

	@Select(" select * from BASE_APP_USER where" +
			"        ORGANID in" +
			"        (" +
			"                select" +
			"                        ID" +
			"                from" +
			"                        BASE_APP_ORGAN start" +
			"                with ID         = #{0}" +
			"                    and ISDELETE=0 connect by prior ID = PARENT_ID" +
			"        )" +
			"and ORGANID  not in (select ifnull(dept_id,0) from config_user_dept cud)" +
			"and user_id  not in (select ifnull(user_id,0) from config_user_dept cud)")
    List<BaseAppUser> queryListByRole(String organid);

	List<BaseAppUser>  queryByOrganidTREEPATH(Map<String,Object> map);

	List<String> getNotAtConfigUserDept(List<String> collect);

	@Select("select  * from  BASE_APP_USER where  ORGANID in (select id  from BASE_APP_ORGAN start with ID = #{0}  and ISDELETE=0 connect by prior ID = PARENT_ID )")
	List<BaseAppUser> queryAllUserByDeptId(String id);

	@Select("select * from BASE_APP_USER where ORGANID = #{0}")
	List<BaseAppUser> queryUserByOrgId(String orgId);

}
