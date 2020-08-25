package com.css.addbase.constant;

/**
 * 接口常量类；
 * 
 * TODO：常量是固定不变的数据，如果有变化的常量，请不要在此配置文件中进行定义；
 * 
 * 需要通过http协议访问请求的接口，前缀必须是：WEB_INTERFACE_
 * 
 * 各个应用之间所调用的接口定义都需要定义在该文件中，需要写清楚备注，什么功能使用的，需要怎么调用；
 * 
 * @author 中软信息系统工程有限公司
 * @email  
 * @date 2017年12月01日 下午1:23:52
 */
public class AppInterfaceConstant {
	
	/**
	 * @author mashuwen
	 * @date 2017年12月03日
	 * 公文处理应用调用：公文流转送审批，到综合秘书保存发送记录的接口定义；
	 */
	public final static String WEB_INTERFACE_GWCL_TO_ZHMS_SAVE = "/app/gwzb/api/saveSecretaryFlow";
	
	/**
	 * @author mashuwen
	 * @date 2017年12月03日
	 * 交办事项应用调用：交办事项上报给首长办公秘书版的接口定义；
	 */
	public final static String WEB_INTERFACE_JBSX_TO_SZBGMS = "/secretary/api/deliverBack";
	/**
	 * @author mashuwen
	 * @date 2017年12月03日
	 * 综合秘书设置：部级综合秘书设置同步至各局级综合秘书设置新增接口定义；
	 */
	public final static String WEB_INTERFACE_ZHMS_TO_GWCL_ADD = "/app/gwcl/documentclerkset/saveJj";
	
	/**
	 * @author mashuwen
	 * @date 2017年12月03日
	 * 综合秘书设置：部级综合秘书设置同步至各局级综合秘书设置修改接口定义；
	 */
	public final static String WEB_INTERFACE_ZHMS_TO_GWCL_EDIT = "/app/gwcl/documentclerkset/updateJj";
	
	/**
     * @author xiayj
	 * @date 2017年12月03日
     * 公文处理应用调用：我的阅件，阅件列表页列表数据加载的接口定义
     */
    public final static String WEB_INTERFACE_DZBMS_TO_GWCL_WDYJ_RECORD = "/api/myRead/record";
	/**
	 * @author mashuwen
	 * @date 2017年12月03日
	 * 综合秘书设置：部级综合秘书设置同步至各局级综合秘书设置删除接口定义；
	 */
	public final static String WEB_INTERFACE_ZHMS_TO_GWCL_DEL = "/app/gwcl/documentclerkset/deleteJj";
	
	/**
	 * @author mashuwen
	 * @date 2017年12月03日
	 * 综合秘书调用：综合秘书保存意见信息到公文处理的接口定义；
	 */
	public final static String WEB_INTERFACE_ZHMS_TO_GWCL_SAVE_OPINION = "/doc/api/opinionSave";
	
	/**
	 * @author mashuwen
	 * @date 2017年12月03日
	 * 综合秘书调用：综合秘书保存抄清信息到公文处理的接口定义；
	 */
	public final static String WEB_INTERFACE_ZHMS_TO_GWCL_SAVE_CQ = "/doc/api/savecq";
	
	/**
	 * @author mashuwen
	 * @date 2017年12月03日
	 * 综合秘书调用：综合秘书返回承办人到公文处理的接口定义；
	 */
	public final static String WEB_INTERFACE_ZHMS_TO_GWCL_BACK = "/doc/api/returnCbr";
	
	/**
	 * @author mashuwen
	 * @date 2017年12月03日
	 * 综合秘书调用：首长秘书返回综合秘书的接口定义；
	 */
	public final static String WEB_INTERFACE_SZMS_TO_ZHMS = "/doc/api/updateFlowAndOpinionInfo";
	
