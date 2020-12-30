package com.css.base.utils;

import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.JSONArray;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.scheduling.annotation.Async;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.web.client.RestTemplate;

import com.alibaba.fastjson.JSONObject;
import com.css.base.filter.SSOAuthFilter;
import sun.net.www.protocol.http.HttpURLConnection;

import java.io.*;
import java.net.URL;
import java.nio.charset.Charset;
import java.util.Map;

/**
 * 跨域请求数据
 * @author mashuwen
 * @date 2017-10-12 21:17:28
 */
public class CrossDomainUtil {
	public static final JSONArray resultJsonArray = new JSONArray();

	public static JSONObject getJsonData(String url) {
		return getJsonData(url, null);
	}
	public static JSONArray getJsonArrayData(String url) {
		return getJsonArrayData(url, null);
	}
	/**
	 * 跨域post请求
	 * @param url 请求地址
	 * @param map 请求参数集合
	 * @return 返回JSON数据
	 */
	public static JSONObject getJsonData(String url,LinkedMultiValueMap<String, Object> map){
		//设置消息头
		HttpHeaders headers = new HttpHeaders();
		MediaType mediaType = MediaType.parseMediaType("application/x-www-form-urlencoded;charset=UTF-8");
		headers.setContentType(mediaType);
		//设置请求参数
        HttpEntity<LinkedMultiValueMap<String, Object>> formEntity = new HttpEntity<LinkedMultiValueMap<String, Object>>(map, headers);
        //创建RestTemplate对象
        RestTemplate restTemplate = new RestTemplate();
        url+="?access_token=" + SSOAuthFilter.getToken();
        try{
        	//发送post请求
        	ResponseEntity<JSONObject> data = restTemplate.postForEntity(url, formEntity, JSONObject.class);
        	//返回请求数据
        	return data.getBody();
        }catch(Exception e){
        	System.out.println("【报错信息】"+e.getMessage()+"，url="+url);
        }
        return null;
	}

	public static String postJSONString(String url, LinkedMultiValueMap<String, Object> map) {
		// 设置消息头
		HttpHeaders headers = new HttpHeaders();
		MediaType mediaType = MediaType.parseMediaType("application/x-www-form-urlencoded;charset=UTF-8");
		headers.setContentType(mediaType);
		// 设置请求参数
		HttpEntity<LinkedMultiValueMap<String, Object>> formEntity = new HttpEntity<LinkedMultiValueMap<String, Object>>(map, headers);
		// 创建RestTemplate对象
		RestTemplate restTemplate = new RestTemplate();
		try {
			ResponseEntity<String> result = restTemplate.postForEntity(url, formEntity, String.class);
			return result.getBody();
		}catch(Exception e){
			System.out.println("【报错信息】"+e.getMessage()+"，url="+url);
		}
		return null;
	}

	public static JSONObject getJsonDataNotHaveTokenByJsonData(String url,JSONObject jsonData){
		//设置消息头
		HttpHeaders headers = new HttpHeaders();
		MediaType mediaType = MediaType.parseMediaType("application/json");
		headers.setContentType(mediaType);
		//设置请求参数
		HttpEntity<JSONObject> formEntity = new HttpEntity<JSONObject>(jsonData, headers);
		//创建RestTemplate对象
		RestTemplate restTemplate = new RestTemplate();
//        restTemplate.getMessageConverters().add(new ZhldMappingJackson2HttpMessageConverter());
		try{
			//发送post请求
			ResponseEntity<JSONObject> data = restTemplate.postForEntity(url, formEntity, JSONObject.class);
			//返回请求数据
			return data.getBody();
		}catch(Exception e){
			System.out.println("【报错信息】"+e.getMessage()+"，url="+url);
		}
		return null;
	}

	public static JSONArray getJsonArrayData(String url, LinkedMultiValueMap<String, Object> map){
		//设置消息头
		HttpHeaders headers = new HttpHeaders();
		MediaType mediaType = MediaType.parseMediaType("application/x-www-form-urlencoded;charset=UTF-8");
		headers.setContentType(mediaType);
		//设置请求参数
		HttpEntity<LinkedMultiValueMap<String, Object>> formEntity = new HttpEntity<LinkedMultiValueMap<String, Object>>(map, headers);
		//创建RestTemplate对象
		RestTemplate restTemplate = new RestTemplate();
		url+="?access_token=" + SSOAuthFilter.getToken();
		try{
			//发送post请求
			ResponseEntity<JSONArray> data = restTemplate.postForEntity(url, formEntity, JSONArray.class);
			//返回请求数据
			return data.getBody();
		}catch(Exception e){
			System.out.println("【报错信息】"+e.getMessage()+"，url="+url);
		}
		return null;
	}

