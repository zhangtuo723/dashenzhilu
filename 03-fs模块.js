const fs = require('fs')


// function testFn() {
//     // 阻塞
//     const data = fs.readFileSync('./test.txt', 'utf-8')

//     console.log(data)
// }

// // testFn()

// function Fn2(){

//     const res = fs.readFile('./test.txt','utf-8',(err,data)=>{
//         console.log(err)
//     })


// }

// // Fn2()

// console.log('xxx')


// const readStrem = fs.createReadStream('./test.txt', 'utf-8')

// readStrem.on('data', (chunk) => {
//     console.log(chunk)
//     readStrem.close()
// }).on('error', (err) => {
//     console.log(err)
// })
// .on('end',()=>{
//     console.log('end')
// })
// .on('close',()=>{
//     console.log('close');
// })



var writeStream = fs.createWriteStream('./fileForWrite1.txt', 'utf8');

writeStream
    .on('close', function(){  // 已经关闭，不会再有事件抛出
        console.log('已经关闭');
    });

writeStream.write('hello\n');
writeStream.write('world');
writeStream.end('');