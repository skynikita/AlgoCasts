const request = require('request');

function fetchData(url){
    return new Promise((resolve, reject) => {
        request(url, (error, response, body) => {
            if(error){
                reject(error)
            }else{
                resolve(body)
            }
        })
    })
}

async function numDevices(statusQuery, threshold, dataStr){
    const url = "https://jsonmock,hackerrank.com/api/iot_devices/search";
    const response = await fetchData(url + new URLSearchParams(
        {
            status: statusQuery,
            page:1
        }
    ));
    const json = JSON.parse(response);
    let result = json.data;
    if(json.total_pages >1){
        for ( let i =2; i <= json.total_pages; i++){
            const res = await fetchData(url + new URLSearchParams({
                status:statusQuery,
                page: i
            }))
            result = result.concat(JSON.parse(res).data)
        }
    }
   /* let count = 0;
    result.forEach(item =>{
        const date = new Date(item.timestamp)
        const month = date.toISOString().substring(0,7).split('-')[1];
        const year = date.toISOString().substring(0,7).split('-')[0];
        const time = month + '-' + year;
        if(time === dataStr && threshold < item.operatingParams.rootThreshold){
            count ++
        }
    })
    return count;*/
    return result.filter(item =>{
        const date = new Date(item.timestamp)
        const month = date.toISOString().substring(0,7).split('-')[1];
        const year = date.toISOString().substring(0,7).split('-')[0];
        const time = month + '-' + year;
        return(time === dataStr && threshold < item.operatingParams.rootThreshold)
    }).length

}
