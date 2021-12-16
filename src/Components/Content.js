import React,{ useRef, useReducer, useEffect, useState } from 'react'
import { FaSort } from "react-icons/fa";
import Footer from './Footer';
import Friend from './Friend';
import Header from "./Header";

export const ACTIONS = {
    INITIAL_LOAD : 'load',
    ADD_FRIEND : 'add',
    TOGGLE_FAVORITE : 'toggle',
    DELETE_FRIEND : 'delete'
}

const LOCAL_STORAGE_KEY = 'HaptikFriendsList';

const reducer = (friendsList, action) => {
    switch (action.type) {
    
      case ACTIONS.INITIAL_LOAD:
            return action.payload.list;  
      case ACTIONS.ADD_FRIEND:
          return [addNewFriend(action.payload.name), ...friendsList];
      case ACTIONS.TOGGLE_FAVORITE :
          return (
            friendsList.map(friend => {
              if (friend.id === action.payload.id)
                return {...friend, favorite : !friend.favorite}
  
              return friend
            })
          )
      case ACTIONS.DELETE_FRIEND :
          return  (
            friendsList.filter( friend => friend.id !== action.payload.id )
          )
      
    
      default:
        return friendsList
    }
  
  }
  const addNewFriend = friendName => {
    return ({id : Date.now(), name : friendName, favorite : false});
  }
  

function Content() {
    const friendNameRef = useRef('')
    const [friendsList, dispatch] = useReducer(reducer, []);
    const [currentPosition, setCurrentPosition] = useState({start : 0, end : 7});
    const [searchText, setSearchText] = useState('');
    const [displayList, setDisplayList] = useState([]);
    const [isSorted, setIsSorted] = useState(false);

    // Retrieve list from local storage
    useEffect(() => {
        const list = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY));
        if(list) dispatch({type : ACTIONS.INITIAL_LOAD, payload : {list : list}});
       
    }, [])

    //Store the data into local storage
    useEffect(() => {
        localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(friendsList));
        setDisplayList(friendsList);
    }, [friendsList])

    //FilterData
    useEffect(() => {
        const filterList = getFilteredList(searchText);
        setDisplayList(filterList);
    }, [searchText])

    const getFilteredList = (value) =>{
        return friendsList.filter( ele => ele.name.toLowerCase().indexOf(value.toLowerCase()) > -1 )
    }

    const getSortedList = (type) =>{
        const array = displayList
        return type ? array.sort((a,b) => a.favorite-b.favorite ): array.sort((a,b) => b.favorite-a.favorite);
    }
    const setPosition = (move) =>{
        if (move === 'prev') {
            if(currentPosition.start === 0) return
            setCurrentPosition(prevPosition => ({ start : prevPosition.start - 7, end: prevPosition.start}));
        } else {
            if(currentPosition.end < displayList.length)
                setCurrentPosition(prevPosition => ({ start : prevPosition.end , end: prevPosition.end + 7}));
        }
        
    }
    const filterFriendsList = (value) =>{
        setSearchText(value);
    }
    const sortList = () =>{     
        let array = getSortedList(isSorted);       
        setDisplayList(array);
        setIsSorted(prev => !prev);
    }
    const submitForm = (e) => {
        e.preventDefault();
        dispatch({type : ACTIONS.ADD_FRIEND, payload : {name : friendNameRef.current.value}});
        friendNameRef.current.value = '';
        setCurrentPosition({start : 0, end : 7})
    }
    return (
        <>
         <Header  search={searchText} filter={filterFriendsList} />
            <form onSubmit={submitForm}>                
                <input type='text' ref={friendNameRef} placeholder="Enter your friend's name." className='inputField'/>                
            </form>
        { displayList.length ? <>  
                <div className='sortBy' onClick={sortList}>
                        Sort By Favorite <FaSort />
                    </div>
                    {
                        displayList.slice(currentPosition.start, currentPosition.end)
                        .map(friend => {
                            return <Friend key={friend.id} friendDetails = {friend} dispatch= {dispatch}/>
                        })
                    }
            <Footer setPosition={setPosition} page={currentPosition.end/7}/>
            </> 
            : 
            <div className='noFriends'>
                "No Friends, Please Add your friends."
            </div>
        }
        </>
    )
}

export default Content
