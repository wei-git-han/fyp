package com.css.app.fyp.statistics.service.impl;

import com.alibaba.fastjson.JSONArray;
import com.alibaba.fastjson.JSONObject;
import com.css.addbase.apporgmapped.entity.BaseAppOrgMapped;
import com.css.addbase.apporgmapped.service.BaseAppOrgMappedService;
import com.css.addbase.constant.AppConstant;
import com.css.addbase.constant.AppInterfaceConstant;
import com.css.base.filter.SSOAuthFilter;
import com.css.base.utils.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.text.DecimalFormat;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.time.Year;
import java.util.*;

import com.css.app.fyp.statistics.dao.FypStatisticsDao;
import com.css.app.fyp.statistics.entity.FypStatistics;
import com.css.app.fyp.statistics.service.FypStatisticsService;
import org.springframework.util.LinkedMultiValueMap;


@Service("fypStatisticsService")
public class FypStatisticsServiceImpl implements FypStatisticsService {
	@Autowired
	private FypStatisticsDao fypStatisticsDao;

	@Autowired
	private BaseAppOrgMappedService baseAppOrgMappedService;

	@Override
	public FypStatistics queryObject(String id){
		return fypStatisticsDao.queryObject(id);
	}
	
	@Override
	public List<FypStatistics> queryList(Map<String, Object> map){
		return fypStatisticsDao.queryList(map);
	}
	
	@Override
	public void save(FypStatistics fypStatistics){
	    this.delete(fypStatistics.getUserId());
		fypStatisticsDao.save(fypStatistics);
	}
	
	@Override
	public void update(FypStatistics fypStatistics){
		fypStatisticsDao.update(fypStatistics);
	}
	
	@Override
	public void delete(String id){
		fypStatisticsDao.delete(id);
	}
	
	@Override
	public void deleteBatch(String[] ids){
		fypStatisticsDao.deleteBatch(ids);
	}

	@Override
	public void insertDeptids(String[] deptArr) {
		for (String deptid:deptArr) {
			fypStatisticsDao.insertDept(UUIDUtils.random(),deptid);
		}
	}

	/**
	 * 同步统计信息
	 */
	@Override
	public void syncData() {
		List<String> deptid = fypStatisticsDao.findDeptid();
		deptid.forEach((e)->{
			BaseAppOrgMapped document = (BaseAppOrgMapped)baseAppOrgMappedService.orgMappedByOrgId("", e, AppConstant.APP_GWCL);
			BaseAppOrgMapped qxj = (BaseAppOrgMapped)baseAppOrgMappedService.orgMappedByOrgId("", e, AppConstant.APP_QXJ);
            BaseAppOrgMapped db = (BaseAppOrgMapped)baseAppOrgMappedService.orgMappedByOrgId("", e, AppConstant.DCCB);
			this.getDocument(
					document.getUrl()+document.getWebUri()+ AppInterfaceConstant.WEB_GWCL_STATISTICS,
					qxj.getUrl()+ qxj.getWebUri()+AppInterfaceConstant.WEB_QXJ_DAYS,
                    db.getUrl()+AppInterfaceConstant.WEB_DCCB_STATISTICS,
					SSOAuthFilter.getToken(),
                    e);
		});
	}


