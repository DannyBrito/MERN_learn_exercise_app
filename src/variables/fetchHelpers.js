// Catch Error

export const errorHandler = (response) =>{
    if(!response.ok){ 
        let err = new Error(response.statusText)
        err.response = response.json()
        throw err
    }
    return response
}

export const errorFormater = errors =>{
    let result = ''
    Object.keys(errors).forEach((error,ind) =>{
        result += `${ind+1}. ${errors[error]} \n`
    })
    return result
}