export const camelCaseToHeader = string => {
    let output = string
    for(let i=0;i<string.length;i++){
        if (string[i] === string[i].toUpperCase()){
            output = string.substring(0,i) + ' ' + string.substring(i,i+1).toUpperCase() + string.substring(i+1)
        }
    }
    return output.substring(0,1).toUpperCase()+ output.substring(1)
}