import React, { useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { LocaleContext } from "../LocaleStorage/LocaleContext";

const EmployeeDashboard = ({ userData }) => {
  const {
    setLocaleStorageAdmin,
    setLocaleStorageEmployee,
    getLocaleStorageEmployee,
    getLocaleStorageAdmin,
    updateLocaleStorageAdmin,
    updateLocaleStorageEmployee,
    addTask,
    getTask,
    updateTaskStatus
  } = useContext(LocaleContext);

  const navigate = useNavigate();
  const { loggedInUserData, setloggedInUserData } = userData;
  const [thisUserTask, setthisUserTask] = useState([]);
  const [name, setname] = useState(loggedInUserData.name);
  const [inProgress, setinProgress] = useState([]);
  const [completed, setcompleted] = useState([]);
  const [pending, setpending] = useState([]);
  const [declined, setdeclined] = useState([]);
  const [forUseEffect, setforUseEffect] = useState(false);
  const [panel, setpanel] = useState("pending");

  const inProgressbtn = ()=>{
    setpanel("inprogress")
  }
  const completedbtn = ()=>{
    setpanel("completed")
  }
  const declinedbtn = ()=>{
    setpanel("declined")
  }
  const pendingbtn = ()=>{
    setpanel("pending")
  }
  

  const logOutHandler = () => {
    if (loggedInUserData) {
      // Reset the logged-in user state
      const updatedUserData = { ...loggedInUserData, loggedIn: false };
      setloggedInUserData(null); // Clear the state

      // Update local storage
      if (loggedInUserData.role === "Admin") {
        updateLocaleStorageAdmin([updatedUserData], loggedInUserData.id);
      } else if (loggedInUserData.role === "Employee") {
        updateLocaleStorageEmployee([updatedUserData], loggedInUserData.id);
      }

      // Navigate back to login
      navigate("/");
    }
  };
  
  const completedBtn = (e)=> {
    let taskId = e.target.value
    updateTaskStatus(taskId,"completed")
    if(forUseEffect === false){setforUseEffect(true)}else{setforUseEffect(false)}

  }  
  const acceptTaskBtn = (e)=> {
    let taskId = e.target.value
    updateTaskStatus(taskId,"inprogress")
    if(forUseEffect === false){setforUseEffect(true)}else{setforUseEffect(false)}

  }  
  
  const declineTaskBTn = (e)=> {
    let taskId = e.target.value
    updateTaskStatus(taskId,"declined")
    if(forUseEffect === false){setforUseEffect(true)}else{setforUseEffect(false)}

  } 
  useEffect(() => {
    const tasks = getTask() || []
    const UserTask = tasks.filter(
      (task) => task.taskAssignedtoId === loggedInUserData.id
    );
    
    setthisUserTask(UserTask);
    setpending(UserTask.filter((task)=>  task.currentStatus == "pending")) 
    
    setcompleted(UserTask.filter((task)=> task.currentStatus === "completed" )) 
    setinProgress(UserTask.filter((task)=> task.currentStatus ==="inprogress" ))
    setdeclined(UserTask.filter((task)=> task.currentStatus === "declined" ))
  }, [forUseEffect]);

  const pendingPage = <> { pending.map((task,index)=>(
    <div key={index}  className=" w-full h-[30%] bg-yellow-100 rounded-2xl flex flex-col text-[2vw] ">
    <div className=" h-[50%] flex justify-evenly items-center  ">
      <h1 className="w-[20%] uppercase font-bold text-wrap">{task.taskTitle}</h1>
      <div className="w-[50%] overflow-x-scroll scrollbar-hide text-center text-nowrap overflow-hidden  ">
        {task.taskDesc}
      </div>
      <div className=" text-center font-bold text-nowrap bg-red-400 py-1 rounded-2xl px-2 mt-2">Deadline: {task.taskDeadline}</div>
    </div>
    <div className="  flex justify-center space-x-10">
      <button onClick={acceptTaskBtn} value={task.taskId} className="px-3 py-1  bg-green-400 rounded-2xl hover:bg-green-600 shadow-lg">
        Accept
      </button>
      <button onClick={declineTaskBTn} value={task.taskId} className="px-3 py-1 bg-red-400 rounded-2xl hover:bg-red-600  shadow-lg">
        Decline
      </button>
    </div>
  </div>)) }
  </>
  const inprogressPage = <>{ inProgress.map((task,index)=>(
    <div key={index}  className=" w-full h-[35%] bg-red-400 rounded-2xl flex flex-col text-[2vw] space-x-3">
    <div className=" h-[50%] flex justify-evenly items-center space-x-3 ">
      <h1 className="w-[20%] uppercase font-bold text-nowrap">{task.taskTitle}</h1>
      <div className="w-[50%] overflow-x-scroll scrollbar-hide text-center text-nowrap overflow-hidden  ">
        {task.taskDesc}
      </div>
      <div className="w-[23%] text-center font-bold text-nowrap bg-red-400 py-3 rounded-2xl px-2 mt-2">Deadline: {task.taskDeadline}</div>
    </div>
    <div className="  flex justify-center space-x-10">
      <button onClick={completedBtn} value={task.taskId} className="px-5 py-2 bg-green-400 rounded-2xl hover:bg-green-600 shadow-lg">
        Completed
      </button>
      
    </div>
  </div>)) }
  
  </> 
   const completedPage = <>{ completed.map((task,index)=>(
    <div key={index}  className=" w-full h-[30%] bg-pink-300 rounded-2xl flex flex-col text-[2vw] space-x-3">
    <div className=" h-[100%] flex justify-evenly items-center space-x-3  ">
      <h1 className="w-[20%] uppercase font-bold text-wrap">{task.taskTitle}</h1>
      <div className="w-[50%] overflow-x-scroll scrollbar-hide text-center overflow-hidden  ">
        {task.taskDesc}
      </div>
      <div className="w-[23%] text-center font-bold text-nowrap bg-red-400  rounded-2xl p-2 mt-2">Deadline: {task.taskDeadline}</div>
    </div>
    
  </div>)) }
  
  </> 
     const declinedPage = <>{ declined.map((task,index)=>(
      <div key={index}  className=" w-full h-[30%] bg-yellow-400 rounded-2xl flex flex-col text-[2vw] ">
      <div className=" h-[100%] flex justify-evenly items-center space-x-3 ">
        <h1 className=" uppercase font-bold text-wrap">{task.taskTitle}</h1>
        <div className="w-[50%] overflow-x-scroll scrollbar-hide text-center text-wrap overflow-hidden  ">
          {task.taskDesc}
        </div>
        <div className=" text-center font-bold text-nowrap bg-red-400 py-2 rounded-2xl px-2 mt-2">Deadline: {task.taskDeadline}</div>
      </div>
    
    </div>)) }
    
    </> 
  
  return (
    <>
      <div className="w-full min-h-screen bg-[#030303] px-10 py-5  ">
        <div className="w-full h-26 rounded-3xl flex justify-between px-[50px] items-center text-white ">
          <div className="">
            <h1 className="text-3xl font-bold">Hello </h1>
            <h1 className="uppercase text-5xl font-extrabold">{name} !</h1>
          </div>
          <button
            onClick={logOutHandler}
            className="px-5 py-3 bg-red-800 text-white rounded-md"
          >
            LOG OUT
          </button>
        </div>
        <h1 className=" text-5xl font-bold text-white  mx-10 text-center my-3">Task Requests</h1>
        <div className=' w-full h-[28vh] flex justify-evenly items-center ' > 
            <div onClick={inProgressbtn} className='w-[22%] h-[80%] bg-red-400 rounded-3xl flex flex-col items-center justify-center space-y-1 hover:-translate-y-1 hover:scale-110  transition duration-[0.5s] delay-0 ease-in-out  '>
                <h1 className='text-[3vw] font-bold text-white '>{inProgress.length}</h1>
                <h1 className='text-[2vw] font-bold text-white '>Tasks in Progress</h1>
            </div>
            <div onClick={completedbtn} className='w-[22%] h-[80%] bg-pink-400 rounded-3xl flex flex-col items-center justify-center space-y-1 hover:-translate-y-1 hover:scale-110  transition duration-[0.5s] delay-0 ease-in-out'>
                <h1 className='text-[3vw] font-bold text-white '>{completed.length}</h1>
                <h1 className='text-[2vw] font-bold text-white '>Completed Tasks</h1>
            </div>
            <div onClick={pendingbtn} className='w-[22%] h-[80%] bg-purple-400 rounded-3xl flex flex-col items-center justify-center space-y-1 hover:-translate-y-1 hover:scale-110  transition duration-[0.5s] delay-0 ease-in-out'>
                <h1 className='text-[3vw] font-bold text-white '>{pending.length}</h1>
                <h1 className='text-[2vw] font-bold text-white '>Pending Tasks</h1>
            </div>
            <div onClick={declinedbtn} className='w-[22%] h-[80%] bg-yellow-400 rounded-3xl flex flex-col items-center justify-center space-y-1 hover:-translate-y-1 hover:scale-110  transition duration-[0.5s] delay-0 ease-in-out'>
                <h1 className='text-[3vw] font-bold text-black '>{declined.length}</h1>
                <h1 className='text-[2vw] font-bold text-bold '>Declined Tasks</h1>
            </div>
       </div>

        <div className="w-full h-[60vh] bg-zinc-800 flex flex-col space-y-3 p-3 rounded-2xl  flex-nowrap overflow-y-scroll scrollbar-hide  ">
          
          { (panel === "pending")? pendingPage : null }
          { (panel === "inprogress")? inprogressPage : null }
          { (panel === "completed")? completedPage : null }
          { (panel === "declined")? declinedPage : null }
        </div>
     
      </div>
    </>
  );
};

export default EmployeeDashboard;
