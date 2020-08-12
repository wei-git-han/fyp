/*package cn.com.css.filestore.impl;

import java.io.File;
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.FileOutputStream;
import java.io.OutputStream;
a
import cn.com.css.filestore.config.BaseConfig;
import cn.com.css.filestore.impl.HTTPFile;
import cn.com.css.filestore.util.UUIDUtil;

*//**
 * 请改用HTTPFile。save()方法
 * @author fengzhensen
 *
 *//*
@Deprecated
public class HTTPFileImport {
	private String importFilePath;
	private String fileName;
	private String uuid;

	public HTTPFileImport(String fileName) {
		this.fileName = fileName;
		this.uuid = UUIDUtil.uuid32();
	}

	*//**
	 * 该方法调用意味着，你将获取一个由FileStore管理的路径，
	 * 并且你将会保存该文件。
	 * @return
	 *//*
	public String getImportFilePath() {
		if (importFilePath == null) {
			importFilePath = BaseConfig.getTempDirPath() + uuid + "Import";
			{
				File pFile = new File(importFilePath).getParentFile();
				if (!pFile.exists())
					pFile.mkdirs();
			}
		}
		return importFilePath;
	}
	
	*//**
	 * 获取文件输出流用来上传文件，切记用了要关闭
	 * @param fileName
	 * @return
	 *//*
	public OutputStream getImportFileOutputSteam(){
		File file = new File(getImportFilePath());
		if (file.exists())
			file.delete();
		try {
			return new FileOutputStream(file);
		} catch (FileNotFoundException e) {
			e.printStackTrace();
		}
		return null;
	}

	private boolean existsImportFile() {
		if (importFilePath != null) {
			File importFile = new File(importFilePath);
			return importFile.exists();
		}
		return false;
	}

	*//**
	 * 返回-1表示文件不存在
	 * 
	 * @return
	 *//*
	public long getImportFileLength() {
		if (existsImportFile()) {
			return new File(importFilePath).length();
		}
		return -1;
	}

	*//**
	 * 将文件上传到文件服务器</br>
	 * @return HTTPFile实例
	 *//*
	public HTTPFile saveImportFile() {
		try {
			File importFile = new File(importFilePath);
			File file = new File(importFilePath.substring(0, importFilePath.length() - 6));
			if (file.exists())
				file.delete();
			importFile.renameTo(file);
			FileInputStream fis = new FileInputStream(file);
			return HTTPFile.save(fis, fileName);
		} catch (FileNotFoundException e) {
			e.printStackTrace();
		}
		return null;
	}


	public String getFileName() {
		return fileName;
	}

	public void setFileName(String fileName) {
		this.fileName = fileName;
	}

}*/