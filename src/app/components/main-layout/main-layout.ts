import { Component,inject, signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { MenuService } from '../../services/menu';
import { MatSidenavModule, MatSidenavContainer, MatSidenav } from '@angular/material/sidenav';

import {
MatListModule
} from '@angular/material/list';

import {
MatIconModule
} from '@angular/material/icon';
import { MenuItem } from '../../models/Menu-interface';
import { tap } from 'rxjs';
@Component({
  selector: 'app-main-layout',
  imports: [MatSidenavModule, MatListModule, MatIconModule, RouterLink, RouterLinkActive, RouterOutlet],
  templateUrl: './main-layout.html',
  styleUrl: './main-layout.css',
})
export class MainLayout {


private menuService = inject(MenuService);
loading = signal(true);

menuItems = toSignal(
 this.menuService.ObtenerMenus().pipe(
   tap(()=> this.loading.set(false))
 ),
 {
   initialValue:[]
 }
);
}


