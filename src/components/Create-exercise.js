import React,{ useState, useEffect} from 'react'
import {useHistory} from 'react-router-dom'
import {BaseUrl} from '../variables/const'
import DatePicker from 'react-datepicker'
import "react-datepicker/dist/react-datepicker.css";
const CreateExercise = () =>{
    
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
        fetch(BaseUrl + '/exercises/add',{
            method:'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
            .then(res=>res.json)
            .then(res=>{
                history.push('/')
            })
            .catch(window.alert)
    }

    useEffect(()=>{
        fetch(BaseUrl +'/users')
            .then(res =>res.json())
            .then(res =>{
                console.log(res)
                setUsers(res)})
            .catch(console.log)
    },[])
    
    return(
        <form onSubmit={handleSubmit}>
            <div className='form-group'>
                username: 
                <select  required className='form-control'
                    value={username ? username : ''}
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
                <input type="submit" value="Create Exercise Log" className="btn btn-primary" />
            </div>
        </form>
    )
}

export default CreateExercise

