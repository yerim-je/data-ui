let topTenList = [];

$(async function(){
    var t = await getList();
    var data = await getMovies();

    data.forEach(function(item){
        t.forEach(function(tem){
            if( item.title.indexOf(tem.movieNm) > -1 ){
                topTenList.push(
                    {
                        '제목' : item.title,
                        '포스터' : item.posters.split("|")[0],
                        '랭킹' : tem.rank,
                        '개봉일' : item.repRlsDate
                    }
                )
            }
        });
    });
    topTenList = rankSort(topTenList);
});


async function getList(){
    const url = 'http://www.kobis.or.kr/kobisopenapi/webservice/rest/boxoffice/searchDailyBoxOfficeList.json?';
    const key = 'key=2308fbf71d40ed61712d0284758d4612&';
    const targetDt = 'targetDt='+dailyBoxOffice();

    var temp = await fetch(url+key+targetDt).then(r=>r.json()).then(r=>r);
    return temp.boxOfficeResult.dailyBoxOfficeList;
}

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


function dailyBoxOffice(){
    const timeBackNumber = 1;
    const currentDate = new Date();
    const yesterday = new Date(currentDate);
    yesterday.setDate(currentDate.getDate() - timeBackNumber);
    // console.log(yesterday)
    var year = yesterday.getFullYear();
    var month = String(yesterday.getMonth() + 1).padStart(2, '0');
    var day = String(yesterday.getDate()).padStart(2, '0');
    return `${year}${month}${day}`
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

function rankSort(data){
    return data.sort( (a, b) => a['랭킹'] - b['랭킹'] );
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
    const timeBackNumber = 60
    const currentDate = new Date();
    const yesterday = new Date(currentDate);
    yesterday.setDate(currentDate.getDate() - timeBackNumber);
    // console.log(yesterday)
    var year = yesterday.getFullYear();
    var month = String(yesterday.getMonth() + 1).padStart(2, '0');
    var day = String(yesterday.getDate()).padStart(2, '0');
    return `${year}${month}${day}`
}

export {topTenList}