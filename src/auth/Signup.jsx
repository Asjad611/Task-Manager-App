
import React, { useContext, useState } from 'react';
import { LocaleContext } from '../LocaleStorage/LocaleContext';

const Signup = () => {
  const { setLocaleStorageAdmin, setLocaleStorageEmployee, getLocaleStorageAdmin, getLocaleStorageEmployee } = useContext(LocaleContext);
  const [name, setname] = useState("");
  const [email, setemail] = useState("");
  const [pass, setpass] = useState("");
  const [id, setid] = useState("");

  // Function to check if the ID is already taken
  const isIdTaken = (id) => {
    const existingAdminData = getLocaleStorageAdmin();
    const existingEmployeeData = getLocaleStorageEmployee();

    // Check if the ID exists in either Admin or Employee data
    const isIdExist = [
      ...existingAdminData,
      ...existingEmployeeData
    ].some(user => user.id === id);

    return isIdExist;
  };

  // Handle Admin data submission
  const adminDataSubmit = () => {
    if (isIdTaken(id)) {
      alert("ID already Exists.");
      return;
    }

    const newUserData = {
      name: name,
      email: email,
      pass: pass,
      id: id,
      role: "Admin"
    };

    setLocaleStorageAdmin(newUserData); // Save Admin data to localStorage
    // Clear form inputs
    setemail("");
    setpass("");
    setid("");
    setname("");
    alert()
    alert("Sign Up Successful as Admin")
  };

  // Handle Employee data submission
  const employeeDataSubmit = () => {
    if (isIdTaken(id)) {
      alert("ID already Exists.");
      return;
    }

    const newUserData = {
      name: name,
      email: email,
      pass: pass,
      id: id,
      role: "Employee"
    };

    setLocaleStorageEmployee(newUserData); // Save Employee data to localStorage
    // Clear form inputs
    setemail("");
    setpass("");
    setid("");
    setname("");
    alert("Sign Up Successful as Employee")

  };

  return (
    <>
      <div className='w-full bg-blue-50 h-full flex flex-col items-center space-y-4'>
        <input
          onChange={(e) => { setname(e.target.value); }}
          value={name}
          type='text'
          placeholder='Enter Name'
          className='shadow-lg w-[80%] h-[13%] rounded-3xl text-center text-4xl mt-4'
        />
        <input
          onChange={(e) => { setemail(e.target.value); }}
          value={email}
          type='email'
          placeholder='Enter Email / Username'
          className='shadow-lg w-[80%] h-[13%] rounded-3xl text-center text-4xl'
        />
        <input
          onChange={(e) => { setpass(e.target.value); }}
          value={pass}
          type='password'
          placeholder='Enter Password'
          className='shadow-lg w-[80%] h-[13%] rounded-3xl text-center text-4xl'
        />
        <input
          onChange={(e) => { setid(e.target.value); }}
          value={id}
          type='number'
          placeholder='Enter ID'
          className='shadow-lg w-[80%] h-[13%] rounded-3xl text-center text-4xl'
        />
        <div className='flex'>
          <button
            onClick={adminDataSubmit}
            className='px-10 py-5 m-5 rounded-3xl text-white text-2xl text-nowrap bg-blue-800'
          >
            Sign In As Admin
          </button>
          <button
            onClick={employeeDataSubmit}
            className='px-10 m-5 w-[45%] rounded-3xl text-white text-2xl text-nowrap bg-blue-800'
          >
            Sign In As Employee
          </button>
        </div>
      </div>
    </>
  );
};

export default Signup;
