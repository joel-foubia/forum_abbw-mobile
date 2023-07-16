import { Component, ViewChild } from '@angular/core';
import { Nav,Platform, ToastController, AlertController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { AfProvider } from '../providers/af/af';

import { MenuPage } from '../pages/menu/menu';
import { InterestsPage } from '../pages/interests/interests';
import { Storage } from '@ionic/storage';
import { TranslateService } from '@ngx-translate/core';
import { TabsPage } from '../pages/tabs/tabs';

@Component({
	templateUrl: 'app.html',
})
export class MyApp {
	@ViewChild(Nav) nav: Nav;
	rootPage: any;
	pages : any;
	user :any;

	constructor(
		platform: Platform,
		statusBar: StatusBar,
		splashScreen: SplashScreen,
		private afServ: AfProvider,
		public alertCtrl: AlertController,
		public toast: ToastController,
		public storage: Storage,
		public translate: TranslateService
	) {
		platform.ready().then(() => {
			// Okay, so the platform is ready and our plugins are available.
			// Here you can do any higher level native things you might need.
			translate.addLangs(['en', 'fr']);
			translate.setDefaultLang('en');
			statusBar.styleDefault();
			this.afServ.setSetting();
			splashScreen.hide();
		});

		this.storage.get('interests').then(interests => {
			this.storage.get('pseudo').then(pseudo => {
				
				if (interests && pseudo) {
					this.user = {
						pseudo: pseudo,
						cats : interests
					};

					//On récupère l'image du User
					this.retrieveImage();
					
					this.rootPage = TabsPage;
				} else {
					this.rootPage = 'InterestsPage';
				}
			});
		});

		this.pages = [
			{ title: 'Accueil', component: 'MainPage', index:0, icon: 'assets/menu/back-to-main-page.svg' },
			{ title: 'Programme', component: 'ProgramPage', index: 1, icon: 'assets/menu/menu.svg' },
			{ title: 'Acteurs', component: 'IntervenantsPage', index: 3, icon: 'assets/menu/actor.svg' },
			{ title: 'Organisation', component: 'AssociationPage', icon: 'assets/img/seminar.png' },
			{ title: 'Documents', component: 'OrganisationPage', icon: 'assets/img/list.png' },
			{ title: 'Frais de participation', component: 'TarifsPage', icon: 'assets/menu/receipt.svg' },
			{ title: 'Partenaires', component: 'PartnersPage', icon: 'assets/menu/support.svg' },
			{ title: 'Couverture média', component: 'PressePage', icon: 'assets/menu/post.svg' },
			{ title: 'Editions Passés', component: 'EditionsPage', icon: 'assets/menu/edition.svg' },
			{ title: 'Contactez-nous', component: 'ContactPage', icon: 'assets/menu/phone-book.svg' },
			{ title: 'A Propos', component: 'AboutPage', icon: 'assets/menu/about-us.svg' }
		  ];
	}

	//Cette méthode permet de récupérer l'image
	retrieveImage(){
		this.storage.get('profile_image').then(user_image => {
			if(user_image){
				this.user['user_image'] = user_image;
			}
			console.log(this.user);
		});
	}

	logOff() {
		let confirm = this.alertCtrl.create({
		  title: 'Confirmation',
		  message: 'Souhaitez-vous poursuivre cette action ? ',
		  buttons: [
			{
			  text: 'NON',
			  handler: () => {
				console.log('Disagree clicked');
			  }
			},
			{
			  text: 'OUI',
			  handler: () => {
				// this.nav.setRoot('LoginPage');
				this.nav.setRoot('MainPage');
			  }
			}
		  ]
		});
		confirm.present();
	}

	openPage(page){
		let params = {};

		if (page.index) {
			params = { tabIndex: page.index, page: page.component };
		}

		if (page.index === undefined) {
			this.nav.setRoot(page.component);
		} else if (page.index != undefined) {
			this.nav.setRoot(TabsPage, params);
		}
	  
	}
}
