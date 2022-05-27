import { Component, OnInit } from '@angular/core';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite/ngx';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { DbService } from 'src/app/servicios/db.service';
import { NavController } from '@ionic/angular';


@Component({
  selector: 'app-orden-empleado',
  templateUrl: './orden-empleado.page.html',
  styleUrls: ['./orden-empleado.page.scss'],
})
export class OrdenEmpleadoPage implements OnInit {

  INGREDIENTES: Array <any> ;
  ingredientesSeleccionados:Array<Boolean>;
  iPEDIDO:Array<any>;

  bandera=false;

  //orden
  nombreCliente:String="";
  email=this.db.sesion;
  estado="E";  // ESPERA / PAGADA
  fecha="09-05-2022";

  //pedido
  idOrdenP=this.db.ordenId;
  platilloSeleccionado:any;
  ingredientesPedido:String; //ultimos ingredientes guardados
  precioPlat:any;

  total=this.db.tt;
  

  constructor(private sqlite: SQLite,private camera: Camera,public db:DbService,private navCtrl: NavController ) { }

  ngOnInit() {
    this.db.mostrarPlatillos();
  }
 
  mostrarIngredientes(){
    this.INGREDIENTES = [];
    let ingre:String=this.platilloSeleccionado.ingredientes;
    this.precioPlat=this.platilloSeleccionado.precioPlatillo;
    
    this.INGREDIENTES=ingre.split(',');

    this.ingredientesSeleccionados= new Array(this.INGREDIENTES.length);
     // alert(this.platilloSeleccionado.ingredientes);
  }

  agregarPedido(){
   
    this.iPEDIDO = [];
    for (let index = 0; index < this.ingredientesSeleccionados.length; index++) {
      if(this.ingredientesSeleccionados[index]==true){
        this.iPEDIDO.push(this.INGREDIENTES[index]);
    }  
   }
   this.ingredientesPedido=this.iPEDIDO.join(',');   
    //alert(this.ingredientesPedido);
    
    if(this.bandera==false){
      if(this.nombreCliente!=""){
     this.db.agregarOrdenPedido(this.nombreCliente,this.email,0,this.estado,this.fecha,this.platilloSeleccionado.idPlatillo,this.ingredientesPedido,this.precioPlat);
     this.bandera=true;
 
    } else{
      alert("Llena el nombre del cliente");
    }
    //alert("La id de la orden es "+this.idOrdenP);
   // this.db.agregarPedido(this.db.ordenId,this.platilloSeleccionado.idPlatillo,this.ingredientesPedido,this.precioPlat);    
  }else{
    
    this.db.agregarPedido(this.db.ordenId,this.platilloSeleccionado.idPlatillo,this.ingredientesPedido,this.precioPlat);  
  }    
 

  }
  registrarOrden(){
    //alert("ORDEN NUMERO "+this.db.ordenId);
    this.db.finalizarOrdenEmpleado();
    this.bandera=false;
    //alert(this.db.totalPedido.toString());
   
  }
  eliminarPedido(id){
    this.db.elimnarPedido(id);
    
  }
  cancelarOrden(){
   if(this.bandera==true){
      this.db.elimnarOrden(this.db.ordenId);
      this.db.ordenId=="";
      this.bandera=false;
      this.navCtrl.navigateForward("/roll-empleado");
     
    }else{
      this.bandera=false;
      this.navCtrl.navigateForward("/roll-empleado");
    }
  }

 




}
