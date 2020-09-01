package com.css.app.fyp.utils;

import org.apache.poi.hssf.usermodel.HSSFWorkbook;
import org.apache.poi.ss.formula.functions.T;
import org.apache.poi.ss.usermodel.Row;
import org.apache.poi.ss.usermodel.Sheet;
import org.apache.poi.ss.usermodel.Workbook;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.io.InputStream;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * poi导入
 */
public class PoiUtils {

    /**
     * 判断版本
     * @param filename
     * @param inputStream
     * @return 文件
     */
    public static Workbook getWorkBook(String filename, InputStream inputStream){
        Workbook workbook = null;
        try {
            if(filename.endsWith(".xls")){
                workbook = new HSSFWorkbook(inputStream);
            }else if(filename.endsWith(".xlsx")){
                workbook = new XSSFWorkbook(inputStream);
            }
        } catch (IOException e) {
            e.printStackTrace();
        }
        return workbook;
    }

    /**
     * poi导入
     * @param file
     * @return excel内容
     */
    public static Map<Object,List<Object>> importExcel(MultipartFile file){
        Map<Object,List<Object>> valueMap = new HashMap<>();
        List<Object> valueList = null;
        try {
            //创建输入流
            InputStream inputStream = file.getInputStream();
            //获取名称
            String filename = file.getOriginalFilename();
            Workbook workBook = getWorkBook(filename, inputStream);
            //获取文件中的表格,默认sheet 0
            Sheet sheetAt = workBook.getSheetAt(0);
            //获取文件行数
            int lastRowNum = sheetAt.getLastRowNum();
            int cell = 0;
            for(int i =0;i<lastRowNum;i++){
                valueList = new ArrayList<>();
                //默认第一行表头
                Row row = sheetAt.getRow(i + 1);
                cell = row.getPhysicalNumberOfCells();
                if(i+1 >lastRowNum){
                    break;
                }
                for(int j =0;j < cell;j++){
                    //列内容
                    valueList.add(row.getCell(j).getStringCellValue());
                }
                valueMap.put(i+1,valueList);
            }
        } catch (IOException e) {
            e.printStackTrace();
        }
        return valueMap;
    }
}