	@Async
	public static void getJsonArrayDatal(String url,LinkedMultiValueMap<String, Object> map){
		//设置消息头
		HttpHeaders headers = new HttpHeaders();
		MediaType mediaType = MediaType.parseMediaType("application/x-www-form-urlencoded;charset=UTF-8");
		headers.setContentType(mediaType);
		//设置请求参数
		HttpEntity<LinkedMultiValueMap<String, Object>> formEntity = new HttpEntity<LinkedMultiValueMap<String, Object>>(map, headers);
		//创建RestTemplate对象
		RestTemplate restTemplate = new RestTemplate();
		url+="?access_token=" + SSOAuthFilter.getToken();
		try{
			//发送post请求
			ResponseEntity<JSONArray> data = restTemplate.postForEntity(url, formEntity, JSONArray.class);
			JSONArray dataResult = data.getBody();
			if (null == dataResult || dataResult.size() == 0) {
				resultJsonArray.add(new JSONArray());
			} else {
				//返回请求数据
				resultJsonArray.add(data.getBody());
			}
		}catch(Exception e){
			System.out.println("【报错信息】"+e.getMessage()+"，url="+url);
		}
	}

	public static JSONArray getNewJsonArrayData(String url,LinkedMultiValueMap<Object, Object> map){
		//设置消息头
		HttpHeaders headers = new HttpHeaders();
		MediaType mediaType = MediaType.parseMediaType("application/x-www-form-urlencoded;charset=UTF-8");
		headers.setContentType(mediaType);
		//设置请求参数
		HttpEntity<LinkedMultiValueMap<Object, Object>> formEntity = new HttpEntity<LinkedMultiValueMap<Object, Object>>(map, headers);
		//创建RestTemplate对象
		RestTemplate restTemplate = new RestTemplate();
		url+="?access_token=" + SSOAuthFilter.getToken();
		try{
			//发送post请求
			ResponseEntity<JSONArray> data = restTemplate.postForEntity(url, formEntity, JSONArray.class);
			//返回请求数据
			return data.getBody();
		}catch(Exception e){
			System.out.println("【报错信息】"+e.getMessage()+"，url="+url);
		}
		return null;
	}

	public static JSONArray getJsonArrayData1(String url,LinkedMultiValueMap<String, Object> map){
		//设置消息头
		HttpHeaders headers = new HttpHeaders();
		MediaType mediaType = MediaType.parseMediaType("application/x-www-form-urlencoded;charset=UTF-8");
		headers.setContentType(mediaType);
		//设置请求参数
		HttpEntity<LinkedMultiValueMap<String, Object>> formEntity = new HttpEntity<LinkedMultiValueMap<String, Object>>(map, headers);
		//创建RestTemplate对象
		RestTemplate restTemplate = new RestTemplate();
		url+="?access_token=" + SSOAuthFilter.getToken();
		try{
			//发送post请求
			ResponseEntity<JSONArray> data = restTemplate.postForEntity(url, formEntity, JSONArray.class);
			//返回请求数据
			return data.getBody();
		}catch(Exception e){
			System.out.println("【报错信息】"+e.getMessage()+"，url="+url);
		}
		return null;
	}

	public static JSONObject getTokenByJsonData(String url,LinkedMultiValueMap<String, Object> map,String token){
		//设置消息头
		HttpHeaders headers = new HttpHeaders();
		MediaType mediaType = MediaType.parseMediaType("application/x-www-form-urlencoded;charset=UTF-8");
		headers.setContentType(mediaType);
		//设置请求参数
		HttpEntity<LinkedMultiValueMap<String, Object>> formEntity = new HttpEntity<LinkedMultiValueMap<String, Object>>(map, headers);
		//创建RestTemplate对象
		RestTemplate restTemplate = new RestTemplate();
		url+="?access_token=" + token;
		try{
			//发送post请求
			ResponseEntity<JSONObject> data = restTemplate.postForEntity(url, formEntity, JSONObject.class);
			//返回请求数据
			return data.getBody();
		}catch(Exception e){
			System.out.println("【报错信息】"+e.getMessage()+"，url="+url);
		}
		return null;
	}

	public static JSONObject getTokenByJsonDataIsHashMap(String url, Map<String, Object> map, String token){
		//设置消息头
		HttpHeaders headers = new HttpHeaders();
		MediaType mediaType = MediaType.parseMediaType("application/x-www-form-urlencoded;charset=UTF-8");
		headers.setContentType(mediaType);
		//设置请求参数
		HttpEntity<Map<String, Object>> formEntity = new HttpEntity<Map<String, Object>>(map, headers);
		//创建RestTemplate对象
		RestTemplate restTemplate = new RestTemplate();
		url+="?access_token=" + token;
		try{
			//发送post请求
			ResponseEntity<JSONObject> data = restTemplate.postForEntity(url, formEntity, JSONObject.class);
			//返回请求数据
			return data.getBody();
		}catch(Exception e){
			System.out.println("【报错信息】"+e.getMessage()+"，url="+url);
		}
		return null;
	}

