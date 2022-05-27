import { Component, OnInit } from '@angular/core';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite/ngx';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { DbService } from 'src/app/servicios/db.service';
import {  MenuController, NavController } from '@ionic/angular';


@Component({
  selector: 'app-perfiladmin',
  templateUrl: './perfiladmin.page.html',
  styleUrls: ['./perfiladmin.page.scss'],
})
export class PerfiladminPage implements OnInit {
  emailN=this.db.perfil.emailNegocio ;
  password=this.db.perfil.password ;
  nombreN = this.db.perfil.nombreNegocio ;
  direccionN =this.db.perfil.direccionNegocio ;
  telefonoN =this.db.perfil.telefonoNegocio ;
  nombreP =this.db.perfil.nombrePatron ;
  apellidosP =this.db.perfil.apellidosPatron ;
  fotoN =this.db.perfil.fotoNegocio ;

  constructor(private sqlite: SQLite,private camera: Camera,private db:DbService,public menuCtrl: MenuController,private navCtrl: NavController) { }

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
  actualizarNegocio(){
    if((this.password!="")&&(this.nombreN!="")&&(this.direccionN!="")&&(this.telefonoN!="")&&(this.nombreP!="")&&(this.apellidosP!="")){
    this.db.actualizarNegocio(this.emailN,this.password,this.nombreN,this.direccionN,this.telefonoN,this.nombreP,this.apellidosP,this.fotoN);
    }else{
      alert("Llene todos los campos");
    }
  }

}
