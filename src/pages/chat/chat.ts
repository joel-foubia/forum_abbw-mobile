import { Storage } from '@ionic/storage';
import { Component, Input, ViewChild } from '@angular/core';
import firebase from 'firebase';
import * as moment from 'moment';
import { IonicPage, NavController, NavParams, Slides, ToastController, Content } from 'ionic-angular';

/**
 * Generated class for the ChatPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
	selector: 'page-chat',
	templateUrl: 'chat.html',
	queries: {
		content: new ViewChild(Content)
	}
})
export class ChatPage {
	@ViewChild(Slides) slides: Slides;
	@ViewChild('input') myInput;
	@ViewChild(Content) content: Content;
	step = 'Next';
	choosedInterest;
	start = false;
	selectedInterests = [];
	storedInterests = [];
	icon = 'star';
	pseudo = '';
	message = '';
	firstChatt: boolean = true;
	allinterests = [];
	messages = [];
	interests = [];
	max: 10;
	my_image: any;
	uniqueId;

	constructor(
		public navCtrl: NavController,
		public navParams: NavParams,
		public storage: Storage,
		public toastCtrler: ToastController
	) {
		// this.presenttoast('veuillez sélectionner un centre intérêt pour interargir avec les autres membres !');
		this.getProfileImage();
		this.getUniquePseudo();
	}

	getProfileImage() {
		this.storage.get('profile_image').then((data) => {
			if (data) {
				this.my_image = data;
			}
		});
	}

	getUniquePseudo() {
		this.storage.get('unique_pseudo').then((data) => {
			if (data) {
				this.uniqueId = data;
				console.log('Unique ID', this.uniqueId)
			}
		});
	}
	startChat() {
		if (/^[a-zA-Z]+$/.test(this.pseudo)) {
			this.start = true;
			this.storage.set('firstChat', false);
			this.storage.set('pseudo', this.pseudo);
		} else {
			this.presenttoast('Entrer un pseudo valide EX. Landry');
		}
	}

	ionViewDidEnter() {
		this.storage.get('interests').then((interests) => {
			this.storedInterests = interests;
			console.log('Interests=>', interests)
		});
		this.storage.get('pseudo').then((pseudo) => {
			this.pseudo = pseudo;
		});
	}
	ionViewDidLoad() {
		setTimeout(() => {
			this.myInput.setFocus();
		}, 300);
	}

	scrollToBottom() {
		let dimensions = this.content.getContentDimensions();
		this.content.scrollTo(0, dimensions.scrollHeight + 100, 100);
	}

	send() {
		if (this.message == '') {
		} else if (this.choosedInterest != undefined) {
			firebase
				.database()
				.ref('/db_chat')
				.push({
					d_publication: moment().format('MMMM Do YYYY h:mm:ss a'),
					id_centre_interet: this.choosedInterest.id,
					username: this.pseudo,
					message: this.message,
					prof_img: this.my_image,
					uid: this.uniqueId
				})
				.then(() => {
					this.message = '';
					this.scrollToBottom();
				})
				.catch(() => {});
		} else {
			this.presenttoast("Choissisez un centre d'interets pour y chatter");
		}
	}

	onSelectInterest(item) {
		item.selected = true;
		this.choosedInterest = item;
		for (let k = 0; k < this.storedInterests.length; k++) {
			if (item.id != this.storedInterests[k].id) {
				this.storedInterests[k].selected = false;
			}
		}

		firebase.database().ref('/db_chat').on('value', (snapshot) => {
			this.messages = [];
			snapshot.forEach((snap) => {
				if (snap.val().id_centre_interet == item.id) {
					this.messages.push({
						date_pub: snap.val().d_publication,
						id_CI: snap.val().id_centre_interet,
						message: snap.val().message,
						username: snap.val().username,
						prof_img: snap.val().prof_img,
						uid: snap.val().uid
					});
				} else {
				}
				return false;
			});
		});
	}

	goToNextSlide() {
		this.slides.slideNext();
		if (this.step === 'Next') {
		} else {
			this.startChatt();
		}
		this.step = 'Start Chatting!';
	}
	slideChanged() {
		if (this.slides.isBeginning() === true) {
			this.step = 'Next';
		} else {
			this.step = 'Start Chatting!';
		}
	}

	addInterest(interest) {
		//console.log(this.interests);
		this.storage.get('interests').then((ints) => {
			if (ints) {
			} else {
				if (interest.fav === 'star') {
					interest.fav = 'starFull';
					this.selectedInterests.push(interest.title);
				} else {
					this.selectedInterests.splice(this.selectedInterests.indexOf(interest.title), 1);
					interest.fav = 'star';
				}
				console.log(this.selectedInterests);
			}
		});
	}

	presenttoast(flag) {
		let toast = this.toastCtrler.create({
			message: flag,
			showCloseButton: true,
			duration: 3000,
			position: 'bottom'
		});
		toast.present();
	}

	startChatt() {
		if (this.pseudo === '' || this.selectedInterests.length === 0) {
			this.presenttoast("Entrer un pseudo et une centre d'intérêt pour commencer la discussion");
		} else {
			this.storage.set('interests', this.selectedInterests);
			this.storage.set('chatPseudo', this.pseudo);
		}
	}
	doInfinite(infiniteScroll) {
		this.max += 10;
		infiniteScroll.complete();
	}
}
