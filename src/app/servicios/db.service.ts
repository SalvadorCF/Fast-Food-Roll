import { Injectable } from '@angular/core';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite/ngx';
import { NavController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class DbService {
  readonly database_name:string="ffr.db";
  readonly table_negocios:string="negocios";
  readonly table_empleados:string="empleados";
  readonly table_platillos:string="platillos";
  readonly table_ordenes:string="ordenes";
  readonly table_pedidos:string="pedidos";
  databaseObj:SQLiteObject;

  //Cosas de clase
  sesion:any;
  perfil:any;
 
  
  
  tt:Number; //Total Orden
  to:Number; 
  ordenId:any;

  //Editar pedidos
  pedidoEditar:any;
  PEDIDOSE: Array <any> ;
  PEDIDOSVE: Array <any> ;
  
  

  NEGOCIOS: Array <any> ;
  EMPLEADOS: Array <any> ;
  PLATILLOS: Array <any> ;
  PEDIDOS: Array <any> ;
  ORDENES: Array <any> ;

  constructor( private sqlite: SQLite,private navCtrl: NavController   ) { 
    this.conexion();
  }
  conexion(){
    this.sqlite.create({
      name: this.database_name,
      location:'default'
    }).then((db: SQLiteObject)=>{
      this.databaseObj=db;
      //alert('Base de datos escuela creada');
      this.databaseObj.executeSql('PRAGMA foreign_keys = ON ',[])
      .then(()=>{
      this.databaseObj.executeSql('CREATE TABLE IF NOT EXISTS '+this.table_negocios+
    '(emailNegocio varchar(60) PRIMARY KEY, password varchar(20), nombreNegocio varchar(50), direccionNegocio varchar(80),telefonoNegocio varchar(10),nombrePatron varchar(60), apellidosPatron varchar(80), fotoNegocio varchar(255))',[])
    .then(()=>{
      //alert('Conexion generada nego');
      this.databaseObj.executeSql('CREATE TABLE IF NOT EXISTS '+this.table_empleados+
      '(emailEmpleado varchar(60) PRIMARY KEY, passwordEmpleado varchar(20),nombreEmpleado varchar(60),apellidosEmpleado varchar(80),direccionEmpleado varchar(80),telefonoEmpleado varchar(10),fotoEmpleado varchar(255),emailNegocio varchar(60),FOREIGN KEY(emailNegocio) REFERENCES negocios(emailNegocio))',[])
      .then(()=>{
        //alert('Conexion generada empl');
        this.databaseObj.executeSql('CREATE TABLE IF NOT EXISTS '+this.table_platillos+
        '(idPlatillo INTEGER  PRIMARY KEY, nombrePlatillo varchar(60),ingredientes varchar(255),precioPlatillo REAL,fotoPlatillo varchar(255))',[])
        .then(()=>{
         // alert('Conexion generada PLAT');
         
        this.databaseObj.executeSql('CREATE TABLE IF NOT EXISTS '+this.table_ordenes+
        '(idOrden INTEGER  PRIMARY KEY, nombreCliente varchar(60),email varchar(60),totalOrden REAL,estado varchar(3),fecha TEXT)',[])        .then(()=>{
         // alert('Conexion generada ordenes');
          this.databaseObj.executeSql('CREATE TABLE IF NOT EXISTS '+this.table_pedidos+
          '(idPedido INTEGER  PRIMARY KEY, idOrden INTEGER,idPlatillo INTEGER,ingredientesPedido varchar(255),precioPlatillo REAL, FOREIGN KEY(idOrden) REFERENCES ordenes(idOrden),	FOREIGN KEY(idPlatillo) REFERENCES platillos(idPlatillo))',[])
          .then(()=>{
           // alert('Conexion generada pedidos');
            
          })
          .catch(e=>{
            alert('Error '+JSON.stringify(e))
          });
          
        })
        .catch(e=>{
          alert('Error '+JSON.stringify(e))
        });
          
        })
        .catch(e=>{
          alert('Error '+JSON.stringify(e))
        });
        
      })
      .catch(e=>{
        alert('Error '+JSON.stringify(e))
      });
    })
    .catch(e=>{
      alert('Error '+JSON.stringify(e))
    });
      
    })
    .catch(e=>{
      alert('Error '+JSON.stringify(e))
    });

    }).catch(e=>{
      alert('Error '+JSON.stringify(e))
    });
  }

  //registrar SOLO UN NEGOCIO
comprobacionNegocio(emailNegocio,password,nombreNegocio,direccionNegocio,telefonoNegocio,nombrePatron,apellidosPatron,fotoNegocio){
  return this.databaseObj.executeSql(`SELECT * FROM ${this.table_negocios}`, []).then((res) => {
    if (res.rows.length > 0) {
      alert("Ya existe un negocio");
    }else{
      this.databaseObj.executeSql('INSERT INTO '+this.table_negocios+' (emailNegocio,password,nombreNegocio,direccionNegocio,telefonoNegocio,nombrePatron,apellidosPatron,fotoNegocio) VALUES ('+
    '"'+emailNegocio+'",'+'"'+password+'",'+'"'+nombreNegocio+'",'+'"'+direccionNegocio+'",'+'"'+telefonoNegocio+'",'+'"'+nombrePatron+'",'+'"'+apellidosPatron+'",'+'"'+fotoNegocio+'")',[])
    .then(()=>{
      alert("Negocio Registrado");
      this.mostrarNegocios();
    })
    .catch(e=>{
      alert('Error '+JSON.stringify(e));
    });
    }
  },(e) => {
    alert(JSON.stringify(e));
  });

}
  //login falta completar modulo empleado
  login(email,password) {
    return this.databaseObj.executeSql(`SELECT * FROM ${this.table_negocios}`+' WHERE emailNegocio="'+email+'" AND password="'+password+'"', []).then((res) => {
      if (res.rows.length > 0) {
        this.perfil=res.rows.item(0);
        this.sesion=email;
       
        this.navCtrl.navigateForward("/platillos");
      }else{
        return this.databaseObj.executeSql(`SELECT *  FROM ${this.table_empleados}`+' WHERE emailEmpleado ="'+email+'" AND passwordEmpleado ="'+password+'"', []).then((res) => {
          if (res.rows.length > 0) {
          
           this.sesion=email;
           this.perfil=res.rows.item(0);
           this.navCtrl.navigateForward("/roll-empleado");
           
          }else{
            alert("Verifique bien sus datos");

          }
        },(e) => {
          alert(JSON.stringify(e));
        });
      }
    },(e) => {
      alert(JSON.stringify(e));
    });

  }
  
  //NEGOCIO
  registrarNegocio(emailNegocio,password,nombreNegocio,direccionNegocio,telefonoNegocio,nombrePatron,apellidosPatron,fotoNegocio){
    this.databaseObj.executeSql('INSERT INTO '+this.table_negocios+' (emailNegocio,password,nombreNegocio,direccionNegocio,telefonoNegocio,nombrePatron,apellidosPatron,fotoNegocio) VALUES ('+
    '"'+emailNegocio+'",'+'"'+password+'",'+'"'+nombreNegocio+'",'+'"'+direccionNegocio+'",'+'"'+telefonoNegocio+'",'+'"'+nombrePatron+'",'+'"'+apellidosPatron+'",'+'"'+fotoNegocio+'")',[])
    .then(()=>{
      alert("Negocio Registrado");
      this.mostrarNegocios();
    })
    .catch(e=>{
      alert('Error '+JSON.stringify(e));
    });
  }
  actualizarNegocio(emailNegocio,password,nombreNegocio,direccionNegocio,telefonoNegocio,nombrePatron,apellidosPatron,fotoNegocio){
    this.databaseObj.executeSql("UPDATE "+this.table_negocios+" SET password='"+password+"',nombreNegocio='"+nombreNegocio+"',direccionNegocio ='"+direccionNegocio+"',telefonoNegocio ='"+telefonoNegocio+"',nombrePatron ='"+nombrePatron+"',apellidosPatron ='"+apellidosPatron+"',fotoNegocio  ='"+fotoNegocio+"' WHERE emailNegocio ='"+emailNegocio+"'",[])
    .then(()=>{
      return this.databaseObj.executeSql(`SELECT *  FROM ${this.table_negocios}`+' WHERE emailNegocio  ="'+emailNegocio+'"', []).then((res) => {
             
         this.perfil=res.rows.item(0);
         alert("Perfil actualizado");
         return this.perfil;
          
      },(e) => {
        alert(JSON.stringify(e));
      });     
    })
    .catch(e=>{
      alert('Error '+JSON.stringify(e));
    });  
  }
  mostrarNegocios() {
    return this.databaseObj.executeSql(`SELECT emailNegocio,nombreNegocio,nombrePatron FROM ${this.table_negocios}`, []).then((res) => {
      this.NEGOCIOS = [];
      if (res.rows.length > 0) {
        for (var i = 0; i < res.rows.length; i++) {
          this.NEGOCIOS.push(res.rows.item(i));
        }
        return this.NEGOCIOS;
      }
    },(e) => {
      alert(JSON.stringify(e));
    });
  }

  //EMPLEADOS
  registrarEmpleado(emailEmpleado,passwordEmpleado,nombreEmpleado,apellidosEmpleado,direccionEmpleado,telefonoEmpleado,fotoEmpleado,emailNegocio){
    this.databaseObj.executeSql('INSERT INTO '+this.table_empleados+' (emailEmpleado,passwordEmpleado,nombreEmpleado,apellidosEmpleado,direccionEmpleado,telefonoEmpleado,fotoEmpleado,emailNegocio) VALUES ('+
    '"'+emailEmpleado+'",'+'"'+passwordEmpleado+'",'+'"'+nombreEmpleado+'",'+'"'+apellidosEmpleado+'",'+'"'+direccionEmpleado+'",'+'"'+telefonoEmpleado+'",'+'"'+fotoEmpleado+'",'+'"'+emailNegocio+'")',[])
    .then(()=>{
      alert("Empleado agregado");
      this.mostrarEmpleados();
    })
    .catch(e=>{
      alert('Error '+JSON.stringify(e));
    });
  }
  mostrarEmpleados() {
    return this.databaseObj.executeSql(`SELECT * FROM ${this.table_empleados}`, []).then((res) => {
      this.EMPLEADOS = [];
      if (res.rows.length > 0) {
        for (var i = 0; i < res.rows.length; i++) {
          this.EMPLEADOS.push(res.rows.item(i));
        }
        return this.EMPLEADOS;
      }
    },(e) => {
      alert(JSON.stringify(e));
    });
  }
  elimnarEmpleado(item){
    this.databaseObj.executeSql("DELETE FROM  "+this.table_empleados+" WHERE emailEmpleado='"+item.emailEmpleado+"'",[])
    .then(()=>{
      alert('Empleado eliminado');
      this.mostrarEmpleados();
    })
    .catch(e=>{
      alert('Error '+JSON.stringify(e));
    });
  }
  actualizarEmpleado(email,passwordEmpleado,nombreEmpleado,apellidosEmpleado,direccionEmpleado,telefonoEmpleado,fotoEmpleado){
    this.databaseObj.executeSql("UPDATE "+this.table_empleados+" SET passwordEmpleado='"+passwordEmpleado+"',nombreEmpleado='"+nombreEmpleado+"',fotoEmpleado='"+fotoEmpleado+"',apellidosEmpleado='"+apellidosEmpleado+"',direccionEmpleado='"+direccionEmpleado+"',telefonoEmpleado='"+telefonoEmpleado+"' WHERE emailEmpleado='"+email+"'",[])
    .then(()=>{
      this.mostrarEmpleados();
      alert('Información actualizada');      
    })
    .catch(e=>{
      alert('Error '+JSON.stringify(e));
    });   
  }

  //Platillos
  registrarPlatillo(nombrePlatillo,ingredientes,precioPlatillo,fotoPlatillo){
    this.databaseObj.executeSql('INSERT INTO '+this.table_platillos+' (nombrePlatillo,ingredientes,precioPlatillo,fotoPlatillo) VALUES ('+
    '"'+nombrePlatillo+'",'+'"'+ingredientes+'",'+precioPlatillo+','+'"'+fotoPlatillo+'")',[])
    .then(()=>{
      alert("platillo agregado");
      this.mostrarPlatillos();
    })
    .catch(e=>{
      alert('Error '+JSON.stringify(e));
    });
  }
  mostrarPlatillos() {
    return this.databaseObj.executeSql('SELECT * FROM '+this.table_platillos, []).then((res) => {
      this.PLATILLOS = [];
      if (res.rows.length > 0) {
        for (var i = 0; i < res.rows.length; i++) {
          this.PLATILLOS.push(res.rows.item(i));
        }
        return this.PLATILLOS;
      }
    },(e) => {
      alert(JSON.stringify(e));
    });
  }
  elimnarPlatillo(item){
    this.databaseObj.executeSql("DELETE FROM  "+this.table_platillos+" WHERE idPlatillo ="+item.idPlatillo,[])
    .then(()=>{
      alert('Platillo eliminado');
      this.mostrarPlatillos();
    })
    .catch(e=>{
      alert('Error '+JSON.stringify(e));
    });
  }
  actualizarPlatillo(idPlatillo,nomrePlatillo,ingredientes,precioPlatillo,fotoPlatillo){
    this.databaseObj.executeSql("UPDATE "+this.table_platillos+" SET nombrePlatillo='"+nomrePlatillo+"',ingredientes='"+ingredientes+"',precioPlatillo="+precioPlatillo+" ,fotoPlatillo='"+fotoPlatillo+"' WHERE idPlatillo="+idPlatillo,[])
    .then(()=>{
      this.mostrarPlatillos();
      alert('Platillo actualizado');      
    })
    .catch(e=>{
      alert('Error '+JSON.stringify(e));
    });   
  }

   //Agregar pedidos
  agregarOrdenPedido(nombreCliente,email,totalOrden,estado,fecha,idPlatillo,ingredientes,precio) {
    this.databaseObj.executeSql('INSERT INTO '+this.table_ordenes+' (nombreCliente,email,totalOrden,estado,fecha) VALUES ('+
    '"'+nombreCliente+'",'+'"'+email+'",'+0+','+'"'+estado+'", date("now","localtime"))',[])
    .then((res)=>{
      //alert("platillo agregado");
      this.ordenId=res.insertId;
      this.databaseObj.executeSql('INSERT INTO '+this.table_pedidos+' (idOrden,idPlatillo,ingredientesPedido,precioPlatillo ) VALUES ('+
      res.insertId+','+idPlatillo+',"'+ingredientes+'",'+precio+')',[])
    .then(()=>{
      alert("pedido agregado");
      this.mostrarPedidos();
     this.totalOrden();
    })
    .catch(e=>{
      alert('Error en agregar pedido '+JSON.stringify(e));
    });
     //alert(this.ordenId);
    })
    .catch(e=>{
      alert('Error en orden'+JSON.stringify(e));
    });
  }
  agregarPedido(idOrden,idPlatillo,ingredientes,precio) {
    this.databaseObj.executeSql('INSERT INTO '+this.table_pedidos+' (idOrden,idPlatillo,ingredientesPedido,precioPlatillo ) VALUES ('+
    idOrden+','+idPlatillo+',"'+ingredientes+'",'+precio+')',[])
    .then(()=>{
      alert("Pedido agregado");
     this.totalOrden();
      this.mostrarPedidos();
    })
    .catch(e=>{
      alert('Error en agregar pedido '+JSON.stringify(e));
    });
  }
  mostrarPedidos() {
    return this.databaseObj.executeSql('SELECT platillos.fotoPlatillo as fotop,platillos.nombrePlatillo as nombrep,ingredientesPedido,pedidos.precioPlatillo as precioPlatillo, pedidos.idPedido as idPedido  FROM '+this.table_pedidos+' INNER JOIN platillos ON platillos.idPlatillo=pedidos.idPlatillo WHERE pedidos.idOrden='+this.ordenId, []).then((res) => {
      this.PEDIDOS = [];
      if (res.rows.length > 0) {
        for (var i = 0; i < res.rows.length; i++) {
          this.PEDIDOS.push(res.rows.item(i));
        }
        
        return this.PEDIDOS;
      }
    },(e) => {
      alert(JSON.stringify(e));
    });
  }
  mostrarVentas(fechaI,fechaF) {
    return this.databaseObj.executeSql('SELECT * FROM '+this.table_ordenes+' WHERE fecha BETWEEN "'+fechaI+'"  AND "'+fechaF+'"  ORDER BY fecha', []).then((res) => {
      this.PEDIDOSVE = [];
      if (res.rows.length > 0) {
        for (var i = 0; i < res.rows.length; i++) {
          this.PEDIDOSVE.push(res.rows.item(i));
        }
        alert('Consulta exitosa');
        return this.PEDIDOSVE;
      }
    },(e) => {
      alert(JSON.stringify(e));
    });
  }
  mostrarTotalVentas(fechaI,fechaF) {
    return this.databaseObj.executeSql('SELECT SUM(totalOrden) AS total FROM '+this.table_ordenes+' WHERE fecha BETWEEN "'+fechaI+'"  AND "'+fechaF+'"', []).then((res) => {
      this.to=res.rows.item(0).total;    
    },(e) => {
      alert(JSON.stringify(e));
    });
  }
  elimnarPedido(id){
    this.databaseObj.executeSql("DELETE FROM  "+this.table_pedidos+" WHERE idPedido="+id,[])
    .then(()=>{
      alert('Pedido eliminado');
      this.mostrarPedidos();
      this.totalOrden();
    })
    .catch(e=>{
      alert('Error '+JSON.stringify(e));
    });
  }
  finalizarOrden() {
    return this.databaseObj.executeSql('SELECT SUM(precioPlatillo) AS tp FROM '+this.table_pedidos+' WHERE idOrden='+this.ordenId, []).then((res) => {        
            this.tt=res.rows.item(0).tp;   
            this.databaseObj.executeSql("UPDATE "+this.table_ordenes+" SET totalOrden="+this.tt+" WHERE idOrden="+this.ordenId,[])
            .then(()=>{
              alert('Información actualizada'); 
              this.ordenId="";
              this.mostrarOrdenes();
              this.PEDIDOS = [];
              this.tt=0;
              this.navCtrl.navigateForward("/roll");         
            })
            .catch(e=>{
              alert('Error '+JSON.stringify(e));
            });                         
    },(e) => {
      alert(JSON.stringify(e));
    });
  }
  finalizarOrdenEmpleado() {
    return this.databaseObj.executeSql('SELECT SUM(precioPlatillo) AS tp FROM '+this.table_pedidos+' WHERE idOrden='+this.ordenId, []).then((res) => {        
            this.tt=res.rows.item(0).tp;   
            this.databaseObj.executeSql("UPDATE "+this.table_ordenes+" SET totalOrden="+this.tt+" WHERE idOrden="+this.ordenId,[])
            .then(()=>{
              alert('Información actualizada'); 
              this.ordenId="";
              this.mostrarOrdenes();
              this.PEDIDOS = [];
              this.tt=0;
              this.navCtrl.navigateForward("/roll-empleado");         
            })
            .catch(e=>{
              alert('Error '+JSON.stringify(e));
            });                         
    },(e) => {
      alert(JSON.stringify(e));
    });
  }

//Pedidos editar**----
  agregarPedidoE(idOrden,idPlatillo,ingredientes,precio) {
    this.databaseObj.executeSql('INSERT INTO '+this.table_pedidos+' (idOrden,idPlatillo,ingredientesPedido,precioPlatillo ) VALUES ('+
    idOrden+','+idPlatillo+',"'+ingredientes+'",'+precio+')',[])
    .then(()=>{
      alert("pedido agregado");
      this.mostrarPedidosE();
      this.totalOrdenE();
    })
    .catch(e=>{
      alert('Error en agregar pedido '+JSON.stringify(e));
    });
  }
  mostrarPedidosE() {
    return this.databaseObj.executeSql('SELECT platillos.fotoPlatillo as fotop,platillos.nombrePlatillo as nombrep,ingredientesPedido,pedidos.precioPlatillo as precioPlatillo, pedidos.idPedido as idPedido  FROM '+this.table_pedidos+' INNER JOIN platillos ON platillos.idPlatillo=pedidos.idPlatillo WHERE pedidos.idOrden='+this.pedidoEditar.idOrden, []).then((res) => {
      this.PEDIDOS = [];
      if (res.rows.length > 0) {
        for (var i = 0; i < res.rows.length; i++) {
          this.PEDIDOS.push(res.rows.item(i));
        }
        
        return this.PEDIDOS;
      }
    },(e) => {
      alert(JSON.stringify(e));
    });
  }
  finalizarOrdenE(cliente) {
    return this.databaseObj.executeSql('SELECT SUM(precioPlatillo) AS tp FROM '+this.table_pedidos+' WHERE idOrden='+this.pedidoEditar.idOrden, []).then((res) => {        
            this.tt=res.rows.item(0).tp;   
            this.databaseObj.executeSql("UPDATE "+this.table_ordenes+" SET totalOrden="+this.tt+",nombreCliente='"+cliente+"' WHERE idOrden="+this.pedidoEditar.idOrden,[])
            .then(()=>{
              alert('Información actualizada'); 
              this.ordenId="";
              this.pedidoEditar=[];
              this.mostrarOrdenes();
              this.PEDIDOSE = [];
              this.PEDIDOS = [];
              this.tt=0;
              
              this.navCtrl.navigateForward("/roll");         
            })
            .catch(e=>{
              alert('Error '+JSON.stringify(e));
            });                         
    },(e) => {
      alert(JSON.stringify(e));
    });
  }
  finalizarOrdenEEmpleado(cliente) {
    return this.databaseObj.executeSql('SELECT SUM(precioPlatillo) AS tp FROM '+this.table_pedidos+' WHERE idOrden='+this.pedidoEditar.idOrden, []).then((res) => {        
            this.tt=res.rows.item(0).tp;   
            this.databaseObj.executeSql("UPDATE "+this.table_ordenes+" SET totalOrden="+this.tt+",nombreCliente='"+cliente+"' WHERE idOrden="+this.pedidoEditar.idOrden,[])
            .then(()=>{
              alert('Información actualizada'); 
              this.ordenId="";
              this.pedidoEditar=[];
              this.mostrarOrdenes();
              this.PEDIDOSE = [];
              this.PEDIDOS = [];
              this.tt=0;
              
              this.navCtrl.navigateForward("/roll-empleado");         
            })
            .catch(e=>{
              alert('Error '+JSON.stringify(e));
            });                         
    },(e) => {
      alert(JSON.stringify(e));
    });
  }
  pagarOrdenE() {
     
            this.databaseObj.executeSql("UPDATE "+this.table_ordenes+" SET estado='P' WHERE idOrden="+this.pedidoEditar.idOrden,[])
            .then(()=>{
              alert('Orden pagada'); 
              this.ordenId="";
              this.pedidoEditar=[];
              this.mostrarOrdenes();
              this.PEDIDOSE = [];
              this.PEDIDOS = [];
              this.tt=0;
              
              this.navCtrl.navigateForward("/roll");         
            })
            .catch(e=>{
              alert('Error '+JSON.stringify(e));
            });                         
   
  }
  pagarOrdenEEmpleado() {
     
    this.databaseObj.executeSql("UPDATE "+this.table_ordenes+" SET estado='P' WHERE idOrden="+this.pedidoEditar.idOrden,[])
    .then(()=>{
      alert('Orden pagada'); 
      this.ordenId="";
      this.pedidoEditar=[];
      this.mostrarOrdenes();
      this.PEDIDOSE = [];
      this.PEDIDOS = [];
      this.tt=0;
      
      this.navCtrl.navigateForward("/roll-empleado");         
    })
    .catch(e=>{
      alert('Error '+JSON.stringify(e));
    });                         

}
  elimnarPedidoE(id){
    this.databaseObj.executeSql("DELETE FROM  "+this.table_pedidos+" WHERE idPedido="+id,[])
    .then(()=>{
      alert('Pedido eliminado');
      this.mostrarPedidosE();
      this.totalOrdenE();
    })
    .catch(e=>{
      alert('Error '+JSON.stringify(e));
    });
  }
 

  //Mostrar Ordenes
  mostrarOrdenes() {
    return this.databaseObj.executeSql(`SELECT * FROM ${this.table_ordenes} WHERE estado='E'`, []).then((res) => {
      this.ORDENES = [];
      if (res.rows.length > 0) {
        for (var i = 0; i < res.rows.length; i++) {
          this.ORDENES.push(res.rows.item(i));
        }
        return this.ORDENES;
      }
    },(e) => {
      alert(JSON.stringify(e));
    });
  }
  //Finalizar orden
  
   //Eliminar orden
   elimnarOrden(idOrden){
    this.databaseObj.executeSql("DELETE FROM  "+this.table_pedidos+" WHERE idOrden="+idOrden,[])
    .then(()=>{
      this.databaseObj.executeSql("DELETE FROM  "+this.table_ordenes+" WHERE idOrden="+idOrden,[])
      .then(()=>{
        
        this.mostrarOrdenes();
        alert('Orden eliminada');
        this.tt=0;
        
      })
      .catch(e=>{
        alert('Error '+JSON.stringify(e));
      });
      
    })
    .catch(e=>{
      alert('Error '+JSON.stringify(e));
    });
  }
  //Editar orden
  editarOrden(idOrden) {
    return this.databaseObj.executeSql('SELECT * FROM '+this.table_pedidos+' WHERE idOrden='+idOrden, []).then((res) => {
      this.PEDIDOSE = [];
      if (res.rows.length > 0) {
        for (var i = 0; i < res.rows.length; i++) {
          this.PEDIDOSE.push(res.rows.item(i));
        }
        
        return this.PEDIDOSE;
      }
    },(e) => {
      alert(JSON.stringify(e));
    });
  }

  totalOrden(){
    return this.databaseObj.executeSql('SELECT SUM(precioPlatillo) AS tp FROM '+this.table_pedidos+' WHERE idOrden='+this.ordenId, []).then((res) => {        
      this.tt=res.rows.item(0).tp;                                
},(e) => {
alert(JSON.stringify(e));
});
  }
  totalOrdenE(){
    return this.databaseObj.executeSql('SELECT SUM(precioPlatillo) AS tp FROM '+this.table_pedidos+' WHERE idOrden='+this.pedidoEditar.idOrden, []).then((res) => {        
      this.tt=res.rows.item(0).tp;                                
},(e) => {
alert(JSON.stringify(e));
});
  }

  

}
