import Link from 'next/link'
import React, { useEffect, useRef } from 'react'
import EditBoardModal from '../components/EditBoardComponent';
import { useState} from 'react';
const BoardTable = ({boardName, boardCreationDate, slug, boardId, boardDescription, onUpdate,visibility, allowedEmails, archived}) => {

  const [editBoardMode, setEditBoardMode] = useState(false);
  const handleEditBoardModal = () => {
    setEditBoardMode(true);
  }

  const isMounted = useRef(true);
  useEffect(() => {
    if (isMounted.current) {
      const url = editBoardMode ? `/account/edit-board/${boardId}` : '/account';
      window.history.pushState({}, '', url);
    } else {
      isMounted.current = true;
    }
  }, [editBoardMode, boardId]);

  return (
    <>
      <tbody className="[&amp;_tr:last-child]:border-0">
                    <tr className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted">
                      
                      <td className="p-4 align-middle font-medium ">{boardName ? boardName : 'Board'}</td>
                      <td className={"p-4 align-middle font-medium"}>
                       {archived ?  <span className='bg-[--secondary] px-3 py-1 rounded '>{archived ? 'Archived!' : null}</span> : null}
                        </td>
                      <td className="p-4 align-middle hidden md:table-cell">
                        {boardCreationDate ? boardCreationDate : 'January 20, 2024'}
                      </td>
                      <td className="p-4 align-middle">
                        <div className="flex gap-2">
                          <Link href={'/board/' + slug} target='_blank'>
                          <button className="inline-flex items-center justify-center whitespace-nowrap text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-[--primary] hover:bg-accent hover:text-accent-foreground h-9 rounded-md px-3 text-white ">
                            View
                          </button>
                          </Link>

                          <button className="inline-flex items-center justify-center whitespace-nowrap text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-[--primary] hover:bg-accent hover:text-accent-foreground h-9 rounded-md px-3 text-white"
                          onClick={handleEditBoardModal}
                          >
                            Edit
                          </button>

                        </div>
                      </td>
                    </tr>
          </tbody>
          {editBoardMode && (
            <EditBoardModal
              boardName={boardName}
              boardId={boardId}
              boardDescription={boardDescription}
              boardUrl={slug}
              visibility={visibility}
              allowedEmails={allowedEmails}
              setOpenShow = {setEditBoardMode}
              onUpdate = {onUpdate}
              archived={archived}
            />
          )}
    </>
      
  )
}

export default BoardTable