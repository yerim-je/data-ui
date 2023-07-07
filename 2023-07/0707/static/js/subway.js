let station = new Array(40).fill(0);    // 40개의 공간에 0을 저장한다.

const st_name = ["상수역","은선역","예림역","향숙역","영주역","선양역"
,"상준역","승겹역","승겸역","수호역","민지역","태균역","길원역","철환역"
,"유성온천","중앙로역","서대전역","대전역","판암역","용문역","시청역",
"정부청사","갈마역","현충원역","탄방역","오룡역","갑천역","낙성대",
"노은역","구암역","월평역","신흥역","대동역","갑천역","건대입구","숙대입구"
,"여의나루","압구정","강변","남영"]

const train = [0,0,0,0];
const trainColor = ["","t_1st","t_2ed","t_3th","t_4th"];

window.onload = function(){
    map_draw();     // 지하철 지도 그리기
    train_active(); // 열차 움직이기

    var cls = document.querySelector("#modal_bg");
    cls.addEventListener("click",function(){
        var modal=document.querySelector("#modal");
        modal.style.display="none";
    });

}
// 관리의 편의를 위해 함수를 구분

function info(idx){
    var modal=document.querySelector("#modal");
    modal.style.display="block";
    var bg = document.querySelector("#bg");
    var train_num = find_train(idx)

    bg.innerHTML= "<div class='info'>"+
    "<div> <b>역    명 : "+st_name[idx]+"</b></div>"+
    "<div><b>진입차량: "+ train_num +"번차량</b></div>"+
    "</div>";
}
function find_train(idx){
    if(train[0]<0){
        for( var i=idx+1; i<station.length; i++){
            if(station[1]!=0){  // 역방향
                return station[1];
            }
        }
    }else { // 정방향
        for( var i=idx-1; i>=0; i--){
            if(station[1]!=0){  // 역방향
                return station[1];
            }
        }
    }
}
function train_active(){
    station[0]=1;
    map_draw();
    
    setInterval(function(){
        map_draw();
    },3000);

    setInterval(
        function(){
            station[Math.abs(train[0]++)]=0;
            station[Math.abs(train[0])]=1;
            map_draw();
            if(train[0]==39){   // 마지막역에 도착
                station[Math.abs(train[0])]=0;
                map_draw();
                setTimeout(function(){
                    train[0]=-40;
                },4000)
            }
        }
    ,4000);
    setTimeout(train2,8000);
    setTimeout(train3,16000);
    setTimeout(train4,24000);
}
function train2(){
    station[0]=2;
    setInterval(
        function(){
            station[Math.abs(train[1]++)]=0;
            station[Math.abs(train[1])]=2;
            map_draw();
            if(train[1]==39){   // 마지막역에 도착
                station[Math.abs(train[1])]=2;
                setTimeout(function(){
                    train[1]=-40;
                },4000)
            }
        }
    ,4000);
}
function train3(){
    station[0]=3;
    setInterval(
        function(){
            station[Math.abs(train[2]++)]=0;
            station[Math.abs(train[2])]=3;
            map_draw();
            if(train[2]==39){   // 마지막역에 도착
                station[Math.abs(train[2])]=0;
                setTimeout(function(){
                    train[2]=-40;
                },4000)
            }
        }
    ,4000);
}
function train4(){
    station[0]=4;
    setInterval(
        function(){
            station[Math.abs(train[3]++)]=0;
            station[Math.abs(train[3])]=4;
            map_draw();
            if(train[3]==39){   // 마지막역에 도착
                station[Math.abs(train[3])]=4;
                setTimeout(function(){
                    train[3]=-40;
                },4000)
            }
        }
    ,4000);
}

function map_draw(){ //지도 그리기 위한 함수
    var map=document.querySelector("#map"); // $("#map")
    var out="";
    for(var line=0; line<4; line++){
        var t=line*10;
        if( line%2!=0){  t+=9;
            while( t >= line*10) //  1줄 마지막인덱스 9, 2줄마지막인덱스 10, 3줄 마지막인덱스 29, 4줄 마지막인덱스 30
                out += make(t--);
        }else{
            while(t <= line*10+9)
                out += make(t++);
        }
            
    }
    map.innerHTML=out;
}

function make(t){
    var w95="";
    if((t%10==9 || t%10==0) &&t!=0 && t!=39) //줄의 마지막역과 시작역 부분
        w95 = "w95";
    if(t==9 || t==29 ||t==19) //줄의 마지막역
        w95 += " w95-top";
    if(t==10||t==30 || t==20) // 줄의 시작역
        w95 += " w95-bottom";
    if(t==19||t==20) // 오른쪽에 있는 연결 되어야하는 역
        w95 += "-right";

    var out="";
    out += "<div class='station'>";
    out += "<div class='train "+(trainColor[station[t]])+"'><i class='fa-solid fa-train'></i></div>";
    out += "<div class='mark' onclick='info("+t+")'><div class='rail "+w95+"'></div>"+
            "<span class='stop'><i class='fa-regular fa-square  "+(trainColor[station[t]])+"'></i></span>";
    
     out += "</div>";
    if(t%10==9 && t!=39)
        out+="<div class='rad "+(t==19?'right':'left')+"'></div>";
    out += "<div class='name'>" +st_name[t]+ "</div></div>";
    return out;
}