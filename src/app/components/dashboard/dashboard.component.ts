import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit{

  public users: any=[];

  public myName:string="Lejla";
  

  
  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }

}
