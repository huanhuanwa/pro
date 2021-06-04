import { NgModule } from '@angular/core';
import { FormsRoutingModule } from './forms-routing.module';
import { FormsComponent } from './forms.component'
import { TablesComponent } from './tables/tables.component';


@NgModule({
  imports: [
    FormsRoutingModule,
  ],
  declarations: [
    FormsComponent,
    TablesComponent,
  ],
})
export class FormsModule { }
