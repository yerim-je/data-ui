// window.onload=function(){
//     var body = document.getElementsByTagName("body");
//     // body[0].innerHTML="<div> 오늘 비와??</div>";
//     // 위 방식은 정석의 방식은 아니다. 
//     // 제이쿼리는 자바스크립트를 보다 쉽고 다양한 곳에서 사용하기 위하여 만든 라이브러리

//     var node = document.createElement("div");
//     node.setAttribute("id","rain"); // >rain 이라는 아이디를 지정한다.
//     node.addEventListener("click",function(){alert("졸립니??");})
//     // 도큐먼트 밑에 있는 돔에 element를 만든다. (모든 태그는 도큐먼트 밑에 있다.)
//     var text = document.createTextNode("오늘 비 많이 와?");
//     node.appendChild(text);
//     body[0].appendChild(node);
//     // 바디태그에 자식으로 들어간다.  
// }

function exit(){
    window.close();
}
let child = "";
function winopen(){
    child = window.open("./child.html","","width=500,height=600");


    // open 함수에 두번째 인자로
    // _blank 또는 아무것도 넣지 않으면 
    // 현재 브라유저에 새탭으로 열기하려면 옵션부분에 너비와 높이를 지정하지 않으면 된다.
    // 너비와 높이를 지정하면 새 브라우저로 열기가 된다.
    // 사용자가 사용하는 브라우저에 따라 형태가 다르게 열린다.
    // 서버 없이 다른 창에 있는 데이터를 받으려면 이 함수를 이용하는 방법밖에 없다.
    // 부모브라우저에 의해서 자식브라우저가 만들어졌기 때문에 데이터를 주고 받을 수 있다.
}
function child_getName(){
    var name = child.document.getElementById("name").value;  // > 자식창의 이름값 가져오기
    document.getElementById("name").innerHTML=name; // > 부모창에 출력하기
}
function child_write(){
    child.document.getElementById("message").innerText=" 봄 바람 휘날리며~";
}
function child_close(){
    child.window.close();   // > child의 윈도우창을 닫기.
}