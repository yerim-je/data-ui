/*
객체란 무엇인가
객체는 선향이다.
객체는 상수다.
객체는 은선이다.
객체는 선행이 핸드폰이다.
객체는 상수 이어폰이다.

객체는 무엇이든지 될 수 있다.

선향이라는 객체는 이름이라는 속성의 값이 김선향이고
나이라는 속성의 값이 23이고, 성별이라는 속성이 남자 일 수 있다.

커피라는 객체   이름 : 아메리카노   원두 : 케냐         용량 : 1l
커피라는 객체   이름 : 콜드브루     원두 : 콜롬비아     용량 : V

div라는 객체    id : box    color : pink    width : 300px   position : fixed
div라는 객체    id : box1   color : red     width : 400px   position : absolute

div객체     class : a   color : blue
div객체     class : a   color : blue
위와 같이 똑같은 속성을 가진 객체는 2개로 본다.
그래서 getElementsByClassName으로 가져온다.

속성과 값의 차이점은 볼펜이라는 객체의 속성을 색갈, 크기, 모양, 무게가 있고, 값은 검정, 15cm... 등 이있다.
*/

// 객체 생성(1)

let 선향 = new Object();    
선향.나이=33;   //선향이라는 객체에 나이라는 속성과 값으로 33 저장
선향.이름="김선향"; //선향이라는 객체에 이름이라는 속성과 값은 김선향으로 저장
선향.키=158;
선향.몸무게=43;
선향.시력=1.5;
// 객체는 object또는 객체라고 한다.
// 속성은 attribute이라고 한다. 값은 value

let pen = new Object();
pen.name="삼색볼펜";
pen.color="red,blue,black";
pen.made="korea";
pen.company="향수";

function sum(a,b){
    document.write(a+b);
}
sum(10,20);
sum(40,100);

// 객체 생성(2)

function person(name,age,addr){  // 함수생성방법을 이용하여 객체를 만드는 방법 - 생성자함수
    this.name=name;
    this.age=age;
    this.addr=addr;
//  this.output=function(){
//      document.write("너는 할 수 있다.");
//  }
}

person.prototype.group="201호";
person.prototype.output=function(){
    document.write("<br>"+this.name+" 너는 할 수 있다.");
}
// 프로토타입은 어느한 객체라도 가질수 있다. 
// var div=document.getElementById("box");
// div.prototype.out=function(){

// }
/*
객체를 이용하는 이유
함수 --> 매서드
함수와 메서드의 차이
함수    - 독립적으로 실해되는 코드의 집합체
메서드  - 객체에 귀속되어 객체에 의해 실행되는 코드의 집합체
객체에 매서드를 정의하면 몬근 객체에 메서드가 생성된다.
객체가 100개라면 메서드도 100개가 된다.
문제점. 모든 객체의 속성값은 다르지만 메서드의 내용은 동일하다.
        동일한 내용의 메서드를 다수 생성하여 사용하는 방법은 비효율적이다.
        컴퓨터의 메모리 공간만 쓸데없이 차지한다.
해결책. 메서드를 하나만 생성이 되도록 만든다.
        객체를 1000개 생성해도 메서드는 1개만 존재하게 만든다.
그래서 자바스크립트를 다른말로 프로토타입 기반언어라고 한다.
*/

const p =new Array();
p.push( new person("신상수",27,"동구") );
p.push( new person("김선향",23,"서구") );
p.push( new person("송은선",31,"서구") );

// 객체 생성(3)
const baby = {
    firstName : "신",
    lastName : "향선",
    age : 2
};  // json의 형식

// 만드는 방식만 다르고 사용하는 방식은 모두 동일

window.onload=function(){
    // document.write( pen.name );
    // document.write( pen.color.split(",") );
    // document.write( p1.name );
    // document.write( p3.name );
    document.write( p[0].name );
    document.write( p[1].name );
    p[0].output();  
    p[2].output();  
    // 모든 객체에 output이라는 함수가 들어가 있기 때문에 0번 인덱스이던 
    // 1번인덱스이던 어느것을 하더라도 함수는 실행된다.
};

