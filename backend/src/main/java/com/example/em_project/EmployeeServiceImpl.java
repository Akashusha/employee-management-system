package com.example.em_project;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class EmployeeServiceImpl implements EmployeeService{

    @Autowired
    EmployeeRepository employeeRepository;

    @Override
    public String createEmployee(Employee employee) {
        EmpEntity empEntity = new EmpEntity();
        BeanUtils.copyProperties(employee, empEntity);
        
        employeeRepository.save(empEntity);

        return "created succesfully";

    }

     @Override
    public Employee readEmployee(Long id) {
      EmpEntity empEntity = employeeRepository.findById(id).get();
      Employee employee = new Employee();
      BeanUtils.copyProperties(empEntity, employee);

      return employee;
    }

    @Override
    public List<Employee> readEmployees() {
        
        List<EmpEntity> employeesList = employeeRepository.findAll();
        List<Employee> employees= new ArrayList<>();

        for (EmpEntity employee : employeesList) {

            Employee emp = new Employee();
            emp.setId(employee.getId());
            emp.setName(employee.getName());
            emp.setEmail(employee.getEmail());
            emp.setPhone(employee.getPhone());
            

            employees.add(emp);
            
        }

        return employees;
        
    }

    @Override
    public boolean deleteEmployee(Long id) {

      EmpEntity emp = employeeRepository.findById(id).get();
      employeeRepository.delete(emp);

      return true;
    }

    @Override
    public String updateEmployee(Long id, Employee employee) {
      EmpEntity empEntity = employeeRepository.findById(id).get();

      empEntity.setName(employee.getName());
      empEntity.setEmail(employee.getEmail());
      empEntity.setPhone(employee.getPhone());

      employeeRepository.save(empEntity);

      return "Update Succesfull";

    }

   
    

    

}
