import { Component } from '@angular/core';
import { IonicPage, ViewController, NavParams, PopoverController } from 'ionic-angular';
import { AfProvider } from '../../providers/af/af';

@IonicPage()
@Component({
	selector: 'page-intervenants',
	templateUrl: 'intervenants.html'
})
export class IntervenantsPage {
	public intervenants: any = null;
	public my_lang;
	public objSpinner;
	offset: number;
	defaultImage: string;

	constructor(
		public vc: ViewController,
		public navParams: NavParams,
		private afServ: AfProvider,
		public popoverCtrl: PopoverController
	) {
		this.offset = 100;
		this.defaultImage = 'assets/images/logo.png';
		this.my_lang = 'fr';
		this.loadIntervenants();
	}

	ionViewDidLoad() {
		// console.log('ionViewDidLoad IntervenantsPage');
	}

	close() {
		this.vc.dismiss();
	}

	loadIntervenants() {	
		this.objSpinner = true;
		this.afServ.getActeurs(this.my_lang, (res) => {
			console.log(res);
			this.intervenants = res;
			this.objSpinner = false;
		});
	}

	view(actor, myEvent) {
		let popover = this.popoverCtrl.create(
			'PopSignPage',
			{ actor: actor, type: 'acteurs_details' },
			{ cssClass: 'custom-popacteur animated flipInX' }
		);
		popover.present({ ev: myEvent });
	}
}
