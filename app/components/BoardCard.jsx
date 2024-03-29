import React from 'react'
import BoardTable from './BoardTable'
const BoardCard = ({boards, onUpdate}) => {
  return (
    <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-6">
            <div className="border shadow-sm rounded-lg">
              <div className="relative w-full overflow-auto">
                <table className="w-full caption-bottom text-sm">
                  <thead className="[&amp;_tr]:border-b">
                    <tr className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted">

                      <th className="h-12 px-4 text-left align-middle max-w-[150px] text-[--primary]">
                        Name
                      </th>
                      <th className="h-12 px-4 text-left align-middle hidden md:table-cell text-[--primary]">
                        Archive Status
                      </th>
                      <th className="h-12 px-4 text-left align-middle hidden md:table-cell text-[--primary]">
                        Creation Date
                      </th>
                      <th className="h-12 px-4 text-left align-middle text-[--primary]">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  {boards.map((board, index)=>(
                    <BoardTable key={index} boardName={board.name} boardCreationDate={new Date (board.createdAt).toDateString()} slug={board.slug} boardId={board.id} boardDescription = {board.description}
                    visibility={board.visibility} allowedEmails={board.allowedEmails}
                    onUpdate={onUpdate}
                    archived={board.archived}
                    />
                  ))}
                  
                  
                </table>
              </div>
            </div>
          </main>
  )
}


export default BoardCard