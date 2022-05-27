import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  navigate:any;
  constructor() {
    this.sideMenu();  
  }

  sideMenu() {  
    this.navigate =   
    [  
      {  
        title : 'Perfil',  
        url   : '/perfiladmin',  
        icon  : 'person-circle-outline'  
      },   
      { 
        title : 'Roll',
        url   : '/roll',
        icon  : 'today-outline' 
        },
      { 
        title : 'Empleados',  
        url   : '/empleados',  
        icon  : 'body-outline'  
      },   
      {  
        title : 'Platillos',  
        url   : '/platillos',  
        icon  : 'fast-food-outline'   
      },  
      {  
        title : 'Ventas',  
        url   : '/ventas',  
        icon  : 'pricetags-outline'  
      },   
      {  
        title : 'Cerrar sesión',  
        url   : '/login',  
        icon  : 'log-out-outline'  
      }, 
    ];  
  }  
}
