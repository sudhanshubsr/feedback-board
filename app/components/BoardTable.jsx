import React from 'react'

const BoardTable = ({boardName, boardCreationDate}) => {
  return (
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
  )
}

export default BoardTable