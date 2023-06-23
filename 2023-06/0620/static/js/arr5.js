
let show = false;           // start 클릭 유무
let cmp_num = new Array();  // 두개의 숫자를 비교하기 위한 배열
let choice = new Array();   // 클릭한 두 개의 span태그 인덱스 저장 배열
let end = 0;        // 4가 되면 게임 끝
let step= 0;         // 클릭 횟수 제한을 위한 변수

let num = new Array();      // 화면에 표시되는 숫자 저장 배열
let board = new Array();    // 숫자가 출력될 위치 저장 배열
 
function init(){ //초기화
    // 중복없이 랜덤값 넣기
    // indexOf를 이용해서 -1이 나오면 일치하는게 없다.
    // 즉 중복되는 숫자가 없다는 뜻이니까  배열에저장
    num.push(Math.floor(Math.random()*10)+1 );
    for(var i=1; i<=3; i++){
        var temp = Math.floor(Math.random()*10)+1;
        if ( num.indexOf(temp) == -1){
            num.push(temp);
        }else{i--;}
    }
    
    board.push(Math.floor(Math.random()*8) );
    for(var i=1; i<=7; i++){
        var temp = Math.floor(Math.random()*8);
        if ( board.indexOf(temp) == -1){
            board.push(temp);
        }else{i--;}
    }
    var count = document.getElementById("count");
    count.innerText = step;
}

window.onload = function(){
    init(); //초기화 함수 실행
    let start = document.getElementById("start");
    // id가 start인 버튼 가져오기
    start.addEventListener("click",play);
    // 버튼 태그에 클릭 이벤트 등록하기(실행함수는 play 함수)
    
    let pic = document.getElementsByClassName("picture");
    for( var i=0; i<pic.length; i++){
        pic[i].addEventListener("click",same_search);
    }
}


function play(){
    let pic = document.getElementsByClassName("back");
    for( var i=0; i<pic.length; i++){
        pic[board[i]].innerHTML = num[i%4]  ;
    }

    setTimeout( function(){
        let pic = document.getElementsByClassName("back");
        for(var i=0; i<pic.length; i++){
            pic[i].style.display="none";
        }
        show = true;    // start 버튼을 클릭했다는 의미
    },1000);

}



function same_search(){
    if(!show){  //show 변수가 false라면 not연산자에 의해 true가 적용
        // show 변수가 true라면 not연산자에 의해 false가 적용
        alert("start버튼을 클릭하세요. ");
        return;     // start 버튼을 클릭하지 않으면 same_search를 실행시키지 않는다.
    }

    // 클릭횟수 증가시키기
    if(step == 20){     // 20번 클릭하면 더 이상 진행되지 않게 show는 false로 바꾸고 함수 종료
        alert("다음기회에 도전하세요");
        show = false;
        return;
    }
    var count = document.getElementById("count");
    count.innerHTML = ++step;

    // this.style.background="red";  (확인용)
    var child = this.childNodes[0]; // firstChild도 사용 가능
    child.style.display="inline";
    
    let span = document.getElementsByClassName("back");
    for(var i=0; i<span.length; i++){
        if(span[i] === child)
            choice.push(i); // 클릭한 td의 span태그 인덱스를 배열에 저장
    }
    cmp_num.push(parseInt(child.innerText));    // 클릭한 td>span의 숫자를 배열에 저장
    
    if(cmp_num.length == 2){    // 배열에 숫자 2개가 저장되어있다면 비교
        if(cmp_num[0] == cmp_num[1]){
            cmp_num = new Array();
            choice = new Array();   // 같은 값을 클릭했을 때 초기화
            end++;  // 같은 숫자 찾으면 end 증가
        }else{
            setTimeout(function(){
                cmp_num=new Array ();
                let pic = document.getElementsByClassName("back");
                for(var i=0; i<choice.length; i++){
                    pic[choice[i]].style.display="none";
                }
                choice = new Array();
            },300)
            
        }
    }
    if(end==4){
        alert("게임 끝");
        show = false;
        
    }
}
// 자식태그 가져오는 법
// children - 모든 자식태그를 HTMLcollection 배열로 가져온다
// childNodes - 모든 자식태그를 nodeList 배열로 가져온다.
// firstChild - 첫째
// lastChild - 막내

// getElementById()또는 getElementsByClassName() 등을 사용하면 태그에 객체라는 것이 반환된다.
// 태그의 객테를 변수에 담아서 사용해왔다. 자바스크립트에서는 HTML 태그를 Element, 요소 또는 객체라고 한다.
// 객체를 표현하는 방법 중에 자기 자신을 의미하는 this가 있다.
// same_search함수를 실행시킨 건 td태그이다.
// 즉, td라는 객체에 의해 same_search함수가 실행된것이다.
// same_search함수안에서 this라고 사용하면 same_search함수를 실행시킨 td태그를 의미한다.