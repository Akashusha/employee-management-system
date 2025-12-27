import React,{useState} from "react";
import EmployeeService from "../service/EmployeeService";
import { useNavigate } from "react-router-dom";
const AddEmployee = () => {
    const navigate = useNavigate();
    const [Employee, setEmployee] = useState({
        id: "",
        name: "",
        phone: "",
        email: ""
    });

    const handleChange = (e) => {
        const value = e.target.value;
        setEmployee({
            ...Employee,
            [e.target.name]: value
        });
    }

    const saveEmployee = (e) => {
        e.preventDefault();
        EmployeeService.saveEmployee(Employee)
        .then((response) => {
            console.log(response);
            navigate('/');
            
        })
        .catch((error) => {
            console.log(error);
        });

    }

    const reset = (e) => {
        e.preventDefault();
        setEmployee({
            id: "",
            name: "", 
            phone: "", 
            email: ""
        });
    }
    
  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-900">
      <div className="w-full max-w-xl bg-slate-800 rounded-lg shadow-lg px-8 py-6">
        
        {/* Header */}
        <button className="text-2xl font-bold text-center text-white mb-6">
          🙍‍♂️ Add New Employee
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
          onClick={saveEmployee}
          className="bg-green-500 hover:bg-green-600 text-white px-6 py-2 rounded font-semibold hover:cursor-pointer">
            Save
          </button>

          <button 
          onClick={reset}
          className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded font-semibold hover:cursor-pointer">
            Clear
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
};

export default AddEmployee;
