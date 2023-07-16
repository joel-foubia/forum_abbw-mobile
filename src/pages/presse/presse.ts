import { AngularFireDatabase } from 'angularfire2/database';
import { EmailComposer } from '@ionic-native/email-composer';
import { AfProvider } from './../../providers/af/af';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController, MenuController } from 'ionic-angular';

/**
 * Generated class for the PressePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
	selector: 'page-presse',
	templateUrl: 'presse.html'
})
export class PressePage {
	emailTosend: any;
	form = {
		surname: '',
		name: '',
		post: '',
		email: '',
		media_name: '',
		tel: '',
		country: '',
		mediaType: '',
		message: ''
	};
	nameClicked: boolean;
	segment;
	constructor(
		public navCtrl: NavController,
		public navParams: NavParams,
		public toastCtrler: ToastController,
		public afProv: AfProvider,
		public email: EmailComposer,
		public afDb: AngularFireDatabase,
		public menu: MenuController
	) {
		this.segment = '1';
		this.afDb.list('/contact').subscribe((res) => {
			//console.log('Result', res);
			for (let i = 0; i < res.length; i++) {
				if (res[i].$key === 'email') {
					this.emailTosend = res[i].$value;
				}
			}
			//console.log('Email to send', this.emailTosend);
		});
	}

	ionViewDidLoad() {
		//console.log('ionViewDidLoad PressePage');
	}

	send() {
		if (
			this.afProv.checkPressInputs(this.form, 'ok') === true &&
			this.afProv.checkEmails(this.form, this.form.email).code === true
		) {
			/* this.email
				.isAvailable()
				.then((available) => {
					if (available == true) { */
			let email = {
				to: this.emailTosend,
				subject: 'Demande Accreditation Forum ABBW 2019',
				body: this.afProv.buildPressMessage(this.form),
				isHtml: true
			};
			console.log('Body => ', email.body);
			this.email.open(email).then((_val)=>{
				this.presenttoast("Votre mail de demande d'accréditation a été envoyé à l'organisateur");
			});
			/* } else {
						this.presenttoast("Le Service mail n'est pas disponible");
					}
				})
				.catch((error) => {
					//console.log('Error', error);
				}); */
		} else {
			if (this.afProv.checkEmails(this.form, this.form.email).code != true) {
				this.presenttoast(this.afProv.checkEmails(this.form, this.form.email).msg);
			}
			if (this.afProv.checkPressInputs(this.form, 'ok') != true) {
				this.presenttoast('Remplir les champs obligatoire (*) avant de soummetre le formulaire');
			}
		}
	}
	reinitialiseFields() {
		this.form = {
			surname: '',
			name: '',
			post: '',
			email: '',
			media_name: '',
			tel: '',
			country: '',
			mediaType: '',
			message: ''
		};
	}
	presenttoast(flag) {
		let toast = this.toastCtrler.create({
			message: flag,
			duration: 3000,
			position: 'bottom'
		});
		toast.present();
	}
	nameClick() {
		this.nameClicked = true;
		console.log('Name clikce');
	}
	openLeftMenu() {
		this.menu.open();
	}
	back() {
		this.segment = (parseInt(this.segment) - 1).toString();
	}
	next() {
		this.segment = (parseInt(this.segment) + 1).toString();
	}
}
