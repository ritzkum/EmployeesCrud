import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';

@Component({
  selector: 'app-employeedashboard',
  templateUrl: './employeedashboard.component.html',
  styleUrls: ['./employeedashboard.component.scss']
})
export class EmployeedashboardComponent {

  EmployeeArray : any[] = [];
  isResultLoaded = false;
  isUpdateFormActive = false;
  firstname: string ="";
  lastname: string ="";
  designation: string ="";
  department:string="";
  currentEmpID = "";
  bodyData: any;
  constructor(private http: HttpClient ) 
  {
    this.getAllEmployee();
  }
  ngOnInit(): void {

  }
  getAllEmployee()
  { 
    this.http.get("http://localhost:8085/api/employees/")
    .subscribe((res: any)=>
    {
        this.isResultLoaded = true;
        console.log(res.data);
        this.EmployeeArray = res.data;
    });
  }
  
  register()
  {
   
    let bodyData = {
      "firstname" : this.firstname,
      "lastname" : this.lastname,
      "designation" : this.designation,
      "department" : this.department,
    };
    this.http.post("http://localhost:8085/api/employees/add",bodyData).subscribe((res: any)=>
    {
        console.log(res);
        alert("Employee Registered Successfully")
        this.getAllEmployee();
        this.resetForm();
        
    });
  }
  setUpdate(data: any) 
  {
   this.firstname = data.firstname;
   this.lastname = data.lastname;
   this.designation = data.designation;
   this.department = data.department;
  
   this.currentEmpID = data.id;
   this.getAllEmployee();
  }
  UpdateRecords()
  {
    let bodyData = 
    {
      "firstname" : this.firstname,
      "lastname" : this.lastname,
      "designation" : this.designation,
      "department" : this.department,
    };
    
    this.http.put("http://localhost:8085/api/employees/update"+ "/"+ this.currentEmpID,bodyData).subscribe((res: any)=>
    {
        console.log(res);
        alert("Employee Registered Updated...")
        this.getAllEmployee();
        this.resetForm();
    });
  
  }
 
  save()
  {
    if(this.currentEmpID == '')
    {
        this.register();
    }
      else
      {
       this.UpdateRecords();
       
      }   

  }
  
  setDelete(data: any)
  {
    this.http.delete("http://localhost:8085/api/employees/delete"+ "/"+ data.id).subscribe((res: any)=>
    {
        console.log(res);
        alert("Employee Deleted successfully...")
        this.getAllEmployee();
    });
  }

  resetForm() {
    // Reset the form fields to empty values
    this.firstname = "";
    this.lastname = "";
    this.designation = "";
    this.department = "";
    this.currentEmpID = "";
  }

}
