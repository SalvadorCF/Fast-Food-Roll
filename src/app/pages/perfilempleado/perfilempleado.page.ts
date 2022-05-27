import { Component, OnInit } from '@angular/core';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite/ngx';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { DbService } from 'src/app/servicios/db.service';

import { ViewChild } from '@angular/core';
import { IonContent, NavController } from '@ionic/angular';


@Component({
  selector: 'app-perfilempleado',
  templateUrl: './perfilempleado.page.html',
  styleUrls: ['./perfilempleado.page.scss'],
})
export class PerfilempleadoPage implements OnInit {

  @ViewChild(IonContent, { static: false }) content: IonContent;
  emailE =this.db.perfil.emailEmpleado ;
  passwordE =this.db.perfil.passwordEmpleado ;
  nombreE =this.db.perfil.nombreEmpleado ;
  apellidosE =this.db.perfil.apellidosEmpleado ;
  direccionE =this.db.perfil.direccionEmpleado ;
  telefonoE =this.db.perfil.telefonoEmpleado ;
  fotoE =this.db.perfil.fotoEmpleado ;

  




  constructor(private sqlite: SQLite,private camera: Camera,private db:DbService,private navCtrl: NavController) { 
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

  
  actualizarEmpleado(){
    if((this.passwordE!="")&&(this.apellidosE!="")&&(this.direccionE!="")&&(this.telefonoE!="")){
    this.db.actualizarEmpleado(this.emailE,this.passwordE,this.nombreE,this.apellidosE,this.direccionE,this.telefonoE,this.fotoE);
  }else{
    alert("Llena todos los campos");
  } 
   
  }

  irRoll(){
    this.navCtrl.navigateForward("/roll-empleado");
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