	/**
	 * @author mashuwen
	 * @date 2017年12月03日
	 * 数字档案室应用调用：公文数据归档到数字档案室的接口定义；
	 */
	public final static String WEB_INTERFACE_GWCL_TO_SZDAS = "/reviewstamp/updateByDocId";
    /**
     * @author mashuwen
	 * @date 2017年12月03日
     * 公文处理应用调用：我的办件，卡片页形式的列表页面数据加载的接口定义
     */
    public final static String WEB_INTERFACE_DZBMS_TO_GWCL_WDBJ_CARD = "/api/myOffice/myOfficeCard";
	/**
	 * @author mashuwen
	 * @date 2017年12月03日
     * 公文处理应用调用：我的办件，表格页形式的列表页面数据加载的接口定义
     */
    public final static String WEB_INTERFACE_DZBMS_TO_GWCL_WDBJ_TABLE = "/api/myOffice/myOfficeTable";
	/**
	 * @author mashuwen
	 * @date 2017年12月03日
     * 公文处理应用调用：我的办件，表格页形式的列表页面数据加载的接口定义
     */
    public final static String WEB_INTERFACE_DZBMS_TO_GWCL_WDBJ_COUNT = "/api/myOffice/getCounts";
    /**
     * @author mashuwen
	 * @date 2017年12月03日
     * 公文处理应用调用：我的办件，编辑信息页面数据加载的接口定义
     */
    public final static String WEB_INTERFACE_DZBMS_TO_GWCL_WDBJ_EDIT = "/api/myOffice/info";
    /**
     * @author mashuwen
	 * @date 2017年12月03日
     * 公文处理应用调用：我的办件，意见回复数据的接口定义
     */
    public final static String WEB_INTERFACE_DZBMS_TO_GWCL_WDBJ_ANSWER = "/api/myOffice/answer";
    /**
     * @author mashuwen
	 * @date 2017年12月03日
     * 公文处理应用调用：我的办件，开始办理状态修改的接口定义
     */
    public final static String WEB_INTERFACE_DZBMS_TO_GWCL_WDBJ_KSBL = "/api/myOffice/startBL";
    /**
     * @author mashuwen
	 * @date 2017年12月03日
     * 公文处理应用调用：我的办件，办结办件状态修改的接口定义
     */
    public final static String WEB_INTERFACE_DZBMS_TO_GWCL_WDBJ_FINISHED = "/api/myOffice/finishBj";
    /**
     * @author mashuwen
	 * @date 2017年12月03日
     * 公文处理应用调用：我的阅件，阅件卡片页列表数据加载的接口定义
     */
    public final static String WEB_INTERFACE_DZBMS_TO_GWCL_WDYJ_CARD = "/api/myRead/myReadCard";
    /**
     * @author mashuwen
	 * @date 2017年12月03日
     * 公文处理应用调用：我的阅件，阅件列表页列表数据加载的接口定义
     */
    public final static String WEB_INTERFACE_DZBMS_TO_GWCL_WDYJ_TABLE = "/api/myRead/myRead";
    /**
     * @author mashuwen
	 * @date 2017年12月03日
     * 公文处理应用调用：我的阅件，阅件列表页合计数据加载的接口定义
     */
    /**
     * @author mashuwen
	 * @date 2018年3月30日
	 * 公文处理应用调用：我的阅件再次转阅，单条数据撤回功能；
     */
    public final static String WEB_INTERFACE_DZBMS_TO_GWCL_WDYJ_SINGLE = "/fileInfoConsultor/delete";
    public final static String WEB_INTERFACE_DZBMS_TO_GWCL_WDYJ_COUNT = "/api/myRead/myReadCount";
    /**
     * @author mashuwen
	 * @date 2017年12月03日
     * 公文处理应用调用：我的阅件，编辑信息加载的接口定义
     */
    /**
     * @author mashuwen
	 * @date 2018年3月30日
	 * 公文处理应用调用：我的阅件再次转阅，全部撤回功能；
     */
    public final static String WEB_INTERFACE_DZBMS_TO_GWCL_WDYJ_ALL = "/fileInfoConsultor/delByTeamId";
    public final static String WEB_INTERFACE_DZBMS_TO_GWCL_WDYJ_EDIT = "/api/myRead/info";
    /**
     * @author mashuwen
	 * @date 2017年12月03日
     * 公文处理应用调用：我的阅件，状态修改的接口定义
     */
    public final static String WEB_INTERFACE_DZBMS_TO_GWCL_WDYJ_CHANGE_STATUS = "/api/myRead/changeReadStatus";
    /**
     * @author zhangbo
	 * @date 2017年12月03日
     * 公文处理应用调用：我的阅件，多条状态修改的接口定义
     */
    public final static String WEB_INTERFACE_DZBMS_TO_GWCL_WDYJ_CHANGE_MULTI_STATUS = "/api/myRead/changeMultiReadStatus";
    /**
     * @author mashuwen
	 * @date 2017年12月03日
     * 公文处理应用调用：我的借阅，卡片页列表页面数据加载的接口定义
     */
    public final static String WEB_INTERFACE_DZBMS_TO_GWCL_WDJY_CARD = "/api/myRead/myBorrow";
    /**
     * @author mashuwen
	 * @date 2017年12月03日
     * 公文处理应用调用：我的借阅，列表页面数据加载的接口定义
     */
    public final static String WEB_INTERFACE_DZBMS_TO_GWCL_WDJY_TABLE = "/api/myRead/myBorrowList";
    /**
     * @author xyj
	 * @date 2017年12月03日
     * 公文处理应用调用：我的借阅，列表页面数据加载的接口定义
     * 获取未还数量
     */
    public final static String WEB_INTERFACE_DZBMS_TO_GWCL_WDJY_COUNT = "/api/myRead/myBorrowCount";
    /**
     * @author mashuwen
	 * @date 2017年12月03日
     * 公文处理应用调用：我的借阅，归还提醒列表页面数据加载的接口定义
     */
    public final static String WEB_INTERFACE_DZBMS_TO_GWCL_WDJY_GHTX = "/api/myRead/remaindDaysList";
    /**
     * @author mashuwen
	 * @date 2017年12月03日
     * 公文处理应用调用：我的借阅，借阅申请页面数据加载的接口定义
     */
    public final static String WEB_INTERFACE_DZBMS_TO_GWCL_WDJY_JYSQ = "/api/myRead/borrowApply";
    /**
     * @author mashuwen
	 * @date 2017年12月03日
     * 公文处理应用调用：我的借阅，借阅回复数据加载的接口定义
     */
    public final static String WEB_INTERFACE_DZBMS_TO_GWCL_WDJY_ADVISE = "/api/myRead/advise";
    
