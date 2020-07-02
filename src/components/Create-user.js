import React,{ useState} from 'react'
import {useHistory} from 'react-router-dom'
import {BaseUrl} from '../variables/const'
import {errorFormater} from '../variables/fetchHelpers'
const CreateUser = () =>{
    
    const [username, setUsername] = useState('')

    const history = useHistory()

    const handleSubmit = (e) =>{
        e.preventDefault()
        const data = {
            username
        }
        
        
        fetch(BaseUrl + '/users',{
            method:'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
        // (one promise per request,meaing can only perform .json() once, work-around attach then after json call)
        .then(res =>res.json()
                    .then(dt =>({status: res.ok, body:dt}))
            )
            .then(res =>{
                if(!res.status) throw(errorFormater(res.body))
                else{
                    console.log(res.body)
                    history.push('/')
                }
            })
            .catch(window.alert);
    }
    
    return(
        <form onSubmit={handleSubmit}>
            <div className='form-group'>
                username: 
                <input  required className='form-control' type='text'
                    value={username}
                    onChange={e=>setUsername(e.target.value)}
                />
            </div>
            <div className="form-group">
                <input type="submit" value="Create User" className="btn btn-primary" />
            </div>
        </form>
    )
}

export default CreateUser

