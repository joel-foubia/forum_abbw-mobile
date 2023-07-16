import { InAppBrowser, InAppBrowserOptions } from '@ionic-native/in-app-browser';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { AfProvider } from '../../providers/af/af';

import { RemoteServiceProvider } from '../../providers/remote-service/remote-service';
import { ApiConfig } from '../../config';
import { TranslateService } from '@ngx-translate/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { DocumentViewer, DocumentViewerOptions } from '@ionic-native/document-viewer';

@IonicPage()
@Component({
	selector: 'page-organisation',
	templateUrl: 'organisation.html',
})
export class OrganisationPage {
	truncate = [];
	public programs;
	public currentLang;
	public links : any = [];
	public linkslength;
	public ArrayLinks = [];
	options: InAppBrowserOptions = {
		location: 'yes',
		hidden: 'no',
		clearcache: 'yes',
		clearsessioncache: 'yes',
		zoom: 'yes',
		hardwareback: 'yes',
		mediaPlaybackRequiresUserAction: 'no',
		shouldPauseOnSuspend: 'no',
		closebuttoncaption: 'Close',
		disallowoverscroll: 'no',
		toolbar: 'yes',
		enableViewportScale: 'no',
		allowInlineMediaPlayback: 'no',
		presentationstyle: 'pagesheet',
		fullscreen: 'yes',
	};
	constructor(
		public navCtrl: NavController,
		public navParams: NavParams,
		private afServ: AfProvider,
		private apiServ: RemoteServiceProvider,
		public translate: TranslateService,
		public afDb: AngularFireDatabase,
		public doc: DocumentViewer,
		public iab: InAppBrowser,
		public alertCtrler: AlertController
	) {
		translate.addLangs(['en', 'fr']);
		this.getLinks();
		this.setLang();
		//this.loadPrograms();
		this.translate.setDefaultLang('en');
	}

	ionViewDidLoad() {}

	//Cette fonction permet de charger les images
	loadPrograms() {
		let objLoad = this.apiServ.objLoading();
		objLoad.present();

		this.afServ.getSettingUser(ApiConfig.nom_setting).then(res => {
			if (res) {
				let objet = JSON.parse(res);

				this.apiServ.detailsMissions(objet).subscribe(
					data => {
						objLoad.dismiss();
						//console.log(data);
						if (data.length != 0) {
							this.programs = data.page.content;
							//console.log(this.programs);
						} else this.apiServ.getMessage('Aucune information en ce moment');
					},
					err => {
						//Pas de Connexion

						objLoad.dismiss();
						this.apiServ.getErrorNetwork();
					}
				);
			} else {
				objLoad.dismiss();
				this.apiServ.getMessage('Veuillez activer votre connexion Internet puis Réessayer');
				//this.navCtrl.pop();
			}
		});
	}

	getLinks() {
		this.currentLang = this.translate.getBrowserLang();
		this.afDb.list('/document_pratique').subscribe(res => {
			this.links = res;
			console.log('links => ',this.links);
		});
	}

	setLang() {
		if (this.currentLang == 'fr') {
			this.translate.setDefaultLang('fr');
		} else if (this.currentLang == 'en') {
			this.translate.setDefaultLang('en');
		}
	}

	viewPdf(link) {
		this.openInAppBrowser(this.links[link]);
	}

	openInAppBrowser(url) {
		let target = '_system';
		this.iab.create(url, target, this.options);
	}
}
