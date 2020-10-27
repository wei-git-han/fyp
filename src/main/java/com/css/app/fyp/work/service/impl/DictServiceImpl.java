package com.css.app.fyp.work.service.impl;

import com.css.base.utils.UUIDUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.List;
import java.util.Map;

import com.css.app.fyp.work.dao.DictDao;
import com.css.app.fyp.work.entity.Dict;
import com.css.app.fyp.work.service.DictService;



@Service("dictService")
public class DictServiceImpl implements DictService {
	@Autowired
	private DictDao dictDao;
	
	@Override
	public Dict queryObject(String id){
		return dictDao.queryObject(id);
	}
	
	@Override
	public List<Dict> queryList(Map<String, Object> map){
		return dictDao.queryList(map);
	}
	
	@Override
	public void save(Dict dict){
		dictDao.save(dict);
	}
	
	@Override
	public void update(Dict dict){
		dictDao.update(dict);
	}
	
	@Override
	public void delete(String id){
		dictDao.delete(id);
	}
	
	@Override
	public void deleteBatch(String[] ids){
		dictDao.deleteBatch(ids);
	}

	@Override
	public void insertConfigDept(String deptids,String type) {

		if(null!=deptids) {
			for (String deptid: deptids.split(",")){
				dictDao.deleteDeptByDeptId(deptid);
				dictDao.insertConfigDept(UUIDUtils.random(),deptid,new Date(),type);
			}
		}
	}

	@Override
	public List<Map<String, Object>> findDeptids() {
		return dictDao.findDeptids();
	}

	@Override
	public void insertConfigUser(String userids) {
		dictDao.deleteUserAll();
		if(null!=userids) {
			for (String userid: userids.split(",")) {
				dictDao.insertConfigUser(UUIDUtils.random(),userid,new Date());
			}
		}
	}

	@Override
	public List<Map<String, Object>> findUserids() {
		return dictDao.findUserids();
	}

}
