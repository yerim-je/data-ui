
const category=["편의점","카페","음식점","문화생활","여행","교통","마트",
"관리비","세금","온라인쇼핑","기부","경조사","교육","의료","미용","유흥","통신비",
"급여","기타수입","로또"]

const card=[{name:"우리체크카드", bank:"woori"},
{name:"국민체크카드", bank:"kb"},
{name:"농협체크카드", bank:"nh"},
{name:"카카오체크카드", bank:"kakao"}];

const bank=[{name:"우리은행", bank:'woori', money:33000},
{name:"국민은행", bank:'kb', money:232400},
{name:"농협은행", bank:'nh', money:87700},
{name:"카카오뱅크", bank:'kakao', money:168000}];

function two_digit(num){
    return num<10 ? "0"+num : num ;
}

window.onload=function(){
    var today = new Date();
    var year = today.getFullYear();
    var month = two_digit(today.getMonth()+1);
    var date = two_digit(today.getDate());
    var hour = two_digit(today.getHours());
    var minute = two_digit(today.getMinutes());

    var wDate = document.querySelector("#wDate");
    wDate.value=year+"-"+month+"-"+date+" "+hour+":"+minute;

    var cate = document.querySelector("#wcategory");

    for(var i=0; i<category.length; i++){
        var opt = document.createElement("option");
        opt.setAttribute("value",category[i]);
        opt.innerText=category[i];
        cate.appendChild(opt);
    }

    var mycard = document.querySelector("#mycard");
    for(var i in card){
        var opt = document.createElement("option");
        opt.setAttribute("value",card[i].bank);
        opt.innerText=card[i].name;
        mycard.appendChild(opt);
    }

    var mybank = document.querySelector("#mybank");
    for(var i in bank){
        var opt = document.createElement("option");
        opt.setAttribute("value",bank[i].bank);
        opt.innerText=bank[i].name;
        mybank.appendChild(opt);
    }
 
    // 결제방법중에서 카드선택이냐 현금 선택이냐
    var payment = document.getElementsByName("payment");
    payment[0].addEventListener("click",function(){
        document.querySelector("#mycard").classList.add("hide");
    });
    payment[1].addEventListener("click",function(){
        document.querySelector("#mycard").classList.remove("hide");
    });

    // 수입중에서 은행입금이냐 현금받았냐
    var income_method = document.getElementsByName("income_method");
    income_method[0].addEventListener("click",function(){
        document.querySelector("#mybank").classList.remove("hide");
    });
    income_method[1].addEventListener("click",function(){
        document.querySelector("#mybank").classList.add("hide");
    });

    // 수입버튼 클릭시
    var income_bt = document.querySelector("#income_bt");
    income_bt.addEventListener("click",function(){
        var ex = document.getElementsByClassName("expense")[0];
        var inc = document.getElementsByClassName("income")[0];
        ex.classList.add("hide");
        inc.classList.remove("hide");
    })

    //지출버튼 클릭시
    var expense_bt = document.querySelector("#expense_bt");
    expense_bt.addEventListener("click",function(){
        var ex = document.getElementsByClassName("expense")[0];
        var inc = document.getElementsByClassName("income")[0];
        ex.classList.remove("hide");
        inc.classList.add("hide");
    })
}