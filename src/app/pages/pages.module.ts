import { NgModule } from '@angular/core';
import { PagesComponent } from './pages.component';
import { PagesRoutingModule } from './pages-routing.module';
import { DashboardModule } from './dashboard/home.module';
import { ThyAvatarModule, ThyBadgeModule, ThyIconModule, ThyInputModule, ThyLayoutModule, ThyTreeModule } from 'ngx-tethys';
import { LayoutComponent } from './layout/layout.component';
import { FormsModule } from '@angular/forms';

const NGX_TETHYS_MODULES = [ThyLayoutModule, ThyTreeModule, ThyIconModule, ThyInputModule, ThyBadgeModule, ThyAvatarModule];

@NgModule({
  imports: [
    PagesRoutingModule, 
    DashboardModule,
    FormsModule,
    ...NGX_TETHYS_MODULES
  ],
  declarations: [PagesComponent, LayoutComponent],
})
export class PagesModule {
}
