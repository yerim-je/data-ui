
// padstart() - 문자열의 시작을 다른 문자열로 채워준다.
// 정재현.padstart(6,"기조남") -> 기조남정재현

window.onload=function(){
    setInterval(function(){
        var dt = document.querySelector("#data_time");
        const now = new Date();
        const year = now.getFullYear();
        const month = String(now.getMonth()+1).padStart(2,"0");
        const day = String(now.getDate()).padStart(2,"0");
        const hour = String(now.getHours()).padStart(2,"0");
        const minute = String(now.getMinutes()).padStart(2,"0");
        const sec = String(now.getSeconds()).padStart(2,"0");
        dt.innerHTML = `${year}.${month}.${day} ${hour}:${minute}:${sec}`;
        // year+"."+month+"."+day+" "+hour+":"+minute+":"+sec;
    },1000);
};