    /**
     * @author mashuwen
	 * @date 2017年12月03日
     * 公文处理应用调用：我的借阅，查看版式文件数据加载的接口定义
     */
    public final static String WEB_INTERFACE_DZBMS_TO_GWCL_WDJY_FORMAT = "/api/myRead/formaFileUrl";
    
    /**
     * @author mashuwen
	 * @date 2017年12月03日
     * 公文处理应用调用：公文数据归档，公文数据在归档时先到电子保密室，再到数字档案室的接口定义
     */
    public final static String WEB_INTERFACE_GWCL_TO_DZBMS_ARCHIVE = "/fileinfo/save";
    
    /**
     * @author mashuwen
	 * @date 2017年12月03日
     * 公文处理应用调用：数字档案室归档文件退回到电子保密室的接口定义
     */
    public final static String WEB_INTERFACE_SZDAS_TO_DZBMS_BACK = "/fileinfo/updateStatus";
    
    /**
     * @author mashuwen
	 * @date 2017年12月03日
     * 公文处理应用调用：公文数据归档，公文数据在归档时到数字档案室的接口定义
     */
    public final static String WEB_INTERFACE_GWCL_TO_SZDAS_ARCHIVE = "/archiveinfo/statuschange";
    
    /**
     * @author mashuwen
	 * @date 2017年12月03日
     * 电子保密室应用调用：电子保密室到公文处理的消息提醒的接口定义
     */
    public final static String WEB_INTERFACE_GWCL_TO_DZBMS_MSG = "/msg/send";
    /**
     * @author mashuwen
	 * @date 2017年12月03日
     * 负一屏应用调用：负一屏调用部级、局级值班管理信息接口定义
     */
    public final static String WEB_INTERFACE_ZBGL_TO_FYP = "/dutyarrange/getDutyInfo";
    /**
     * @author mashuwen
	 * @date 2017年12月03日
     * 负一屏应用调用：负一屏调用通讯录信息接口定义
     */
    public final static String WEB_INTERFACE_TXL_TO_FYP = "/txluser/getTxlInfo";
    /**
     * @author mashuwen
	 * @date 2017年12月03日
     * 负一屏应用调用：部级负一屏数据，从首长办公获取首长活动安排，展示到负一屏中接口定义
     */
    public final static String WEB_INTERFACE_SZBG_HDAP_TO_FYP = "/secretary/api/weekactivity";
    /**
     * @author mashuwen
	 * @date 2017年12月03日
     * 工作动态应用调用：工作动态向首长办公秘书版报送数据接口定义；（该应用暂时不用了，使用肖利剑提供的信息服务）
     */
    public final static String WEB_INTERFACE_GZDT_TO_SZBGMS = "/workdynamic/datatransmit";
    
