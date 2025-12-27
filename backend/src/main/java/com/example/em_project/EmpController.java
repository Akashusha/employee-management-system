package com.example.em_project;

import org.springframework.web.bind.annotation.RestController;


import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.PutMapping;






@RestController
@CrossOrigin(origins = "http://localhost:5173")
public class EmpController {
    
    @Autowired
    EmployeeService employeeService;
        

    @GetMapping("employees")
    public List<Employee> getAllEmployees() {
        
        return employeeService.readEmployees();
    }

    @GetMapping("employees/{id}")
    public Employee getMethodName(@PathVariable Long id) {
        return employeeService.readEmployee(id);
    }
    

    @PostMapping("employees")
    public String createEmployee(@RequestBody Employee employee) {
        
       return employeeService.createEmployee(employee);    
    }
    
    @DeleteMapping("/employees/{id}")
    public String deleteEmployee(@PathVariable Long id){
        if(employeeService.deleteEmployee(id))
            return "Deleted Succesfull";
        return "Not Found";
    }

    @PutMapping("/employees/{id}")
    public String putMethodName(@PathVariable Long id, @RequestBody Employee employee) {
       return employeeService.updateEmployee(id, employee);
        
    }
    
    
}
