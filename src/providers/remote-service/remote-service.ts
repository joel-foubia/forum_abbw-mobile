import { Injectable } from '@angular/core';
import { ToastController, LoadingController } from 'ionic-angular';
import { Http } from '@angular/http';
import { YoutubeVideoPlayer } from '@ionic-native/youtube-video-player';

import { ApiConfig } from '../../config';

import 'rxjs/add/operator/map';


@Injectable()
export class RemoteServiceProvider {
	
  constructor(private objHttp: Http, public toastCtrl: ToastController, public loadCtrl: LoadingController, private youtube: YoutubeVideoPlayer) {
    
  }

  /***
   * On récupère la description de
   * l'association
   * 
   * @param objURL Object, Cet object contient URL du serveur
   * @param type string, permet d'identifier (présentation, missions, objectifs)
   * @return callback, retourne un Objet Promise pour récupérer la réponse reçue par le serveur
   **/
  detailsAssociation(objURL, type){

      let url;
      url = objURL.url+ApiConfig.url_participants;
      /*if(type=="Présentation")
        url = objURL.url+ApiConfig.url_participants;
      else if(type=="Missions")
        url = objURL.url+ApiConfig.url_missions;
      else if(type=="Objectifs")
        url = objURL.url+ApiConfig.url_objectifs;*/

      return this.objHttp.get(url).map(res => res.json());
  }

  /***
   * On récupère la description de
   * sur les missions de l'association
   * 
   * @param objURL Object, Cet object contient URL du serveur
   * @return callback, retourne un Objet Promise pour récupérer la réponse reçue par le serveur
   **/
  detailsMissions(objURL){

      let url = objURL.url+ApiConfig.url_organisation;

      return this.objHttp.get(url).map(res => res.json()); 
  }

  /***
   * On récupère la liste des pays
   * 
   * @return callback, retourne un Objet Promise 
   **/
  listOfCountries(){

    return this.objHttp.get(ApiConfig.url_pays).map(res => res.json()); 
  }

  /***
   * On récupère la description de
   * sur les objectifs de l'association
   * 
   * @param objURL Object, Cet object contient URL du serveur
   * @return callback, retourne un Objet Promise pour récupérer la réponse reçue par le serveur
   **/
  detailsObjectifs(objURL){

      let url = objURL.url+ApiConfig.url_objectifs;

      return this.objHttp.get(url).map(res => res.json());
  }

  /***
   * On récupère la description de
   * sur la maladie Le Noma
   *
   * @param objURL Object, Cet object contient URL du serveur
   * @return callback, retourne un Objet Promise pour récupérer la réponse reçue par le serveur 
   **/
  detailsLeNoma(objURL){

      let url = objURL.url+ApiConfig.url_packs;

      return this.objHttp.get(url).map(res => res.json());
  }

  /**
   * Cette fonction permet de récupérer
   * la liste des actualités de l'association
   *
   * @param objURL Object, Cet object contient URL du serveur
   * @return callback, retourne un Objet Promise pour récupérer la réponse reçue par le serveur 
   **/
  getListNews(objURL){ 

      let url = objURL.url+ApiConfig.url_gallerie;

      return this.objHttp.get(url).map(res => res.json());
  }

  /**
   * Cette fonction permet de 
   * récupérer la liste des parrains
   **/
  getListParrains(objURL){
    
    let url = objURL.url+ApiConfig.url_about;

    return this.objHttp.get(url).map(res => res.json());
  }

  /**
   * Cette fonction permet de 
   * récupérer la liste des parrains
   **/
  getLocation(objURL){
    
    let url = objURL.url+ApiConfig.url_location;

    return this.objHttp.get(url).map(res => res.json());
  }

  /**
   * Cette fonction permet de 
   * récupérer la liste des parrains
   **/
  getPartners(objURL){
    
    let url = objURL.url+ApiConfig.url_partner;

    return this.objHttp.get(url).map(res => res.json());
  }

  /**
   * Cette fonction permet de récupérer
   * une news spécifique
   *
   * @param objURL Object, Cet object contient URL du serveur
   * @param id int, l'identifiant de la news
   * @return callback, retourne un Objet Promise pour récupérer la réponse reçue par le serveur 
   **/
  getItemNews(objURL, id){

      let url = objURL.url+ApiConfig.url_gallerie;

      return this.objHttp.get(url).map(res => res.json());
  }

  /**
   * Cette fonction permet de récupérer l'id de la vidéo
   * YouTube et d'ouvrir le lecteur vidéo Youtube
   *
   **/
  readYTVideo(urlVideo){
    let tab = urlVideo.split("=");
    
    this.youtube.openVideo(tab[1]);
  }


 /** Permet d'envoyer un message lorsqu'aucune annonce existe **/
  getMessage(msg){
    let toast = this.toastCtrl.create({
      message: msg,
      duration: 3000,
      position: 'top'
    });

    toast.present();
  }

  getErrorNetwork(){
   let toast = this.toastCtrl.create({
      message: "Vous ne pouvez pas consulter les informations. Veuillez consulter votre connexion Internet",
      duration: 3000,
      position: 'top'
    });

    toast.present(); 
  }

  //On définit le loading
  objLoading(){

    let loading = this.loadCtrl.create({  spinner: 'dots' });

    return loading;
  }

}
