package com.css.app.db.business.service.impl;

import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.css.app.db.business.dao.ApprovalOpinionDao;
import com.css.app.db.business.dao.DocumentBjjlDao;
import com.css.app.db.business.dao.DocumentCbjlDao;
import com.css.app.db.business.dao.DocumentInfoDao;
import com.css.app.db.business.dao.DocumentReadDao;
import com.css.app.db.business.dao.DocumentZbjlDao;
import com.css.app.db.business.dao.ReplyAttacDao;
import com.css.app.db.business.dao.ReplyExplainDao;
import com.css.app.db.business.dao.SubDocInfoDao;
import com.css.app.db.business.dao.SubDocTrackingDao;
import com.css.app.db.business.entity.DocumentInfo;
import com.css.app.db.business.entity.SubDocInfo;
import com.css.app.db.business.service.DocumentInfoService;



@Service("documentInfoService")
public class DocumentInfoServiceImpl implements DocumentInfoService {
	@Autowired
	private DocumentInfoDao documentInfoDao;
	@Autowired
	private ApprovalOpinionDao approvalOpinionDao;
	@Autowired
	private DocumentBjjlDao documentBjjlDao;
	@Autowired
	private DocumentCbjlDao documentCbjlDao;
	@Autowired
	private DocumentReadDao documentReadDao;
	@Autowired
	private DocumentZbjlDao documentZbjlDao;
	@Autowired
	private ReplyAttacDao replyAttacDao;
	@Autowired
	private ReplyExplainDao replyExplainDao;
	@Autowired
	private SubDocTrackingDao subDocTrackingDao;
	@Autowired
	private SubDocInfoDao subDocInfoDao;
	
	@Override
	public DocumentInfo queryObject(String id){
		return documentInfoDao.queryObject(id);
	}
	
	@Override
	public List<DocumentInfo> queryList(Map<String, Object> map){
		return documentInfoDao.queryList(map);
	}
	
	@Override
	public void save(DocumentInfo documentInfo){
		documentInfo.setCuibanFlag("0");
		documentInfo.setStatus(0);
		documentInfo.setCreatedTime(new Date());
		documentInfoDao.save(documentInfo);
	}
	
	@Override
	public void update(DocumentInfo dbDocumentInfo){
		documentInfoDao.update(dbDocumentInfo);
	}
	
	@Override
	public void delete(String id){
		documentInfoDao.delete(id);
	}
	
	@Override
	public void deleteBatch(String[] ids){
		documentInfoDao.deleteBatch(ids);
	}

	@Override
	public List<Map<String, Object>> queryListByYear(Map<String, Object> map) {
		return documentInfoDao.queryListByYear(map);
	}

	@Override
	public List<Map<String, Object>> queryListByOrgYear(Map<String, Object> map) {
		return documentInfoDao.queryListByOrgYear(map);
	}

	@Override
	public List<Map<String, Object>> queryListByDicType(Map<String, Object> map) {
		return documentInfoDao.queryListByDicType(map);
	}

	@Override
	public List<Map<String, Object>> queryListByDicStu(Map<String, Object> map) {
		return documentInfoDao.queryListByDicStu(map);
	}

	@Override
	public List<DocumentInfo> queryPersonList(Map<String, Object> map) {
		return documentInfoDao.queryPersonList(map);
	}

	@Override
	public List<Map<String, Object>> queryListByDicStutas(Map<String, Object> map) {
		// TODO Auto-generated method stub
		return documentInfoDao.queryListByDicStutas(map);
	}
	@Override
	public void deleteByCheHui(String id) {
		Map<String, Object> map= new HashMap<>();
		map.put("infoId", id);
		List<SubDocInfo> list = subDocInfoDao.queryList(map);
		if(list !=null && list.size()>0) {
			for (SubDocInfo subInfo : list) {
				String subId = subInfo.getId();
				//删除审批意见
				approvalOpinionDao.deleteBySubId(subId);
				//删除附件
				replyAttacDao.deleteBySubId(subId);
				//删除反馈
				replyExplainDao.deleteBySubId(subId);
				//删除流转记录
				subDocTrackingDao.deleteBySubId(subId);
				//删除子分支
				subDocInfoDao.delete(subId);
			}
		}
		//删除办结记录
		documentBjjlDao.deleteByInfoId(id);
		//删除催办记录
		documentCbjlDao.deleteByInfoId(id);
		//删除阅读记录
		documentReadDao.deleteByInfoId(id);
		//删除转办记录
		documentZbjlDao.deleteByInfoId(id);
		//更新主文件状态
		DocumentInfo info = documentInfoDao.queryObject(id);
		info.setStatus(0);
		info.setCuibanFlag("0");
		info.setFinishTime(null);
		info.setLatestReply("");
		info.setLatestReplyTime(null);
		info.setLatestSubDept("");
		info.setLatestUndertaker("");
		documentInfoDao.update(info);
	}
}
