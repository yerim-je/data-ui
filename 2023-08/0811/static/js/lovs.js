let data=[];    //json 데이터를 저장할 배열
let tmp_data = new Object();    // 월별 기온 데이터를 저장할 객체
let year=[] // 연도를 저장할 배열
let color=[];

async function getData(){
    var temp = await fetch("./static/js/csvJson.json").then((res)=>res.json());
    //console.log(temp);
    return temp;
}

$(async function(){
    data = await getData();
    var y=new Set();
    var oldDay={y:0,m:1,d:0};     //이전 월이 몇월, 몇일인지 기억
    $.each(data,function(i,item){
        var date = item.날짜.split("-");    // 각 데이터의 날짜를 - 기준으로 분리 배열
        y.add(date[0]);     //년도만 저장
        keyIn(date);
        if( oldDay.m != Number(date[1]) ){    //  월이 변경되었을 경우
            tmp_data [oldDay.y][oldDay.m].평균기온 = tmp_data[oldDay.y][oldDay.m].평균기온/oldDay.d;
            tmp_data [oldDay.y][oldDay.m].최저기온 = tmp_data[oldDay.y][oldDay.m].최저기온/oldDay.d;
            tmp_data [oldDay.y][oldDay.m].최고기온 = tmp_data[oldDay.y][oldDay.m].최고기온/oldDay.d;
        }
        tmp_data[date[0]][Number(date[1])].평균기온 += item.평균기온c;
        tmp_data[date[0]][Number(date[1])].최저기온 += item.최저기온c;
        tmp_data[date[0]][Number(date[1])].최고기온 += item.최고기온c;
        oldDay.y=date[0];
        oldDay.m=Number(date[1]);
        oldDay.d=Number(date[2]);
    });
    year=Array.from(y);
    // 월별 데이터 뽑기
    console.log(tmp_data);

    $.each(year,function(i,y){
        var r=Math.floor(Math.random()*256);
        var g=Math.floor(Math.random()*256);
        var b=Math.floor(Math.random()*256);
        color.push("rgb("+r+","+g+","+b+")");
    })
    // 그래프 만들기
    draw("spring",[3,4,5]);
    draw("summer",[6,7,8]);
    draw("fall",[9,10,11]);
    draw("winter",[12,1,2]);
});
function draw(id, month){   // 각 계절마다 월에 맞춰 캔버스에 그리기
    var ctx = $("#"+id)[0].getContext("2d");
    // 범례
    make_legend(id,ctx);
    // 월 출력
    print_month(ctx,month);
    draw_axis(ctx,month[0]);
    draw_data(ctx,month);
}
function draw_data(ctx,month){
    $.each(month,function(i,m){ // 월 - 월부터 시작하는 이유는 그래프의 기준이 월이니까
        $.each(year,function(k,y){  // 년
            ctx.beginPath();    // 원그리기를 시작하겠다.
            ctx.arc();  // 원그리기
            ctx.fillStyle=color[k]; // 원 색상 정하기
            ctx.fill(); // 원 색상넣기
        });
    });
}
function draw_axis(ctx,month){
    ctx.moveTo(150,120);
    ctx.lineTo(800,120);
    ctx.stroke();
    var n = month==3? -1 : month==6? 20:month==9? 20: -7;
    for(var i=0; i<13; i++){
        ctx.moveTo(150+50*i,120);
        ctx.lineTo(150+50*i,130);
        ctx.stroke();
        ctx.font="10px Arial";
        ctx.fillText(n, 147+50*i,139);
        n++;
    }
}
function print_month(ctx,month){
    $.each(month,function(i,m){
        ctx.font="20px Arial";
        ctx.fillText(m+"월",50,200+100*i);
    });
}
function make_legend(id,ctx){
    ctx.font="20px Arial";
    ctx.fillText(id,100,30);
    var yp = 10, x=0;
    for(var i=0; i<year.length; i++){
        if(i == parseInt(year.length/2)) {yp=35; x=0;};
        ctx.beginPath();
        ctx.arc(200+50*x,yp,3,0,2*Math.PI);
        ctx.fillStyle=color[i];
        ctx.fill();
        ctx.font="10px Arial";
        ctx.fillStyle="#000";
        ctx.fillText(year[i]+"년",210+50*x ,yp+3);
        x++;
    }
}

function keyIn(날짜){
    if( !(날짜[0] in tmp_data)){   // tmp_data 객체에 해당년도가 키로 존재하냐?
        tmp_data[날짜[0]]=new Object();
        for(var i=1; i<=12; i++){
            tmp_data[날짜[0]][i]={ 
                평균기온:0,
                최저기온:0,
                최고기온:0
            }
        }
    }
}