    /**
     * @author mashuwen
	 * @date 2017年12月03日
     * 在位情况应用调用：首长在位情况数据同步到首长办公应用中的接口定义；
     */
    public final static String WEB_INTERFACE_ZWQK_TO_SZBG_SAVE = "/chairman/api/chairmanStatusSave";
    
    /**
     * @author mashuwen
	 * @date 2017年12月03日
     * 全文检索接口：数字档案室桌面检索接口定义
     */
    public final static String WEB_INTERFACE_SEARCH_SZDAS = "/api/search/szdas";
    
    /**
     * @author mashuwen
	 * @date 2017年12月03日
     * 数字档案室待交档状态变更
     */
    public final static String WEB_INTERFACE_STATUS_CHANGE_SZDAS = "/archiveinfo/statuschange";
    
    /**
     * @author mashuwen
	 * @date 2017年12月22日
     * 公文处理应用调用：我的阅件，进行再次转阅接口调用
     */
    public final static String WEB_INTERFACE_DZBMS_TO_GWCL_WDYJ_ZY = "/api/myRead/changeToReadFile";
    
    /**
     * @author mashuwen
	 * @date 2018年1月17日
     * 电子保密室院级领导分发路径
     */
    public final static String WEB_INTERFACE_DZBMS_TO_SZBG_DRAFT = "/chairman/api/saveDzbmsDraft";
	
    /**
     * @author 
	 * @date 2018年5月11日
     * 
     */
    public final static String WEB_INTERFACE_DZBMS_TO_GWCL_WDBJ_INFO = "/api/myOffice/banJianInfo";
    
    /**
     * @author zxx
	 * @date 2018年05月15日
     * 部级电子保密室，更新签收状态
     */
    public final static String WEB_INTERFACE_DZBMS_TO_DZBMS_ISREAD = "/sendrecord/readUser";
    /**
     * @author gaojiqiong
	 * @date 2018年04月25日
     * 记录流转日志信息
     */
    public final static String  INSERT_INTO_PZLDATA="/log/rzjl/pzlSave";
    /**
     * @author xiayujie
	 * @date 2018年1月17日
     * 部电子保密室分发
     */
    public final static String WEB_INTERFACE_GWZB_SAVE_AUDIT = "/app/gwzb/api/saveAudit";
    /**
     * @author xiayujie
	 * @date 2018年1月17日
     * 部电子保密室分发送首长--拟办
     */
    public final static String WEB_INTERFACE_GWZB_SAVE_ITEM = "/app/gwzb/api/saveReceiveInfo";
    /**
     * @author xiayujie
	 * @date 2018年1月17日
     * 部电子保密室分发送首长--拟办
     */
    public final static String WEB_INTERFACE_GWCL_SAVE_BANJIAN = "/document/DzbmsBanjian/save";
    /**
     * 办结回滚
     * */
    public final static String WEB_INTERFACE_GWCL_CANCEL_BANJIAN = "/document/DzbmsBanjian/cancel";
    /**
     * 办件管理列表接口
     */
    public final static String WEB_INTERFACE_GWCL__BANJIAN_LIST = "/document/DzbmsBanjian/listBanJian";
   /**
    * 办件个状态数量
    */
    public final static String WEB_INTERFACE_GWCL__BANJIAN_STATUS_COUNT = "/document/DzbmsBanjian/getCountType";
    /**
     * 转办件送批办接口
     */
    public final static String WEB_INTERFACE_GWCL__BANJIAN_SPB = "/document/DzbmsBanjian/sendPb";
    /**
     * 统计批办文件数量接口
     * */
    public final static String WEB_INTERFACE_GWCL_BANJIAN_PBWJCOUNT = "/document/DzbmsBanjian/pbwjCount";
    
