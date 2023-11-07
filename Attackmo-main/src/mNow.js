let data = null;
let now = [];


$(async function(){
    data = await getMovies();
    // console.log(data);

    organize();
    // console.log(now);
    // console.log(JSON.stringify(now,null, 2));

});


async function getMovies(){
    let url = 'http://api.koreafilm.or.kr/openapi-data2/wisenut/search_api/search_json2.jsp?collection=kmdb_new2&'
    let key = 'ServiceKey=K0B3Y48HAF56XXL0ADR2&';
    let detail = 'detail=Y&'
    let listCount = 'listCount=1000&'
    let releaseDts = `releaseDts=${releaseFilter()}&`;
    let releaseDte = `releaseDte=${todayYYYYMMDD()}&`;

    

    var temp = await fetch(url + key + detail + releaseDts + releaseDte + listCount).then(r=>r.json()).then(r=>r);
    return sortIt(filtering(temp.Data[0].Result));
}

function organize(dt){
    data.forEach(function(item){

        var y = item.repRlsDate.slice(0, 4)
        var m = item.repRlsDate.slice(4, 6)
        var d = item.repRlsDate.slice(6, 8)

        now.push(
            {
                '제목' : item.title,
                '포스터' : item.posters.split("|")[0],
                '장르' : item.genre,
                '줄거리' : item.plots.plot[0].plotText,
                '감독' : item.staffs.staff[0].staffNm,
                '배우' : actors(item.actors.actor),
                '러닝타임' : item.runtime + '분',
                '개봉일': `${y}.${m}.${d} 개봉`,
                '스틸컷' : stCuts(item),
                '예고편영상' : stTrailer(item.vods.vod, false),
                '예고편타이틀' : stTrailer(item.vods.vod, true)
            }
        )

        // now[item.title] = new Object();
        // now[item.title]['제목'] = item.title;
        // now[item.title]['포스터'] = item.posters.split("|")[0];
        // now[item.title]['장르'] = item.genre;
        // now[item.title]['줄거리'] = item.plots.plot[0].plotText;
        // now[item.title]['감독'] = item.staffs.staff[0].staffNm;
        // now[item.title]['배우'] = actors(item.actors.actor);
        // now[item.title]['러닝타임'] = item.runtime + '분';
        // now[item.title]['개봉일'] = `${y}.${m}.${d} 개봉`;
        // now[item.title]['스틸컷'] = stCuts(item);
        // now[item.title]['예고편영상'] = stTrailer(item.vods.vod, false);
        // now[item.title]['예고편타이틀'] = stTrailer(item.vods.vod, true);
    })
}

function stTrailer(arr, t){
    var temp = [];
    arr.forEach(function(link){
        if( t == false ) temp.push(link.vodUrl);
        if( t == true ) temp.push(link.vodClass);
    })
    return temp;
}

function stCuts(data){
    var temp = [];
    var arr = data.stlls.split("|");
    arr.forEach(function(link){
        temp.push(link);
    })
    return temp;
}


function sortIt(data){
    return data.sort( (a,b) => b['repRlsDate'] - (a['repRlsDate']) )
}


function filtering(dt){
    return dt.filter(function(item, idx){
        return item.genre != "에로" &&
        item.genre != "뮤직" &&
        item.genre != "인물,뮤직" &&
        item.posters != '';
    })
}

function actors(item){
    var arr = new Array();
    for(var i in item ){
        arr.push(item[i].actorNm)
    };
    return arr;
}

function todayYYYYMMDD() {
    const date = new Date();
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0'); // 월은 0부터 시작하므로 +1을 해줍니다.
    const day = String(date.getDate()).padStart(2, '0');
    
    return `${year}${month}${day}`;
}

function releaseFilter(){
    const timeBackNumber = 15
    const currentDate = new Date();
    const yesterday = new Date(currentDate);
    yesterday.setDate(currentDate.getDate() - timeBackNumber);
    // console.log(yesterday)
    var year = yesterday.getFullYear();
    var month = String(yesterday.getMonth() + 1).padStart(2, '0');
    var day = String(yesterday.getDate()).padStart(2, '0');
    return `${year}${month}${day}`
}

export {now};