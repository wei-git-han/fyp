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
     * 成功
     * @return
     */
    public JSONObject success(){
        this.status = Value.SUCCESS.code;
        this.result = Value.SUCCESS.result;
        return this.putJson();
    }

    /**
     * 成功
     * @param data 返回值
     * @return
     */
    public JSONObject success(Object data){
        this.data = data;
        this.status = Value.SUCCESS.code;
        this.result = Value.SUCCESS.result;
        return this.putJson();
    }

    /**
     * 成功
     * @param data 返回值
     * @param message 提示消息
     * @return
     */
    public JSONObject success(Object data,String message){
        this.status = Value.SUCCESS.code;
        this.result = Value.SUCCESS.result;
        this.data = data;
        this.message = message;
        return this.putJson();
    }

    /**
     * 失败
     * 500
     * @return
     */
    public JSONObject error(){
        this.status = Value.ERROR.code;
        this.result = Value.ERROR.result;
        return this.putJson();
    }

    /**
     * 失败
     * 404
     * @return
     */
    public JSONObject errorPath(){
        this.status = Value.ERROR_PATH.code;
        this.result = Value.ERROR_PATH.result;
        return this.putJson();
    }

    /**
     * 失败
     * 400
     * @return
     */
    public JSONObject errorToken(){
        this.status = Value.ERROR_TOKEN.code;
        this.result = Value.ERROR_TOKEN.result;
        return this.putJson();
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

    public enum Value{
        //成功
        SUCCESS(200,"成功"),
        //系统错误
        ERROR(500,"后台错误，请联系管理员"),
        //路径错误
        ERROR_PATH(404,"数据丢失"),
        //TOKEN失效
        ERROR_TOKEN(400,"未登录，TOKEN过期");
        private int code;
        private String result;

        Value(int code, String result) {
            this.code = code;
            this.result = result;
        }
    }
}
