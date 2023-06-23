/*
    현재 태그의 다음 태그를 가져오는 방법
    - .nextSibling (형제태그를 의미한다.)
    태그(엘리먼트) 객체에 클래스를 추가하는 방법
    - element.classList.add('클래스 이름');
    클래스 여러개 추가
    - element.classList.add( '클래스 이름', '클래스 이름' );
    클래스 이름 변경
    - element.classList.replace('변경 전 이름','변경 후 이름);
    클래스 삭제
    - element.classLIst.toggle('삭제할 클래스 이름');
    조건에 따라 클래스 삭제
    - element.classList.toggle('삭제할 클래스 이름',조건식);
    태그(element) 객체에 클래스가 있는지 확인 방법
    - element.classList.contains('클래스 이름');
    -  해당 클래스이름이 있다면 true, 없다면 false

    dataset
    - HTML5부터는 태그에 데이터를 담을 수 있는 개념이 생김.
    - 데이터 속성은 태그에 data- 로 시작한다.
    - dataset은 브라우저에 어떠한 행동도 관여하지 않기 때문에 자유롭게 데이터를 넣어 사용하면 된다.
    - 자바스크립트에서 활용을 할 수 있고, html에서는 다른 속성처럼 태그에 영향을 주지 않는다.
    - 다른 속성이라 하면 width, height, style 등등
        <div width="200"> -> 이거는 width하는 속성에 의해 div의 크기에 영향을 준다. 하지만 dataset은 영향을 주지 않는다.
*/
window.onload=function(){
    var icon=document.getElementsByClassName("strapIcon");
    icon[0].addEventListener("click", function(){
        // var list = document.getElementsByClassName("menu_list");
        // list[0].style.display="block";
        var list = this.nextSibling.nextSibling;
        var show = list.dataset.show;
        if(show ==1){
            list.style.display="block";
            list.dataset.show=0;
        }else{
            list.style.display="none";
            list.dataset.show=1;
        }

        // var isActive = list.classList.contains("list_active");
        // if(isActive)
        //     list.classList.toggle("list_active");
        // else 
        //     list.classList.add("list_active");

    });
}