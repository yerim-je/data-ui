let fish=[];

async function getData(){
    var data = await fetch("https://api.odcloud.kr/api/15031992/v1/uddi:3c46e4ef-78dc-4da6-97b1-ad226624eff5_201911131644?page=1&perPage=500&serviceKey=2yMYwum1rXlCN9VG0KUQCPfZM7%2FyybR7NTmeeY4tz%2FedSWLlmuRTlESOhQqiOeDdCqvlHigDuiIUuLtUHQBkvA%3D%3D");
    return data.data;
}


$(function(){
    fish = await getData();

    let kind = new Set();

    $.each(fish,function(i,item){
        kind.add(item.어초종류)
    })
    console.log(st);
});