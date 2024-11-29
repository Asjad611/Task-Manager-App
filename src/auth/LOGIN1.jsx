import React, { useContext,useRef, useState,useEffect } from 'react'
import { LocaleContext } from '../LocaleStorage/LocaleContext'
import { useNavigate } from 'react-router-dom';




const Login1 = ({userData}) => {
  const { setloggedInUserData } = userData;
  const navigate = useNavigate();

  

  const  [signButton,setsignButton  ] =useState("signin")
  const [activeButton, setActiveButton] = useState("signin")
  const [currentPage, setcurrentPage] = useState("signIn")
  const [Email, setEmail] = useState("")
  const [Password, setPassword] = useState("")
  const [loggedIn, setLoggedIn] = useState("")
  const [name, setname] = useState("");
  const [email, setemail] = useState("");
  const [pass, setpass] = useState("");
  const [id, setid] = useState("");

  const {setLocaleStorageAdmin,
    setLocaleStorageEmployee,
    getLocaleStorageEmployee,
    getLocaleStorageAdmin,
    updateLocaleStorageAdmin,
    updateLocaleStorageEmployee
    }=useContext(LocaleContext)

  const signinRef =useRef()
  const signupRef =useRef()

  const isIdTakenAdmin = (id) => {
    const existingAdminData = getLocaleStorageAdmin() || [];
   

    // Check if the ID exists in either Admin or Employee data
    const isIdExist = [
      ...existingAdminData,
    
    ].some(user => user.id === id);

    return isIdExist;
  };
  const isIdTakenEmployee = (id) => {
    
    const existingEmployeeData = getLocaleStorageEmployee() || [];

    // Check if the ID exists in either Admin or Employee data
    const isIdExist = [
      
      ...existingEmployeeData
    ].some(user => user.id === id);

    return isIdExist;
  };


  // Handle Admin data submission
  const adminDataSubmit = () => {
    if (isIdTakenAdmin(id)) {
      alert("ID already Exists.");
      return;
    }

    const newUserData = {
      name: name,
      email: email,
      pass: pass,
      id: id,
      role: "Admin",
      loggedIn:false
    };

    setLocaleStorageAdmin(newUserData); // Save Admin data to localStorage
    // Clear form inputs
    setemail("");
    setpass("");
    setid("");
    setname("");
    setLoggedIn(false)
    
    alert("Sign Up Successful as Admin")
  };

  // Handle Employee data submission
  const employeeDataSubmit = () => {
    if (isIdTakenEmployee(id)) {
      alert("ID already Exists.");
      return;
    }

    const newUserData = {
      name: name,
      email: email,
      pass: pass,
      id: id,
      role: "Employee",
      loggedIn:false

    };

    setLocaleStorageEmployee(newUserData); // Save Employee data to localStorage
    // Clear form inputs
    setemail("");
    setpass("");
    setid("");
    setname("");
    alert("Sign Up Successful as Employee")

  };


const adminSignin = () => {
  const data = getLocaleStorageAdmin() || []
  if(data.length <1){alert("No Admin is Registered") ; return}
  // Find the user with matching credentials
  const user = data.find(
    (eachuser) => eachuser.email === Email && eachuser.pass === Password
  );

  if (user) {
    alert("Logged in successfully as Admin");
    setLoggedIn(true);

    // Update the user state
    const updatedData = { ...user, loggedIn: true };
    setloggedInUserData(updatedData);

    // Update local storage
    updateLocaleStorageAdmin([updatedData], user.id);

    // Navigate to the  dashboard
    navigate('/admin-dashboard'); 
  } else {
    alert("Invalid password or username");
  }
};
const employeeSignin = () => {
  const data = getLocaleStorageEmployee() || []
  if(data.length <1){alert("No Employee is Registered") ; return}

  // Find the user with matching credentials
  const user = data.find(
    (eachuser) => eachuser.email === Email && eachuser.pass === Password
  );

  if (user) {
    alert("Logged in successfully as Employee");
    setLoggedIn(true);

    // Update the user state
    const updatedData = { ...user, loggedIn: true };
    setloggedInUserData(updatedData);

    // Update local storage
    updateLocaleStorageEmployee([updatedData], user.id);

    // Navigate to the employee dashboard
    navigate("/employee-dashboard");
  } else {
    alert("Invalid password or username");
  }
};
  useEffect(() => {
    if (activeButton === 'signin') {
      signinRef.current.classList.remove('bg-gray-300');
      signinRef.current.classList.add('bg-blue-700');
      signupRef.current.classList.remove('bg-blue-700');
      signupRef.current.classList.add('bg-gray-300');
    } else if (activeButton === 'signup') {
      signupRef.current.classList.remove('bg-gray-300');
      signupRef.current.classList.add('bg-blue-700');
      signinRef.current.classList.remove('bg-blue-700');
      signinRef.current.classList.add('bg-gray-300');
    }
  }, [activeButton]);

  const signInClick = (e)=>{
    setActiveButton('signin'); // Update active button state


    setsignButton("signin")
   

  }

  const signUpClick = (e)=>{
   
    setsignButton("signup")
    setActiveButton('signup'); // Update active button state
  }
  let signInPage= <>
  <div className='w-full h-[70%]  flex flex-col items-center justify-center bg-blue-50 '>
        <input required onChange={(e)=>{setEmail(e.target.value)}} type='email' placeholder='Enter Email / Username' className='shadow-lg w-[80%] h-[20%] mx-auto rounded-3xl text-center text-[2vw] m-3'  ></input> 
        <input required onChange={(e)=>{setPassword(e.target.value)}} type='password' placeholder='Enter Password' className='w-[80%] h-[20%] mx-auto rounded-3xl shadow-lg text-center text-[2vw] m-5'  ></input>  
         
        <div className='flex'>
        <button onClick={adminSignin} className=' py-3 px-5 m-2 rounded-2xl text-white text-2xl text-nowrap bg-blue-800'>Sign In As Admin  </button>
        <button onClick={employeeSignin}  className=' py-3 px-5 m-2  rounded-2xl text-white text-2xl text-nowrap bg-blue-800'>Sign In As Employee</button>
        </div>
  
        
  </div>
  <div className='w-full h-full bg-gray-200' >
    <div className='text-blue-700 text-2xl text-center pt-7'>Forgot Password?</div>
  </div>
</>
    let signUpPage = <>
  
  <div className='w-full bg-blue-50 h-full flex flex-col items-center space-y-2'>
    <input
      onChange={(e) => { setname(e.target.value); }}
      value={name}
      type='text'
      placeholder='Enter Name'
      className='shadow-lg w-[80%] h-[12%] rounded-3xl text-center text-[2vw] mt-4'
    />
    <input
      onChange={(e) => { setemail(e.target.value); }}
      value={email}
      type='email'
      placeholder='Enter Email / Username'
      className='shadow-lg w-[80%] h-[13%] rounded-3xl text-center text-[2vw]'
    />
    <input
      onChange={(e) => { setpass(e.target.value); }}
      value={pass}
      type='password'
      placeholder='Enter Password'
      className='shadow-lg w-[80%] h-[13%] rounded-3xl text-center text-[2vw]'
    />
    <input
      onChange={(e) => { setid(e.target.value); }}
      value={id}
      type='number'
      placeholder='Enter ID'
      className='shadow-lg w-[80%] h-[13%] rounded-3xl text-center text-[2vw]'
    />
    <div className='flex'>
      <button
        onClick={adminDataSubmit}
        className='px-3 py-3 m-2 rounded-2xl text-white text-2xl text-nowrap bg-blue-800'
      >
        Sign Up As Admin
      </button>
      <button
        onClick={employeeDataSubmit}
        className='px-3 py-3 m-2 r rounded-2xl text-white text-2xl text-nowrap bg-blue-800'
      >
        Sign Up As Employee
      </button>
    </div>
  </div>
</>

  return (
    <>
      <div className='w-[100%] h-screen bg-blue-400 flex justify-center items-center'>
        <div className= 'w-[40%] h-[80%] bg-white rounded-3xl shadow-lg overflow-hidden '>
            <div className='w-full h-[17%]  flex'>
                <button ref={signinRef} onClick={signInClick} className=' m-4 w-[45%] rounded text-white  bg-gray-300 text-[2vw] '>Sign In</button>
                <button ref={signupRef} onClick={signUpClick} className='px-10 py-2 m-4 w-[45%] rounded text-white text-[2vw] bg-gray-300'>Sign Up</button>
                
            </div>
            {(signButton==="signin" ? signInPage : signUpPage)}
            
        </div>

      </div>
    </>
  )
}

export default Login1
