package com.css.app.fyp.work;

import com.css.base.utils.Response;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * 办公效能-单位
 */
@Controller
@RequestMapping("/app/fyp/dept")
public class DeptController {

    /**
     * 获取所有单位部门
     */
    @ResponseBody
    @RequestMapping("/getDeptAll")
    public void dbDept() {
        List<Map<String,String>> objects = new ArrayList<>();
        Map<String,String> dataMap = new HashMap<>();
        dataMap.put("deptId","单位id");
        dataMap.put("deptName","单位名称");
        objects.add(dataMap);
        Response.json(objects);
    }
}
