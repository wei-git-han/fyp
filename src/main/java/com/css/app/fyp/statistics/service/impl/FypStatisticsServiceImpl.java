package com.css.app.fyp.statistics.service.impl;

import com.alibaba.fastjson.JSONArray;
import com.alibaba.fastjson.JSONObject;
import com.css.addbase.apporgan.service.BaseAppOrganService;
import com.css.addbase.apporgmapped.entity.BaseAppOrgMapped;
import com.css.addbase.apporgmapped.service.BaseAppOrgMappedService;
import com.css.addbase.constant.AppConstant;
import com.css.addbase.constant.AppInterfaceConstant;
import com.css.app.fyp.statistics.controller.FypStatisticsController;
import com.css.base.filter.SSOAuthFilter;
import com.css.base.utils.*;
import org.apache.commons.collections.map.MultiValueMap;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
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
	private final Logger logger = LoggerFactory.getLogger(FypStatisticsController.class);
	@Autowired
	private FypStatisticsDao fypStatisticsDao;

	@Autowired
	private BaseAppOrgMappedService baseAppOrgMappedService;
	@Autowired
    private BaseAppOrganService baseAppOrganService;

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

        BaseAppOrgMapped qxj = (BaseAppOrgMapped)baseAppOrgMappedService.orgMappedByOrgId("", "root", AppConstant.APP_QXJ);
		logger.info("请销假返回数据-------------"+qxj);
        BaseAppOrgMapped db = (BaseAppOrgMapped)baseAppOrgMappedService.orgMappedByOrgId("", "root", AppConstant.DCCB);
		logger.info("请销假返回数据-------------"+db);
        List<BaseAppOrgMapped> mappedData = baseAppOrgMappedService.getMappedData("", null, AppConstant.APP_GWCL);
		logger.info("请销假返回数据-------------"+mappedData);
        if(mappedData !=null && mappedData.size()>0){
            for (BaseAppOrgMapped baseAppOrgMapped : mappedData){
                this.getDocument(
                        baseAppOrgMapped.getUrl()+baseAppOrgMapped.getWebUri()+ AppInterfaceConstant.WEB_GWCL_STATISTICS,
                        qxj.getUrl()+ qxj.getWebUri()+AppInterfaceConstant.WEB_QXJ_DAYS,
                        db.getUrl()+AppInterfaceConstant.WEB_DCCB_STATISTICS,
                        SSOAuthFilter.getToken(),
                        baseAppOrgMapped.getOrgId());
            }
        }
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
        LinkedMultiValueMap<String, Object> objectObjectLinkedMultiValueMap = new LinkedMultiValueMap<String, Object>();
        objectObjectLinkedMultiValueMap.add("deptId",deptId);
        JSONObject doc = CrossDomainUtil.getTokenByJsonData(documentUrl,objectObjectLinkedMultiValueMap, token);
		logger.info("返回数据-------------"+doc);
        if(null!=doc){
			JSONObject tokenByJsonData = doc;
			docuemntData = (List<Map<String,Object>>)tokenByJsonData.get("list");
		}
		logger.info("请销假-----返回数据-------------"+docuemntData);
        JSONObject qxj = CrossDomainUtil.getTokenByJsonDataParamObject(qxjUrl, paramQxj(new LinkedMultiValueMap<Object, Object>()), token);
        if(null!=qxj){
			JSONObject tokenByJsonData = qxj;
			qxjData = (List<Map<String,Object>>)tokenByJsonData.get("list");
		}
		logger.info("请销假qxj返回数据-------------"+docuemntData);
        JSONObject db = CrossDomainUtil.getTokenByJsonDataParamObject(dburl, paramDb(new LinkedMultiValueMap<Object, Object>(), deptId),token);
        if(null!=db){
            JSONObject tokenByJsonData = db;
            dbData = (List<Map<String,Object>>)tokenByJsonData.get("list");
        }
		logger.info("督办db返回数据-------------"+dbData);
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
		    for(Map<String,Object> maps:docuemntData){
                FypStatistics data = this.getData(maps, finalQxjData, yearDyas, Integer.parseInt(latDyas + ""), finalDbData);
                    this.deleteByUserId(data.getUserId());
                    this.save(data);
				logger.info("保存成功-------------");
            }
		}
		//推送到平台
		pushDesktop();
		logger.info("推送平常成功-------------");
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
		statistics.setCheckNum(Integer.parseInt(this.getDbCount(dbList,data.get("userId").toString()).get("userNum").toString()));
		//阅知百分比
		statistics.setReadknowPercentage(data.get("yzRate").toString());
		//公文处理速度（最快）/分钟
		statistics.setFast(data.get("processingSpeed").toString() == "" ? "0" :data.get("processingSpeed").toString());
		//成语id
		statistics.setPhraseId(data.get("phraseId").toString());
		//接收公文数量
        Object o = data.get("documentNum");
        if(o !=null){
            statistics.setDocumentNum(Integer.parseInt(o.toString()));
        }else{
            statistics.setDocumentNum(0);
        }
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

		//督办已办结事项平均天数
		statistics.setFinishDay(this.getDbCount(dbList,data.get("userId").toString()).get("finishDay").toString());
		//督办办结率
		statistics.setFinishRate(this.getDbCount(dbList,data.get("userId").toString()).get("finishRate").toString());
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
	public Map<String,Object> getDbCount(List<Map<String, Object>> dbList,String userId){
		int userNum = 0;
		String finishDay = "";
		String finishRate = "";
		if(null!=dbList && 0<dbList.size()) {
			for (Map<String, Object> e:dbList) {
				if (null != e.get("userId") && userId.equals(e.get("userId").toString()) ) {
                    Object o = e.get("taskNum");
                    if(o !=null){
                        userNum = Integer.parseInt(e.get("taskNum").toString());
                    }else{
                        userNum = 0;
                    }
                    Object o1 = e.get("finishDay");
                    if (o1 !=null){
                        finishDay = e.get("finishDay").toString();
                    }else{
                        finishDay = "0";
                    }
                    Object o2 = e.get("finishRate");
                    if(o2 !=null){
                        finishRate = e.get("finishRate").toString();
                    }else{
                        finishRate = "0";
                    }

				}
			}
		}

		Map<String, Object> retuMap = new HashMap<>();
		retuMap.put("userNum",userNum);
		retuMap.put("finishDay",finishDay);
		retuMap.put("finishRate",finishRate);
		return  retuMap;
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
	 * 公文类型
	 * 数字转汉字
	 * @param type
	 */
	public String getDocumentTypeName(Integer type){
		String result = "";
		switch (type){
			case 0://公文
				result = "我的公文";
				break;
			case 1://办件
				result = "我的办件";
				break;
			case 2://阅件
				result = "我的阅件";
				break;
			case 3://阅知
				result = "来文阅知";
				break;
		}
		return result;
	}

	/**
	 * 获取当前登录人的在线天数
	 */
	private int getOnlineDyas(String userid,List<Map<String, Object>> qxjList,int yearDays,int lawDays){
		int qj = 0;//请假天数
        if(qxjList!=null && qxjList.size() >0){
            for (Map<String, Object> e:qxjList) {
                if(null!=e.get("deleteMark")&&
                        null!=e.get("vacationSortId")&&
                        userid.equals(e.get("deleteMark").toString())&&
                        "事假".equals(e.get("vacationSortId"))){
                    qj++;
                }
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


	/**
	 * 推送到平台年度统计数据
	 */
	public boolean pushDesktop(){
        DecimalFormat decimalFormat = new DecimalFormat("#.00");
        Map<String,Object> map = null;
		String bareauByUserId = baseAppOrgMappedService.getBareauByUserId(CurrentUser.getUserId());
		BaseAppOrgMapped deskTopGw = (BaseAppOrgMapped)baseAppOrgMappedService.orgMappedByOrgId("", "root", AppConstant.STATISTICS_GWCL);
		BaseAppOrgMapped deskTopDb = (BaseAppOrgMapped)baseAppOrgMappedService.orgMappedByOrgId("", "root", AppConstant.STATISTICS_DB);
		List<FypStatistics> fypStatistics = fypStatisticsDao.queryList(new HashMap<>());
		ArrayList<Map<String,Object>> objects = new ArrayList<>();
		JSONArray jsonArray = new JSONArray();
        HashMap<String, Object> stringListHashMap = new HashMap<>();
        boolean result = false;
        for (FypStatistics e:fypStatistics) {
            new JSONObject();
            map = new HashMap<>();
			//总量
			int total = Integer.parseInt(e.getTOTAL().toString())+Integer.parseInt(e.getYZTOTAL().toString())+
					Integer.parseInt(e.getBJTOTAL().toString())+Integer.parseInt(e.getYJTOTAL().toString());
			//公文适配
			map.put("official",true);
			//账户名
			map.put("account",e.getAccount());
			//来文阅知 件
			map.put("fileReadCount",e.getYZTOTAL());
			//来文阅知占比
            int i = Integer.parseInt(e.getYZTOTAL().toString());
            float fileReadProportion= ((float)i/ (float)(total == 0? 1 : total)) *100;
            String fileReadProportionFormat = decimalFormat.format(fileReadProportion);
			map.put("fileReadProportion",fileReadProportionFormat);
			//来文阅知完成率最高
			map.put("fileReadRate",e.getYZoverPercentage());
			//我的公文数 件
			map.put("officialCount",e.getTOTAL());

			//处理最快 分钟
			map.put("officialFast",e.getFast());
			//处理最快类型
			map.put("officialType",this.getDocumentTypeName(e.getDocumentType()));

			//我的公文占比
            int i2 = Integer.parseInt(e.getTOTAL().toString());
            float officialProportion= ((float)i2/ (float)(total == 0? 1 : total)) *100;
            String officialProportionFormat = decimalFormat.format(officialProportion);
			map.put("officialProportion",officialProportionFormat);
			//我的公文完成率最高
			map.put("officialRate",e.getOverPercentage());
			//我的阅件 件
			map.put("readPieceCount",e.getYJTOTAL());
			//我的阅件占比
            int i3 = Integer.parseInt(e.getYJTOTAL().toString());
            float readPieceProportion= ((float)i3/ (float)(total == 0? 1 : total)) *100;
            String readPieceProportionFormat = decimalFormat.format(readPieceProportion);
			map.put("readPieceProportion",readPieceProportionFormat);
			//我的阅件完成率最高
			map.put("readPieceRate",e.getYZoverPercentage());
			//年
			map.put("timeYear",null);
			//年 月
			map.put("timeYearMonth",null);
			//用户ID
			map.put("userId",e.getUserId());
			//我的办件 件
			map.put("workPieceCount",e.getBJTOTAL());
			//我的办件占比
            int i4 = Integer.parseInt(e.getBJTOTAL().toString());
            float workPieceProportion= ((float)i4/ (float)(total == 0? 1 : total)) *100;
            String workPieceProportionFormat = decimalFormat.format(workPieceProportion);
			map.put("workPieceProportion",workPieceProportionFormat);
			//我的办件完成率最高
			map.put("workPieceRate",e.getBJOverPercentage());

			//督办件
			map.put("superviseCount",e.getCheckNum());
			//已办结事项平均办理天数/天
			map.put("superviseFinishDay",e.getFinishDay());
			//办结率
			map.put("superviseFinishRate",e.getFinishRate());
			objects.add(map);
            JSONObject jsonObject = new JSONObject(map);
            jsonArray.add(jsonObject);

		}
        String url = deskTopDb.getUrl()+deskTopDb.getWebUri();
        JSONObject db = CrossDomainUtil.getTokenJSONObject(url, jsonArray, SSOAuthFilter.getToken());
        if(null!=db && "成功".equals(db.get("rsltmsg").toString())){
            result =true;
            System.out.println("-督办统计推送到平台成功");
        }else{
            System.out.println("-督办统计推送到平台失败");
        }
        if (result){
            url = deskTopGw.getUrl()+deskTopGw.getWebUri();
            JSONObject gw = CrossDomainUtil.getTokenJSONObject(url, jsonArray, SSOAuthFilter.getToken());
            if(null!=gw && "成功".equals(gw.get("rsltmsg").toString())){
                result =true;
                System.out.println("-公文年度统计推送到平台成功");
            }else{
                result = false;
                System.out.println("-公文年度统计推送到平台失败");
            }
        }
        return result;
        /*JSONObject jsonObject = new JSONObject();
		jsonObject.put("result","success");
		jsonObject.put("list",objects);
		Response.json(jsonObject);*/

	}
    @Override
    public void deleteByUserId(String id){
        fypStatisticsDao.deleteByUserId(id);
    }
}
