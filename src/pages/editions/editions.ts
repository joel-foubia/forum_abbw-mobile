import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController } from 'ionic-angular';
import { AfProvider } from '../../providers/af/af';
import { ViewChild } from '@angular/core';
import { Slides } from 'ionic-angular';
import { RemoteServiceProvider } from '../../providers/remote-service/remote-service';

/**
 * Generated class for the EditionsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-editions',
  templateUrl: 'editions.html',
})
export class EditionsPage {
  @ViewChild("wizardSlider") slides: Slides;
  infos:any;
  slider : any;
  objSpinner;
  public edition: any;

  constructor(
              public navCtrl: NavController, 
              public navParams: NavParams, 
              private afServ: AfProvider, 
              private apiServ: RemoteServiceProvider,
              public modalCtrl: ModalController) {
              
              this.loadEditions();
  }

  ionViewDidLoad() {
    
  }
  changeSlide(index: number): void {
		if (index > 0) {
			this.slides.slideNext(300);
		} else {
			this.slides.slidePrev(300);
		}
  }

  show(value: string): boolean {
		let result: boolean = false;
		try {
			if (value == 'prev') {
				result = !this.slides.isBeginning();
			} else if (value == 'next') {
				result = this.slides.getActiveIndex() < this.slides.length() - 1;
				// console.log(this.slider.getActiveIndex());
			} else if (value == 'finish') {
				result = this.slides.isEnd();
			}
      return result;
    }
    catch (e) {
      return false;
    }
	}

  loadEditions(){
  	this.objSpinner = true;
    this.afServ.getLastEditions((res)=>{
      console.log(res);
      this.infos = res;
      this.objSpinner = false;
    });
  }

  openEdition(objet){
    let addModal = this.modalCtrl.create('BenevoleFormPage', {'objet': objet });
    addModal.present();
  }
  showVideo(){
    for (let i = 0; i < this.infos.length; i++) {
      var view = this.infos[i];
      this.apiServ.readYTVideo(view.url);    
      
    }
  }

}
