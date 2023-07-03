
// 기본 배열, 모든 이미지를 다 가지고 있는 기본 배열
const image =["골든리트리버.png","그레이하운드.jpg","라이카.jpg","말티즈.jpg","보더콜리.jpg","비숑.jpg","사모예드.jpg",
"셰퍼드.jpg","시바견.jpg","요크셔테리어.jpg","진도.jpg","치와와.jpg","포메라니안.jpg","푸들.jpg","핏불.png","허스키.jpg"];

const kind = ["골든리트리버","그레이하운드","라이카","말티즈","보더콜리","비숑","사모예드","셰퍼드","시바견",
"요크셔테리어","진도","치와와","포메라니안","푸들","핏불","허스키"];

let 토너먼트1=new Array();  // 현재 토너먼트
let 토너먼트2=new Array();  // 다름 토너먼트( 현재 토너먼트에서 선택한 것 )
let 순서=new Array();
let round = 16; // 현재 회차( 난 16강 )
let count = 1;  // 처음은 1번

function random_order(){
    for( var i=1; i<=round; i++){
        var tmp= Math.floor(Math.random()*round);
        if(순서.indexOf(tmp) == -1){
            순서.push(tmp);
        }else {i--;}
    }
}
function choose_tag(id){
    return document.getElementById(id); // getElement...을 보다 편하게 사용하기 위해서 
}

window.onload=function(){
    var title =choose_tag("title");
    title.innerHTML=round+"강  "+count+"/"+(round/2);

    토너먼트1 = Array(round).fill().map((arr,i) => i);    // 배열 얕은 복사
    // 토너먼트1 = image;   -> 참조 복사
    // 참조복사와 배열 얕은 복사의 차이점 
    // 0부터 15까지 숫자 토너먼트1 배열에 저장

    random_order();
    show();
    // 이미지 선택 이벤트 등록
    var left = choose_tag("left");
    var right = choose_tag("right");
    left.addEventListener("click", 선택);
    right.addEventListener("click", 선택);
    // 왼쪽 오른쪽 함수를 다르게 주어도 상관 x
    // 다르게 주면 선택한 방향을 찾을 필요 x
}
function final(id, nid){
    var n = choose_tag(nid);
    n.style.display="none";
    var final = choose_tag(id);
    final.style.width="100%";
    final.style.height="100vw";
}
function 선택(){
    
    
    if(this == choose_tag("left")){
        토너먼트2.push(토너먼트1[순서[count*2-2]]);
        if(round == 2) final();
    }else{
        토너먼트2.push(토너먼트1[순서[count*2-1]]);
        if(round == 2) final();
    }
    if(count == round/2){
        round=round/2;
        count=0;
        순서=new Array();
        random_order();
        토너먼트1 = 토너먼트2.map((i)=>i);
        토너먼트2=new Array();
    }
    count++;
    // 내가 선택하지 않은 사진이 다음에 나오는 이유는 토너먼트2에 저장되어있지만 출려되는것은 image배열이다.
    var title =choose_tag("title");
    title.innerHTML=round+"강  "+count+"/"+(round/2);
    show();
}
function show(){
    var left=choose_tag("leftimg");
    var right = choose_tag("rightimg");
    var leftText=choose_tag("leftText");
    var rightText=choose_tag("rightText");

    left.src="./static/image/"+image[토너먼트1[순서[count*2-2]]];
    right.src="./static/image/"+image[토너먼트1[순서[count*2-1]]];
    leftText.innerHTML=kind[토너먼트1[순서[count*2-2]]];;
    rightText.innerHTML=kind[토너먼트1[순서[count*2-1]]];
}