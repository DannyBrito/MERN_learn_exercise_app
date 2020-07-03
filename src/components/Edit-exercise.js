import React,{ useState, useEffect} from 'react'
import {useHistory} from 'react-router-dom'
import {BaseUrl} from '../variables/const'
import DatePicker from 'react-datepicker'
import "react-datepicker/dist/react-datepicker.css";
import { responseHandler } from '../variables/fetchHelpers';
const EditExercise = (props) =>{
    
    const [username, setUsername] = useState('')
    const [description, setDescription] = useState('')
    const [duration, setDuration] = useState(0)
    const [date, setDate] = useState(new Date())
    const [users, setUsers] = useState([])

    const history = useHistory()
    const handleSubmit = (e) =>{
        e.preventDefault()
        const data = {
            username,
            description,
            duration,
            date
        }
        fetch(BaseUrl + `/exercises/${props.match.params.id}`,{
            method:'PUT',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
            .then(responseHandler)
            .then((res)=>{
                history.push('/')
            })
            .catch(window.alert)
    }

    useEffect(()=>{
        fetch(BaseUrl +'/exercises/' + props.match.params.id)
            .then(responseHandler)
            .then(({body}) =>{
                    setUsername(body.username)
                    setDescription(body.description)
                    setDuration(body.duration)
                    setDate(new Date(body.date))
            })
            .catch(window.alert)

        fetch(BaseUrl +'/users')
            .then(res =>res.json())
            .then(res =>setUsers(res)) // only throw if network errors
            .catch(console.log)
    },[props])
    
    return(
        <form onSubmit={handleSubmit}>
            <div className='form-group'>
                username: 
                <select  required className='form-control'
                    value={username}
                    onChange={e=>setUsername(e.target.value)}>
                        <option value="" 
                         disabled hidden>
                            Choose here
                        </option>
                    {
                        users.map(({username,_id}) => 
                        <option key={_id} value={username}> 
                            {username}
                        </option>
                        )
                    }
                </select>
            </div>
            <div className='form-group'>
                description: 
                <input  required className='form-control' type='text'
                    value={description}
                    onChange={e=>setDescription(e.target.value)}
                />
            </div>
            <div className='form-group'>
                duration: 
                <input  required className='form-control' type='number'
                    value={duration}
                    onChange={e=>setDuration(e.target.value)}
                />
            </div>
            <div className='form-group'>
                    Date:
                    <div>
                        <DatePicker 
                            selected={date}
                            onChange={setDate}
                        />
                    </div>
            </div>
            <div className="form-group">
                <input type="submit" value="Save Changes" className="btn btn-primary" />
            </div>
        </form>
    )
}

export default EditExercise

