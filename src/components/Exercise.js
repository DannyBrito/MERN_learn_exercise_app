import React from 'react'
import {Link} from 'react-router-dom'

export const Exercise = props =>{

    return(
        <tr>
            <td>{props.username}</td>
            <td>{props.description}</td>
            <td>{props.duration}</td>
            <td>{props.date.substring(0,10)}</td>
            <td>
                <Link to={`/edit/${props._id}`}>edit
                </Link> | 
                <button onClick={()=>props.deleteExercise(props._id)}>delete 
                </button>
            </td>
        </tr>
    )
}