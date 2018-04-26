/**
 * 统一Model的定义
 */
const Sequelize=require('sequelize');

const uuid = require('node-uuid');

const config = require('./config');

console.log('init sequelize');

function generateId() {
    return uuid.v4();
}

var sequelize=new Sequelize('nodejstest','root','123456',{
    host:'localhost',
    dialect:'mysql',
    pool:{
        max:5,
        min:0,
        idle:10000
    }
})

const ID_TYPE=Sequelize.STRING(50);

function defineModel(name,attributes){
    var attrs = {}
    // 对于attributes中的每个对象，都获取其值，并同allowNull属性一同存储在attrs对象中
    for (const key in attributes) {
        let value=attributes[key]
        if (attributes.hasOwnProperty(key)) {
            const element = attributes[key];
            if (typeof value==='object'&&value['type']) {
                value.allowNull=value.allowNull||false
                attrs[key]=value
            }else{
                attrs[key]={
                    type:value,
                    allowNull:false
                }
            }
        }
    }

    // 为当前attrs对象设置id，创建时间，更新时间，版本号等属性
    attrs.id={
        type:ID_TYPE,
        primaryKey:true
    }
    attrs.createdAt={
        type:Sequelize.BIGINT,
        allowNull:false
    }
    attrs.updateAt={
        type:Sequelize.BIGINT,
        allowNull:false
    }
    attrs.version={
        type:Sequelize.BIGINT,
        allowNull:false
    }

    console.log('model defined for table: ' + name + '\n' + JSON.stringify(attrs, function (k, v) {
        if (k === 'type') {
            for (let key in Sequelize) {
                if (key === 'ABSTRACT' || key === 'NUMBER') {
                    continue;
                }
                let dbType = Sequelize[key];
                if (typeof dbType === 'function') {
                    if (v instanceof dbType) {
                        if (v._length) {
                            return `${dbType.key}(${v._length})`;
                        }
                        return dbType.key;
                    }
                    if (v === dbType) {
                        return dbType.key;
                    }
                }
            }
        }
        return v;
    }, '  '));

    // 返回构造的Model 实例
    return sequelize.define(name,attrs,{
        tableName:name,
        timestamps:false,
        hooks:{
            /**
             * 每次更改值时更新状态及版本
             */
            beforeValidate:(obj)=>{
                let now=Date.now()
                if (obj.isNewRecord) {
                    if (!obj.id) {
                        obj.id=generateId()
                    }
                    obj.createdAt=now
                    obj.updateAt=now
                    obj.version=0
                }else{
                    obj.updateAt=Date.now
                    obj.version++
                }
            }
        }
    })
}

const TYPES = ['STRING', 'INTEGER', 'BIGINT', 'TEXT', 'DOUBLE', 'DATEONLY', 'BOOLEAN']

var exp = {
    defineModel: defineModel,
    sync: () => {
        // only allow create ddl in non-production environment:
        if (process.env.NODE_ENV !== 'production') {
            sequelize.sync({ force: true })
        } else {
            throw new Error('Cannot sync() when NODE_ENV is set to \'production\'.')
        }
    }
}

for (let type of TYPES) {
    exp[type] = Sequelize[type]
}

exp.ID = ID_TYPE
exp.generateId = generateId

module.exports = exp