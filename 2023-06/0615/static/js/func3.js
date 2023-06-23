// 시간을 다스리는 함수
// setTimeout(), setInterval()
// setTimeout() - 지정한 시간 이후에 동작시키는 함수
// setTimeout( 실행할 함수, 시간(밀리세컨드));

// setInterval() - 지정한 시간 주기로 계속 동작
// setInterval( 실행할 함수, 시간(밀리세컨드));
// let
let game=0;
function start(){
    game = setInterval(change_img, 150);
    // game변수에 setInterval의 interval id가 저장된다.
    // interval id는 setInterval 함수의 고유 이름이다.
    // interval id를 통해서 setinterval을 중지시킬 수 있다.
}

let change = 1;     //전역변수 (재선언 불가능) 전체영역에서 사용하기 위해 전역 함수 사용
function change_img(){
    var front = "coin_front.png";       // 특정 함수에서 사용하기 위해 지역함수 사용
    var back = "coin_back.png";
    var imageTag = document.getElementById("오백원");
    if(change==1){  //1일때는 뒷면
        imageTag.src="./static/image/"+back;
        change=0;
    }else {         //0일때는 앞면
        imageTag.src="./static/image/"+front;
        change=1;
    }
}
function result(choice){    //컴퓨터를 동작시키는 시간과 인간의 한계로 인한 이미지가 반대로 출력된다.
    clearInterval(game);
    var front = "coin_front.png";
    var back = "coin_back.png";
    var imageTag = document.getElementById("오백원");

    if(change==1){  //1일때는 뒷면
        imageTag.src="./static/image/"+back;
        
    }else {         //0일때는 앞면
        imageTag.src="./static/image/"+front;
        
    }

    if( choice == change ){
        document.getElementById("print").innerHTML="정답!!"
    }
}