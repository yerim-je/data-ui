window.onload=function(){
    var drwNo = document.querySelector("#drwNo");
    var btnDefault = document.querySelector("#btnDefault");
    var btnSearch= document.querySelector("#btnSearch");

    btnDefault.addEventListener("click", data_default);
    btnSearch.addEventListener("click", data_search);

    var file = document.querySelector("#lotto");
    file.addEventListener("input", function(e){
        let target = e.target; // 선택된 e 파일을 참조
        let files = target.files; // 선택된 파일은 배열로 저장됨
        // 첫째 파일을 참조해야 내가 선택한 파일을 읽을 수 있음
        let reader = new FileReader();
        reader.addEventListener("load", function(){
            var str = reader.result; // result => 전체
            var temp = str.split("\n"); // \n => 엔터키(new line)
            
            for(var i in temp){ // var i=0; i<temp.length; i++와 같음 / 배열에게만 사용하는 for문
                lotto.push(temp[i].split("\t")); // \t => 탭 (tab)(스페이스바 5번 효과, 변경가능)
            }
        });
        reader.readAsText(files[0]);
    });

    var opt="";
    for(var i=1073; i>=1; i--)
        opt += "<option>"+i+"</option>";
    drwNo.innerHTML= opt;
    drwNo.addEventListener("change",select_count)
}
let sel_count=0;    // 발표회차 선택
function select_count(){
    sel_count= this.selectedIndex;
}
function data_default(){

}

function data_search(){
    // 결과확인을 클릭하면 input1 태그에 입력한 숫자를 모두 선택번호 td에  출력하기
    if(lotto.length==0){
        alert("로또 파일을 먼저 열어주세요.");
        return;
    }
    let win_num = new Array();
    for(var i=2; i<=7; i++){    // 내가 선택란 회차 당첨번호 win_num배열에 저장
        win_num.push(parseInt(lotto[sel_count][i])); 
    }
    for(var line=1; line<=5; line++){

        var input=document.getElementsByClassName("input"+line);
        var num_arr = new Array();
        
        for(var i=0; i<input.length; i++){
            if(input[i].value !=''){
                var val = input[i].value;
                if(win_num.indexOf(parseInt(val))== -1){
                    num_arr.push( "<span>"+input[i].value+"</span>" );
                }else {     // 내가 입력한 번호가 당첨번호0
                    num_arr.push("<strong class='red'>"+val+"</strong>")
                }
            }
        }
        if(num_arr.length == 6){
            var res = document.getElementsByClassName("resultNumber");
            res[line-1].innerHTML=num_arr;
        }
    }
}    