    /**
     * 调用公文意见保存
     */
    public final static String WEB_INTERFACE_GWCL_BANJIANYJ_SAVE = "/documentdzbmsbanjianyj/save";
    
    /**
     * 调用公文意见保存
     */
    public final static String WEB_INTERFACE_GWCL_BANJIANYJ_MUTIL_SAVE = "/documentdzbmsbanjianyj/saveMulti";
    
    /**
     * 删除意见
     */
    public final static String WEB_INTERFACE_GWCL_BANJIANYJ_DELETE = "/documentdzbmsbanjianyj/deleteYjById";
    /**
     * 调用查询意见列表
     */
    public final static String WEB_INTERFACE_GWCL_BANJIANYJ_LIST = "/documentdzbmsbanjianyj/findByBjId";
    
    /**
     * 调用查询意见列表
     * @date 2018-10-13
     */
    public final static String WEB_INTERFACE_GWCL_BANJIANYJ_SORT_LIST = "/documentdzbmsbanjianyj/findYjByBjId";
    
    /**
     * 获得承办人
     */
    public final static String WEB_INTERFACE_GWCL_CHENGBANREN_LIST = "/document/DzbmsBanjian/getCbrs";
    
    /**
     * 获得承办单位
     */
    public final static String WEB_INTERFACE_GWCL_CHENGBANREN_DANWEI_LIST = "/document/DzbmsBanjian/getCbdwBms";
    
    
    /**
     * @author 
	 * @date 2018年6月29日
     * 
     */
    public final static String WEB_INTERFACE_DZBMS_TO_GONGWEN_YAOSUINFO = "/document/DzbmsBanjian/info";
    
    /**
     * 初始化第一条催办记录
     */
    public final static String WEB_INTERFACE_CUNBAN_FIRST_DATA = "/document/DzbmsBanjian/getFristCbjl";
    /**
     * 催办记录
     */
    public final static String WEB_INTERFACE_CUNBAN_DATA = "/document/DzbmsBanjian/getCbjl";
    /**
     * 删除办件
     */
    public final static String WEB_INTERFACE_GWCL_DELETE_BANJIAN = "/document/DzbmsBanjian/delete";
    /**
     * 删除办件
     */
    public final static String WEB_INTERFACE_GWCL_DELETE_BANJIAN_BJFB = "/banjian/delete";
    
    /**
     * 获取未发布的意见
     */
    public final static String WEB_INTERFACE_GWCL_BANJIAN_YJ_NOTFB = "/documentdzbmsbanjianyj/getNotFbYj";
    /**
     * 查询当前人权限
     */
    public final static String WEB_INTERFACE_GWCL_BANJIAN_ROLE = "/document/DzbmsBanjian/judgeCurrentUserRole";
    /**
     * 查询当前办件是否办结
     */
    public final static String WEB_INTERFACE_GWCL_BANJIAN_ISBJ = "/document/DzbmsBanjian/isBj";
    /**
     * 获取当前签批人信息
     */
    public final static String WEB_INTERFACE_GWCL_BANJIAN_FILEURL = "/document/DzbmsBanjian/FILEURL";
    /**
     * 获取当前签批人信息
     */
    public final static String WEB_INTERFACE_GWCL_BANJIAN_SHOWBUTTON = "/document/DzbmsBanjian/showButton";
    
