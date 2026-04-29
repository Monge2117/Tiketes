import { Routes } from '@angular/router';
import { Login } from './pages/login/login';
import { MainLayout } from './components/main-layout/main-layout';

export const routes: Routes = [
  {path:'',redirectTo:'login',pathMatch:'full'},
  { path: 'login', component: Login },
  { path: 'menus', component: MainLayout, children: [

{
path:'',
redirectTo:'Tickets',
pathMatch:'full'
},
{
path:'tickets',
loadComponent:() =>
import('./pages/tiketes/tiketes')
.then(m=>m.Tiketes)
},
{
path:'Logout',
loadComponent:() =>
import('./pages/cerrar-session/cerrar-session')
.then(m=>m.CerrarSession)
},

  ] },
];
