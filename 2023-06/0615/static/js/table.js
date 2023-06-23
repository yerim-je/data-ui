//숫자나 연산자를 클릭하면 input 태그에 출력하기
// 클릭한 숫자나 연산자가 input 태그에 계속 나오게 만들기
//v = value

let out=""; // 전역변수 - 내가 클릭한 숫자나 연산자를 쌓아두기 위해서
            // 전역변수가 아니고 지역변수로 생성 시 클릭할 때 마다 새로운 
            // 지역변수가 생성된다. 이전에 클릭했던 내용이 사라진다.
let op="";  // 연산자를 저장할 전역변수
            // 전역으로 만드는 이유는 연산자 입력 후 두번째 숫자를 입력하기 때문에
            // 연산자를 함수의 종료와 함께 날아가지 않게하기 위해서
let num1 = 0;   // 첫번째 피연산자
let num2 = 0;   // 두번째 피연산자

function select(val){
    if(val==="="){  // 계산 결과를 보기 위해 = 을 클릭했을 경우 실행되는 if문
        out = calc();     // 계산을 위한 함수, 계산된 결과를 반환(return)할 것이다.
                    // 전역변수로 저장을 했기 때문에 입력하지 않아도 된다.
                    // out값을 input에 출력하고 있기 때문에
        num1 = out; // 결과값이 첫번째 피연산자로 대입되야하기 때문에 out이라는 변수를 num1에 저장해준다.

    } 
    else{
        out= out + val;     //출력용이니 건들지 않는다.
        if( typeof(val) === 'string' ){     // val변수의 값이 문자열인지 확인(연산자를 클릭한 경우)
            op = val;
            // alert("연산자입니다.")
        }
        if( op === ""){     // op변수가 빈 값이면 연산자를 클릭하기 전이다.
            num1 = Number(out); // 첫번째 숫자는 연산자를 클릭하기 전까지가 첫번째 피연산자이다.
                                // 연산자를 클릭한 이후부터는 두번째 피연산자가 들어와야 한다.
                                // 연산자 이전과 이후가 구분이 되어 피연산자1과 피연산자2로 나누어줄 수 있다.
        }else {                 // op변수가 빈 값이 아니라면 두번째 피연산자가 입력될 것이다.
            var index = out.indexOf(op)+1;
            num2 = Number( out.slice(index));
        }
    }
    document.getElementById("result").value=out;
}
function calc(){
    switch(op){
        // case "+" : return num1=num1+num2;
        // case "-" : return num1=num1-num2;
        // case "*" : return num1=num1*num2;
        // case "/" : return num1=parseInt(num1/num2);  
        // 나누기 연산자는 소수점도 나오기 때문에 정수만
        // 정수만 나오게 하기 위해 parseInt를 사용한다.
        case "+" : return num1+num2;
        case "-" : return num1-num2;
        case "*" : return num1*num2;
        case "/" : return parseInt(num1/num2);
    }
}

// 7+8하고 =을 입력하면 15가 출력된다.
// 15에 +를 클릭하고 4를 클릭하면 19가 나오게 하려면 어떻게 해야할까?

