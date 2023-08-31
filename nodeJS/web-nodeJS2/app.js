// App.js

var http= require('http');
var fs = require('fs');
var tempUrl=require('url');
var cookie = require('cookie');


const data = JSON.parse(fs.readFileSync('./data/member.json','utf8'));

var app = http.createServer(function(request,response){
    var url = request.url;
    var query = tempUrl.parse(url,true).query;
    if(query.part == undefined){
        if(request.url=='/')
            url='/src/index.html';
        if(request.url=='/sign')
            url='/src/signup.html';
        if(request.url=='/qs')
            url='/src/question.html';
        if(request.url=='/login')
            url='/src/login.html';
        response.writeHead(200);
    }else{
        var page = query.part==undefined?'':query.part;
        var sub = query.snb==undefined ? '': query.sub;
        var cookie_arr=[];
        if(sub=== 'question'){
            cookie_arr=['sub=qs'];
            url='/src/login.html';
        }
        if(page==='login_check'){
            cookie_arr=['isLogin=false','id=""'];
            for(var i in data){
                if( data[i].sdmId === query.sdmId && data[i].sdmPw===query.sdmPw){
                    //isLogin='true';//아이디비번 일치하면 쿠키 생성
                    //id=query.sdmId;
                    cookie_arr=['isLogin=true','id='+query.sdmId];
                    break;
                }
            }
            url='/src/'+page+'.html';
        }
        if(page==='logout'){
            cookie_arr=['isLogin=false'];
            url='/src/index.html'; 
        }
        response.writeHead(200,{
            'Set-Cookie':cookie_arr
        });
    }
    if(request.url =='/favicon.ico'){
        return response.writeHead(404);
    }

    response.end(fs.readFileSync(__dirname+url));
});
app.listen(3000);   //포트번호




// console.log(request.headers.cookie);
// var cookies = {};
// cookies = cookie.parse(request.headers.cookie);
// console.log(cookies.id);
// response.writeHead(200,{
//     'Set-Cookie':['id=sky','pw=1234']
// });
// response.end('aa');

/*
    루트 도메인( 루트url) -  http://localhost:3000





    page 구성 -  메인, 회원가입, 문의
        메인 - index.html
        회원가입 - signup.html
        문의 - question.html
    각 페이지의 내용은 간단하게만 작성  ( 메인, 회원가입, 문의 페이지인지 구별되게만)

    url :  메인 - http://localhost:3000
           회원가입 - http://localhost:3000/sign
           문의 - http://localhost:3000/qs
*/