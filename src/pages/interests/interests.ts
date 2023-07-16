import { Storage } from '@ionic/storage';
import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, Slides, ToastController, PopoverController } from 'ionic-angular';
import firebase from 'firebase';
import { Camera, CameraOptions } from '@ionic-native/camera';
import * as moment from 'moment';

// import { MainPage } from '../pages/main/main';

/**
 * Generated class for the InterestsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
	selector: 'page-interests',
	templateUrl: 'interests.html'
})
export class InterestsPage {
	showslide: boolean;
	@ViewChild(Slides) slides: Slides;
	pseudo = '';
	selectedInterests = [];
	interests = [];
	sliding = true;
	start = true;
	allinterests = [];
	picture = 'assets/img/icon.png';
	constructor(
		public navCtrl: NavController,
		public navParams: NavParams,
		public storage: Storage,
		public toastCtrler: ToastController,
		public camera: Camera,
		public popoverCtrl: PopoverController
	) {
		this.storage.get('interests').then((interests) => {
			if (interests) {
				this.sliding = false;
			}
		});

		firebase.database().ref('/centres_interet').on('value', (data) => {
			var array = [];
			var col = [];
			array = data.val();
			this.allinterests = data.val();
			for (let i = 0; i < array.length; i += 2) {
				this.interests.push([ array[i], array[i + 1] ]);
			}
		});
	}

	ionViewDidLoad() {
		/* this.storage.get('interests').then(interests => {
			if (interests) {
				this.showslide = false;
			} else {
				this.showslide = true;
			}
		}); */
	}

	slideChanged() {
		if (this.slides.isBeginning() === true) {
			this.start = true;
		} else if (this.slides.isEnd() === true) {
			this.start = false;
			let popover = this.popoverCtrl.create(
				'PopSignPage',
				{ interests: this.allinterests, type: 'interests' },
				{ cssClass: 'custom-popinterests', enableBackdropDismiss: false }
			);
			popover.present();

			popover.onDidDismiss((data) => {
				if (data) {
					this.selectedInterests = data;
				}
			});
		} else {
			this.start = true;
		}
	}

	startChatting() {
		if (/^[a-zA-Z0-9]+$/.test(this.pseudo)) {
			if (this.selectedInterests.length === 0) {
				this.presenttoast("Choisissez au moins un centre d'interets");
			} else {
				this.storage.set('interests', this.selectedInterests);
				this.storage.set('pseudo', this.pseudo);
				this.storage.set('unique_pseudo', this.pseudo + moment().format('x'));
				this.storage.set('profile_image', this.picture);
				this.navCtrl.setRoot('MainPage');
			}
		} else {
			this.presenttoast('Veuillez ajouter un pseudo et une image de profile');
			this.slides.slideTo(1);
		}
	}

	openQR() {}
	presenttoast(flag) {
		let toast = this.toastCtrler.create({
			message: flag,
			duration: 3000,
			position: 'bottom'
		});
		toast.present();
	}

	addInterest(interest) {
		this.storage.get('interests').then((ints) => {
			if (ints) {
			} else {
				if (interest.fav === 'star') {
					interest.fav = 'starFull';
					this.selectedInterests.push(interest);
				} else {
					this.selectedInterests.splice(this.selectedInterests.indexOf(interest.title), 1);
					interest.fav = 'star';
				}
			}
		});
	}

	takePicture() {
		this.camera
			.getPicture({
				allowEdit: true,
				cameraDirection: 1,
				quality: 100,
				destinationType: 0,
				targetWidth: 800,
				targetHeight: 800,
				correctOrientation: true
			})
			.then((img: any) => {
				this.picture = 'data:image/png;base64,' + img;
			})
			.catch((err) => {});
	}

	nextSlide() {
		this.storage.get('interests').then((interests) => {
			if (interests) {
				this.navCtrl.setRoot('MainPage');
			} else {
				this.slides.slideNext();
				this.start = false;
			}
		});
	}
}
