import React from 'react'

const BoardCard = ({boardName, boardCreationDate}) => {
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
                        Creation Date
                      </th>
                      <th className="h-12 px-4 text-left align-middle text-[--primary]">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="[&amp;_tr:last-child]:border-0">
                    <tr className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted">
                  
                      <td className="p-4 align-middle font-medium">{boardName ? boardName : 'Board'}</td>
                      <td className="p-4 align-middle hidden md:table-cell">
                        {boardCreationDate ? boardCreationDate : 'January 20, 2024'}
                      </td>
                      <td className="p-4 align-middle">
                        <div className="flex gap-2">
                          <a href={'/board/' + boardName} target='_blank'>
                          <button className="inline-flex items-center justify-center whitespace-nowrap text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-[--primary] hover:bg-accent hover:text-accent-foreground h-9 rounded-md px-3 text-white ">
                            View
                          </button>
                          </a>
                          <button className="inline-flex items-center justify-center whitespace-nowrap text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-[--primary] hover:bg-accent hover:text-accent-foreground h-9 rounded-md px-3 text-white">
                            Edit
                          </button>
                        </div>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </main>
  )
}

export default BoardCard