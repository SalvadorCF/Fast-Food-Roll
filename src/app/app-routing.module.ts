import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'login',
    loadChildren: () => import('./pages/login/login.module').then( m => m.LoginPageModule)
  },
    {
      path: '',
      redirectTo: 'login',
      pathMatch: 'full'
    },
  {
    path: 'registro-n',
    loadChildren: () => import('./pages/registro-n/registro-n.module').then( m => m.RegistroNPageModule)
  },
  {
    path: 'empleados',
    loadChildren: () => import('./pages/empleados/empleados.module').then( m => m.EmpleadosPageModule)
  },
  {
    path: 'platillos',
    loadChildren: () => import('./pages/platillos/platillos.module').then( m => m.PlatillosPageModule)
  },
  {
    path: 'principald',
    loadChildren: () => import('./pages/principald/principald.module').then( m => m.PrincipaldPageModule)
  },
  {
    path: 'ordenes',
    loadChildren: () => import('./pages/ordenes/ordenes.module').then( m => m.OrdenesPageModule)
  },
  {
    path: 'roll',
    loadChildren: () => import('./pages/roll/roll.module').then( m => m.RollPageModule)
  },
  {
    path: 'ventas',
    loadChildren: () => import('./pages/ventas/ventas.module').then( m => m.VentasPageModule)
  },
  {
    path: 'eorden',
    loadChildren: () => import('./pages/eorden/eorden.module').then( m => m.EordenPageModule)
  },
  {
    path: 'verorden',
    loadChildren: () => import('./pages/verorden/verorden.module').then( m => m.VerordenPageModule)
  },
  {
    path: 'perfiladmin',
    loadChildren: () => import('./pages/perfiladmin/perfiladmin.module').then( m => m.PerfiladminPageModule)
  },
  {
    path: 'roll-empleado',
    loadChildren: () => import('./pages/roll-empleado/roll-empleado.module').then( m => m.RollEmpleadoPageModule)
  },
  {
    path: 'orden-empleado',
    loadChildren: () => import('./pages/orden-empleado/orden-empleado.module').then( m => m.OrdenEmpleadoPageModule)
  },
  {
    path: 'ordene-empleado',
    loadChildren: () => import('./pages/ordene-empleado/ordene-empleado.module').then( m => m.OrdeneEmpleadoPageModule)
  },
  {
    path: 'verorden-empleado',
    loadChildren: () => import('./pages/verorden-empleado/verorden-empleado.module').then( m => m.VerordenEmpleadoPageModule)
  },
  {
    path: 'perfilempleado',
    loadChildren: () => import('./pages/perfilempleado/perfilempleado.module').then( m => m.PerfilempleadoPageModule)
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
