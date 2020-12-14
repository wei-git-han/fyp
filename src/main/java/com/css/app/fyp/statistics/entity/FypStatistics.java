package com.css.app.fyp.statistics.entity;

import java.io.Serializable;
import java.util.Date;



/**
 * 年度统计表
 * 
 * @author 中软信息系统工程有限公司
 * @email 
 * @date 2020-12-11 16:09:16
 */
public class FypStatistics implements Serializable {
	private static final long serialVersionUID = 1L;
	
	//
	private String id;

	//处名称
	private String divisionName;
	//办理督办数量
	private Integer checkNum;
	//阅知百分比
	private String readknowPercentage;
	//公文处理速度（最快）/分钟
	private String fast;
	//成语id
	private String phraseId;
	//接收公文数量
	private Integer documentNum;
	//第一次使用到系统时间的天数
	private Integer meetDays;
	//创建时间
	private Date createTime;
	//阅件百分比
	private String readpiecePercentage;
	//第一则公文名称
	private String documentName;
	//局名称
	private String directorName;
	//处id
	private String divisionId;
	//第一则公文类型，0公文，1办件、2阅件、3阅知
	private Integer documentType;
	//阅件总数
	private Integer readNum;
	//局id
	private String directorId;
	//呈批件百分比
	private String renderPercentage;
	//办件百分比
	private String dopiecePercentage;
	//是否删除,0是-1否
	private Integer isDelete;
	//在线天数
	private Integer onlineDays;
	//已阅数量
	private Integer alreadyNum;
	//用户ID
	private String userId;

	//第一则公文时间
	private Date FRISTDATE;


    //公文完成率百分比
    private String overPercentage;
    //公文已完成公文总量
    private Integer ISREADTOTAL;
    //公文总量
    private Integer TOTAL;

    //办件完成率百分比
    private String BJOverPercentage;
    //办件已完成公文总量
    private Integer BJISREADTOTAL;
    //办件总量
    private Integer BJTOTAL;

    //阅件完成率百分比
    private String YJOverPercentage;
    //阅件已完成公文总量
    private Integer YJISREADTOTAL;
    //阅件总量
    private Integer YJTOTAL;

    //阅知完成率百分比
    private String YZoverPercentage;
    //阅知已完成公文总量
    private Integer YZISREADTOTAL;
    //阅知总量
    private Integer YZTOTAL;
	//处理速度-词语
    private String PHRASENAME;

	public String getPHRASENAME() {
		return PHRASENAME;
	}

	public void setPHRASENAME(String PHRASENAME) {
		this.PHRASENAME = PHRASENAME;
	}

	public String getBJOverPercentage() {
        return BJOverPercentage;
    }

    public void setBJOverPercentage(String BJOverPercentage) {
        this.BJOverPercentage = BJOverPercentage;
    }

    public Integer getBJISREADTOTAL() {
        return BJISREADTOTAL;
    }

    public void setBJISREADTOTAL(Integer BJISREADTOTAL) {
        this.BJISREADTOTAL = BJISREADTOTAL;
    }

    public Integer getBJTOTAL() {
        return BJTOTAL;
    }

    public void setBJTOTAL(Integer BJTOTAL) {
        this.BJTOTAL = BJTOTAL;
    }

    public String getYJOverPercentage() {
        return YJOverPercentage;
    }

    public void setYJOverPercentage(String YJOverPercentage) {
        this.YJOverPercentage = YJOverPercentage;
    }

    public Integer getYJISREADTOTAL() {
        return YJISREADTOTAL;
    }

    public void setYJISREADTOTAL(Integer YJISREADTOTAL) {
        this.YJISREADTOTAL = YJISREADTOTAL;
    }

    public Integer getYJTOTAL() {
        return YJTOTAL;
    }

    public void setYJTOTAL(Integer YJTOTAL) {
        this.YJTOTAL = YJTOTAL;
    }

    public String getYZoverPercentage() {
        return YZoverPercentage;
    }

    public void setYZoverPercentage(String YZoverPercentage) {
        this.YZoverPercentage = YZoverPercentage;
    }

    public Integer getYZISREADTOTAL() {
        return YZISREADTOTAL;
    }

    public void setYZISREADTOTAL(Integer YZISREADTOTAL) {
        this.YZISREADTOTAL = YZISREADTOTAL;
    }

    public Integer getYZTOTAL() {
        return YZTOTAL;
    }

    public void setYZTOTAL(Integer YZTOTAL) {
        this.YZTOTAL = YZTOTAL;
    }

    public Date getFRISTDATE() {
		return FRISTDATE;
	}

	public void setFRISTDATE(Date FRISTDATE) {
		this.FRISTDATE = FRISTDATE;
	}

	public Integer getISREADTOTAL() {
		return ISREADTOTAL;
	}

	public void setISREADTOTAL(Integer ISREADTOTAL) {
		this.ISREADTOTAL = ISREADTOTAL;
	}

	public Integer getTOTAL() {
		return TOTAL;
	}

	public void setTOTAL(Integer TOTAL) {
		this.TOTAL = TOTAL;
	}

	public static long getSerialVersionUID() {
		return serialVersionUID;
	}

	public String getUserId() {
		return userId;
	}

	public void setUserId(String userId) {
		this.userId = userId;
	}

