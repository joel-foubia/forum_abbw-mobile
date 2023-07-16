import { Injectable } from '@angular/core';
import { ToastController, AlertController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { CallNumber } from '@ionic-native/call-number';
import { SocialSharing } from '@ionic-native/social-sharing';
import { EmailComposer } from '@ionic-native/email-composer';
import { AngularFireDatabase } from 'angularfire2/database';
import { AngularFireOfflineDatabase } from 'angularfire2-offline/database';
import { InAppBrowser } from '@ionic-native/in-app-browser';
import { ApiConfig } from '../../config';

@Injectable()
export class AfProvider {
	constructor(
		private afDB: AngularFireDatabase,
		public toastCtrl: ToastController,
		public storage: Storage,
		public alertCtrl: AlertController,
		private socialSharing: SocialSharing,
		private callNumber: CallNumber,
		private emailComposer: EmailComposer,
		private afOff: AngularFireOfflineDatabase,
		private iab: InAppBrowser
	) {}

	/**
   * Cette fonction va vérifier que
   * cette utilisateur est bien enregistré
   * dans la BD
   *
   * @return callback 
   *
   **/
	retrieveURL(callback) {
		return this.afOff.list('/server').subscribe(_data => {
			for (var i in _data) {
				let current = _data[i];

				if (current.$key == 'url') {
					callback({ url: current.$value });
					break;
				}
			}
		});
	}

	/**
   * Cette fonction va récuperer les info A propos
   *
   * @return callback 
   *
   **/
  about(callback){
	return this.afOff.list('/about').subscribe(_data => {
		for (var i in _data) {
			let current = _data[i];

			if (current.$key == 'url') {
				callback({ url: current.$value });
				break;
			}
		}
	});
}

	readPartners(){
	  	return new Promise(
		  	(resolve, reject)=>{
		  		this.afOff.list('/contenus/Partenaire').subscribe(_data =>{
		  			
	          resolve(_data);
		      // console.log('partenaire',_data); 
		 
		     });	
		  	}
	  		);
	  	 }


   /* Cette fonction va récupérer
   * les identifiants du client Paypal
   * 
   *
   * @return callback
   *
   **/
	getCredentialsClient(callback) {
		return this.afDB.list('/config').subscribe(_data => {
			let result = {};

			for (var i in _data) {
				let current = _data[i];
				let key = current.$key;
				result[key] = current.$value;
			}

			callback(result);
		});
	}

	/**
   * Cette fonction va vérifier que
   * cette utilisateur est bien enregistré
   * dans la BD
   *
   * @return callback
   *
   **/
	setSetting() {
		this.afOff.list('/server').subscribe(_data => {
			let tab_setting = {};

			//console.log(_data);
			for (var i in _data) {
				let current = _data[i];
				tab_setting[current.$key] = current.$value;
			}

			this.saveSettingUser(ApiConfig.nom_setting, tab_setting);
		});
	}

	/**
   * Cette fonction va vérifier que
   * cette utilisateur est bien enregistré
   * dans la BD
   *
   * @return callback
   *
   **/
	getAfricaRise(callback) {
		this.afOff.list('/africa_rise').subscribe(_data => {
			let tab_setting = {};
			
			for (var i in _data) {
				let current = _data[i];
				tab_setting[current.$key] = current.$value;
			}

			callback(tab_setting);
			
		});
	}

  /**
   * Cette fonction va récupérer
   * les dernieres éditions
   * 
   *
   * @return callback
   *
   **/
	getLastEditions(callback) {
		return this.afOff.list('/last_editions').subscribe(_data => {
						
			callback(_data);
		});
	}

	/**
   * Cette fonction va récupérer
   * les dernieres éditions
   * 
   *
   * @return callback
   *
   **/
	getTarifs(callback) {
		return this.afOff.list('/tarif').subscribe(_data => {

			callback(_data);
		});
	}
	getOrganisations(callback) {
		return this.afOff.list('/contenus/Organisations').subscribe(_data => {

			callback(_data);
		});
	}

	/**
   * Cette fonction va récupérer
   * les dernieres éditions
   * 
   *
   * @return callback
   *
   **/
	getActeurs(lang, callback) {
		let table = '';
		//console.log(lang);

		if(lang=='fr') {
			table='/contenus/Acteurs';
		}else{
			table='/contenus/Acteurs_en';
		}

		return this.afOff.list(table).subscribe(_data => {
			callback(_data);
		});
	}

	/**
   * Cette fonction va récupérer
   * les informations sur les donations
   *
   * @return callback
   *
   **/
	retrieveInfosDonation(callback) {
		this.afOff.list('/donation').subscribe(_data => {
			callback(_data[0]);
			//this.saveSettingUser(ApiConfig.nom_donation, tab_setting);
		});
	}
 
	/**
   * Cette fonction permet de sauvegarder les 
   * paramètres de l'utilisateur une fois que ce
   * dernier est fournir 
   * @param JSON data
   *
   **/
	saveSettingUser(type, data) {
		let newData = JSON.stringify(data);
		this.storage.set(type, newData);
	}

	/**
   * Cette fonction permet de recupérer les 
   * paramètres de l'utilisateur 
   *
   * @return String
   **/
	getSettingUser(type) {
		return this.storage.get(type);
	}

  /***
   * Cette fonction permet d'afficher
   * les informations A Propos de l'entreprise
   *
   **/
	getInfosAbout(callback) {
		return this.afOff.list('/about').subscribe(_data => {
			//console.log(_data);

			let result = {};

			for (var i in _data) {
				let current = _data[i];
				let key = current.$key;

				if (key == 'map') {
					result['map'] = current;
				} else {
					result[key] = current.$value;
				}
			}

			//console.log(result);
			callback(result);
		});
	}

	/***
   * Cette fonction permet d'afficher
   * les informations Contact de l'association
   *
   **/
	getInfosContact(callback) {
		return this.afOff.list('/contact').subscribe(_data => {
			let result = {};

			for (var i in _data) {
				let current = _data[i];
				let key = current.$key;

				if (key == 'infos') {
					result['infos'] = current;
				} else {
					result[key] = current.$value;
				}
			}

			//console.log(result);
			callback(result);
		});
	}

	//Cette fonction permet d'afficher un message
	// en cas d'erreur ou de success
	showMessage(msg) {
		let toast = this.toastCtrl.create({
			message: msg,
			duration: 3000,
			cssClass: 'toastErr',
			position: 'top',
		});

		toast.present();
	}

	showMessageWithBtn(msg) {
		let toast = this.toastCtrl.create({
			message: msg,
			showCloseButton: true,
			cssClass: 'toastErr',
			closeButtonText: 'OK',
			position: 'top',
		});

		toast.present();
	}

	/**
   * Cette fonction permet d'afficher
   * une alerte suite à une information
   * @param objet Struct, le contenu du Message(titre et le texte)
   **/
	showInfoAlert(objet) {
		let alert = this.alertCtrl.create({
			title: objet.titre,
			message: objet.texte,
			buttons: ['Compris'],
		});

		alert.present();
	}

	/**
   * Cette fonction permet d'afficher
   * une boite de dialogue pour permettre à un 
   * utilisateur de valider ou pas
   * 
   * @param objet Struct, le contenu du Message(titre et le texte)
   * @param scopeIsParrain boolean, indique si oui ou non une personne souhaite
   *                              devenir parrain
   **/
	showInfoConfirm(objet) {
		let alert = this.alertCtrl.create({
			title: objet.titre,
			message: objet.texte,
			buttons: [
				{
					text: 'Annulé',
					role: 'cancel',
					handler: () => {},
				},
				{
					text: 'Je Confirme',
					handler: () => {},
				},
			],
		});

		alert.present();
	}

	/***
   * Cette fonction permet d'ouvrir une application
   * pour envoyer un Mail à l'association 
   *
   **/
	sendMailTo(adrEmail, data) {
		if (data) {
			let email = {
				to: adrEmail,
				subject: data.sujet,
				body: this.buildMessage(data),
				isHtml: true,
			};

			/* this.emailComposer.isAvailable().then((available: boolean) => {
				if (available) { */
					this.emailComposer.open(email);
					this.showMessageWithBtn("Un mail de demande de Participation a été envoyé à l'organisateur");
				/* } else {
					this.showMessageWithBtn("Le Service mail n'est pas disponible");
				}
			}); */
		}
	}

	//Construire le message
	private buildMessage(data) {
		let html = '';

		html += 'Moi ' + data.title + ' ' + data.name + ' ' + data.prenom + ' <br>';
		html += "Je souhaite m'inscrire au Forum ABBW 2019 <br> ";
		html += 'pour le Pack <h3>' + data.pack + '</h3> <br>';
		html += '<br><br><strong>Coordonnées:</strong>';
		html += '<strong>Nom :</strong> ' + data.name + ' <br>';
		html += '<strong>Prénom :</strong> ' + data.prenom + ' <br>';
		html += '<strong>Profession :</strong> ' + data.profession + ' <br>';
		html += '<strong>Fonction :</strong> ' + data.fonction + ' <br>';

		if (data.company != '') html += '<strong>entreprise :</strong> ' + data.company + ' <br>';

		if (data.website != '') html += '<strong>Site Web :</strong> ' + data.website + ' <br>';

		if (data.telephone != '') html += '<strong>Téléphone :</strong> ' + data.telephone + ' <br>';

		return html;
	}
		//Construire le message
	public buildPressMessage(data) {
		let html = '';

		html += 'Moi ' + data.surname + ' ' + data.name + ' <br>';
		html += "Je souhaite faire une demande d'accréditation au Forum ABBW 2019 ";
		html += 'en tant que :<h3>' + data.post + '</h3> de <h3>' + data.media_name + '</h3> <br>';
		html += '<br><br><strong>Coordonnées:</strong>';
		html += '<strong>Nom :</strong> ' + data.name + ' <br>';
		html += '<strong>Prénom :</strong> ' + data.surname + ' <br>';
		// html += '<strong>Profession : Membre de Presse</strong> ' + '<br>';
		html += '<strong>Fonction :</strong> ' + data.post + ' <br>';

		// if (data.company != '') html += '<strong>entreprise :</strong> ' + data.company + ' <br>';

		if (data.website != '' && data.website !== undefined) html += '<strong>Site Web :</strong> ' + data.website + ' <br>';

		if (data.media_name != '' && data.media_name !== undefined) html += '<strong>Nom de Media :</strong> ' + data.media_name + ' <br>';
		if (data.email != '' && data.email !== undefined) html += '<strong>Email :</strong> ' + data.email + ' <br>';
		if (data.country != '' && data.country !== undefined) html += '<strong>Pays :</strong> ' + data.country + ' <br>';
		if (data.mediaType != '' && data.mediaType !== undefined) html += '<strong>Type de Media :</strong> ' + data.mediaType + ' <br>';
		if (data.message != '' && data.message !== undefined) html += '<strong>Message :</strong> ' + data.message + ' <br>';

		return html;
	}

	public buildContactMessage(data) {
		let html = '';
		html += '<h3>' + data.message + '</h3><br>';
		html += '<br><br><strong>Coordonnées:</strong> <br>';
		html += '<strong>Nom :</strong> ' + data.name + ' <br>';
		html += '<strong>Email :</strong> ' + data.email + ' <br>';

		return html;
	}
	//Construire le message
	public buildInscriptionMessage(data) {
		let html = '';

		html += 'Moi ' + data.title + ' ' + data.surname + ' ' + data.name + ' <br>';
		html += "Je souhaite m'inscrire au Forum ABBW 2019 ";
		html += 'en tant que :<h3>' + data.post + '</h3> <br>';
		html += '<br><br>';
		html += '<strong>Nom :</strong> ' + data.name + ' <br>';
		html += '<strong>Prénom :</strong> ' + data.surname + ' <br>';
		html += '<strong>Profession :</strong> ' + data.post + ' <br>';

		if (data.company != '') html += '<strong>entreprise :</strong> ' + data.company + ' <br>';

		if (data.website != '') html += '<strong>Site Web :</strong> ' + data.website + ' <br>';

		if (data.activity != '') html += '<strong>Secteur activité :</strong> ' + data.activity + ' <br>';
		if (data.email != '') html += '<strong>Email :</strong> ' + data.email + ' <br>';
		if (data.tel != '') html += '<strong>Telephone :</strong> ' + data.tel + ' <br>';
		if (data.pays != '') html += '<strong>Pays :</strong> ' + data.pays + ' <br>';
		if (data.employeesnum != '') html += '<strong>Nombre d\'employés :</strong> ' + data.employeesnum + ' <br>';

		return html;
	}

	/**
   * Cette fonction permet de vérifier
   * que les champs nom, prénom et emails
   * ne sont pas vide et sont valide
   *
   * @param objet Array, contient les données du form 
   * @param confirm_email string, email de confirmation
   * @return boolean
   *
   **/
	checkInputs(objet, confirm_email) {
		if (
			objet.hasOwnProperty('nom') &&
			objet.hasOwnProperty('prenom') &&
			objet.hasOwnProperty('email') &&
			confirm_email != ''
		) { 
			if (objet.nom != '' && objet.prenom != '' && objet.email != '' && confirm_email != '') {
				return true;
			}
		}

		return false;
	}
	/**
   * Cette fonction permet de vérifier
   * que les champs nom, prénom et emails
   * ne sont pas vide et sont valide
   *
   * @param objet Array, contient les données du form 
   * @param confirm_email string, email de confirmation
   * @return boolean
   *
   **/
	checkPressInputs(objet, confirm_email) {
		if (
			objet.hasOwnProperty('name') &&
			objet.hasOwnProperty('surname') &&
			objet.hasOwnProperty('email') &&
			confirm_email != ''
		) {
			if (objet.name != '' && objet.surname != '' && objet.email != '' && confirm_email != '') {
				return true;
			}
		}

		return false;
	}
	/**
   * Cette fonction permet de vérifier
   * que les champs nom, prénom et emails
   * ne sont pas vide et sont valide
   *
   * @param objet Array, contient les données du form 
   * @param confirm_email string, email de confirmation
   * @return boolean
   *
   **/
	checkInscriptionInputs(objet, confirm_email) {
		if (
			objet.hasOwnProperty('name') &&
			objet.hasOwnProperty('surname') &&
			objet.hasOwnProperty('email') &&
			objet.hasOwnProperty('company') &&
			objet.hasOwnProperty('pays') &&
			objet.hasOwnProperty('employeesnum') &&
			objet.hasOwnProperty('activity') &&
			objet.hasOwnProperty('post') &&
			confirm_email != ''
		) {
			if (
				objet.name != '' &&
				objet.surname != '' &&
				objet.email != '' &&
				objet.company != '' &&
				objet.pays != '' &&
				objet.employeesnum != '' &&
				objet.activity != '' &&
				confirm_email != '' &&
				objet.post != ''
			) {
				return true;
			}
		}

		return false;
	}

	
	
	/**
   * Cette fonction permet de vérifier
   * si l'adresse mail correspond à l
   * adresse email de confirmation
   * @param objet Array, contient les données du form
   * @param confirm_email string, email de confirmation
   * @return boolean
   *
   **/
	checkEmails(objet, confirm_email) {
		let EMAIL_REGEXP = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

		if (objet.email != '' && (objet.email.length <= 5 || EMAIL_REGEXP.test(objet.email))) {
			if (objet.email == confirm_email) {
				return { code: true, msg: 'Good' };
			} else {
				return {
					code: false,
					msg:
						"Email saisi et l'Email de confirmation ne correspondent pas. Veuillez vérifier réessayer à nouveau",
				};
			}
		}

		return { code: false, msg: "L'Adresse Email saisie est invalide" };
	}

	/**
   * Cette fonction permet d'effectuer un appel
   * @param phonenumber int
   * (A Executer sur un Smartphone)
   **/
	doCall(phonenumber, txtMessage) {
		if (phonenumber) {
			this.callNumber
				.callNumber(phonenumber, true)
				.then(() => console.log('Launched dialer!'))
				.catch(() => console.log('Error launching dialer'));
		} else {
			this.showMessage(txtMessage);
		}
	}

	/**
	 * Cette fonction permet d'ouvrir un lien url
	 * dans un In App Browser
	 *
	 **/
	doWeb(url){
		this.iab.create(url);
	} 
	doEmail(adrEmail, txtMessage, sujet?: string, body?: string) {
		if (adrEmail) {
			// add alias
			this.emailComposer.addAlias('gmail', 'com.google.android.gm');

			//Now we know we can send
			let email = {
				app: 'gmail',
				to: adrEmail,
				subject: sujet,
				body: body,
				isHtml: true
			};

			this.emailComposer.open(email).then(() => {
				// this.showMessageWithBtn(txtMessage);
			});
		} else {
			this.showMessageWithBtn(txtMessage);
		}
	}
}
