import { Component, OnInit } from '@angular/core';
import { ToastController, LoadingController, NavController } from '@ionic/angular';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from "@angular/fire/firestore"

@Component({
  selector: 'app-practice',
  templateUrl: './practice.page.html',
  styleUrls: ['./practice.page.scss'],
})
export class PracticePage implements OnInit {
  cards: any;

  constructor(
    private toastCtrl: ToastController,
    private loadingCtrl: LoadingController,
    private navCtrl: NavController,
    private afAuth: AngularFireAuth,
    private firestore: AngularFirestore
  ) { }

  ngOnInit() {
  }

  async getCards() {
    //show loader
    let loader = this.loadingCtrl.create({
      message: "Please wait..."
    });
    (await loader).present();

    try {
      this.firestore.collection("cards")
      .snapshotChanges()
      .subscribe(data => {
        this.cards = data.map(e => {
          return {
            id: e.payload.doc.id,
            targetLanguage: e.payload.doc.data()["targetLanguage"],
            motherLanguage: e.payload.doc.data()["motherLanguage"]
          };
        });
      });

      //dismiss loader
      (await loader).dismiss();

    } catch(e) {
      this.showToast(e);
      
    }
  }
  showToast(message: string) {
    this.toastCtrl.create({
      message: message,
      duration: 3000
    }).then(toastData => toastData.present());
  }

}
