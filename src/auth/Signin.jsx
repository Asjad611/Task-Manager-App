import React, { useContext, useState } from 'react'
import { LocaleContext } from '../LocaleStorage/LocaleContext'


const Signin = () => {
  const [Email, setEmail] = useState("")
  const [Password, setPassword] = useState("")
  const [loggedIn, setLoggedIn] = useState(false)
  const {getLocaleStorageEmployee,getLocaleStorageAdmin,updateLocaleStorageAdmin,updateLocaleStorageEmployee}=useContext(LocaleContext)

  
  const adminSignin = ()=>{
        const data =getLocaleStorageAdmin()
        // console.log(data)
        let isValid = false
        let userId = null
        data.map((eachuser,index)=>{
          if(eachuser.email==Email && eachuser.pass==Password){
            alert("logged in successfully as Admin ")
            setLoggedIn(true)
            isValid=true
            userId=data[index].id
           
            const userData = eachuser
            // console.log(userData)
            let updatedData=[{...userData,userLoggedIn:true}]
            
            updateLocaleStorageAdmin(updatedData,userId)
            

          }
        
        })
        if(!isValid){alert("Invalid password or Username")}
        
  }
  const employeeSignin = ()=>{
    const data =getLocaleStorageEmployee()
    let isValid = false
    let userId = null
    data.map((eachuser,index)=>{
      if(eachuser.email===Email && eachuser.pass===Password){
        alert("logged in successfully as Employee ")
        setLoggedIn(true)
        isValid=true
        userId=data[index].id
        const userData = eachuser
        // console.log(userData)
        let updatedData=[{...userData,userLoggedIn:true}]
        updateLocaleStorageEmployee(updatedData,userId)
      }else{
        alert("Wrong password or Username")
      }
    })
}
 

  return (
    <>
      <div className='w-full h-[70%]  flex flex-col items-center justify-center bg-blue-50 '>
            <input required onChange={(e)=>{setEmail(e.target.value)}} type='email' placeholder='Enter Email / Username' className='shadow-lg w-[80%] h-[20%] mx-auto rounded-3xl text-center text-4xl m-5'  ></input> 
            <input required onChange={(e)=>{setPassword(e.target.value)}} type='password' placeholder='Enter Password' className='w-[80%] h-[20%] mx-auto rounded-3xl shadow-lg text-center text-4xl m-5'  ></input>  
             
            <div className='flex'>
            <button onClick={adminSignin} className=' px-10 py-5   m-5  rounded-3xl text-white text-2xl text-nowrap bg-blue-800'>Sign In As Admin  </button>
            <button onClick={employeeSignin}  className=' px-10 m-5 w-[45%]  rounded-3xl text-white text-2xl text-nowrap bg-blue-800'>Sign In As Employee</button>
            </div>
      
            
      </div>
      <div className='w-full h-full bg-gray-200' >
        <div className='text-blue-700 text-2xl text-center pt-7'>Forgot Password?</div>
      </div>
    </>
  )
}

export default Signin
