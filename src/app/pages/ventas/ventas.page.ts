import { Component, OnInit } from '@angular/core';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite/ngx';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { DbService } from 'src/app/servicios/db.service';
import { NavController } from '@ionic/angular';

import JSPDF from 'jspdf';
import domtoimage from 'dom-to-image';
import { FileOpener } from '@ionic-native/file-opener/ngx';
import { File, IWriteOptions } from '@ionic-native/file/ngx';


@Component({
  selector: 'app-ventas',
  templateUrl: './ventas.page.html',
  styleUrls: ['./ventas.page.scss'],
})
export class VentasPage implements OnInit {
  fechaI:String;
  fechaF:String;
  diaI="";
  mesI="";
  yearI="";
  diaF="";
  mesF="";
  yearF="";

  constructor( private sqlite: SQLite,private camera: Camera,public db:DbService,private navCtrl: NavController, private file: File,
    private fileOpener: FileOpener) { }

  ngOnInit() {
  }

  generarReporte(){
    if((this.diaI!="")&&(this.diaF!="")&&(this.mesI!="")&&(this.mesF!="")&&(this.yearI!="")&&(this.yearF!="")){
    this.fechaI=this.yearI+"-"+this.mesI+"-"+this.diaI;
    this.fechaF=this.yearF+"-"+this.mesF+"-"+this.diaF;

   // this.db.elimnarOrden(12);

    this.db.mostrarVentas(this.fechaI,this.fechaF);
    this.db.mostrarTotalVentas(this.fechaI,this.fechaF);
    }else{
      alert("LLena todos los campos");
    }

  }
  createPdf() {
    const pdfBlock = document.getElementById("print-wrapper");
    
    const options = { 
      background: "white", 
      height: pdfBlock. clientHeight, 
      width: pdfBlock.clientWidth 
    };
    domtoimage.toPng(pdfBlock, options).then((fileUrl) => {
      var doc = new JSPDF("p","mm","a4");

      var width = doc.internal.pageSize.getWidth();
      var height = doc.internal.pageSize.getHeight();

      doc.addImage(fileUrl, 'PNG',15, 15, 170, 170);
  
      let docRes = doc.output();
      let buffer = new ArrayBuffer(docRes.length);
      let array = new Uint8Array(buffer);
      for (var i = 0; i < docRes.length; i++) {
          array[i] = docRes.charCodeAt(i);
      }
  
  
      const directory = this.file.dataDirectory;
      const fileName = "Ventas_"+this.fechaI+"_"+this.fechaF+".pdf";
      let options: IWriteOptions = { 
        replace: true 
      };
  
      this.file.checkFile(directory, fileName).then((res)=> {
        this.file.writeFile(directory, fileName,buffer, options)
        .then((res)=> {
          console.log("File generated" + JSON.stringify(res));
          this.fileOpener.open(this.file.dataDirectory + fileName, 'application/pdf')
            .then(() => console.log('File is exported'))
            .catch(e => console.log(e));
        }).catch((error)=> {
          console.log(JSON.stringify(error));
        });
      }).catch((error)=> {
        this.file.writeFile(directory,fileName,buffer).then((res)=> {
          console.log("File generated" + JSON.stringify(res));
          this.fileOpener.open(this.file.dataDirectory + fileName, 'application/pdf')
            .then(() => console.log('File exported'))
            .catch(e => console.log(e));
        })
        .catch((error)=> {
          console.log(JSON.stringify(error));
        });
      });
    }).catch(function (error) {
      console.error(error);
    });
  }

}
