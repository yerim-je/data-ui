const http= require('http');
const fs =require('fs');
const url=require('url');
const template = require('./lib/template.js');

const app = http.createServer(function(request, response){
    const pageURL=request.url;
    const query = url.parse(pageURL,true).query;// 쿼리 스트링
    const path = url.parse(pageURL,true).pathname; //루트도메인 뒤 주소

    if( path ==="/"){
        data=fs.readFileSync('./lib/page.json', 'utf8',function(err,data){
            const dataParse = JSON.parse(data);
            const html = template.homeHTML(dataParse.main);
            console.log(html);
            response.writeHead(200);
            response.write(html);
            response.end();
        });
    }
    if(path.indexOf('/image') > -1){
        var img_name = path.slice('/image'.length);
        fs.readFile('./image'+img_name,function(err,data){
            response.writeHead(200);
            response.write(data);
            response.end();
        });
    }
});
app.listen(3000);