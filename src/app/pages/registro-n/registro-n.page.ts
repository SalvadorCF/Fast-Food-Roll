import { Component, OnInit } from '@angular/core';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite/ngx';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { DbService } from 'src/app/servicios/db.service';
import {  MenuController, NavController } from '@ionic/angular';

@Component({
  selector: 'app-registro-n',
  templateUrl: './registro-n.page.html',
  styleUrls: ['./registro-n.page.scss'],
})
export class RegistroNPage implements OnInit {
  
  emailN:String ="";
  password:String ="";
  nombreN:String ="";
  direccionN:String ="";
  telefonoN:String ="";
  nombreP:String ="";
  apellidosP:String ="";
  fotoN:String ="";

  
  
 

  constructor(private sqlite: SQLite,private camera: Camera,private db:DbService,private navCtrl: NavController) { 
    this.db.mostrarNegocios();
  }

  ngOnInit() {
    
  }
  tomarFoto(){
    const options: CameraOptions = { 
      destinationType: this.camera.DestinationType.DATA_URL
    }  
 
     this.camera.getPicture(options).then((imageData)=>{
       this.fotoN='data:image/jpeg;base64,'+imageData;
       //this.foto='data:image/jpeg;base64,'+imageData;
    }, (err) => {
     
    });
  }

  registrarNegocio(){
    if((this.emailN!="")&&(this.password!="")&&(this.nombreN!="")&&(this.direccionN!="")&&(this.telefonoN!="")&&(this.nombreP!="")&&(this.apellidosP!="")){

    this.db.comprobacionNegocio(this.emailN,this.password,this.nombreN,this.direccionN,this.telefonoN,this.nombreP,this.apellidosP,this.fotoN);
    this.limpiar();
    this.navCtrl.navigateForward("/login");  

  }else{
    alert("Llene todos los campos");
  }
  }

  limpiar(){
    this.emailN ="";
    this.password ="";
    this.nombreN ="";
    this. direccionN ="";
    this.telefonoN ="";
    this.nombreP ="";
    this.apellidosP ="";
    this.fotoN ="";

  }
  

}
