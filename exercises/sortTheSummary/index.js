const arr = [2,2,3,3,4,4,4,1,1,1]

function sortFrequency(array){
    const result = [];
    array.forEach(number =>{
        let numberExists = false;
        result.forEach(item =>{
            if(item[0]===number){
                item[1] ++;
                numberExists =true;
            }
        })
        if(!numberExists){
            result.push([number,1])
        }
    })
    result.sort((a,b) => a[0] - b[0]).sort((a,b)=> b[1] - a[1])
    return result;
}


console.log(sortFrequency(arr))
