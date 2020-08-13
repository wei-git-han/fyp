package com.css.app.fyp.utils;

import net.sf.json.JSONObject;
import org.apache.poi.ss.formula.functions.T;

/**
 *  统一接口返回
 */
public class ResponseValueUtils {

    //状态码
    private int status;

    //状态值
    private String result;

    //提示消息
    private String message;

    //返回值
    private Object data;

    public ResponseValueUtils(int status, String result, String message, T data) {
        this.status = status;
        this.result = result;
        this.message = message;
        this.data = data;
    }

    public ResponseValueUtils() {
    }

    /**
     * @param data 返回值
     * @return
     */
    public JSONObject success(Object data){
        this.data = data;
        this.putValue(200);
        return this.putJson();
    }

    /**
     * @param data 返回值
     * @param message 提示消息
     * @return
     */
    public JSONObject success(T data,String message){
        this.data = data;
        this.message = message;
        this.putValue(200);
        return this.putJson();
    }

    /**
     * 失败
     * @param status 200 500 404 400
     * @return
     */
    public JSONObject error(int status){
        this.putValue(status);
        return this.putJson();
    }

    /**
     * 状态值
     * @param status
     */
    private void putValue(int status){
        this.status = status;
        switch (status){
            case 200:
                this.result = "成功";
                break;
            case 500:
                this.result = "后台错误，请联系管理员";
                break;
            case 404:
                this.result = "数据丢失";
                break;
            case 400:
                this.result = "未登录，token过期";
                break;
        }
    }

    /**
     * return赋值
     * @return
     */
    public JSONObject putJson(){
        JSONObject rjson = new JSONObject();
        rjson.put("status",status);
        rjson.put("result",result);
        rjson.put("data",data);
        rjson.put("message",message);
        return rjson;
    }
}
