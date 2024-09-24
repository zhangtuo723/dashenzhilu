import knex from 'knex'

const db = knex({
    client: 'mysql2',
    connection: {
        host: '192.168.124.26', // 数据库主机
        user: 'root', // 数据库用户名
        password: '17630360038', // 数据库密码
        database: 'zttest', // 数据库名
        port: 3306 // 数据库端口
    }
})

db.schema.createTable('list', (table) => {
    table.increments('id') //id自增
    table.integer('age') //age 整数
    table.string('name') //name 字符串
    table.string('hobby') //hobby 字符串
    table.timestamps(true, true) //创建时间和更新时间
}).then(() => {
    console.log('创建成功')
})
