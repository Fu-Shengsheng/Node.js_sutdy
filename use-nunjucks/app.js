// 引入nunjucks
const nunjucks = require('nunjucks');

function createEnv(paht,opts){
    // 为每个参数添加默认值
    var autoescape = opts.autoescape === undefined?true:opts.autoescape,
    noCache=opts.noCache||false,
    watch=opts.watch||false,
    throwOnUndefined=opts.throwOnUndefined||false,
    // 定义模板引擎对象
    env= new nunjucks.Environment(
        // 创建一个文件系统加载器，从view目录读取模板
        new nunjucks.FileSystemLoader('views',{
        noCache:noCache,
        watch:watch
    }),{
        autoescape:autoescape,
        throwOnUndefined:throwOnUndefined
    });
    if (opts.filters) {
        for (const f in opts.filters) {
            env.addFilter(f,opts.filters[f]);
        }
    }
    return env;
}

var env = createEnv('viws',{
    watch:true,
    filters:{
        hex:function(n){
            return '0x'+n.toString(16)
        }
    }
});

//渲染模板 
var s= env.render('hello.html',{
    name:'<script>alert("F")</script>'
}) 

console.log(s);
