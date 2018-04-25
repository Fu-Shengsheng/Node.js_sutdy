const Sequelize = require('sequelize')
const config = require('./config')

// 创建一个sequelize对象实例
var sequelize = new Sequelize(config.database,config.username,config.password,{
    host:config.host,
    dialect:'mysql',
    pool:{
        max:5,
        min:0,
        idle:30000
    }
}) 

// 对应数据库实例模型建立model
var Pet = sequelize.define('pet',{
    id:{
        type:Sequelize.STRING(100),
        primaryKey:true
    },
    name:Sequelize.STRING(100),
    gender:Sequelize.BOOLEAN,
    birth:Sequelize.STRING(10),
    createdAt:Sequelize.BIGINT,
    updatedAt:Sequelize.BIGINT,
    version:Sequelize.BIGINT
},{
    // 关闭sequelize的自动添加timestamp的功能
    timestamps:false
})

// 获取当前系统时间
var now = Date.now();

// 插入数据
(async ()=>{
    var dog=await Pet.create({
        id:'g-'+now,
        name:'Gaffey',
        gender:false,
        birth:'2018-04-24',
        createdAt:now,
        updatedAt:now,
        version:0
    })
    console.log('created.'+JSON.stringify(dog))
})();

// 查询数据
(async ()=>{
    var pets = await Pet.findAll({
        where:{
            name:'Gaffey'
        }
    })
    console.log(`find ${pets.lenght} pets:`)
    for (let p of pets) {
        console.log(JSON.stringify(p))
    }
})();

// 更新数据
(async ()=>{
   var p = await queryFromSomewhere();
   p.gender=true;
   p.updatedAt=Date.now();
   p.version ++;
   await p.save();
})();

// 删除数据
(async ()=>{
    var p=await queryFromSomewhere();
    await p.destroy()
})();