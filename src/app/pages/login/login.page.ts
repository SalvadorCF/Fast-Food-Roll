import { Component, OnInit } from '@angular/core';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite/ngx';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { DbService } from 'src/app/servicios/db.service';
import {  MenuController } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  email:String="";
  pass:String="";
  
 
 

  constructor(private sqlite: SQLite,private camera: Camera,private db:DbService,public menuCtrl: MenuController) {
    
   }
   ionViewWillEnter() {
    this.menuCtrl.enable(false);
   }

  ngOnInit() {
    
    
  }
  login(){
    if((this.email!="")&&(this.pass!="")){
    this.db.login(this.email,this.pass);
    }else{
      alert("Llena todos los datos");
    }
  }
  
 

}