    /**
     * 调用公文统计信息
     * @param documentUrl
     * @param qxjUrl
     * @param dburl
     * @param token
     * @param deptId
     */
	public void getDocument(String documentUrl, String qxjUrl,String dburl,String token,String deptId){
		List<Map<String,Object>> docuemntData = null;
		List<Map<String,Object>> qxjData = null;
		List<Map<String,Object>> dbData = null;
        JSONObject doc = CrossDomainUtil.getTokenByJsonData(documentUrl, new LinkedMultiValueMap<>(), token);
        if(null!=doc){
			JSONObject tokenByJsonData = doc;
			docuemntData = (List<Map<String,Object>>)tokenByJsonData.get("list");
		}
        JSONObject qxj = CrossDomainUtil.getTokenByJsonDataParamObject(qxjUrl, paramQxj(new LinkedMultiValueMap<Object, Object>()), token);
        if(null!=qxj){
			JSONObject tokenByJsonData = qxj;
			qxjData = (List<Map<String,Object>>)tokenByJsonData.get("list");
		}
        JSONObject db = CrossDomainUtil.getTokenByJsonDataParamObject(dburl, paramDb(new LinkedMultiValueMap<Object, Object>(), deptId),token);
        if(null!=db){
            JSONObject tokenByJsonData = db;
            dbData = (List<Map<String,Object>>)tokenByJsonData.get("list");
        }

        List<Map<String, Object>> finalQxjData = qxjData;
        List<Map<String, Object>> finalDbData = dbData;
        //获取总天数
		int yearDyas = this.getYearDyas();
		//判断词库
        this.overrideList(docuemntData);
        //获取局、处总数量
        this.getSum(docuemntData);
		//获取法定节假日天数
		String latDyas = fypStatisticsDao.getConfigLayDyas();
		if(null!=docuemntData) {
			docuemntData.forEach((e) -> {
				this.save(this.getData(e, finalQxjData, yearDyas, Integer.parseInt(latDyas + ""), finalDbData));
			});
		}
	}

    /**
     * 督办参数
     */
    public LinkedMultiValueMap<Object,Object> paramDb(LinkedMultiValueMap<Object,Object> map,String deptId){
        map.add("deptId",deptId);//局id
        return map;
    }

	/**
	 * 请销假参数
	 */
	public LinkedMultiValueMap<Object,Object> paramQxj(LinkedMultiValueMap<Object,Object> map){
		Calendar instance = Calendar.getInstance();
		int i = instance.get(Calendar.YEAR);
		map.add("planTimeStart",String.valueOf(i)+"-01-01");//今年
		map.add("planTimeEnd",String.valueOf(i+1)+"-01-01");//明年
		map.add("page","1");//页数
		map.add("rows","1000");//条数
		return map;
	}

