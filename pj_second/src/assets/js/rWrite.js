const m_name = ["1947 보스톤","가디언즈","공조2_인터내셔날","나를 찾아줘","나를 찾아줘(한국)","나이브스 아웃",
"내부자들_디 오리지널","노 바디","눈물이 주룩주룩","더 랍스터","더 문","더 웨일","더 킹","데드 풀","독전","드림",
"레이니데이 인 뉴욕","메기","모노노케 히메","미션 임파서블_데드 레코닝 part one","범죄도시3","빅 쇼트","사도","상견니",
"소울","신세계","아메리칸 사이코","아바타_물의 길","아저씨","어벤져스_엔드게임","어벤져스","업","엘리멘탈","여름을 향한 터널, 이별의 출구",
"연애 빠진 로맨스","왕의 남자","인생은 아름다워","인어공주","인타임","잠","존 윅_리로드","지푸라기라도 잡고 싶은 짐승들","천박사 퇴마 연구소_설경의 비밀",
"친절한 금자씨","캐롤","타겟","토르_천둥의 신","토이스토리4"];


function searchMovie(){
    for(var i=0; i<m_name.length; i++){
        let movieHTML=`<div class="movie_p"><img src="../images/img/${m_name[i]}.jpg">${m_name[i]}</div>`
        $(".search-result").append(movieHTML);
    };
    if (word.trim() !== "") {
        $(".hide").removeClass("hide");
      } else {
        $(".hide").addClass("hide");
      }
    $("#search_m").on("keyup",function(){
        var word = $(this).val();
        $(".movie_m").filter(function(){
            $(this).toggle($(this).text().indexOf(word) > -1);
        });
    });

}