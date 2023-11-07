function average(){
    var kor = document.getElementById("kor").value;
    var mat = document.getElementById("mat").value;
    var eng = document.getElementById("eng").value;
    kor = Number(kor);
    mat = Number(mat);
    eng = Number(eng);

    if((kor === "") || !(kor>=0 && kor<=100)){
        alert("국어점수 입력 제대로 해라..");
        kor.focus();
        return;
    }else if((mat === "") || !(mat>=0 && mat<=100)){
        alert("수학점수 입력 해라..");
        mat.focus();
        return;
    }else if((eng === "") || !(eng>=0 && eng<=100)){
        alert("영어점수도 입력해야지");
        eng.focus();
        return;
    }

    
    var rat = "";
    var k_rat = document.getElementById("kor_rat");
    var m_rat = document.getElementById("mat_rat");
    var e_rat = document.getElementById("eng_rat");

    if(kor>=90){
        k_rat.innerHTML = "국어 등급 : A";
    }else if(kor>=80 && kor<90){
        k_rat.innerHTML = "국어 등급 : B";
    }else if(kor>=70 && kor<80){
        k_rat.innerHTML = "국어 등급 : C";
    }else{
        k_rat.innerHTML = "국어 등급 : F";
    }

    if(mat>=90){
        m_rat.innerHTML= "수학 등급 : A";
    }else if(mat>=80 && mat<90){
        m_rat.innerHTML = "수학 등급 : B";
    }else if(mat>=70 && mat<80){
        m_rat.innerHTML = "수학 등급 : C";
    }else{m_rat.innerHTML = "수학 등급 : F";}

    if(eng>=90){
        e_rat.innerHTML = "영어 등급 : A";
    }else if(eng>=80 && eng<90){
        e_rat.innerHTML = "영어 등급 : B";
    }else if(eng>=70 && eng<80){
        e_rat.innerHTML = "영어 등급 : C";
    }else{e_rat.innerHTML = "영어 등급 : F"}

    var tot = total(kor, mat, eng);
    var avg = tot/3
    if(avg>=90){
        rat = "A";
    }else if(avg>=80 && avg<90){
        rat = "B";
    }else if(avg>=70 && avg<80){
        rat = "C";
    }else{rat = "F";}


    document.getElementById("result").innerHTML ="총점 : "+tot+ "점 평균 : " +avg+"점  등급 : "+rat;
}
function total(k,m,e){
    return (k+m+e);
}

