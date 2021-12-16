import React from 'react'
import { FaRegStar, FaStar ,FaTrashAlt } from "react-icons/fa";
import  { ACTIONS } from './Content';


function Friend({friendDetails, dispatch}) {
    const {id, name, favorite} = friendDetails;
    return (
        <div className='friendDiv'>
            <div className='friendName'>
                <p>{name}</p>
                <p className='txt'>is your friend</p>
            </div>
            <div className='actionDiv'>
                <button onClick={() => dispatch({type : ACTIONS.TOGGLE_FAVORITE, payload :{id: id}})}>{favorite ? <FaStar /> :<FaRegStar/>}</button>
                <button onClick={() => dispatch({type : ACTIONS.DELETE_FRIEND, payload :{id: id}})}><FaTrashAlt/></button>
            </div>
        </div>
    )
}

export default Friend