	/**
	 * 设置：
	 */
	public void setId(String id) {
		this.id = id;
	}
	/**
	 * 获取：
	 */
	public String getId() {
		return id;
	}
	/**
	 * 设置：完成率百分比
	 */
	public void setOverPercentage(String overPercentage) {
		this.overPercentage = overPercentage;
	}
	/**
	 * 获取：完成率百分比
	 */
	public String getOverPercentage() {
		return overPercentage;
	}
	/**
	 * 设置：处名称
	 */
	public void setDivisionName(String divisionName) {
		this.divisionName = divisionName;
	}
	/**
	 * 获取：处名称
	 */
	public String getDivisionName() {
		return divisionName;
	}
	/**
	 * 设置：办理督办数量
	 */
	public void setCheckNum(Integer checkNum) {
		this.checkNum = checkNum;
	}
	/**
	 * 获取：办理督办数量
	 */
	public Integer getCheckNum() {
		return checkNum;
	}
	/**
	 * 设置：阅知百分比
	 */
	public void setReadknowPercentage(String readknowPercentage) {
		this.readknowPercentage = readknowPercentage;
	}
	/**
	 * 获取：阅知百分比
	 */
	public String getReadknowPercentage() {
		return readknowPercentage;
	}
	/**
	 * 设置：公文处理速度（最快）/分钟
	 */
	public void setFast(String fast) {
		this.fast = fast;
	}
	/**
	 * 获取：公文处理速度（最快）/分钟
	 */
	public String getFast() {
		return fast;
	}
	/**
	 * 设置：成语id
	 */
	public void setPhraseId(String phraseId) {
		this.phraseId = phraseId;
	}
	/**
	 * 获取：成语id
	 */
	public String getPhraseId() {
		return phraseId;
	}
	/**
	 * 设置：接收公文数量
	 */
	public void setDocumentNum(Integer documentNum) {
		this.documentNum = documentNum;
	}
	/**
	 * 获取：接收公文数量
	 */
	public Integer getDocumentNum() {
		return documentNum;
	}
	/**
	 * 设置：第一次使用到系统时间的天数
	 */
	public void setMeetDays(Integer meetDays) {
		this.meetDays = meetDays;
	}
	/**
	 * 获取：第一次使用到系统时间的天数
	 */
	public Integer getMeetDays() {
		return meetDays;
	}
	/**
	 * 设置：创建时间
	 */
	public void setCreateTime(Date createTime) {
		this.createTime = createTime;
	}
	/**
	 * 获取：创建时间
	 */
	public Date getCreateTime() {
		return createTime;
	}
	/**
	 * 设置：阅件百分比
	 */
	public void setReadpiecePercentage(String readpiecePercentage) {
		this.readpiecePercentage = readpiecePercentage;
	}
	/**
	 * 获取：阅件百分比
	 */
	public String getReadpiecePercentage() {
		return readpiecePercentage;
	}
	/**
	 * 设置：第一则公文名称
	 */
	public void setDocumentName(String documentName) {
		this.documentName = documentName;
	}
	/**
	 * 获取：第一则公文名称
	 */
	public String getDocumentName() {
		return documentName;
	}
	/**
	 * 设置：局名称
	 */
	public void setDirectorName(String directorName) {
		this.directorName = directorName;
	}
	/**
	 * 获取：局名称
	 */
	public String getDirectorName() {
		return directorName;
	}
	/**
	 * 设置：处id
	 */
	public void setDivisionId(String divisionId) {
		this.divisionId = divisionId;
	}
	/**
	 * 获取：处id
	 */
	public String getDivisionId() {
		return divisionId;
	}
	/**
	 * 设置：第一则公文类型，0公文，1办件、2阅件、3阅知
	 */
	public void setDocumentType(Integer documentType) {
		this.documentType = documentType;
	}
	/**
	 * 获取：第一则公文类型，0公文，1办件、2阅件、3阅知
	 */
	public Integer getDocumentType() {
		return documentType;
	}
	/**
	 * 设置：阅件总数
	 */
	public void setReadNum(Integer readNum) {
		this.readNum = readNum;
	}
	/**
	 * 获取：阅件总数
	 */
	public Integer getReadNum() {
		return readNum;
	}
	/**
	 * 设置：局id
	 */
	public void setDirectorId(String directorId) {
		this.directorId = directorId;
	}
	/**
	 * 获取：局id
	 */
	public String getDirectorId() {
		return directorId;
	}
	/**
	 * 设置：呈批件百分比
	 */
	public void setRenderPercentage(String renderPercentage) {
		this.renderPercentage = renderPercentage;
	}
	/**
	 * 获取：呈批件百分比
	 */
	public String getRenderPercentage() {
		return renderPercentage;
	}
	/**
	 * 设置：办件百分比
	 */
	public void setDopiecePercentage(String dopiecePercentage) {
		this.dopiecePercentage = dopiecePercentage;
	}
	/**
	 * 获取：办件百分比
	 */
	public String getDopiecePercentage() {
		return dopiecePercentage;
	}
	/**
	 * 设置：是否删除,0是-1否
	 */
	public void setIsDelete(Integer isDelete) {
		this.isDelete = isDelete;
	}
	/**
	 * 获取：是否删除,0是-1否
	 */
	public Integer getIsDelete() {
		return isDelete;
	}
	/**
	 * 设置：在线天数
	 */
	public void setOnlineDays(Integer onlineDays) {
		this.onlineDays = onlineDays;
	}
	/**
	 * 获取：在线天数
	 */
	public Integer getOnlineDays() {
		return onlineDays;
	}
	/**
	 * 设置：已阅数量
	 */
	public void setAlreadyNum(Integer alreadyNum) {
		this.alreadyNum = alreadyNum;
	}
	/**
	 * 获取：已阅数量
	 */
	public Integer getAlreadyNum() {
		return alreadyNum;
	}
}
