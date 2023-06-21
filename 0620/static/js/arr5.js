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
    let pic = document.getElementsByClassName("picture");
    for( var i=0; i<pic.length; i++){
        pic[board[i]].innerHTML = num[i%4]  ;
    }
}
function same_search(){

}