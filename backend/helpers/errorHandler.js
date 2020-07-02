const errorHandler = errors =>{
    let result = {}
    console.log(errors)
    Object.keys(errors).forEach(key =>
        result[key]= (errors[key].properties.message)
    )
    return result
}

module.exports = errorHandler