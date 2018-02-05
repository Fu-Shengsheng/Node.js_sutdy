/**
 * 本模块提供扫描指定目录和创建router的功能
 */

//  引入文件系统模块
const fs=require('fs');

function addMapping(router, mapping) {
    // 对于每个导入的模块对象，取得每一个属性
    for (var url in mapping) {
        // 获取属性的前部字符进行匹配
        if (url.startsWith('GET ')) {
            var path = url.substring(4);
            router.get(path, mapping[url]);
            console.log(`register URL mapping: GET ${path}`);
        } else if (url.startsWith('POST ')) {
            var path = url.substring(5);
            router.post(path, mapping[url]);
            console.log(`register URL mapping: POST ${path}`);
        } else {
            console.log(`invalid URL: ${url}`);
        }
    }
}

// 设置每个
function addControllers(router) {
    // 读取并暂存/controllers目录下的所有文件
    var files = fs.readdirSync(__dirname + '/controllers');
    // 筛选出.js文件
    var js_files = files.filter((f) => {
        return f.endsWith('.js');
    });
    // 对每个.js文件
    for (var f of js_files) {
        console.log(`process controller: ${f}...`);
        // 取得当前文件导出的模块对象
        let mapping = require(__dirname + '/controllers/' + f);
        // 调用addMapping函数处理当前文件
        addMapping(router, mapping);
    }
}

module.exports = function (dir) {
    let
        controllers_dir = dir || 'controllers', // 如果不传参数，扫描目录默认为'controllers'
        // 引入koa-router模块
        router = require('koa-router')();
    addControllers(router, controllers_dir);
    return router.routes();
};
 