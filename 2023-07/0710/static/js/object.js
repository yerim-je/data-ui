window.onload=function(){
    var body = document.getElementsByTagName("body");
    // body[0].innerHTML="<div> 오늘 비와??</div>";
    // 위 방식은 정석의 방식은 아니다. 
    // 제이쿼리는 자바스크립트를 보다 쉽고 다양한 곳에서 사용하기 위하여 만든 라이브러리

    var node = document.createElement("div");
    node.setAttribute("id","rain"); // >rain 이라는 아이디를 지정한다.
    node.addEventListener("click",function(){alert("졸립니??");})
    // 도큐먼트 밑에 있는 돔에 element를 만든다. (모든 태그는 도큐먼트 밑에 있다.)
    var text = document.createTextNode("오늘 비 많이 와?");
    node.appendChild(text);
    body[0].appendChild(node);
    // 바디태그에 자식으로 들어간다.
    

}
function exit(){
    window.close();
}
function winopen(){
    window.open("http://www.naver.com","_blank","width=800,height=500,top=300,left=200");
    // open 함수에 두번째 인자로
    // _blank 또는 아무것도 넣지 않으면 
    // 현재 브라유저에 새탭으로 열기하려면 옵션부분에 너비와 높이를 지정하지 않으면 된다.
    // 너비와 높이를 지정하면 새 브라우저로 열기가 된다.
    // 사용자가 사용하는 브라우저에 따라 형태가 다르게 열린다.
    

}