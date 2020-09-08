package com.css.app.fyp.routine.vo;

public class ReignCaseVo {

    //ID
    private String reignCaseId;
    //名字
    private String reignCaseName;
    //状态
    private String reignCaseType;
    //在线人数
    private Integer peopleOnlineCount;
    //在线率
    private String onlineRate;
    //在编人数
    private Integer userCount;
    //本日峰值
    private Integer toDayCount;

    public String getReignCaseId() {
        return reignCaseId;
    }

    public void setReignCaseId(String reignCaseId) {
        this.reignCaseId = reignCaseId;
    }

    public String getReignCaseName() {
        return reignCaseName;
    }

    public void setReignCaseName(String reignCaseName) {
        this.reignCaseName = reignCaseName;
    }

    public String getReignCaseType() {
        return reignCaseType;
    }

    public void setReignCaseType(String reignCaseType) {
        this.reignCaseType = reignCaseType;
    }

    public Integer getPeopleOnlineCount() {
        return peopleOnlineCount;
    }

    public void setPeopleOnlineCount(Integer peopleOnlineCount) {
        this.peopleOnlineCount = peopleOnlineCount;
    }

    public String getOnlineRate() {
        return onlineRate;
    }

    public void setOnlineRate(String onlineRate) {
        this.onlineRate = onlineRate;
    }

    public Integer getUserCount() {
        return userCount;
    }

    public void setUserCount(Integer userCount) {
        this.userCount = userCount;
    }

    public Integer getToDayCount() {
        return toDayCount;
    }

    public void setToDayCount(Integer toDayCount) {
        this.toDayCount = toDayCount;
    }
}
