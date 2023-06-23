// func.js

// 함수의 형태 4가지
// 입력과 출력이 없는 형태
// 입력은 있고 출력이 없는 형태
// 입력이 없고 출력만 있는 형태
// 입력도 있고 출력도 있는 형태

// 함수에서 입력이라는 것은 함수의 내용이 실행되기 위해 꼭
// 필요한 값이 있다면 함수의 외부로 부터 값을 받는 것을 입력이라고 한다.
// 전문용어로 인자 인수, 매개변수 라고 한다.
// 출력은 함수에서 생성된 값을 다른 함수나 다른 곳에 보내고자 할 경우 사용함.
// return을 사용하여 밖으로 내보낸다.

function sum(a,b){  //매개변수가 5개라면 인수도 5개 있어야 한다.
    var result = document.getElementById("sum_result");
    result.innerHTML= a+b;
}

// 웹에서 입력하는 모든 값은 전부 텍스트이다.
// inner 태그에 입력한 값을 자바스크립트로 가져오려면 value로 속성을 사용해야한다.
// 모든 input 태그 값은 value에 저장되어 있다.
// getElementById를 통해서 input 태그를 가져오고 가져온 input 태그에서 value값을 뽑아낸다.
function plus(){
    var n1=document.getElementById("num1");
    var n2=document.getElementById("num2");
    var res=document.getElementById("result2");

    //res.innerHTML = Number(n1.value)+parseInt(n2.value);
    res.innerHTML= Number(n1.value) + Number(n2.value);
    
}

function myage(){
    var year=document.getElementById("birth_year").value;
    var res= document.getElementById("age");
    res.innerHTML= 2023-Number(year);

}

// return - 함수에 있는 값을 함수 밖으로 내보낼때 사용.
// 함수 안에서 return이 실행되면 해당 함수를 종료하고 값을 내보낸다.
function score_calc(){
    var kor = document.getElementById("kor");
    var mat = document.getElementById("mat");
    var mus = document.getElementById("mus");
    
    var res = document.getElementById("result3");

    if(kor.value=='' || !(kor.value>=0 && kor.value<=100)){   // "", '', 비어있다는 뜻.
        alert("국어점수 입력해라!");
        kor.focus();
        return;
        alert("함수 안끝났니??");
    }else if(mat.value==''){
        alert("수학점수 입력해라!")
        mat.focus();
        return;
    }else if(mus.value==''){
        alert("음악점수 입력해라!")
        mus.focus();
        return;
    }
    var tot = total (Number(kor.value), Number(mat.value),Number(mus.value));    //total이라는 함수를 호출
    var avg_val = avg(tot);

    res.innerHTML = "총점 : "+tot+"점   평균 : "+avg_val+"점";
}

// function avg(tot){  //avg.tot = score_calc.tot
//     return tot/3;
// }
// function total(k,m,s){
//     return (k+m+s);
// }

function my_minus_life(){
    var soju = document.getElementById("soju");

    var m = document.getElementById("minute");
    var h = document.getElementById("hour");
    var d = document.getElementById("day");

    if(soju.value==""){
        alert("몇잔 마셨어 니");
        soju.focus();
        return;
    }

    var res = Number(soju.value) * 2 * 365 * 20;

    m.innerHTML = "단축수명 : "+res+"분";
    h.innerHTML = "단축수명 : "+(res/60)+"시간";
    d.innerHTML = "단축수명 : "+(res/60/24)+"일";
}

// switch문은 if문과 다르게 조건식이나 참이냐 거짓이냐에 따라 동작하느 조건문이 아니다.
// switch문은 값을 넣어서 해당 값에 따라 동작하도록 선택하는 문이다.
// 즉 지금 사용하는 vscode의 메뉴가 바로 switch문으로 만들어짐
// 메뉴에서 내가 폴더열기를 선택하면 탐색창이 실행된다. 
// 즉, 내가 선택한 메뉴에 따른 동작을 하는 것이다.
// switch문에서 동작할 내용 선택은 case로 만들어 준다.
// case는 여러개 생성 가능하다.
/*
    switch(10){
        case 1:
            1을 선택하면 동작할 내용
        case 5:
            5을 선택하면 동작할 내용
        case 100:
            100을 선택하면 동작할 내용
        case 2:
            2을 선택하면 동작할 내용
        case 10:
            10을 선택하면 동작할 내용
    }
*/
function my_order(){
    var main_menu = document.getElementById("night_snack");
    var side_menu = document.getElementById("side_menu");
    var alc = document.getElementById("alc");

    var order_list = document.getElementById("order_result");

    var out="";
    var temp = menu(main_menu.value);                   // 메뉴 입력시 팬매하는 메뉴 입력하면 금액(숫자)가 return되고, 
    out += main_menu.value + "금액 : "+temp+"원<br>";   //판매하지 않는 메뉴입력시 문자열이 return된다.
    
    var temp1 = menu(side_menu.value);
    out += side_menu.value + "금액 : "+temp1+"원<br>";

    var temp2 = menu(alc.value);
    out += alc.value+"금액 : "+temp2+"원<br>";
    
    if(typeof(temp) == 'string' || typeof(temp1) == 'string' || typeof(temp2) == 'string'){   //temp의 값 타입이 문자열이라면
        alert("판매하지 않는 메뉴입니다.");
        main_menu.value='';     //이렇게 해주면 야식메뉴 input의 값이 지워진다.
        side_menu.value='';     //이렇게 해주면 사이드메뉴 input의 값이 지워진다.
        alc.value='';           //이렇게 해주면 주류 input의 값이 지워진다.
        main_menu.focus();
        return;
    }
    order_list.innerHTML = out;

}
function menu(name){       //menu에 족발을 입력하면 name에 족발이 저장된다.
    var money=0;
    switch(name){
        case "족발":
            money=28000;
            break;  //switch case에서 break를 하지 않으면 
                    //밑에 있는 case도 실행된다.
        case "반반치킨":
            money=22000;  break;
        case "무뼈닭발":
            money=19000; break;
        case "페퍼로니피자": money=18000; break;
        case "짬뽕탕": money=18000; break;
        case "포케": money=15000; break;
        case "감자튀김": money=3000; break;
        case "염통꼬치": money=4000; break;
        case "타코야끼": money=6000; break;
        case "치즈볼": money=5000; break;
        case "테라":money=4000; break;
        case "피치하이볼": money=8000; break;
        case "진로": money=4000; break;
        case "새로주": money=4000; break;
        case "카스": money=4000; break;
        case "발렌타인30살": money=1100000; break;
        case "시바스리갈": money=59800; break;
        default:    //case에 없는 값 입력시 default가 실행 된다.
            return " 판매하지 않는 메뉴입니다. ";
    }
    return money;
}