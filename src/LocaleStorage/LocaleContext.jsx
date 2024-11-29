import React, { createContext } from "react";


export  const LocaleContext = createContext()

export  const  LocaleProvider = ({children})=>{
    const setLocaleStorageEmployee=(data)=>{
        
        const existingData = JSON.parse(localStorage.getItem('Employee')) || [];
        const newData =  [...existingData, data] 
        localStorage.setItem("Employee",JSON.stringify(newData))
    }
    const setLocaleStorageAdmin=(data)=>{
        
        const existingData = JSON.parse(localStorage.getItem('Admin')) || [];
        const newData =  [...existingData, data] 
        localStorage.setItem("Admin",JSON.stringify(newData))
    }
    const getLocaleStorageEmployee = () => {

        return  JSON.parse(localStorage.getItem("Employee"))
         
       }
       const getLocaleStorageAdmin = () => {

        return  JSON.parse(localStorage.getItem("Admin")) 
         
       }
    //    const updateLocaleStorageAdmin = (data, id) => {
    //     const existingData = JSON.parse(localStorage.getItem('Admin'))
    //     let selectedData = existingData.filter(item => item.id === id)
    //     let newarr = existingData.filter(item => (!(item.id === id)))
    //     selectedData=data
    //     newarr.push(selectedData[0])
    //     localStorage.setItem("Admin",JSON.stringify(newarr))
    //   }
    const updateLocaleStorageAdmin = (updatedUserData, userId) => {
        const existingData = getLocaleStorageAdmin() || [];
        const updatedData = existingData.map(user =>
          user.id === userId ? updatedUserData[0] : user
        );
        localStorage.setItem('Admin', JSON.stringify(updatedData));
      };
      
    //   const updateLocaleStorageEmployee = (data, id) => {
    //     const existingData = JSON.parse(localStorage.getItem('Employee'))
    //     let selectedData = existingData.filter(item => item.id === id)
    //     let newarr = existingData.filter(item => (!(item.id === id)))
    //     selectedData=data
    //     newarr.push(selectedData[0])
    //     localStorage.setItem("Employee",JSON.stringify(newarr))
    //   }
    const updateLocaleStorageEmployee = (updatedUserData, userId) => {
        const existingData = getLocaleStorageEmployee() || [];
        const updatedData = existingData.map(user =>
          user.id === userId ? updatedUserData[0] : user
        );
        localStorage.setItem('Employee', JSON.stringify(updatedData));
      };
     
    const addTask= (data)=>{
      const existingData = JSON.parse(localStorage.getItem('Tasks')) || [];
      const newData =  [...existingData, data] 
      localStorage.setItem("Tasks",JSON.stringify(newData))
    }
    const getTask=()=>{
      return ( JSON.parse(localStorage.getItem("Tasks")) || [])
    }
    const updateTaskStatus=(taskId,taskStatus)=>{
      let existingdata = JSON.parse(localStorage.getItem('Tasks')) || [];
      let index 
       existingdata.map((task,i)=>{if(task.taskId===taskId){  index = i}})
       
      let ptask = existingdata.filter((task)=> task.taskId === taskId )
    
      ptask[0].currentStatus = taskStatus
     
      existingdata.splice(index,1,ptask[0])

      
      localStorage.setItem("Tasks",JSON.stringify(existingdata))
    }
    return (
        <>
        <LocaleContext.Provider value={{
            setLocaleStorageAdmin,
            setLocaleStorageEmployee,
            getLocaleStorageEmployee,
            getLocaleStorageAdmin,
            updateLocaleStorageAdmin,
            updateLocaleStorageEmployee,
            addTask,
            getTask,
            updateTaskStatus}}>
        {children}
        </LocaleContext.Provider>
        </>
    )
    

}