// import { sum as mySum } from './mymodule.js' as를 통해 다은 이름으로 변경ㄹ가능
import {default as sum,makeTable} from './mymodule.js'

console.log(sum(10,20));
// console.log(mySum(10,20)); -> default 
window.onload=function(){
    makeTable("box",4,5);
    makeTable("box2",3,7);
}