// template.js

module.exports = {
    homeHTML:function(main,login){
        var mainHTML=`
        <section id="content">
            <img src="./image/${main.main_img}">
        </section>
        <section id="side">
            <div class="login_bt">
                ${login.url=='logout'?`<p>${login.id}</p>`:''}
                <a href="/${login.url}">${login.text}</a>
            </div>
        </section>`;
        return( commonHTML( main, mainHTML, "index"));
    },
    loginHTML:function(main){
        var loginHTML=`
        <section id="content">
            <h3>스드메 with Seonhyang 로그인</h3>
            <div class="login_wrap">
                <form name="loginf" id="loginf" method="get" action="/">
                    <input type="hidden" name="part" value="login_check">
                    <div class="login_box">
                        <div class="login_input">
                            <input type="text" name="sdmId" id="sdmId">
                            <label for="sdmId">ID</label>
                        </div>
                        <div class="login_input">
                            <input type="password" name="sdmPw" id="sdmPw">
                            <label for="sdmPw">PW</label>
                        </div>
                        <div class="login_bt">
                            <a href="javascript:login();">LOGIN</a>
                        </div>
                    </div>
                </form>
                <div class="joinAfind">
                    <p class="find">아이디/비밀번호 찾기</p>
                    <p class="join"><a href="/sign">회원가입</a></p>
                </div>
            </div>
        </section>`;
        return ( commonHTML(main, loginHTML, "login"));
    },
    signHTML:function(main){
        var signHTML=`
        <section id="content">
            <h3>스드메 회원가입</h3>
            <div class="join_wrap">
                <div class="join_input">
                    <label for="jId">아이디</label>
                    <input type="email" id="jId" name="jId" placeholder="이메일형식으로 입력해주세요">
                </div>
                <div class="join_input">
                    <label for="jPw">비밀번호</label>
                    <input type="password" id="jPw" name="jPw">
                </div>
                <div class="join_input">
                    <label for="jAdd">신혼집 주소</label>
                    <input type="text" id="jAdd" name="jAdd">
                </div>
                <div class="join_input">
                    <label for="jTel">연락처</label>
                    <input type="text" id="jTel" name="jTel">
                </div>
                <div class="join_input">
                    <label for="wDate">결혼예정일</label>
                    <input type="date" id="wDate" name="wDate">
                </div>
            </div>
            <div class="join_bt">
                <button>회원가입</button>
            </div>
        </section>`;
        return (commonHTML( main, signHTML, "sign"))
    },
    questionHTML:function(main,login,qsData){
        var tag='';
        qsData.sort(function(a,b){
            if(a.date < b.date ) return 1;
            if(a.date > b.date ) return -1;
            return 0;
        });
        for(var t of qsData){
            tag+="<tr class='list'>"+
            "<td class='qsI'>"+t.id+"</td>"+
            "<td class='qsT'>"+t.title+"</td>"+
            "<td class='qsW'>"+t.writer+"</td>"+
            "<td class='qsD'>"+t.date+"</td>"+
            "<td class='qsTo'>"+( t.to == 0 ? '미확인':'답변완료')+"</td>"+
            "</tr>";
        }
        var qsHTML=`
        <section id="content">
            <div id="qsList">
                <div class="qsTitle">
                    <h2>문의</h2>
                    <a href="javascript:questionWrite()">문의하기</a>
                </div>
                <div class="search_wrap">
                    <i class="bi bi-arrow-through-heart-fill"></i>
                    <input type="text" name="word" id="word">
                </div>
                <div class="qsList_box">
                    <table>
                        <thead>
                            <th class="qsI">번호</th><th class="qsT">제목</th>                                <th class="qsW">작성자</th><th class="qsD">작성일</th>
                            <th class="qsTo">답변</th>
                        </thead>
                        <tbody id="qs">
                            ${tag}
                        </tbody>
                    </table>
                </div>
            </div>
        </section>
        <section id="side">
            <div class="login_bt">
                <a href="/${login.url}">${login.text}</a>
            </div>
        </section>`;
        return( commonHTML(main,qsHTML,"question"));
    }
}

function commonHTML( main, html, css){
    var menu = "";
    for(var key of Object.keys(main.menu)){
        menu+=`<li class="menu"><a href="/${key}">${main.menu[key]}</a></li>`;
    }

    return (`
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>스드메의 모든것</title> 
<script src="https://code.jquery.com/jquery-3.7.0.js" integrity="sha256-JlqSTELeR4TLqP0OG9dxM7yDPqX1ox/HfgiSLBj8+kM=" crossorigin="anonymous"></script>
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.10.3/font/bootstrap-icons.css">
<link rel="stylesheet" href="./lib/main.css">
<link rel="stylesheet" href="./lib/${css}.css">
</head>
<body>
<div id="wrap">
    <header id="header">
        <div class="logo"><a href="/"><img src="./image/${main.logo}"></a></div>
        <nav class="nav">
            <ul class="menulist">
               ${menu}
            </ul>
        </nav>
    </header>
    <main id="main">
        ${html}
    </main>
</div>
</body>
</html>
    `);
}