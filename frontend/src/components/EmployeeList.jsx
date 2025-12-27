import React,{useEffect, useState} from 'react'
import { useNavigate } from "react-router-dom";
import EmployeeService from '../service/EmployeeService';
const EmployeeList = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);
    const [Employees, setEmployees] = useState(null);

    useEffect(() => {
       const fetchData = async () => {
        setLoading(true);
        try {
            const response = await EmployeeService.getEmployees();
            setEmployees(response.data);
        } catch (error) {
            console.log(error);
        }
        setLoading(false);
         };
         fetchData();
      }, []);

      const deleteEmployee = (e, id) => {
          e.preventDefault();
                EmployeeService.deleteEmployee(id)
                .then(() => {
                  if(Employees){
                  setEmployees((prevElement)=>{
                    return prevElement.filter((Employee) => Employee.id !== id);
                  })  
                }
                })
                .catch((error) => {
                    console.log(error);
                });
              }
      const updateEmployee = (e, id) => {
          e.preventDefault();
          navigate(`/editEmployee/${id}`);
      }
return (
  <div className="min-h-screen bg-slate-900 flex justify-center pt-10">
    <div className="w-full max-w-5xl bg-slate-800/90 rounded-xl shadow-xl p-8">

      {/* Header + Button */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-white tracking-wide">
          👥 Employee Management
        </h2>

        <button
          onClick={() => navigate("/addEmployee")}
          className="bg-blue-500 hover:bg-blue-600 text-white font-semibold px-6 py-2 rounded-lg shadow hover:cursor-pointer"
        >
          ➕ Add Employee
        </button>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full border-collapse rounded-lg overflow-hidden">
          <thead className="bg-slate-600 text-white">
            <tr>
              <th className="px-6 py-3 text-left uppercase tracking-wider">
                Name
              </th>
              <th className="px-6 py-3 text-left uppercase tracking-wider">
                Phone
              </th>
              <th className="px-6 py-3 text-left uppercase tracking-wider">
                Email
              </th>
              <th className="px-6 py-3 text-center uppercase tracking-wider">
                Action
              </th>
            </tr>
          </thead>

          {!loading && (
            <tbody className="bg-slate-700 text-white">
              {Employees.map((Employee) => (
                <tr
                  key={Employee.id}
                  className="border-b border-slate-600 hover:bg-slate-600 transition"
                >
                  <td className="px-6 py-4">{Employee.name}</td>
                  <td className="px-6 py-4">{Employee.phone}</td>
                  <td className="px-6 py-4">{Employee.email}</td>
                  <td className="px-6 py-4 text-center space-x-4">
                    <button
                      onClick={(e) => updateEmployee(e, Employee.id)}
                      className="text-blue-400 hover:text-blue-300 font-medium hover:cursor-pointer"
                    >
                      ✏️ Edit
                    </button>

                    <button
                      onClick={(e) => deleteEmployee(e, Employee.id)}
                      className="text-red-400 hover:text-red-300 font-medium hover:cursor-pointer"
                    >
                      🗑️ Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          )}
        </table>
      </div>
    </div>
  </div>
);

}

export default EmployeeList