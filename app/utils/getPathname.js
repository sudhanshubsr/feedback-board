import {usePathname} from "next/navigation";

const useBoardName = ()=>{
  const pathname = usePathname();
  const result = /^\/board\/([a-z0-9\-]+)\/?.*/.exec(pathname);
  const boardName = result ? result[1] : null;
  return boardName;
}

export default useBoardName;