let station = new Array(40).fill(0);    // 40개의 공간에 0을 저장한다.

const st_name = ["상수역","은선역","예림역","향숙역","영주역","선양역"
,"상준역","승겹역","승겸역","수호역","민지역","태균역","길원역","철환역"
,"유성온천","중앙로역","서대전역","대전역","판암역","용문역","시청역",
"정부청사","갈마역","현충원역","탄방역","오룡역","갑천역","낙성대",
"노은역","구암역","월평역","신흥역","대동역","갑천역","건대입구","숙대입구"
,"여의나루","압구정","강변","남영"]

window.onload = function(){
    map_draw();
}
function map_draw(){    // 지도를 그리기 위한 함수
    var map = document.querySelector("#map");
    // div를 3개씩 1개의 역으로 만든다면 120+40 총 160개가 필요하다.
    var out = "";
    for(var line=0; line<4; line++){
        var t=line*10;
        if( line%2 != 0){
            t+=9;
        }
        while( t < 10 ){
            // 1줄 마지막 인덱스 9, 2줄 마지막 인덱스 10, 3줄 마지막 인덱스 29, 4줄 마지막 인덱스 30
            out += "<div class='station'>";
            out += "<div class='train'><i class='fa-solid fa-train'></i></div>";
            out += "<div class='mark'><div class='rail'></div>"+
            "<span class='stop'><i class='fa-regular fa-square'></i></span>"+
            "</div>";
            out += "<div class='name'>"+st_name[i]+"</div></div>"
        }
    }
    map.innerHTML=out;
}
