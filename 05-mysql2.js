import mysql2 from 'mysql2/promise'
import fs from 'node:fs'
import jsyaml from 'js-yaml'
import express from 'express'
import knex from 'knex'
const yaml = fs.readFileSync('./db.config.yaml', 'utf8')
const config = jsyaml.load(yaml)
// const sql = await mysql2.createConnection({
//    ...config.db
// })
const db = knex({
    client: "mysql2",
    connection: config.db
})

const app = express()
app.use(express.json())
//查询接口 全部
app.get('/', async (req, res) => {
    const data = await db('list').select().orderBy('id', 'desc')
    const total = await db('list').count('* as total')
    res.json({
        code: 200,
        data,
        total: total[0].total,
    })
})
//单个查询 params
app.get('/user/:id', async (req, res) => {
    const row = await db('list').select().where({ id: req.params.id })
    res.json({
        code: 200,
        data: row
    })
})

//新增接口
app.post('/create', async (req, res) => {
    const { name, age, hobby } = req.body
    const detail = await db('list').insert({ name, age, hobby })
    res.send({
        code: 200,
        data: detail
    })
})

//编辑
app.post('/update', async (req, res) => {
    const { name, age, hobby, id } = req.body
    const info = await db('list').update({ name, age, hobby }).where({ id })
    res.json({
        code: 200,
        data: info
    })
})
//删除
app.post('/delete', async (req, res) => {
    const info = await db('list').delete().where({ id: req.body.id })
    res.json({
        code: 200,
        data: info
    })
})
const port = 3000

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})
