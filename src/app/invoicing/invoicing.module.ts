import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { InvoicingPageRoutingModule } from './invoicing-routing.module';

import { InvoicingPage } from './invoicing.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    InvoicingPageRoutingModule
  ],
  declarations: [InvoicingPage]
})
export class InvoicingPageModule {}