    /**
     * 查询当前办件是否办结
     */
    public final static String WEB_INTERFACE_GWCL_BANJIAN_ZPBCHEHUI = "/document/DzbmsBanjian/zpbChehui";
    /**
     * 查询是否撤回
     */
    public final static String WEB_INTERFACE_DZBMS_TO_GWCL_WDBJ_CHECKCHEHUI = "/api/myOffice/checkChehui";
    /**
     * 查询建议办结
     */
    public final static String WEB_INTERFACE_DZBMS_TO_GWCL_WDBJ_JYBJCX = "/document/documentbanjianjybj/queryinfo";
    public final static String WEB_INTERFACE_DZBMS_TO_GWCL_WDBJ_JYBJBTN = "/document/documentbanjianjybj/textareaIsToShow";
    /**
     * 电子收发室的收文和发文的单位同步到电子保密室
     */
    public final static String WEB_INTERFACE_DZSFS_TO_DZBMS_SWFWORG_DIC = "/dzsfsfiledic/tree2";
    /**
     * 查询公文处理的短信开关
     */
    public final static String WEB_INTERFACE_DZBMS_TO_GWCL_SET="/msgset/set";
    /**
     * 查询公文处理的短信开关们
     */
    public final static String WEB_INTERFACE_DZBMS_TO_GWCL_SETS="/msgset/sets";
    /**
<<<<<<< HEAD
     * 加载预设的催办信息
     */
    public final static String WEB_INTERFACE_DZBMS_TO_GWCL_WDBJ_JZYSCBXX="/commonuseurge/list";
    /**
     * 保存催办信息预设
     */
    public final static String WEB_INTERFACE_DZBMS_TO_GWCL_WDBJ_BCCBXXYS="/commonuseurge/save";
    /**
     * 删除催办信息预设
     */
    public final static String WEB_INTERFACE_DZBMS_TO_GWCL_WDBJ_SCCBXXYS="/commonuseurge/delete";
    
    /**
     * 获取转办情况说明
     */
    public final static String WEB_INTERFACE_DZBMS_TO_GWCL_GETZBQKSM = "/document/DzbmsBanjian/getZbqksm";
    /**
     * 获取当前办件组织机构分组
     */
    public final static String WEB_INTERFACE_DZBMS_TO_GWCL_GETCBDWS = "/document/DzbmsBanjian/getCbdws";
    /**
     * 加载办理情况说明
     */
    public final static String WEB_INTERFACE_DZBMS_TO_GWCL_GETBLQKSM = "/document/DzbmsBanjian/getBlqksm";
    /**
     * 保存催办信息
     */
    public final static String WEB_INTERFACE_DZBMS_TO_GWCL_SAVEBJTX = "/document/DzbmsBanjian/saveBjTx";
    /**
     * 保存办理进度
     */
    public final static String WEB_INTERFACE_DZBMS_TO_GWCL_SAVEBLJD = "/document/DzbmsBanjian/saveBljd";
    /**
     * 查看办理情况
     */
    public final static String WEB_INTERFACE_DZBMS_TO_GWCL_FIRSTBLQK = "/banjian/firstblqk";
    /**
     * 更改办件公文要素
     */
    public final static String WEB_INTERFACE_DZBMS_TO_GWCL_UPDATEINFOYAOSU = "/document/DzbmsBanjian/updateinfoYaoSu";
    
