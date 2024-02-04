import React from 'react'
import Popup from './Popup'
import { useState } from 'react'
import axios from 'axios'
import BoardFormComponent from './BoardFormComponent'

const CreateBoardComponent = ({setOpenShow, onCreate}) => {
    const [boardName, setBoardName] = useState('');
    const [boardUrl, setBoardUrl] = useState('');
    const [boardDescription, setBoardDescription] = useState('');
    const [visibility, setVisibility] = useState('public');
    const [allowedEmails, setAllowedEmails] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        try{
            axios.post('/api/board',{boardName, boardUrl, boardDescription, visibility, allowedEmails:allowedEmails.split('\n')}).then((res)=>{
                setOpenShow(false);
                window.open(`/board/${boardUrl}`, '_blank');
                onCreate();
                setBoardName('');
                setBoardUrl('');
              })
        }
        catch(err){
            console.log(err);
        }
    }
  return (
    <Popup title={'Create a New Board'} setShow={setOpenShow}>
      <BoardFormComponent 
      boardName={boardName} 
      setBoardName={setBoardName} 
      boardUrl={boardUrl} 
      setBoardUrl={setBoardUrl} 
      boardDescription={boardDescription} 
      setBoardDescription={setBoardDescription} 
      visibility={visibility}
      setVisibility={setVisibility}
      allowedEmails={allowedEmails}
      setAllowedEmails={setAllowedEmails}
      handleSubmit={handleSubmit}/>
    </Popup>
  )
}

export default CreateBoardComponent