var arr = [3,1,4,2,5,21,6,15,63];
function sortA(arr){
    for(var i=0;i<arr.length-1;i++){
        for(var j=i+1;j<arr.length;j++){
            if(cur>arr[j]){
                var index = arr[j];
                arr[j] = arr[i];
                arr[i] = index;  
            }
        }
    }
    return arr;
};
alert(sortA(arr))