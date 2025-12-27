import React from 'react'
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import EmployeeService from "../service/EmployeeService";
const UpdateEmployee = () => {
    const {id} = useParams();
    const navigate = useNavigate();
    const [Employee, setEmployee] = useState({
        id: id,
        name: "",
        phone: "",
        email: ""
    });

     useEffect(() => {
           const fetchData = async () => {
           
            try {
                const response = await EmployeeService.getEmployeeById(Employee.id);
                setEmployee(response.data);
            } catch (error) {
                console.log(error);
            }
           
             };
             fetchData();
          }, []);
    

    const handleChange = (e) => {
        const value = e.target.value;
        setEmployee({
            ...Employee,
            [e.target.name]: value
        });
    }

    const updateEmployee = (e) => {
        e.preventDefault();
        EmployeeService.updateEmployee(Employee, Employee.id)
        .then((response) => {
            console.log(response);
            navigate('/');
            
        })
        .catch((error) => {
            console.log(error);
        });

    }
  return (
     <div className="min-h-screen flex items-center justify-center bg-slate-900">
      <div className="w-full max-w-xl bg-slate-800 rounded-lg shadow-lg px-8 py-6">
        
        {/* Header */}
        <button className="text-2xl font-bold text-center text-white mb-6">
          🙍‍♂️ Update Employee
        </button>

        {/* Inputs */}
        <div className="space-y-4">
          <input
            type="text"
            placeholder="Name"
            name="name"
            value={Employee.name}
            onChange={(e)=> handleChange(e)}
            className="w-full px-4 py-2 rounded bg-white text-black focus:outline-none"
          />

          <input
            type="number"
            placeholder="Phone"
            name="phone"
            value={Employee.phone}
            onChange={(e)=> handleChange(e)}
            className="w-full px-4 py-2 rounded bg-white text-black focus:outline-none"
          />

          <input
            type="email"
            placeholder="Email"
            name="email"
            value={Employee.email}
            onChange={(e)=> handleChange(e)}
            className="w-full px-4 py-2 rounded bg-white text-black focus:outline-none"
          />
        </div>

        {/* Buttons */}
        <div className="flex justify-center gap-4 mt-6">
          <button 
          onClick={updateEmployee}
          className="bg-green-500 hover:bg-green-600 text-white px-6 py-2 rounded font-semibold hover:cursor-pointer">
            Update
          </button>

          <button 
          onClick={()=> navigate('/')} 
          className="bg-red-500 hover:bg-red-600 text-white px-6 py-2 rounded font-semibold hover:cursor-pointer">
            Cancel
          </button>
        </div>

      </div>
    </div>
  );
  
}

export default UpdateEmployee