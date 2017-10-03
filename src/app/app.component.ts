import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  loadedFeature = 'recipes';
  
  ngOnInit(){
    firebase.initializeApp({
      apiKey: "AIzaSyDrFnKzZed5db9xtADvVCWAfT9D8nwID50",
      authDomain: "angular-tutorial-http-3b3b6.firebaseapp.com",
    })
  }
  
  onNavigate(feature: string){
    this.loadedFeature = feature;
  }
}
