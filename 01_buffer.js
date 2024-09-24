const request = require('request')
const cheerio = require('cheerio')
const fs = require('fs')
request('http://www.lanrentuku.com/', (error, res, body) => {
    // console.log(res,body)
    const $ = cheerio.load(body)
    const imgElements = $('img');

    // 遍历所有的 img 元素，并输出它们的 src 属性值
    imgElements.each((index, element) => {

        const src = $(element).attr('src');
        // console.log('Image ' + (index + 1) + ': ' + src);
        let name = src.substr(src.lastIndexOf('/') + 1);
        console.log(src)
        if (src.includes('http')) {
            request(src).pipe(fs.createWriteStream('./img/'+name))
        }



    });



})