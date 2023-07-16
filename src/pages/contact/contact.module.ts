import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ContactPage } from './contact';
import { AgmCoreModule } from '@agm/core';

@NgModule({
  declarations: [
    ContactPage
  ],
  imports: [
    IonicPageModule.forChild(ContactPage),
    AgmCoreModule.forRoot({ apiKey: 'AIzaSyB05TGEtdgWisNP4HCuvi8kLdpgheo1Oms'})
  ],
})
export class ContactPageModule {}
