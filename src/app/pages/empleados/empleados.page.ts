import { Component, OnInit } from '@angular/core';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite/ngx';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { DbService } from 'src/app/servicios/db.service';

import { ViewChild } from '@angular/core';
import { IonContent } from '@ionic/angular';


@Component({
  selector: 'app-empleados',
  templateUrl: './empleados.page.html',
  styleUrls: ['./empleados.page.scss'],
})
export class EmpleadosPage implements OnInit {
  @ViewChild(IonContent, { static: false }) content: IonContent;
  emailE:String ="";
  passwordE:String ="";
  nombreE:String ="";
  apellidosE:String ="";
  direccionE:String ="";
  telefonoE:String ="";
  emailN:String=this.db.sesion;
  fotoE:String ="";

  

  bandera=false;


  constructor(private sqlite: SQLite,private camera: Camera,private db:DbService) { 
    this.db.mostrarEmpleados();
  }

  ngOnInit() {
  }
  tomarFoto(){
    const options: CameraOptions = { 
      destinationType: this.camera.DestinationType.DATA_URL
    }  
 
     this.camera.getPicture(options).then((imageData)=>{
       this.fotoE='data:image/jpeg;base64,'+imageData;
       //this.foto='data:image/jpeg;base64,'+imageData;
    }, (err) => {
     
    });
  }


  registrarEmpleado(){
    if((this.emailE!="")&&(this.passwordE!="")&&(this.apellidosE!="")&&(this.direccionE!="")&&(this.telefonoE!="")){
    this.db.registrarEmpleado(this.emailE,this.passwordE,this.nombreE,this.apellidosE,this.direccionE,this.telefonoE,
      this.fotoE,this.emailN);

      this.limpiar();
    }else{
      alert("Llena todos los campos");
    } 
  }
  eliminarEmpleado(empleado){
    this.db.elimnarEmpleado(empleado);
  }

  editarEmpleado(empleado){
    this.emailE=empleado.emailEmpleado ;
    this.passwordE=empleado.passwordEmpleado;
    this.nombreE=empleado.nombreEmpleado;
    this.apellidosE=empleado.apellidosEmpleado;
    this.direccionE=empleado.direccionEmpleado;
    this.telefonoE=empleado.telefonoEmpleado;
    this.fotoE=empleado.fotoEmpleado;
    this.bandera=true;
    this.content.scrollToTop(1500);
  }
  actualizarEmpleado(){
    if((this.passwordE!="")&&(this.apellidosE!="")&&(this.direccionE!="")&&(this.telefonoE!="")){
    this.db.actualizarEmpleado(this.emailE,this.passwordE,this.nombreE,this.apellidosE,this.direccionE,this.telefonoE,this.fotoE);
    this.bandera=false;

   this.limpiar();
    }else{
    alert("Llena todos los campos");
  } 
  }
  limpiar(){
    this.emailE ="";
    this.passwordE="";
    this.nombreE ="";
    this.apellidosE ="";
    this.direccionE ="";
    this.telefonoE ="";
    this.fotoE="";
  }
  

}
