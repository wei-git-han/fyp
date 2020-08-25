package com.css.addbase;
import java.io.BufferedInputStream;
import java.io.BufferedOutputStream;
import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.io.OutputStreamWriter;
import java.io.PrintWriter;
import java.net.HttpURLConnection;
import java.net.URL;
import java.nio.charset.Charset;
import java.util.HashMap;
import java.util.LinkedList;
import java.util.Map;
import java.util.Queue;
import java.util.concurrent.LinkedBlockingQueue;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Configuration;
import org.springframework.util.LinkedMultiValueMap;

import com.alibaba.fastjson.JSON;
import com.css.addbase.appconfig.service.BaseAppConfigService;
import com.css.addbase.apporgan.service.BaseAppUserService;
import com.css.addbase.apporgmapped.service.BaseAppOrgMappedService;
import com.css.addbase.constant.AppConstant;
import com.css.addbase.constant.AppInterfaceConstant;
import com.css.base.utils.CrossDomainUtil;
import com.css.taskqueue.Consumer;


/**
 * 消息服务接口
 * 
 * @author gengds
 */
@Configuration
public class SmsUtil {
	/*
	@Autowired
	private AppConfig appConfig;
	@Autowired
	private BaseAppUserService baseAppUserService;
	@Autowired
	private BaseAppConfigService baseAppConfigService;
	@Autowired
	private BaseAppOrgMappedService baseAppOrgMappedService;
	
	private static final Queue<Map<String, Object>> buffer = new LinkedBlockingQueue<>();//创建一个长度为100的队列  模拟存储生产者
	int maxSize = 100;
	Thread consumer = new Consumer(buffer, maxSize, "CONSUMER");
	public SmsUtil() {
		consumer.start();
	}

	*//**
	 * 发送短信放入任务队列
	 *//*
	public void send(String content, String tels) {
		if(baseAppConfigService.queryObject("sms_flag").getValue().equals("1")){
			System.out.println("=============未打开短信总开关=================");
			return;
		}else if(baseAppConfigService.queryObject("sms_flag").getValue().equals("0")){
			 while(buffer.size() >= maxSize) {
				 try {
					System.out.println("队列已满，线程暂时阻塞");
					synchronized (buffer) {
						buffer.wait();
					}
				 } catch (InterruptedException e) {
					 e.printStackTrace();
				 }
			 }
			 Map<String, Object> map = new HashMap<>();
			 map.put("content", content);
			 map.put("tels", tels);
			 map.put("smsUrl", appConfig.getSms());
			 synchronized (buffer) {
				 buffer.add(map);
				 buffer.notifyAll();
			 }
		 }
	}
	*//**
	 * 发送短信
	 * @param content
	 * @param tels
	 * @return
	 *//*
	@SuppressWarnings("finally")
	public String sendSms(String content, String tels ,String smsUrl){
			*//*try {
				HttpHeaders headers = new HttpHeaders();
				MediaType type = MediaType.parseMediaType("multipart/form-data");
				headers.setContentType(type);
				LinkedMultiValueMap<String, Object> map = new LinkedMultiValueMap<String,Object>();
				map.add("MsgContent", content);
				map.add("Tel", tels.split(","));
				System.out.println(map.toString()+tels);
		        HttpEntity<LinkedMultiValueMap<String, Object>> formEntity = new HttpEntity<LinkedMultiValueMap<String, Object>>(map, headers);
				Object result = restTemplate.postForEntity(appConfig.getSms(), formEntity, String.class);
				System.out.println(result);
				
				if (result != null) {
					return "success";
				} else {
					return "fail";
				}
			} catch (Exception e) {
				System.out.println(e.getMessage());
				System.out.println(e);
				return "fail";
			}*//*
			String[] telss=tels.split(",");
			for(int i=0;i<telss.length;i++) {
				if(!telss[i].startsWith("86")) {
					telss[i]="86"+telss[i];
				}
			}
			Map<String,Object> map=new HashMap<String,Object>();
			map.put("MsgContent", content);
			map.put("Tel", telss);
			System.out.println("============"+map.get("MsgContent")+"========"+tels);
			String input="";
			StringBuffer strBuf=new StringBuffer("");
			String result="";
			try {
				URL u=new URL(smsUrl);
				HttpURLConnection con=(HttpURLConnection) u.openConnection();
				con.setDoInput(true);
				con.setDoOutput(true);
				con.setRequestMethod("POST");
				con.setAllowUserInteraction(false);
				con.setUseCaches(false);
				con.setRequestProperty("Accept_Charset","UTf-8");
				con.setRequestProperty("Content-Type", "application/json");
				PrintWriter pw = new PrintWriter( new OutputStreamWriter( con.getOutputStream() , "UTF-8"));
				pw.print(JSON.toJSONString(map));
				pw.flush();
				BufferedOutputStream bo=new BufferedOutputStream(con.getOutputStream());
				byte[] bdat=input.getBytes("utf-8");
				bo.write(bdat,0,bdat.length);
				BufferedInputStream inp=new BufferedInputStream(con.getInputStream());
				InputStreamReader in=new InputStreamReader(inp,Charset.forName("utf8"));
				BufferedReader reader=new BufferedReader(in);
				String tempStr="";
				while(tempStr!=null){
					strBuf.append(tempStr);
					tempStr=reader.readLine();
				}
				System.out.println(strBuf.toString());
				result="success";
			} catch (Exception e) {
				e.printStackTrace();
				result= content+"&"+tels;
			}finally {
				System.out.println(result);
				return "success";
		   }
	}
	
	public String checkSend(String leaderId, String leaderMsg, String[] uIds, String smsg){
		String tels;
		String sets = getSets(uIds);
		int i = 0;
		for(String id : uIds){
			if(baseAppUserService.queryObject(id)!=null&&baseAppUserService.queryObject(id).getMobile()!=null&& baseAppUserService.queryObject(id).getMobile()!=""){
				tels = baseAppUserService.queryObject(id).getMobile();
				if(id.equals(leaderId)){
					if(sets.charAt(i)=='1' && leaderMsg!=""	)
						send(leaderMsg, tels);
				}else{
					if(sets.charAt(i)=='1' && leaderMsg!=""	)
						send(smsg, tels);
				}
			}
			i++;
		}
		return "success";
	}
	
	public String getSets(String[] uIds){
		String elecPath = baseAppOrgMappedService.getWebUrl(AppConstant.APP_GWCL, AppInterfaceConstant.WEB_INTERFACE_DZBMS_TO_GWCL_SETS);
		LinkedMultiValueMap<String, Object> map = new LinkedMultiValueMap<String,Object>();
		String jsonData = "";
		if(uIds!=null){
			for(String uid:uIds){
				map.add("userIds",uid);	
			}
		}
		String url = elecPath ;
		if(CrossDomainUtil.getJsonData(url,map)!=null){
			jsonData = CrossDomainUtil.getJsonData(url,map).getString("sets");
		}
		
		return jsonData;
		
	}
*/

}
