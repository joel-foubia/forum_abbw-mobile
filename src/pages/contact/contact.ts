import { Component } from '@angular/core';
import { IonicPage, NavController, ModalController, MenuController, ToastController } from 'ionic-angular';
import { AfProvider } from '../../providers/af/af';
import { ImageProvider } from '../../providers/image/image';
import { EmailComposer } from '@ionic-native/email-composer';

@IonicPage()
@Component({
  selector: 'page-contact',
  templateUrl: 'contact.html'
})
export class ContactPage {
  public object: any = {};
  public contacts: any;
  public objSpinner;
  public imgLogo;
  public data_map;
  public mapTypeControl: true;
  public streetViewControl: true;
  body: any;

  constructor(
    public navCtrl: NavController,
    public menu: MenuController,
    public afServ: AfProvider,
    public modalCtrl: ModalController,
    private imgServ: ImageProvider,
    public toastCtrler: ToastController,
    private emailComposer: EmailComposer) {
    this.loadContact();
  }
  presenttoast(flag) {
		let toast = this.toastCtrler.create({
			message: flag,
			duration: 3000,
			position: 'bottom'
		});
		toast.present();
	}

  loadContact() {

    this.objSpinner = true;

    this.afServ.getInfosContact((res) => {
      console.log(res);
      this.contacts = res;
      this.data_map = res.infos[0];
      this.objSpinner = false;

    });

  }

  //Ouvre une boite affichant un 
  //formulaire que devra remplir
  goToContact() {
    /* let addModal = this.modalCtrl.create(DetailsContactPage, {'contact':item});
     
     addModal.onDidDismiss(() => { 
       
     });
 
     addModal.present();*/
  }

  send() {

    if (this.object) {
			this.body = {
        sujet: this.afServ.buildContactMessage(this.object)
			};
      console.log('Body => ', this.body);
			
			console.log('Message => ', this.body, 'object ===> ', this.object);
			let messageError = "Votre email n'a pas été envoyer.";
			let subject = "Plus d'informations sur le Forum ABBW 2019";
			this.afServ.doEmail(this.contacts.email, messageError, subject, this.body.sujet);
			this.reinitialiseFields();
		} else {
			if (this.afServ.checkEmails(this.object, this.object.email).code != true) {
				this.presenttoast(this.afServ.checkEmails(this.object, this.object.email).msg);
			}
			if (this.afServ.checkPressInputs(this.object, 'ok') != true) {
				this.presenttoast('Veuillez remplir les champs oligatoire (*)');
			}
		}
		
    }
    reinitialiseFields(){
      this.object;
    }
  
    
    // if(this.object){
    //   console.log('Message => ', this.object);
    //   this.emailComposer.isAvailable().then((available: boolean) => {
    //     if (available) {
    //       let email = {
    //         to: this.contacts.email,
    //         subject: 'Contact ABBW',
    //         body: '<p>' + this.object.Message + '</p>' +
    //         '<br> Adresse : <span>' + this.object.email + '</span>',
    //         isHtml: true
    //       }
    //       this.emailComposer.open(email);
    //     }
    //   });
    // }else if(this.object.name == '' || this.object.name == undefined || !this.object.name){
    //   let toast = this.toast.create({
		// 		message: 'Veuillez saisir les champs',
		// 		duration: 3000,
		// 		position: 'top'
		// 	});
		// 	toast.onDidDismiss(() => {
		// 	});

		// 	toast.present();
    // }
  
  call() {
    let tab = this.contacts.tel.split("/");
    this.afServ.doCall(tab[0], "Numéro invalide");
  }
  openMenu() {
    this.menu.open();
  }


}
