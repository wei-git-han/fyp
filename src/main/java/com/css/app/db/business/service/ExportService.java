package com.css.app.db.business.service;

import java.io.FileInputStream;
import java.io.IOException;
import java.util.List;
import java.util.Map;

/**
 * 导出服务接口类
 * @author n
 *
 */
public interface ExportService {

	FileInputStream exportWPSdoc(List<Map<String, String>> list,String fileName,int banjieNum,int weibanjieNum,String docTypeId) throws IOException;
}
