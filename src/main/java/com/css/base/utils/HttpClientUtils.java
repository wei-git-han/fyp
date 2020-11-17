package com.css.base.utils;

import org.apache.http.HttpEntity;
import org.apache.http.client.methods.CloseableHttpResponse;
import org.apache.http.client.methods.HttpGet;
import org.apache.http.impl.client.CloseableHttpClient;
import org.apache.http.impl.client.HttpClients;

import java.io.BufferedReader;
import java.io.InputStreamReader;

public class HttpClientUtils {

    public static String requstByGetMethod(String url){
        CloseableHttpClient httpClient = HttpClients.createDefault();
        StringBuilder stringBuilder = null;
        try {
            HttpGet get = new HttpGet(url);
            CloseableHttpResponse httpResponse = null;
            httpResponse = httpClient.execute(get);
            try {
                HttpEntity entity = httpResponse.getEntity();
                stringBuilder = new StringBuilder();
                if(null != entity){
                    BufferedReader bufferedReader = new BufferedReader(new InputStreamReader(httpResponse.getEntity().getContent(),"UTF-8"));
                    String line = null;
                    while ((line = bufferedReader.readLine()) != null){
                        stringBuilder.append(line+"\n");
                    }
                }
            } finally{
                httpResponse.close();
            }
        }catch (Exception e){
            e.printStackTrace();
        } finally {
            try {
                if(httpClient != null){
                    httpClient.close();
                }
            }catch (Exception e){
                e.printStackTrace();
            }
        }
        return  stringBuilder.toString();
    }

}
