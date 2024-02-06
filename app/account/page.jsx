'use client'
import React from 'react'
import { useSession } from 'next-auth/react'
import { useEffect, useState} from 'react'
import { useRouter } from 'next/navigation';
import BoardCard from '../components/BoardCard';
import BoardbuttonIcon from '../components/icons/BoardbuttonIcon';
import ProfileCard from '../components/ProfileCard';
import CreateBoardComponent from '../components/CreateBoardComponent';
import axios from 'axios';
import { MdManageAccounts } from "react-icons/md";
import { signOut } from 'next-auth/react'
import SignoutPopOver from '../components/SignoutPopOver';



const AccountPage = () => {
    const [isPremium, setIsPremium] = useState(null);
    const {data:session, status} = useSession();
    const [accountinfoModel, setAccountinfoModel] = useState(false);
    const [sharedBoardModel, setSharedBoardModel] = useState(false);
    const [boardModel, setBoardModel] = useState(true);
    const [boardsData, setBoardsData] = useState([]);
    const [sharedboardsData, setSharedBoardsData] = useState([]); 
    const [openShow, setOpenShow] = useState(false);
    const router = useRouter();
    const [dropDownOpen, setDropDownOpen] = useState(false);
    const user = session?.user;
    
    const handleDropDownClick = () => {
      setDropDownOpen(!dropDownOpen);
    }
    const handleAddBoardButtonClick = (e) => {
      e.preventDefault();
      setOpenShow(true);
    }

    useEffect(() => {
      axios.get('/api/subscription')
        .then(res => {
          setIsPremium(res.data?.stripeSubscriptionData?.object?.status === 'active');
        })
        .catch(err => {
          console.log(err);
          if (err.response.status === 401) {
          }
        });
    }, []);
  
    const getSharedBoardsData = async()=>{
      try{
        const res = await axios.get(`/api/board/?sharedEmail=${session?.user?.email}`)
        const sharedboards = res.data.filter(boards=> boards.adminEmail !== session?.user?.email);
        setSharedBoardsData(sharedboards)
      }
      catch(err){
        console.log(err);
      }
    }
    const getBoardsData = async()=>{
      try{
          await axios.get('/api/board').then(res=>{
            setBoardsData(res.data);
        })
      }catch(err){
        console.log(err);
      }
    }
    useEffect(() => {
      getBoardsData();
      getSharedBoardsData();
    },[boardsData]);

   

    useEffect(() => {
        if(status === 'unauthenticated'){
            router.push('/login');
        }
    },[status]);

    if(status === 'loading'){
        return <div>Loading...</div>
    }
    if(status === 'unauthenticated'){
        return <div>Unauthenticated</div>
    }

    const cancreateboard = isPremium || boardsData.length < 1;
    const handleHomeButtonClick = () => {
        setAccountinfoModel(true);
    }
    const handleBoardButtonClick = () => {
        setAccountinfoModel(false);
        setSharedBoardModel(false);
        setBoardModel(true);
    }
    const handleSignOut = async()=>{
      await signOut({callbackUrl: "/login"});
    }

    const handleSharedBoardButtonClick = () => {
      setSharedBoardModel(true);
      setBoardModel(false);
      setAccountinfoModel(false);

    }

  return (
    
    <>
    <div className="grid min-h-screen w-full lg:grid-cols-[280px_1fr] bg-white">
        <div className="hidden border-r bg-gray-100/40 lg:block dark:bg-gray-800/40">
        <div className="flex h-full max-h-screen flex-col gap-2 px-2">
          <div className="flex h-[60px] items-center border-b px-4">
            <div className="flex items-center gap-2 font-semibold">
              
              <span className="">Dashboard</span>
            </div>
          </div>
          <div className="flex-1 overflow-auto py-2">
            <nav className="grid items-start px-2 text-sm font-medium">
            <button
                className="flex items-center gap-3 rounded-lg bg-[--primary] px-3 py-2 text-white mb-2"
                onClick={handleHomeButtonClick}
              >
                <MdManageAccounts />
                Account
              </button>
              <button
                className="flex items-center gap-3 rounded-lg bg-[--primary] px-3 py-2 text-white mb-2 "
                onClick={handleBoardButtonClick}
              >
                <BoardbuttonIcon />
                Your Boards
              </button>

              <button
                className="flex items-center gap-3 rounded-lg bg-[--primary] px-3 py-2 text-white "
                onClick={handleSharedBoardButtonClick}
              >
                <BoardbuttonIcon />
                Shared Boards
              </button>
            </nav>
           
          </div>
   

        </div>
          </div>
          <div className="flex flex-col">
        <header className="flex h-14 lg:h-[60px] items-center gap-4 border-b bg-gray-100/40 px-6 dark:bg-gray-800/40">

          <div className="w-full flex-1">
            <h1 className="font-semibold text-lg">{accountinfoModel ? 'Account Info' : 'Boards'}</h1>
          </div>
          {!accountinfoModel && (
            <>
            {cancreateboard && (
              <button className="inline-flex items-center justify-center whitespace-nowrap text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 h-9 rounded-md px-3
              bg-[#0C0A09] hover:bg-[#0C0A01] text-white"
              onClick={handleAddBoardButtonClick}
              >
              Add Board
            </button>
            )}
          <div>
            <img type="button" onClick={handleDropDownClick} className="w-[48px] h-[48px] rounded-full cursor-pointer" src={user?.image} alt="User dropdown" />
          </div>

          {dropDownOpen && (
            <div className=' absolute right-[20px] top-[60px] z-30'>
            <SignoutPopOver user={user} setIsOpen={setDropDownOpen} />
            </div>
          )}
            </>
          )}
        </header>


        {/* Account Info */}
        {accountinfoModel && (<ProfileCard user={user} handleSignOut={handleSignOut}/>)}

        {/* Your Boards */}
        {!accountinfoModel && boardModel &&(
          <>
          <BoardCard boards={boardsData} onUpdate={getBoardsData}/>
             {boardsData.length === 0 && (
              <div className="flex items-center justify-center h-full">
                <h1 className="text-2xl font-semibold text-gray-500">No Boards Found</h1>
              </div>
            
            )}
            
            </>
          )}
          
           

        {/* Shared Boards */}
        {!accountinfoModel && sharedBoardModel && !boardModel &&(
 
            <>
            <BoardCard boards={sharedboardsData} onUpdate={getBoardsData}/>
            {sharedboardsData.length === 0 && (
              <div className="flex items-center justify-center h-full">
                <h1 className="text-2xl font-semibold text-gray-500">No Boards Found</h1>
              </div>
            )}

            </>
        )}


        {openShow && (
        <CreateBoardComponent setOpenShow={setOpenShow} onCreate={getSharedBoardsData}/>
        )}
          </div>
        </div>
    </>
  )
}

export default AccountPage