	public static JSONObject getTokenByJsonDataParamObject(String url,LinkedMultiValueMap<Object, Object> map,String token){
		//设置消息头
		HttpHeaders headers = new HttpHeaders();
		MediaType mediaType = MediaType.parseMediaType("application/x-www-form-urlencoded;charset=UTF-8");
		headers.setContentType(mediaType);
		//设置请求参数
		HttpEntity<LinkedMultiValueMap<Object, Object>> formEntity = new HttpEntity<LinkedMultiValueMap<Object, Object>>(map, headers);
		//创建RestTemplate对象
		RestTemplate restTemplate = new RestTemplate();
		url+="?access_token=" + token;
		try{
			//发送post请求
			ResponseEntity<JSONObject> data = restTemplate.postForEntity(url, formEntity, JSONObject.class);
			//返回请求数据
			return data.getBody();
		}catch(Exception e){
			System.out.println("【报错信息】"+e.getMessage()+"，url="+url);
		}
		return null;
	}

	public static String getTokenByStringData(String url,LinkedMultiValueMap<String, Object> map,String token){
		//设置消息头
		HttpHeaders headers = new HttpHeaders();
		MediaType mediaType = MediaType.parseMediaType("application/x-www-form-urlencoded;charset=UTF-8");
		headers.setContentType(mediaType);
		//设置请求参数
		HttpEntity<LinkedMultiValueMap<String, Object>> formEntity = new HttpEntity<LinkedMultiValueMap<String, Object>>(map, headers);
		//创建RestTemplate对象
		RestTemplate restTemplate = new RestTemplate();
		url+="?access_token=" + token;
		try{
			//发送post请求
			ResponseEntity<String> data = restTemplate.postForEntity(url, formEntity, String.class);
			//返回请求数据
			return data.getBody();
		}catch(Exception e){
			System.out.println("【报错信息】"+e.getMessage()+"，url="+url);
		}
		return null;
	}

	public static JSONObject getTokenJSONObject(String url, JSONArray jsonArray, String token){
		//设置消息头
		HttpHeaders headers = new HttpHeaders();
		MediaType mediaType = MediaType.parseMediaType("application/json;charset=UTF-8");
		headers.setContentType(mediaType);
		//设置请求参数
        HttpEntity<JSONArray> jsonArrayHttpEntity = new HttpEntity<>(jsonArray, headers);
        //创建RestTemplate对象
		RestTemplate restTemplate = new RestTemplate();
		url+="?access_token=" + token;
		try{
			//发送post请求
			ResponseEntity<JSONObject> data = restTemplate.postForEntity(url, jsonArrayHttpEntity, JSONObject.class);
			//返回请求数据
			return data.getBody();
		}catch(Exception e){
			System.out.println("【报错信息】"+e.getMessage()+"，url="+url);
		}
		return null;
	}


	public static JSONObject getTokenJSONObjectHttp(String url, Map<String, Object> map, String token){
        JSONObject jsonObject = new JSONObject();
        String input= "";
        StringBuffer stringBuffer = new StringBuffer("");
        try {
            URL u = new URL(url);
            HttpURLConnection con=(HttpURLConnection) u.openConnection();
            con.setDoInput(true);
            con.setDoOutput(true);
            con.setRequestMethod("POST");
            con.setAllowUserInteraction(false);
            con.setUseCaches(false);
            con.setRequestProperty("Accept_Charset","UTf-8");
            con.setRequestProperty("Content-Type", "application/json");
            OutputStreamWriter outputStreamWriter = new OutputStreamWriter(con.getOutputStream(), "UTF-8");
            PrintWriter pw = new PrintWriter(outputStreamWriter);
            pw.print(new JSONObject(map));
            pw.flush();
            BufferedOutputStream bo=new BufferedOutputStream(con.getOutputStream());
            byte[] bdat=input.getBytes("utf-8");
            bo.write(bdat,0,bdat.length);
            BufferedInputStream inp=new BufferedInputStream(con.getInputStream());
            InputStreamReader in=new InputStreamReader(inp, Charset.forName("utf8"));
            BufferedReader reader=new BufferedReader(in);
            String tempStr="";
            while(tempStr!=null){
                stringBuffer.append(tempStr);
                tempStr=reader.readLine();
            }
            System.out.println(stringBuffer.toString());
        } catch (Exception e) {
            e.printStackTrace();

        }finally {
            return jsonObject;
        }
	}

}
