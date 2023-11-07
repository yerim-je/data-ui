let random = new Array();
let num_p = new Array();
let select=false;

function game(){
    random.push(Math.floor(Math.random()*50)+1);
    for(var i=1; i<25; i++){
        var temp=Math.floor(Math.random()*50)+1;
        if(random.indexOf(temp) == -1){
            random.push(temp);
        }else {i--;}
    }
    num_p.push(Math.floor(Math.random()*25));
    for(var i=1; i<25; i++){
        var tamp=Math.floor(Math.random()*25);
        if(num_p.indexOf(tamp) == -1){
            num_p.push(tamp);
        }else {i--;}
    }
}

window.onload=function(){
    game();
    let start = document.getElementById("start");
    start.addEventListener("click",play);

    let bingo = document.getElementsByClassName("bingo")
    for(var i=0; i<bingo.length; i++){
        bingo[i].addEventListener("click",say_num)
    }
}

function play(){
    let num = document.getElementsByClassName("ran_num");
    for(var i=0; i<num.length; i++){
        num[num_p[i]].innerHTML =random[i];
    }
    //alert("게임");
    
}
function say_num(){
    let child = this;
    child.style.background="#61623e";
    child.style.color="#dfdbd0"
    select=true;

    
    
}