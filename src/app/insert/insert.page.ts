import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { LoadingController, NavController, ToastController } from '@ionic/angular';
import { Card } from '../models/cards.mode';
import { CardService } from '../services/card.service';

// import { AngularFireDatabase } from "@angular/fire/firestore"


@Component({
  selector: 'app-insert',
  templateUrl: './insert.page.html',
  styleUrls: ['./insert.page.scss'],
})
export class InsertPage implements OnInit {
  card = {} as Card;
  // cards: any;
  cardform: FormGroup;

  constructor(
    private toastCtrl: ToastController,
    private loadingCtrl: LoadingController,
    private navCtrl: NavController,
    private service: CardService,
    private fb: FormBuilder
    // private firestore: AngularFirestore
  ) { }

  ngOnInit() { }

  teste(card: Card) {
    console.log("message aleatoria", card)
    if (this.formValidation()) {
      //show loader
      let loader = this.loadingCtrl.create({
        message: "Please wait..."
      });
      // (await loader).present();

      try {
        // let a = this.firestore.collection("cards").add(card);
        // console.log("printando a", a)
      } catch (e) {
        this.showToast(e);
      }

      //dismiss loader
      // (await loader).dismiss();

      //redirect to home page
      this.navCtrl.navigateRoot("home");
    }
  }


  async createCard(card: Card) {
    console.log("!!!!!!!!!!card:", card)
    if (this.formValidation()) {
      this.service.save(this.card)
        .then(() => {
          this.toastCtrl.create({ message: 'card salvo com sucesso.', duration: 3000 }).finally();
          this.navCtrl.pop();
          // this.createForm();
        })
        .catch((e) => {
          this.toastCtrl.create({ message: 'Erro ao salvar a card.', duration: 3000 }).finally();
          console.error(e);
        });

      //redirect to home page
      this.navCtrl.navigateRoot("home");
    }
  }

  formValidation() {
    if (!this.card.targetLanguage) {
      this.showToast("Insira uma palavra para ser memorizada");
      return false;
    }

    if (!this.card.motherLanguage) {
      this.showToast("Insira uma tradução");
      return false;
    }

    return true;
  }

  showToast(message: string) {
    this.toastCtrl.create({
      message: message,
      duration: 3000
    }).then(toastData => toastData.present());
  }

}
