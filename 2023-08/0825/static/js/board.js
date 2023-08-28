const board_img = ["카리나.jpg","태연.jpg","고윤정.jpg","제노.jpg","마크.jpg",
"윈터.jpg","형원.jpg","원빈.jpg","찬영.jpg","태용.jpg","재현.jpg","텐.jpg",
"민니.jpg","슈화.jpg","나띠.jpg","윤진.jpg","전소미.jpg","도영.jpg","재민.jpg",
"지성.jpg","백현.jpg","경수.jpg"]

const board=[];
var gamer=[];

$(function(){
    for(var i=0; i<28; i++){ board.push(0);}
    initBoard();
    draw();
    $("#setBt").click(setOpen);
    $("#dice_bt").click(dice_turn);

    t=setInterval(() => { // 참가자 등록 완료될때까지  감시 하기
        if(gamer.length>0){
            //console.log(gamer);
            $("#dice_bt").attr('disabled',false);
            draw();  // 참가수 만큼 말 그리기
            clearInterval(t);
        }
    }, 50);
});