   /*  * 获取办件可编最小号的前一个号
     */
    public final static String WEB_INTERFACE_DZBMS_TO_GWCL_SERIALNUM = "/document/DzbmsBanjian/getSerialNum";
    /**
     * 将意见导出成word后转为OFD
     */
    public final static String WEB_INTERFACE_DZBMS_TO_GWCL_EXPPORTWORD = "/document/DzbmsBanjian/dzbmsExportWord";
    /**
     * 查询DOCUMENT_DZBMS_BANJIAN中是否已插入数据
     */    
    public final static String WEB_INTERFACE_DZBMS_TO_GWCL_QUERYOBJECT = "/document/DzbmsBanjian/queryObject";
    /**
     * 查询个人使用签批或手写模式
     */    
    public final static String WEB_INTERFACE_DZBMS_TO_GWCL_INPUTTEMPLATE = "/documentinputtemplateset/info";
    /**
     * 记忆个人使用签批或手写模式
     */    
    public final static String WEB_INTERFACE_DZBMS_TO_GWCL_INPUTTEMPSAVE = "/documentinputtemplateset/save";
    /**
     *  呈送调用方法
     */
    public final static String WEB_INTERFACE_DZBMS_TO_GWCL_SENDTOLEADERMUTIL = "/document/DzbmsBanjian/sendToLeaderMutil";
    /**
     * 通过办件id获取办件发布承办人
     */
    public final static String WEB_INTERFACE_DZBMS_TO_GWCL_GETBANJIANFBCBRIDBYBJID = "/document/DzbmsBanjian/getBanjianFbCbrIdByBjId";
    /**
     * 通过办件id获取转办记录
     */
    public final static String WEB_INTERFACE_DZBMS_TO_GWCL_BANJIANZBJL = "/banjian/queryDzbmsBanjianZbjl";
    /**
     * 通过办件id获取审阅状态
     */
    public final static String WEB_INTERFACE_DZBMS_TO_GWCL_CHECKANDAPPROVE = "/document/DzbmsBanjian/checkAndApproveMem";
    /**
	 * 電子保密室转办
	 */
    public final static String WEB_INTERFACE_DZBMS_TO_GWCL_SENDTOUSER = "/document/DzbmsBanjian/sendToUser";
    
    /**
	 * @date 2018年4月24日16:28:46
	 * 公文处理我的收藏中调用 通过id查询对象实例
	 * 
	 */
	public final static String WEB_INTERFACE_GWCL_GETDOC_FLOW_OBJ = "/doc/api/getDocFlowObj";
	
	/**
	 * @date 2018年4月24日16:28:46
	 * 公文处理我的收藏中调用
	 */
	public final static String WEB_INTERFACE_GWCL_GETDOCUMENT_FLOW_OBJ = "/app/gwcl/doc/api/getDocumentFlowObj";

	public final static String WEB_INTERFACE_GWCL_GETDOCUMENT_FLOW_SPGW = "/app/gwcl/fypPersonalTodoController/numsList";
	public final static String WEB_INTERFACE_GWCL_GETDOCUMENT_FLOW_LIST = "/app/gwcl/fypPersonalTodoController/wshList";
	public final static String WEB_INTERFACE_YFB_GETDOCUMENT_FLOW_LIST = "/app/gwcl/fypPersonalTodoController/yfbList";
	public final static String WEB_INTERFACE_GWYZ_GETDOCUMENT_FLOW_LIST = "/app/gwcl/fypPersonalTodoController/gwyzList";
	public final static String WEB_INTERFACE_LWYJ_GETDOCUMENT_FLOW_LIST = "/app/gwcl/fypPersonalTodoController/lwyjList";
	public final static String WEB_INTERFACE_ZWQK_GETDOCUMENT_FLOW_LIST = "/api/online";
	public final static String WEB_INTERFACE_LEAVE_GETDOCUMENT_FLOW_LIST = "/app/qxjgl/api/getQjUserIds";
	public final static String WEB_INFORM_AFFICHE_LIST = "/affiche/list";
	public final static String WEB_INFORM_AFFICHE_VIEWINFO_FYP = "/affiche/viewInfo_fyp";
	public final static String WEB_WORK_TREND_VIEWINFO_FYP = "/xxfw/api/orgdynamics";
	public final static String WEB_WORK_TREND_DETAIL_VIEWINFO_FYP = "/channelNews/newsInit";
	public final static String WEB_WORK_TREND_YL_VIEWINFO_FYP = "/channelNews/subscribe";
	public final static String WEB_WORK_TREND_DELETE_VIEWINFO_FYP = "/deletesubscribe";
	public final static String WEB_WORK_TREND_SAVE_VIEWINFO_FYP = "/deletesubscribe";
	/**
     * @author mashuwen
	 * @date 2018年3月30日
	 * 公文处理应用调用：我的阅件，查看收藏数据列表接口
     */
    public final static String WEB_INTERFACE_DZBMS_TO_GWCL_WDYJ_CKSC = "/wdyjfavorite/favoriteList";

