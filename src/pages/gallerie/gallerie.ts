import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AfProvider } from '../../providers/af/af';

import { RemoteServiceProvider } from '../../providers/remote-service/remote-service';
import { ApiConfig } from '../../config';


@IonicPage()
@Component({
  selector: 'page-gallerie',
  templateUrl: 'gallerie.html',
})
export class GalleriePage {

	public params: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, private afServ: AfProvider, private apiServ: RemoteServiceProvider) {
  	this.loadImages();
  }

  ionViewDidLoad() {
    
  }

  //Cette fonction permet de charger les images
  loadImages(){

   	
  	let objLoad = this.apiServ.objLoading();
    objLoad.present();

    this.afServ.getSettingUser(ApiConfig.nom_setting).then((res) => {
        
        if(res){
            
          let objet = JSON.parse(res);
          
          this.apiServ.getListNews(objet).subscribe((data)=>{
          objLoad.dismiss();
          console.log(data);
            if(data.length!=0){
   	            console.log('params '+this.params);
              
   	            this.params = {
   	            	data : { items : null, fullscreen: '' }
   	            };

   	            this.params.data.items = this.buildGallery(data.page.attachments);
   	            this.params.data.fullscreen = 'ItemDetailsPageFullScreenGallery';
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

  //Build Images gallery
  private buildGallery(items){

  	let results =[];
  	for (let i = 0; i < items.length; i++) {
  		results.push({
  			'id': (i+1),
        'title': 'Legend '+(i+1),
  			'image': items[i].url,
        'favorite': false,
  		});
  	}

  	return results;
  }

}