	/**
	 * 整理添加数据
	 * @param data
	 * @return
	 */
	public FypStatistics getData(Map<String,Object> data,List<Map<String, Object>> qxjList,int yearDyas,int lawDays,List<Map<String, Object>> dbList){
        SimpleDateFormat simpleDateFormat = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");

        FypStatistics statistics = new FypStatistics();
		//id
		statistics.setId(UUIDUtils.random());
		//第一则公文时间
        try {
            statistics.setFRISTDATE(data.get("firstTime") == null ? null : simpleDateFormat.parse(data.get("firstTime").toString()));
        } catch (ParseException e) {
            e.printStackTrace();
        }
        //公文完成率百分比
		statistics.setOverPercentage(data.get("percentageCompleteCpj").toString());
		//公文已完成总数量
		statistics.setISREADTOTAL(Integer.parseInt(data.get("completeCountCpj").toString()));
		//公文总数量
		statistics.setTOTAL(Integer.parseInt(data.get("cpjCount").toString()));

		//办件完成率百分比
        //办件已完成总数量
        //办件总数量
        statistics.setBJOverPercentage(data.get("percentageCompleteBj").toString());
        statistics.setBJISREADTOTAL(Integer.parseInt(data.get("completeCountBj").toString()));
        statistics.setBJTOTAL(Integer.parseInt(data.get("bjCount").toString()));

        //阅件完成率百分比
        //阅件已完成总数量
        //阅件总数量
        statistics.setYJOverPercentage(data.get("percentageCompleteYj").toString());
        statistics.setYJISREADTOTAL(Integer.parseInt(data.get("completeCountYj").toString()));
        statistics.setYJTOTAL(Integer.parseInt(data.get("yjCount").toString()));

        //阅知完成率百分比
        //阅知已完成总数量
        //阅知总数量
        statistics.setYZoverPercentage(data.get("percentageCompleteYz").toString());
        statistics.setYZISREADTOTAL(Integer.parseInt(data.get("completeCountYz").toString()));
        statistics.setYZTOTAL(Integer.parseInt(data.get("yzCount").toString()));

		//办理督办数量
		statistics.setCheckNum(this.getDbCount(dbList,data.get("userId").toString()));
		//阅知百分比
		statistics.setReadknowPercentage(data.get("yzRate").toString());
		//公文处理速度（最快）/分钟
		statistics.setFast(data.get("processingSpeed").toString() == "" ? "0" :data.get("processingSpeed").toString());
		//成语id
		statistics.setPhraseId(data.get("phraseId").toString());
		//接收公文数量
		statistics.setDocumentNum(Integer.parseInt(data.get("documentNum").toString()));
		//第一次使用到系统时间的天数
        try {
            statistics.setMeetDays(data.get("firstTime") ==  null ? null : this.beginEndDays(simpleDateFormat.parse(data.get("firstTime").toString()) ));
        } catch (ParseException e) {
            e.printStackTrace();
        }
        //创建时间
		statistics.setCreateTime(new Date());
		//阅件百分比
		statistics.setReadpiecePercentage(data.get("yjRate").toString());
		//第一则公文名称
		statistics.setDocumentName(data.get("firstDocumentName").toString());
		//公文类型，0公文，1办件、2阅件、3阅知
		statistics.setDocumentType(this.getDocumentType(data.get("speedType").toString()));
		//阅件总数
		statistics.setReadNum(Integer.parseInt(data.get("yjCount").toString()));
		//呈批件百分比
		statistics.setRenderPercentage(data.get("cpjRate").toString());
		//办件百分比
		statistics.setDopiecePercentage(data.get("bjRate").toString());
		//是否删除,0是-1否
		statistics.setIsDelete(0);
		//在线天数
		statistics.setOnlineDays(this.getOnlineDyas(data.get("userId").toString(),qxjList,yearDyas,lawDays));
		//已阅数量
		statistics.setAlreadyNum(Integer.parseInt(data.get("completeCountYj").toString()));
		//用户id
        statistics.setUserId(data.get("userId").toString());
        //用户角色
		statistics.setROLE(data.get("role").toString());
		return statistics;
	}

	/**
	 * 公文接收数量
	 * 获取局数量
	 * 获取处数量
	 */
	public void getSum(List<Map<String,Object>> documents){
		int bureauSum = 0;
		//局总数量
		for (Map<String,Object> bureau:documents) {
			bureauSum +=Integer.parseInt(bureau.get("sumCount").toString());
		}
		Map<String, Object> divisionMap = new HashMap<>();
		//获取所有处
		List<String> divisions = fypStatisticsDao.findDivision();
		for (String divisionId:divisions) {
			int divisionSum = 0;
			//获取处人员
			List<String> users = fypStatisticsDao.findUsersByDivision(divisionId);
			for (String divisionUserId:users) {
				for (Map<String,Object> doc:documents) {
					if(divisionUserId.equals(doc.get("userId").toString())){
						divisionSum += Integer.parseInt(doc.get("sumCount").toString());
					}
				}
			}
			for (String divisionUserId:users) {
				for (Map<String,Object> doc:documents) {
					if(divisionUserId.equals(doc.get("userId").toString())){
						//处数量
						doc.put("documentNum", divisionSum);
					}
				}
			}
		}
		//局数量
		for (Map<String,Object> doc:documents) {
			if(null!=doc.get("documentNum")){
				//局数量
				doc.put("documentNum",bureauSum);
			}
		}
	}
	/**
	 * 获取督办数量
	 */
	public int getDbCount(List<Map<String, Object>> dbList,String userId){
		int userNum = 0;
		if(null!=dbList && 0<dbList.size()) {
			for (Map<String, Object> e:dbList) {
				if (null != e.get("userId") && userId.equals(e.get("userId").toString())) {
					userNum = Integer.parseInt(e.get("taskNum").toString());
				}
			}
		}
		return  userNum;
	}
	/**
	 * 第一次使用系统到现在的天数
	 */
	public int beginEndDays(Date beginTime){
        SimpleDateFormat simpleDateFormat = new SimpleDateFormat("yyyy-MM-dd");
        Date beginDate = null;
        Date endDate = null;
        try {
             endDate = simpleDateFormat.parse(simpleDateFormat.format(new Date()));
             beginDate = simpleDateFormat.parse(simpleDateFormat.format(beginTime));
        } catch (ParseException e) {
            e.printStackTrace();
        }
        long day = endDate.getTime() - beginDate.getTime();
        day = (long) (day /(1000 * 60 * 60 * 24));
		return Integer.parseInt(String.valueOf(day));
	}

