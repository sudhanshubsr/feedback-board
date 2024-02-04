import React from 'react'
import Popup from './Popup'
import BoardFormComponent from './BoardFormComponent'
import { useState } from 'react'
import axios from 'axios'

const EditBoard = ({boardName, boardUrl, boardDescription, setOpenShow, onUpdate, boardId,visibility, allowedEmails, archived}) => {

    const [newBoardName, setnewBoardName] = useState(boardName);
    const [newBoardUrl, setnewBoardUrl] = useState(boardUrl);
    const [newBoardDescription, setnewBoardDescription] = useState(boardDescription);
    const [newvisibility, setNewVisibility] = useState(visibility);
    const [newallowedEmails, setNewAllowedEmails] = useState(allowedEmails.join('\n'));
    const [archiveStatus, setArchiveStatus] = useState(archived || false);

    const handleSubmit = (e) => {
        e.preventDefault();
        try{
            axios.put('/api/board', {boardName: newBoardName, boardDescription: newBoardDescription, boardId: boardId, boardUrl: newBoardUrl, visibility:newvisibility, allowedEmails:newallowedEmails.split('\n')}).then((res)=>{
                setOpenShow(false);
                onUpdate();
                // window.open(`/board/${newBoardUrl}`, '_blank');
            })
        }catch(err){
            console.log(err);
        }
    }

  return (
    <Popup title={'Update Board Data'} setShow={setOpenShow}>
      <BoardFormComponent boardName={newBoardName} setBoardName={setnewBoardName} boardUrl={newBoardUrl} setBoardUrl={setnewBoardUrl} boardDescription={newBoardDescription} setBoardDescription={setnewBoardDescription}
      allowedEmails={newallowedEmails} setAllowedEmails={setNewAllowedEmails} visibility={newvisibility} setVisibility={setNewVisibility}
      handleSubmit={handleSubmit} boardId={boardId} archiveStatus={archiveStatus} setArchiveStatus={setArchiveStatus} onUpdate={onUpdate}/>
    </Popup>
  )
}

export default EditBoard