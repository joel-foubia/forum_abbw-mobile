import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { LazyLoadImageModule } from 'ng-lazyload-image';
//import { TruncateModule } from 'ng2-truncate';
import { EmailComposer } from '@ionic-native/email-composer';
import { YoutubeVideoPlayer } from '@ionic-native/youtube-video-player';
import { InAppBrowser } from '@ionic-native/in-app-browser';

//import { ListPaysPage } from '../pages/list-pays/list-pays';
//import { PopSignPage } from '../pages/pop-sign/pop-sign';
/*import { FormParrainPage } from '../pages/form-parrain/form-parrain';
import { DetailsContactPage } from '../pages/details-contact/details-contact';*/

// import { AboutPage } from '../pages/about/about';
import { Camera, CameraOptions } from '@ionic-native/camera';

//import { ContactPage } from '../pages/contact/contact';
//import { HomePage } from '../pages/home/home';
import { TabsPage } from '../pages/tabs/tabs';
//import { MenuPage } from '../pages/menu/menu';
/*import { NomaProgramPage } from '../pages/noma-program/noma-program';
import { BenevolesPage } from '../pages/benevoles/benevoles';*/
//import { PetitionPage } from '../pages/petition/petition';
/*import { NomaPage } from '../pages/noma/noma';
import { NewsPage } from '../pages/news/news';
import { DetailsNewsPage } from '../pages/details-news/details-news';*/
//import { BenevoleFormPage } from '../pages/benevole-form/benevole-form';

import { MapsLayout2 } from '../components/maps/layout-2/maps-layout-2';
//import { CircleProgressComponent } from '../components/circle-progress/circle-progress.component';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { HttpModule } from '@angular/http';
import { SocialSharing } from '@ionic-native/social-sharing';

import { AgmCoreModule } from '@agm/core';

import { IonicStorageModule } from '@ionic/storage';
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireOfflineModule } from 'angularfire2-offline';
import { AfProvider } from '../providers/af/af';
import { ImageProvider } from '../providers/image/image';
import { RemoteServiceProvider } from '../providers/remote-service/remote-service';
//import { PayPalModule } from '../pages/paypal/paypal.module';
import { AppRate } from '@ionic-native/app-rate';
import { CallNumber } from '@ionic-native/call-number';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { Http } from '@angular/http';
import { HttpClient } from '@angular/common/http';
import { DocumentViewer } from '@ionic-native/document-viewer';

/** Configuration Firebase **/
export const firebaseConfig = {
	apiKey: 'AIzaSyDV2twHEq47VPJLRAuSzsa0HFLrEZyh9xE',
	authDomain: 'abbw-mobile.firebaseapp.com',
	databaseURL: 'https://abbw-mobile.firebaseio.com',
	projectId: 'abbw-mobile',
	storageBucket: 'abbw-mobile.appspot.com',
	messagingSenderId: '418623453445',
};

export function createTranslateLoader(http: HttpClient) {
	return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

@NgModule({
	declarations: [
		MyApp,
		// AboutPage,
		MapsLayout2,
		//PopSignPage,
		//CircleProgressComponent,
		//HomePage,
		TabsPage,
		//ListPaysPage,
	],
	imports: [
		BrowserModule,
		AngularFireModule.initializeApp(firebaseConfig),
		LazyLoadImageModule,
		HttpModule,
		TranslateModule.forRoot({
			loader: {
				provide: TranslateLoader,
				useFactory: createTranslateLoader,
				deps: [Http],
			},
		}),
		AgmCoreModule.forRoot({ apiKey: 'AIzaSyB05TGEtdgWisNP4HCuvi8kLdpgheo1Oms' }),
		//TruncateModule,
		AngularFireDatabaseModule,
		AngularFireOfflineModule,
		HttpModule,
		//PayPalModule,
		IonicModule.forRoot(MyApp),
		IonicStorageModule.forRoot({
			name: '_ona_abbw',
		}),
	],
	bootstrap: [IonicApp],
	entryComponents: [
		MyApp,
		// AboutPage,
		MapsLayout2,
		TabsPage
		//CircleProgressComponent
	],
	providers: [
		StatusBar,
		SplashScreen,
		{ provide: ErrorHandler, useClass: IonicErrorHandler },
		AfProvider,
		CallNumber,
		AppRate,
		EmailComposer,
		DocumentViewer,
		YoutubeVideoPlayer,
		Camera,	
		SocialSharing,
		InAppBrowser,
		ImageProvider,
		RemoteServiceProvider,
	],
})
export class AppModule {}
