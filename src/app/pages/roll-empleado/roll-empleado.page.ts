import { Component, OnInit } from '@angular/core';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite/ngx';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { DbService } from 'src/app/servicios/db.service';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-roll-empleado',
  templateUrl: './roll-empleado.page.html',
  styleUrls: ['./roll-empleado.page.scss'],
})
export class RollEmpleadoPage implements OnInit {

  
  constructor(private sqlite: SQLite,private camera: Camera,public db:DbService,private navCtrl: NavController ) { }

  ngOnInit() {
    this.db.mostrarOrdenes();
  }
  eliminarOrden(idOrden){
    this.db.elimnarOrden(idOrden);
  }
  editarOrden(idOrden){
    this.db.pedidoEditar=idOrden;
    this.db.editarOrden(idOrden.idOrden);
    this.db.totalOrdenE();
//alert(this.db.pedidoEditar.idOrden);
    this.navCtrl.navigateForward("/ordene-empleado");    
  }

  verOrden(idOrden){
    this.db.pedidoEditar=idOrden;
    this.db.editarOrden(idOrden.idOrden);
    this.db.totalOrdenE();
//alert(this.db.pedidoEditar.idOrden);
    this.navCtrl.navigateForward("/verorden-empleado");    
  }
  irPerfil(){
    this.navCtrl.navigateForward("/perfilempleado");
  }

}
