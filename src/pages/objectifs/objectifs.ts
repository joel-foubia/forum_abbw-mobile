import { Component } from '@angular/core';
import { IonicPage, ViewController, NavParams } from 'ionic-angular';
import { RemoteServiceProvider } from '../../providers/remote-service/remote-service';
import { AfProvider } from '../../providers/af/af';
import { ApiConfig } from '../../config';


@IonicPage()
@Component({
  selector: 'page-objectifs',
  templateUrl: 'objectifs.html',
})
export class ObjectifsPage {

	public objectifs : any = null;

  constructor(public vc: ViewController, public navParams: NavParams, private apiServ: RemoteServiceProvider, private afServ: AfProvider) {
  	this.loadObjectifs();
  }

  ionViewDidLoad() {
    
  }

  close(){
  	this.vc.dismiss();
  }

  loadObjectifs(){

  	let objLoad = this.apiServ.objLoading();
  	objLoad.present();

    this.afServ.getSettingUser(ApiConfig.nom_setting).then((res) => {
        
        if(res){
            
          let objet = JSON.parse(res);
          
          this.apiServ.detailsObjectifs(objet).subscribe((data)=>{
        	objLoad.dismiss();

            if(data.length!=0){
            	console.log(data);
            	let texte = String(data.page.content).replace(/<[^>]+>/gm, '');
            	console.log(texte);

              	this.objectifs = data.page.content;
            } 
            else
              this.apiServ.getMessage("Aucune information en ce moment");
            
          },
          (err) =>{ //Pas de Connexion
          	
            objLoad.dismiss();
            this.apiServ.getErrorNetwork();
          });

        }else{

          objLoad.dismiss();
          this.apiServ.getMessage("Veuillez activer votre connexion Internet puis Réessayer");
          //this.navCtrl.pop();
        }
        
    });

  }

}
