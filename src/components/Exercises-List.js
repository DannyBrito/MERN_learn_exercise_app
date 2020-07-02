import React,{useState,useEffect} from 'react'
import {BaseUrl} from '../variables/const'
import {responseHandler} from '../variables/fetchHelpers'
import {Exercise} from './Exercise'

const ExercisesList = () =>{

    const [exercises, setExercises] = useState([])

    useEffect(()=>{
        fetch(BaseUrl + '/exercises')
            .then(responseHandler)
            .then(({body})=>{
                console.log(body)
                setExercises(body)
            })
            .catch(window.alert)
    },[])

    const deleteExercise = id =>{
        
        fetch(BaseUrl + `/exercises/${id}`,{
            method:'DELETE'
        })
            .then(responseHandler)
            .then(()=>
                setExercises([...exercises.filter(e => e._id !== id)])
            )
            .catch(window.alert)

    }

    const createList = () =>{
        return exercises.map(e =>
            <Exercise {...e} key={e._id} deleteExercise={deleteExercise}/>
        )
    }

    return(
        <div>
        <h3>Logged Exercises</h3>
        <table className="table">
          <thead className="thead-light">
            <tr>
              <th>Username</th>
              <th>Description</th>
              <th>Duration</th>
              <th>Date</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
              {createList()}
          </tbody>
        </table>
      </div>
    )
}

export default ExercisesList