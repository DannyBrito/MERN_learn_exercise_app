// Handle response by formatting and throwing errors

export const responseHandler = response =>{
    return responseFormater(response)
    .then(errorHandler)
}

// 1. format response to save json and status
export const responseFormater = response =>{
    return response.json()
        .then(dt =>({ok: response.ok, body:dt}))
}

// 2. check status response and handle if error
export const errorHandler = response =>{
    if(!response.ok){ 
        throw(errorFormater(response.body))
    }
    return response
}

// 2.1 if response status isn't ok format an error message
export const errorFormater = errors =>{
    let result = ''
    Object.keys(errors).forEach((error,ind) =>{
        result += `${ind+1}. ${errors[error]} \n`
    })
    return result
}

