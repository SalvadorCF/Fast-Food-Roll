import { Component, OnInit } from '@angular/core';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite/ngx';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { DbService } from 'src/app/servicios/db.service';
import {  GestureDetail, MenuController, ScrollBaseDetail } from '@ionic/angular';

import { ViewChild } from '@angular/core';
import { IonContent } from '@ionic/angular';


@Component({
  selector: 'app-platillos',
  templateUrl: './platillos.page.html',
  styleUrls: ['./platillos.page.scss'],
})
export class PlatillosPage implements OnInit {
  @ViewChild(IonContent, { static: false }) content: IonContent;

  idP:String ="";
  nombreP:String ="";
  
  precio:number=0;
  fotoP:String ="";
   
  //Manejo de ingredientes
  contador: Array<String> = [""];
  recoleccion: Array<String> = [];
  ingredientes: Array<String> = ["","","","","","","","","","","","","","","","","","","","","","","","","","","","","",""];



  bandera=false;

  constructor(private sqlite: SQLite,private camera: Camera,private db:DbService,public menuCtrl: MenuController) { 
    this.db.mostrarPlatillos();
  }
  ionViewWillEnter() {
    this.menuCtrl.enable(true);
   }

 

  ngOnInit() {
  }
  tomarFoto(){
    const options: CameraOptions = { 
      destinationType: this.camera.DestinationType.DATA_URL
    }  
 
     this.camera.getPicture(options).then((imageData)=>{
       this.fotoP='data:image/jpeg;base64,'+imageData;
       //this.foto='data:image/jpeg;base64,'+imageData;
    }, (err) => {
     
    });
  }

  registrarPlatillo(){
    this.recoleccion=[];
    for (var i = 0; i < this.contador.length; i++) {
      if(this.ingredientes[i]!==""){
        this.recoleccion.push(this.ingredientes[i]);
      }
    }
    if((this.nombreP!="")&&(this.precio>=0)&&(this.recoleccion.length>=1)){
    this.db.registrarPlatillo(this.nombreP,this.recoleccion.toString(),this.precio,this.fotoP);
    this.limpiar();
    }else{
      alert("Llena todos los campos");
    }
  }
  eliminarPlatillo(platillo){
    this.db.elimnarPlatillo(platillo);
  }
  editarPlatillo(platillo){
    
    this.idP=platillo.idPlatillo;
    this.nombreP=platillo.nombrePlatillo ;  
    this.precio=platillo.precioPlatillo;
    this.fotoP=platillo.fotoPlatillo;

    let ingre:String=platillo.ingredientes;
    this.recoleccion=ingre.split(',');
    
    this.contador=[];
    for (var i = 0; i < this.recoleccion.length; i++) {
      this.contador.push("");
      this.ingredientes[i]=this.recoleccion[i];
      
    }
    this.content.scrollToTop(1500);
    this.bandera=true;
    
  }
  actualizarPlatillo(){
    this.recoleccion=[];
    for (var i = 0; i < this.contador.length; i++) {
      if(this.ingredientes[i]!==""){
        this.recoleccion.push(this.ingredientes[i]);
      }
    }
    if((this.nombreP!="")&&(this.precio>=0)&&(this.recoleccion.length>=1)){
    this.db.actualizarPlatillo(this.idP,this.nombreP,this.recoleccion.toString(),this.precio,this.fotoP);
    this.bandera=false;
    this.limpiar();
  }else{
    alert("Llena todos los campos");
  }

   
   
   
  }
limpiar(){
  this.idP="";
  this.nombreP= "";
  this.ingredientes= ["","","","","","","","","","","","","","","","","","","","","","","","","","","","","",""];
  this.contador= [""];
  this.precio=null;
  this.fotoP="";
}

agregar(){   
  if(this.contador.length<30){
    this.contador.push("");
  }
}
eliminar(){   
  let p=this.contador.length-1;
  this.ingredientes[p]="";
  this.contador.pop();
  this.recoleccion=[];
  

}



}
