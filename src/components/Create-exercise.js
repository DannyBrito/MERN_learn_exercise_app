import React,{ useState, useEffect} from 'react'
import {BaseUrl} from '../variables/const'
const CreateExercise = () =>{
    
    const [username, setUsername] = useState('')
    const [description, setDescription] = useState('')
    const [duration, setDuration] = useState(0)
    const [date, setDate] = useState(new Date())
    const [users, setUsers] = useState([])

    const handleSubmit = (e) =>{
        e.preventDefault()
    }

    useEffect(()=>{
        fetch(BaseUrl +'/users')
            .then(res =>res.json())
            .then(res =>setUsers(res))
            .catch(console.log)
    })
    
    return(
        <form onSubmit={handleSubmit}>
            <div className='form-group'>
                username: 
                <select className='form-control'
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
                <input className='form-control' type='text'
                    value={description}
                    onChange={e=>setDescription(e.target.value)}
                />
            </div>
            <div className='form-group'>
                duration: 
                <input className='form-control' type='number'
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
        </form>
    )
}

export default CreateExercise


// import React, { Component } from 'react';
// import DatePicker from 'react-datepicker';
// import "react-datepicker/dist/react-datepicker.css";


//   onSubmit(e) {
//     e.preventDefault();

//     const exercise = {
//       username: this.state.username,
//       description: this.state.description,
//       duration: this.state.duration,
//       date: this.state.date
//     }

//     console.log(exercise);

//     axios.post('http://localhost:5000/exercises/add', exercise)
//       .then(res => console.log(res.data));

//     window.location = '/';
//   }

//   render() {
//     return (
//     <div>
//       <h3>Create New Exercise Log</h3>
//       <form onSubmit={this.onSubmit}>
//         <div className="form-group"> 
//           <label>Username: </label>
//           <select ref="userInput"
//               required
//               className="form-control"
//               value={this.state.username}
//               onChange={this.onChangeUsername}>
//               {
//                 this.state.users.map(function(user) {
//                   return <option 
//                     key={user}
//                     value={user}>{user}
//                     </option>;
//                 })
//               }
//           </select>
//         </div>
//         <div className="form-group"> 
//           <label>Description: </label>
//           <input  type="text"
//               required
//               className="form-control"
//               value={this.state.description}
//               onChange={this.onChangeDescription}
//               />
//         </div>
//         <div className="form-group">
//           <label>Duration (in minutes): </label>
//           <input 
//               type="text" 
//               className="form-control"
//               value={this.state.duration}
//               onChange={this.onChangeDuration}
//               />
//         </div>
//         <div className="form-group">
//           <label>Date: </label>
//           <div>
//             <DatePicker
//               selected={this.state.date}
//               onChange={this.onChangeDate}
//             />
//           </div>
//         </div>

//         <div className="form-group">
//           <input type="submit" value="Create Exercise Log" className="btn btn-primary" />
//         </div>
//       </form>
//     </div>
//     )
//   }