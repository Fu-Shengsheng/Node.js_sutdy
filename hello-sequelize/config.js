const defaultConfig='./config-default.js'
const overrideConfig='./config-override.js'
const testConfig='./config-test.js'

const fs=require('fs')

var config=null

// 如果是测试环境，就读取testConfig，如果存在overrideConfig，则读取，否则忽略
// 如果不是测试环境，先读取defaultConfig
if (process.env.NODE_ENV==='test') {
    console.log(`Load testConfig...`)
    config=require(testConfig)
}else{
    console.log(`Load defalutConfig`)
    config=require(defaultConfig)
    try {
        if (fs.statSync(overrideConfig).isFile()) {
            console.log(`Load ${overrideConfig}...`)
            config=Object.assign(config,require(overrideConfig))
        }
    } catch (error) {
        console.log(`Cannot load ${overrideConfig}.`)
    }
}

module.exports=config