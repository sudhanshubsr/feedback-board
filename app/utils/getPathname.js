import { usePathname } from "next/navigation";
import axios from "axios";
import { createContext } from "react";
import { useEffect, useState } from "react";

export const BoardInfoContext = createContext({});

const useBoardSlug = () => {
  const pathname = usePathname();
  const result = /^\/board\/([a-z0-9\-]+)\/?.*/.exec(pathname);
  const boardSlug = result ? result[1] : null;
  return boardSlug;
};

export async function isBoardAdmin(boardName) {
  const res = await axios.get("/api/board");
  return !!res.data.find((board) => board.name === boardName);
}

export async function getBoardName(boardSlug){
  const res = await axios.get(`/api/board?slug=${boardSlug}`);
  return res.data.name;
}
export function BoardInforProvider({children}){
  const boardSlug = useBoardSlug();
  const [boardName, setBoardName] = useState(boardSlug);
  const [boardAdmin, setBoardAdmin] = useState(undefined);
  const [boardDescription, setBoardDescription] = useState('');
  useEffect(()=>{
    if(boardName){
      axios.get(`/api/board?slug=${boardSlug}`).then((res)=>{
        setBoardName(res.data.name);
        setBoardAdmin(res.data.adminEmail);
        setBoardDescription(res.data.description);
      })
    }
  },[boardName])
  return (
    <BoardInfoContext.Provider value={{slug:boardSlug, name:boardName, adminEmail:boardAdmin, description:boardDescription}}>
      {children}
    </BoardInfoContext.Provider>
  )
}

export default useBoardSlug;
