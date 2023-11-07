let com_num=0;
let win=0, lose=0; draw=0;
let tern = false;

function start(){
    if(tern){
        alert("아직 게임이 끝나지 않았습니다. 유저의 차례입니다.");
        return;
    }
    com_num = Math.floor(Math.random()*6)+1;

    let com = document.grtElementById("com");
    com.src="./static/image/"+com_num+".png";
    tern = true;
}
function mydice(){
    if(!tern){
        alert("유저의 차례가 아닙니다.");
        return;
    }
    let user_num = Math.floor(Math.random()*6)+1;
    tern = false;
    let user = document.getElementById("user");
    user.src="./static/image/"+user_num+".png";
// 컴퓨터주사위값도 나오고 내 주사위 값도 나왔으니 결과 출력하기
    var res = document.getElementById("result");
    if (com_num==user_num){
        res.innerTEXT = "무";
        draw++;
    } else if(com_num<user_num){
        res.innerHTML = "승리";
        win++;
    }else{
        res.innerHTML = "패배";
        lose++;
    }
    document.getElementById("recoard").innerHTML =win+"승"+ lose+ "패"+draw+"무";
}



 