	/**
	 * 公文类型
	 * 汉字转数字
	 * @param type
	 */
	public int getDocumentType(String type){
		int result = 0;
		switch (type){
			case "cbj"://公文
				result = 0;
				break;
			case "bj"://办件
				result = 1;
				break;
			case "yj"://阅件
				result = 2;
				break;
			case "yz"://阅知
				result = 3;
				break;
		}
		return result;
	}

	/**
	 * 获取当前登录人的在线天数
	 */
	private int getOnlineDyas(String userid,List<Map<String, Object>> qxjList,int yearDays,int lawDays){
		int qj = 0;//请假天数
		for (Map<String, Object> e:qxjList) {
			if(null!=e.get("deleteMark")&&
					null!=e.get("vacationSortId")&&
					userid.equals(e.get("deleteMark").toString())&&
					"事假".equals(e.get("vacationSortId"))){
				qj++;
			}
		}
		return yearDays-(qj+lawDays);
	}

	/**
	 * 获取当前年的总天数
	 */
	public int getYearDyas(){
		int yearDays = 0;//今年的总天数
		Calendar instance = Calendar.getInstance();
		int year = instance.get(Calendar.YEAR);
		if(year % 4 == 0 && year % 100 != 0 || year % 400 == 0){//闰年
			yearDays = 366;
		}else{//平年
			yearDays = 365;
		}
		return yearDays;
	}

	/**
	 * 判断人员对应词库
	 */
	public void overrideList(List<Map<String,Object>> objects){
		this.sortAscList(objects);
		int size = objects.size();
		for(int i =0;i<objects.size();i++){
			Map<String, Object> map = objects.get(i);
			map.put("phraseId",this.typeLevel(i,size));
		}
	}

	/**
	 *	定义类级
	 * 100% : 一类50%、二类40%、三类 10%
	 * @param index
	 * @param listSize
	 * @return 0一级，1二级，2三级
	 */
	public int typeLevel(Integer index,Integer listSize){
		int result = 2;//三类
		double y = index * 1.0;
		double x = listSize * 1.0;
		double fen = y / x;
		DecimalFormat decimalFormat = new DecimalFormat("##%");
		String format = decimalFormat.format(fen);
		String[] split = format.split("%");
		int beforeIndex = Integer.parseInt(split[0]);
		double percentOne = listSize*0.5;//50%
		double percentTow = listSize * 0.9;//90%
		if(beforeIndex <= percentOne){//一类
			result = 0;
		}else if(beforeIndex <percentOne && beforeIndex >= percentTow){//二类
			result = 1;
		}
		return result;
	}

	/**
	 * 按照处理速度排序
	 * 正序
	 * @param objects
	 */
	public void sortAscList(List<Map<String,Object>> objects){
		Collections.sort(objects,
				(o1,o2) -> {
					int op1 = 0;
                    if(StringUtils.isNotBlank(o1.get("processingSpeed").toString())){
                        op1 =Integer.parseInt(o1.get("processingSpeed").toString());
                    }
					int op2 = 0;
                    if(StringUtils.isNotBlank(o2.get("processingSpeed").toString())){
                        op2 = Integer.parseInt(o2.get("processingSpeed").toString());
                    }
					int fast = op1 - op2;
					if(fast == 0){
						return op1 - op2;
					}
					return fast;
				}
		);
	}
}
