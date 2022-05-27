import { Component, OnInit } from '@angular/core';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite/ngx';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { DbService } from 'src/app/servicios/db.service';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-verorden',
  templateUrl: './verorden.page.html',
  styleUrls: ['./verorden.page.scss'],
})
export class VerordenPage implements OnInit {

  INGREDIENTES: Array <any> ;
  ingredientesSeleccionados:Array<Boolean>;
  iPEDIDO:Array<any>;

  //orden
  nombreCliente:String=this.db.pedidoEditar.nombreCliente;
  email=this.db.sesion;
  total=100;
  estado="E";  // ESPERA / PAGADA
  fecha="09-05-2022";

  //pedido
  idOrdenP=this.db.ordenId;
  platilloSeleccionado:any;
  ingredientesPedido:String; //ultimos ingredientes guardados
  precioPlat:any;

  constructor(private sqlite: SQLite,private camera: Camera,public db:DbService,private navCtrl: NavController) { }

  ngOnInit() {
    this.db.mostrarPlatillos();
    this.db.mostrarPedidosE();
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
  
    this.db.agregarPedidoE(this.db.pedidoEditar.idOrden,this.platilloSeleccionado.idPlatillo,this.ingredientesPedido,this.precioPlat);  
  
  }
  registrarOrden(){
    //alert("ORDEN NUMERO "+this.db.ordenId);
    this.db.pagarOrdenE(); 
    
    //alert(this.db.totalPedido.toString());  
  }
  salirOrden(){
    this.db.PEDIDOS=[];
    this.db.PEDIDOSE=[];
    this.db.tt=0;
    this.navCtrl.navigateForward("/roll");     
  }


  eliminarPedido(id){
    this.db.elimnarPedidoE(id);
    
  }

}
