import React, { useContext, useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import { LocaleContext } from '../LocaleStorage/LocaleContext'
import { v4 as uuidv4 } from 'uuid';




const AdminDashboard = ({userData}) => {


  const {setLocaleStorageAdmin,
    setLocaleStorageEmployee,
    getLocaleStorageEmployee,
    getLocaleStorageAdmin,
    updateLocaleStorageAdmin,
    updateLocaleStorageEmployee,
    addTask,
    getTask
    }=useContext(LocaleContext)
    
  
  

  const navigate = useNavigate();

  const {loggedInUserData,setloggedInUserData} =  userData
  const [name, setname] = useState(loggedInUserData.name)
  const [employeeNames, setemployeeNames] = useState([])
  const [taskTitle, settaskTitle] = useState("")
  const [taskDesc, setttaskDesc] = useState("")
  const [taskDataAdded, settaskDataAdded] = useState("")
  const [taskAssignedto, settaskAssignedto] = useState("")
  const [priority, setpriority] = useState("")
  const [taskDeadline, settaskDeadline] = useState("")
  const [tasksByAdmin, settasksByAdmin] = useState([])
  const [taskAddedDone, settaskAddedDone] = useState(false)
  const employeeData = getLocaleStorageEmployee() || []
  const [assignedAgentId, setassignedAgentId] = useState("")
  const [taskAssignedtoName, settaskAssignedtoName] = useState("")
  const [taskCurrentStatus, settaskCurrentStatus] = useState("")

  const nameByid = (id)=>{
   
  let data = employeeNames.filter((user)=> user.empId === id )

  let name =data[0].name
  
  return name
}
  
  
  let taskByThisAdmin =[]

  const createTaskBtn=(e)=>{
    e.preventDefault()
    if (!taskTitle || !taskDesc || !taskDataAdded || !taskAssignedto || !priority || !taskDeadline) {
      alert("Please fill in all fields!");
      return; // Exit the function if any field is empty
    }
   
    
  let taskData = {
    taskTitle :taskTitle,
    taskDesc:taskDesc,
    taskId:generateTaskId(),
    taskDataAdded:taskDataAdded,
    taskAssignedtoId:taskAssignedto,
    priority:priority,
    taskDeadline:taskDeadline,
    currentStatus : "pending",
    createdBy:loggedInUserData.name,
    creatorId:loggedInUserData.id,
    taskAssignedtoName : taskAssignedtoName
    
  }
  
  addTask(taskData)

  alert("Task Successfully Added")
  settaskTitle("")
  setttaskDesc("")
  settaskDataAdded("")
  settaskAssignedto("")
  setpriority("")
  settaskDeadline("")
  if(taskAddedDone === false){
    settaskAddedDone(true)
  }else{
    settaskAddedDone(false)
  }
}

useEffect(() => {
    let tasks = getTask() || []
    if(tasks.length > 0){taskByThisAdmin  = tasks.filter((task)=>  (task.creatorId == loggedInUserData.id)   ) 
       }


      settasksByAdmin(taskByThisAdmin)
    
      }, [taskAddedDone])
 
  const generateTaskId = () => {
    return uuidv4();
  };


  useEffect(() => {
    let obj={
      name:"",
      empId:""
    }
    let empData= employeeData.map((emp)=>{
      
      obj={
        name:emp.name,
        empId:emp.id
      }
      return obj
    })
    setemployeeNames(empData)
   
      
  
   
  }, [])
 
  const logOutHandler = () => {
    if (loggedInUserData) {
      // Reset the logged-in user state
      const updatedUserData = { ...loggedInUserData, loggedIn: false };
      setloggedInUserData(null); // Clear the state
  
      // Update local storage
      if (loggedInUserData.role === 'Admin') {
        updateLocaleStorageAdmin([updatedUserData], loggedInUserData.id);
      } else if (loggedInUserData.role === 'Employee') {
        updateLocaleStorageEmployee([updatedUserData], loggedInUserData.id);
      }
  
      // Navigate back to login
      navigate('/');
    }
  };




  return (
    <>
      <div className="w-full min-h-screen bg-[#030303] px-14 space-y-5  ">
        <div className="w-full h-28 rounded-3xl flex justify-between px-[50px] items-center text-white ">
          <div className="">
            <h1 className="text-3xl font-bold">Hello </h1>
            <h1 className="uppercase text-5xl font-extrabold">{name} !</h1>
          </div>
          <button onClick={logOutHandler} className="px-6 py-3 bg-red-800 text-white rounded-md">
            LOG OUT
          </button>
        </div>
        <div className=" w-full h-[80vh] border-white border-2 p-5 relative ">
          <form action="submit" className="flex  ">
            <div className="w-[50%] h-[100%] flex-col flex px-10 space-y-2   ">
              <label className="text-[2vw] text-white font-extrabold">
                Task Title
              </label>
              <input
                required
                value={taskTitle}
                type="text"
                placeholder=""
                className="text-[2vw] mt-4 rounded-lg"
                onChange={(e)=>{settaskTitle(e.target.value)}}
              />
              <label className="text-[2vw] text-white font-extrabold">
                
                Date Added
              </label>
              <input
                type="date"
                value={taskDataAdded}
                placeholder=""
                className="text-[2vw] mt-4 rounded-lg"
                onChange={(e)=>{settaskDataAdded(e.target.value);}}
              />
              <label className="text-[2vw] text-white font-extrabold">
               
                Assigned To
              </label>
              <select id="" value={taskAssignedto}  className="text-[2vw]"  onChange={(e)=>{
                settaskAssignedto(e.target.value)
                 let name= nameByid(e.target.value)
                 
                 settaskAssignedtoName(name)
                }}>
                <option></option>
               {
               employeeNames.map((eachUser, index) => (
              <option key={index}  className="text-2xl uppercase" defaultValue={""} value={eachUser.empId} >
                {eachUser.name} 
              </option> 
            )) }
                
              </select>
              <label className="text-[2vw] text-white font-extrabold">
                {" "}
                Priority{" "}
              </label>
              <select value={priority} onChange={(e)=>{setpriority(e.target.value)}} className="text-[2vw]">
              <option value=""></option>
                <option value="High">High</option>
                <option value="Mid">Mid</option>
                <option value="Low">Low</option>
              </select>
              <label className="text-[2vw] text-white font-extrabold">
                {" "}
                Deadline{" "}
              </label>
              <input
               onChange={(e)=>{settaskDeadline(e.target.value)}}
               
                type="date"
                value={taskDeadline}
                placeholder=""
                className="text-[2vw]  rounded-lg"
              />
            </div>
            <div className="w-[50%] h-[100%] flex flex-col space-y-4">
              <label className="text-3xl text-white font-extrabold">
                Task Description{" "}
              </label>
              <textarea
              onChange={(e)=>{setttaskDesc(e.target.value)}}
              value={taskDesc}
                placeholder=""
                className="w-[100%] h-[45vh] text-wrap text-4xl mt-4 rounded-lg p-3"
              />
              <button onClick={createTaskBtn} className=" w-full h-[8vh] bg-green-400 rounded-2xl text-3xl font-bold">
                Create Task
              </button>
            </div>
          </form>
        </div>

        <div className=" w-full min-h-screen border-white border-2 p-10">
          <h1 className="text-5xl text-white font-extrabold">Tasks</h1>
          <div className="my-2 gap-4 grid grid-cols-2">
           
            {tasksByAdmin.map((task)=>{ return(
               <div key={task.taskId}className="w-[40vw] h-[57vh] bg-red-400 rounded-3xl p-5 spacy-3  ">
                 <div className="space-y-2 ">
                   <h1 className="text-[2vw] text-center font-bold uppercase text-nowrap overflow-x-scroll scrollbar-hide ">{task.taskTitle}</h1>
                   <div className="w-[100%] h-[14vh] max-h-[15vh]  overflow-scroll  text-[2vw] scrollbar-hide p-3 font-bold ">
                     {task.taskDesc}

                   </div>
                   <div className="space-y-4">
                     <div className="gap-2 grid grid-cols-2">
                     
                     <div className=" inline px-2 py-3 rounded-md text-center  font-bold text-[1.5vw] bg-yellow-50 ">
                       {task.priority}
                     </div>
                     <div className=" py-3 rounded-md text-center font-bold text-[1.5vw] bg-yellow-50 uppercase ">
                       {task.currentStatus}
                     </div>
                  
                     <div className=" inline px-1 py-3 col-span-2 rounded-md text-center font-bold text-2xl bg-yellow-50 uppercase text-nowrap  ">
                       
                       Assigned : {task.taskAssignedtoName}
                     </div>
                     <div className=" mx-2  px-3 py-3 col-span-2  rounded-md text-center font-bold text-2xl text-white  bg-red-500 text-nowrap ">
                       
                       Deadline :{task.taskDeadline}
                     </div>
                   </div>
                   </div>
                 
                 </div>
               </div>)
            
            })

            }
          </div>
        </div>
      </div>
    </>
  );
};

export default AdminDashboard;
