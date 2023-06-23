
// let game = new Array();






// window.onload = function(){
//     let start = document.getElementById("start");
//     start.addEventListener("click",play)
// }

// function play(){
//     let user = document.getElementById("user").value;
    
//     //alert("출력");
//     let pc = Math.floor(Math.random()*3)+1;
//     for(var i=1; i<=31; i++){
//         game.push(i);
//     }

// }


window.onload= function(){
    
    let bt = document.getElementById("BMI");
    bt.addEventListener("click",bmi)
}

function bmi(){
    let weight = document.getElementById("weight").value;
    weight=Number(weight);
    let tall = document.getElementById("tall").value;
    tall=Number(tall);


    let res =0;
    res = weight/(tall/100)*(tall/100);
    let print = document.getElementById("print");

    if(res < 18.5){
        print.innerHTML="저체중입니다."
    } else if( 18.5 <= res || res <= 22.9 ){
        print.innerHTML= "정상체중입니다."
    }else if( 22.9 < res || res <= 24.9 ){
        print.innerHTML="과체중입니다."
    }else if(res<=35){
        print.innerHTML =" 과체중입니다."
    }
}