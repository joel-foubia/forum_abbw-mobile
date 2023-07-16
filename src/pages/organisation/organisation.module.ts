import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { OrganisationPage } from './organisation';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [
    OrganisationPage,
  ],
  imports: [
    IonicPageModule.forChild(OrganisationPage),
    TranslateModule.forChild()
  ],
})
export class OrganisationPageModule {}
