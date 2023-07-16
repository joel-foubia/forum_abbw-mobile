import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MapPage } from './map';
import { AgmCoreModule } from '@agm/core';

@NgModule({
  declarations: [
    MapPage,
  ],
  imports: [
    IonicPageModule.forChild(MapPage),
    AgmCoreModule.forRoot({ apiKey: 'AIzaSyCAhAifXDxK6EFW7Sgk7py0b_NFdYUsDxo'}),
  ],
})
export class MapPageModule {}
