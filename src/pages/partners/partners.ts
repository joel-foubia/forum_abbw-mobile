import { Component } from '@angular/core';
import { IonicPage, ViewController, NavParams, MenuController } from 'ionic-angular';
import { RemoteServiceProvider } from '../../providers/remote-service/remote-service';
import { AfProvider } from '../../providers/af/af';
import { Slides } from 'ionic-angular';
import { ApiConfig } from '../../config';
import { ViewChild } from '@angular/core';


@IonicPage()
@Component({
  selector: 'page-partners',
  templateUrl: 'partners.html',
})
export class PartnersPage {
  @ViewChild("idSlide") slides: Slides;

	public partners = [];
  partenaire: any;

  array = []; 

  constructor(public vc: ViewController, 
              public navParams: NavParams,
              public menuCtrl: MenuController,  
              private afServ: AfProvider) {
  	this.loadPartners();
  }

  ionViewDidLoad() {
  }
  openMenu(){
  	this.menuCtrl.open();
  }

  // close(){
  // 	this.vc.dismiss();
  // }

  
loadPartners(){
  
  this.afServ.readPartners().then(reponse=>{

        this.partenaire = reponse[0];

        // for (let i=0; i<reponse.length;i+=3){
        //   this.partners.push([reponse[i],reponse[i+1],reponse[i+2]])

        // }
        // console.log('Classified', this.partners)

        // this.array = Object.keys(this.partenaire[0])
        /*console.log(' Array',this.array);
        console.log('Partner', this.partenaire);*/
     });
}


}





















































// loadPartners(){

//     let objLoad = this.apiServ.objLoading();
//     objLoad.present();

//     this.afServ.getSettingUser(ApiConfig.nom_setting).then((res) => {
        
//         if(res){
            
//           let objet = JSON.parse(res);
          
//           this.apiServ.getPartners(objet).subscribe((data)=>{
//           objLoad.dismiss();

//             if(data.length!=0){
//               console.log(data);
//                 this.partners = data.page.content;
//             } 
//             else
//               this.apiServ.getMessage("Aucune information en ce moment");
            
//           },
//           (err) =>{ //Pas de Connexion
            
//             objLoad.dismiss();
//             this.apiServ.getErrorNetwork();
//           });

//         }else{

//           objLoad.dismiss();
//           this.apiServ.getMessage("Veuillez activer votre connexion Internet puis Réessayer");
//           //this.navCtrl.pop();
//         }
        
//     });

//   }

