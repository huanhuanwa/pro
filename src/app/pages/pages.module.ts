import { NgModule } from '@angular/core';
import { PagesComponent } from './pages.component';
import { PagesRoutingModule } from './pages-routing.module';
import { DashboardModule } from './dashboard/home.module';
import { ThyAvatarModule, ThyBadgeModule, ThyIconModule, ThyInputModule, ThyLayoutModule, ThyTreeModule, ThyFormModule, ThyButtonModule } from 'ngx-tethys';
import { LayoutComponent } from './layout/layout.component';
import { FormsModule } from '@angular/forms';
import { LoginComponent } from './login/login.component';

const NGX_TETHYS_MODULES = [ThyLayoutModule, ThyTreeModule, ThyIconModule, ThyInputModule, ThyBadgeModule, ThyAvatarModule, ThyFormModule, ThyButtonModule];

@NgModule({
  imports: [
    PagesRoutingModule, 
    DashboardModule,
    FormsModule,
    ...NGX_TETHYS_MODULES
  ],
  declarations: [PagesComponent, LayoutComponent, LoginComponent],
})
export class PagesModule {
}
