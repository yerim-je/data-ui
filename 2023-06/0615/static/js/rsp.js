// let game = 0;
// function start(){
//     document.getElementById("print").innerHTML=""
//     game = setInterval(change_img, 100);
// }
// let change=1;
// function change_img(){
//     var r = "rock.png";
//     var s = "scissors.png";
//     var p = "paper.png";
//     var g_img = document.getElementById("g_img");

//     if (change==1){
//         g_img.src="./static/image/"+s;
//         change=2;
//     }else if(change==2){
//         g_img.src="./static/image/"+p;
//         change=3;
//     }else{
//         g_img.src="./static/image/"+r;
//         change=1;
//     }
// }
// function result(choice){
//     clearInterval(game);
//     var r = "rock.png";
//     var s = "scissors.png";
//     var p = "paper.png";
//     var g_img = document.getElementById("g_img");

//     if (change==1){
//         g_img.src="./static/image/"+s;
//     }else if(change==2){
//         g_img.src="./static/image/"+p;
//     }else{
//         g_img.src="./static/image/"+r;
//     }

//     if((choice==r && change==p) || (choice==s && change==r)||(choice==p && change==r)){
//         document.getElementById("print").innerHTML ="win"
//     }else if(choice==change){
//         document.getElementById("print").innerHTML = "DREW"
//     }else{
//         document.getElementById("print").innerHTML = "lose"
//     }
// }


let com=0;
let com_img="";
let path="./static/image/";
let res="";

function select(user){
    clearInterval(com); // 컴퓨터 이미지 변경되는거 멈추기 setInterval중지
    var ctemp = Math.floor(Math.random() *3);
    // 이미지 에 상관없이 별도의 컴퓨터 가위바위보 값을 구한다.
    // setInterval에 의해 타이밍이 맞지않는 현상에 신경쓸 필요가 없어진다.

    if(user==ctemp){ //랜덤값과 내가 선택한 가위 바위 보에 따른 결과를 if로표현
        seq=ctemp; //seq 값을 랜덤값으로 변경한다.
        change();  // seq값에따라 컴퓨터 이미지를 바꿔주는 함수
        res.innerText="비김";
    }else if( (user==0 &&ctemp==2) 
                || (user==1 && ctemp==0) || (user==2&&ctemp==1)){
        seq=ctemp;
        change();
        res.innerText="승";
    }else{
        seq=ctemp;
        change();
        res.innerText="패";
    }
}

function start(){
    res = document.getElementById("print");
    res.innerHTML ="";

    com = setInterval( change , 100);
}

let seq=0;  //seq 값이 0이면 가위 1이면 바위 2면 보
function change(){
    com_img = document.getElementById("g_img");

    if(seq==0){
        com_img.src = path+"scissors.png";
        seq=1;
    }else if(seq==1){
        com_img.src = path+"rock.png";
        seq=2;
    }else if(seq==2){
        com_img.src = path+"paper.png";
        seq=0;
    }
}