    /**
     * @author mashuwen
	 * @date 2018年3月30日
	 * 公文处理应用调用：我的阅件，添加收藏接口
     */
    public final static String WEB_INTERFACE_DZBMS_TO_GWCL_WDYJ_TJSC = "/wdyjfavorite/addWdyjFavorite";
    
    public final static String WEB_INTERFACE_DZBMS_TO_GWCL_WDSC_HQSC = "/wdyjfavorite/queryByRefidAndCreatorid";
    public final static String WEB_INTERFACE_DZBMS_TO_GWCL_WDSC_SCSC = "/wdyjfavorite/delete";
    
    /**
     * @author mashuwen
	 * @date 2018年3月30日
	 * 公文处理应用调用：我的阅件，删除收藏接口
     */
    public final static String WEB_INTERFACE_DZBMS_TO_GWCL_WDYJ_DELSC = "/wdyjfavorite/removeWdyjFavorite";
    
    /**
	 * @date 2018年4月24日16:28:46
	 * 公文处理我的收藏中调用 通过id查询对象实例
	 * 
	 */
	public final static String WEB_INTERFACE_DZBMS_FAVORITE_CHECK = "/wdyjfavorite/checkCollect";
	
	/**
     * @author mashuwen
	 * @date 2018年3月30日
	 * 公文处理应用调用：我的阅件，收藏分类树表加载接口
     */
    public final static String WEB_INTERFACE_DZBMS_TO_GWCL_WDYJ_SCLBTREE = "/wdyjfavorite/getMenuCount";
    /**
     * 我的阅件文件信息（局处批示）接口
     */
    public final static String WEB_INTERFACE_DZBMS_TO_GWCL_WDYJ_JCPS = "/fileinfo/info";
    /**
     * 我的阅件分组类型字典接口
     */
    public final static String WEB_INTERFACE_DZBMS_TO_GWCL_WDYJ_GROUPTYPE = "/dic/wdyjGroupType";
    
    /**
     * @author zhangtong
	 * @date 2019年3月5日
     * 在办件批量办结
     */
    public final static String WEB_INTERFACE_GWCL_PLBJ_BANJIAN = "/document/DzbmsBanjian/plbj";
    
    /**
     * @author zhangtong
	 * @date 2019年3月5日
     * 校验办结件是否还有局长未审批
     */
    public final static String WEB_INTERFACE_GWCL_BANJIAN_JZCHECKED = "/document/DzbmsBanjian/jzChecked";
    
    /**
     * @author zhangbo
     * @date 2019年3月26日
     * 接管时，我的收藏需要接管时间
     */
    public final static String WEB_INTERFACE_GWCL_TO_DZBMS_DOCUMENT_HISTORY_DATA = "/documenthistorydata/getPersonInfo";
    
    /**
     * @author 王金勇
     * @date 2019年3月28日
     * 所有办件承办人“建议办结”后，自动办结调用“办结”方法(app/gwcl/documentFlow/finishApprove)
     * */
    public final static String WEB_INTERFACE_GWCL_BANJIAN_FINISHAPPROVE = "/documentFlow/finishApprove";
    /**
     * 阅件撤回时删除公文组中文件夹相关数据
     */
    public final static String WEB_INTERFACE_DZBMS_TO_GWCL_FOLDER_RELATION = "/folderrelation/deleteFolderByCondition";
    /**
     * 
     */
    public final static String WEB_INTERFACE_DZBMS_TO_GWCL_QUERY_YJ = "/api/myRead/queryYJ";

    /**
     * 公文处理、负一屏办文接口
     */
    public final static String WEB_INERFACE_GWCL_DO_DOCUMENT = "/app/gwcl/fyp/doDocument";

    /**
     * 中宏利达、负一屏会议接口
     */
    public final static String WEB_INERFACE_GWCL_MEETING = "/api/v3/conference/query4ub";
}
