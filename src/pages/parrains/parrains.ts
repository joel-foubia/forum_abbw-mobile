import { Component } from '@angular/core';
import { IonicPage, NavController, ModalController } from 'ionic-angular';
import { RemoteServiceProvider } from '../../providers/remote-service/remote-service';
import { FormParrainPage } from '../form-parrain/form-parrain';
import { AfProvider } from '../../providers/af/af';
import { ApiConfig } from '../../config';

@IonicPage()
@Component({
  selector: 'page-parrains',
  templateUrl: 'parrains.html',
})
export class ParrainsPage {

	public objSpinner;
	public connexion; 
	public parrains = [];
  public txtParrain;
	public imgMan = "assets/img/man.png";
	public imgWoman = "assets/img/woman.png";

  constructor(public navCtrl: NavController, public modalCtrl: ModalController, public afServ: AfProvider, private remoteServ: RemoteServiceProvider) {
      this.txtParrain = ApiConfig.txt_parrain;
  		this.listParrains();
  }

  ionViewDidLoad() {}

  //Cette fonction permet de récupérer
  //la liste des parrains
  listParrains(){

  	this.objSpinner = true;
    this.afServ.getSettingUser(ApiConfig.nom_setting).then((res) => {
        
        if(res){
          let objet = JSON.parse(res);
          this.connexion = objet;

          this.remoteServ.getListParrains(objet).subscribe((data)=>{
          	
           	this.parrains = data; 
            this.objSpinner = false;
             
          }, (err)=>{
          	
          	this.afServ.showMessageWithBtn("Une erreur est survenu lors de la consultation. Réessayez ultérieurement");
            this.objSpinner = false;
          });
        }
        
    }); 
  }

  //Cette fonction permet d'enregistrer
  //une personne qui souhaite devenir Parrain
  /*openForm(){

  	let addModal = this.modalCtrl.create(FormParrainPage);
  	
  	addModal.onDidDismiss((data) => {
  		
  		if(data){

  			this.remoteServ.saveDataParrain(this.connexion, data).subscribe((res)=>{
	          	
	           	//this.parrains = data;
              swal({
                title: "NOMA PROGRAM",
                text: "Merci Pour Votre Soutien Régulier !",
                icon: "success",
              });
	             
	        }, (err)=>{
	          	
	          	this.afServ.showMessageWithBtn("Une erreur est survenu. Réessayez ultérieurement");
	        });
  		}
  		
  	});

  	addModal.present();
  
  }*/

}
