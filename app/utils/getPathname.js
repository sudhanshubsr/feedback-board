"use client";
import { usePathname } from "next/navigation";
import axios from "axios";
import { createContext } from "react";
import { useEffect, useState } from "react";
import { MoonLoader } from "react-spinners";

const useBoardSlug = () => {
  const pathname = usePathname();
  const result = /^\/board\/([a-z0-9\-]+)/i.exec(pathname);
  // console.log("result",result);
  const boardSlug = result ? result[1] : null;
  return boardSlug;
};

export async function isBoardAdmin(boardSlug) {
  const res = await axios.get("/api/board");
  return !!res.data.find((board) => board.name === boardSlug);
}

export async function getBoardName(boardSlug) {
  const res = await axios.get(`/api/board?slug=${boardSlug}`);
  return res.data.name;
}

export const BoardInfoContext = createContext({});
export function BoardInfoProvider({ children }) {
  const boardSlug = useBoardSlug();
  const [boardName, setBoardName] = useState(boardSlug);
  const [boardAdmin, setBoardAdmin] = useState(undefined);
  const [boardDescription, setBoardDescription] = useState("");
  const [isLoaded, setIsLoaded] = useState(false);
  const [Unauthorized, setUnauthorized] = useState(false);
  const [archived, setArchived] = useState(false);

  useEffect(() => {
    if (boardName) {
      axios
        .get(`/api/board?slug=${boardSlug}`)
        .then((res) => {
          setBoardName(res.data.name);
          setBoardAdmin(res.data.adminEmail);
          setBoardDescription(res.data.description);
          setArchived(res.data.archived);
          setIsLoaded(true);
        })
        .catch((err) => {
          if (err.response.status === 401) {
            setUnauthorized(true);
          }
          setIsLoaded(true);
        });
    }
  }, [boardName,boardSlug]);

  if (!isLoaded) {
    return (
      <div className="relative left-1/2 transform -translate-x-10">
        <MoonLoader color="#1D4ED8" size={40} className="m-5" />
      </div>
    );
  }
  if (Unauthorized) {
    return (
      <div className="bg-orange-200 p-4">
        <h2 className="text-xl font-bold">Unauthorized</h2>
        <p>You are not authorized to view this board.</p>
      </div>
    );
  }

  return (
    <BoardInfoContext.Provider
      value={{
        slug: boardSlug,
        name: boardName,
        adminEmail: boardAdmin,
        description: boardDescription,
        archived: archived,
      }}>
      {children}
    </BoardInfoContext.Provider>
  );
}

export default useBoardSlug;
