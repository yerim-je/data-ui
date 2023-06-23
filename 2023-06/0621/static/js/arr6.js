
let show = false;
let cmp_num = new Array();
let choice = new Array();
let step = 0;
let end=0;
 
let num = new Array();
let img = new Array();

function reset(){
    num.push(Math.floor(Math.random()*6));
    for(var i=1; i<=5; i++){
        var temp = Math.floor(Math.random()*6);
        if(num.indexOf(temp) == -1){
            num.push(temp);
        }else{i--;}
    }

    img.push(Math.floor(Math.random()*12));
    for(var i=1; i<=11; i++){
        var temp = Math.floor(Math.random()*12);
        if(img.indexOf(temp) == -1){
            img.push(temp);
        }else{i--;}
    }
    var count = document.getElementById("count");
    count.innerHTML = step;

}
window.onload= function(){
    reset();
    let start = document.getElementById("start");
    start.addEventListener("click",play)

    let pic = document.getElementsByClassName("picture");
    for(var i=0; i<pic.length; i++){
        pic[i].addEventListener("click",same_pic)
    }
} 

function play(){
    let pic = document.getElementsByClassName("img");
    for(var i=0; i<pic.length; i++){
        pic[img[i]].innerHTML = '<img src="./static/image/pic'+num[i%6]+'.jpg">';
    }
    let a = document.getElementsByClassName("a")
    for(var i=0; i<a.length; i++){
        a[img[i]].innerHTML = num[i%6];
    }
    setTimeout(function(){
        let pic=document.getElementsByClassName("img");
        for(var i=0;i<pic.length; i++){
            pic[i].style.display="none";
        }
        show=true;
    },1000);
    
}

function same_pic(){
    if( !show){
        alert("  게임을 시작해주세요. ");
        return;
    }

    if(step == 35){
        alert(" 게임 오버. 다시 도전하세요. ");
        show = false;
        return;
    }
    var count = document.getElementById("count");
    count.innerHTML = ++step;

    var child = this.childNodes[0];
    child.style.display="inline";

    var a = this.childNodes[1]
    
    let span = document.getElementsByClassName("a");
    for(var i=0; i<span.length; i++){
        if(span[i] === a)
            choice.push(i);
    }
    cmp_num.push(parseInt(a.innerText));

    if(cmp_num.length == 2){
        if(cmp_num[0] == cmp_num[1]){
            cmp_num=new Array();
            choice=new Array();
            end++;
        }else {
            setTimeout(function(){
                cmp_num = new Array();
                let pic=document.getElementsByClassName("img");
                for(var i=0;i<pic.length; i++){
                    pic[choice[i]].style.display="none";
                }
                choice= new Array();
            },300)
        }
    }
    if(end == 6){
        alert(" 게임 끝 ");
        show = false;
    }
}