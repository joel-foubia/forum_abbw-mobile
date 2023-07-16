import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AssociationPage } from './association';
// import { ComponentsModule } from '../../components/components.module';
// import { WizardComponent } from '../../components/wizard/wizard';
//import { AgmCoreModule } from '@agm/core';
//import { IntervenantsPage } from './intervenants';

@NgModule({
	declarations: [ AssociationPage],
	imports: [
		IonicPageModule.forChild(AssociationPage),
		// ComponentsModule
		//AgmCoreModule.forRoot({ apiKey: 'AIzaSyCAhAifXDxK6EFW7Sgk7py0b_NFdYUsDxo'}),
	]
})
export class AssociationPageModule {}
