
let num=0;

function input(){
    num = document.getElementById("num").value;
    num=Number(num);
    //alert(typeof(num));
    document.getElementById("result").innerHTML = num*num;
}