
function order(){
    var coffee = document.getElementById("coffee");
    var ice = document.getElementById("ice");
    var size = document.getElementById("size");

    var res = document.getElementById("order_result");

    var out = "";
    var op1 = menu(coffee.value);
    out += coffee.value+",";

    var op2 = menu(ice.value);
    out += ice.value+",";

    var op3 = menu(size.value);
    out += size.value+" - "+(op1+op2+op3)+"원<br>";

    if(typeof(op1)=='string' || typeof(op2)=='string' || typeof(op3)=='string'){
        alert("메뉴를 다시 선택해 주세요...")
        coffee.value='';
        ice.value='';
        size.value='';
        coffee.focus();
        return;
    }
    res.innerHTML = out;

}
function menu(coffee){
    var money = 0;
    switch(coffee){
        case "아메리카노" : money=2000; break;
        case "카페라테" : money=3000; break;
        case "바닐라라테" : money=3500; break;
        case "카페모카" : money=3700; break;
        case "에스프레소" : money=1500; break;
        case "아이스티" : money=2000; break;
        case "콜드브루" : money=4000; break;
        case "콜드브루라테" : money=4500; break;
        case "초코라테" : money=3500; break;
        case "아샷추" : money=3000; break;
        case "핫" : money=0; break;
        case "아이스" : money=0; break;
        case "미디움" : money=0; break;
        case "벤티" : money=500; break;
        case "일리터" : money=1000; break;
        default: return "메뉴를 다시 선택해주세요";
    }
    return money;
}