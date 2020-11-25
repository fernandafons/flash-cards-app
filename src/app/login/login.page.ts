import { AngularFireAuth } from 'angularfire2/auth';
import { Component, OnInit } from '@angular/core';
import { User } from '../models/user.mode';
import { ToastController, LoadingController, NavController } from '@ionic/angular';


@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  user = {} as User;

  constructor(
    public navCtrl: NavController,
    private toastCtrl: ToastController,
    private loadingCtrl: LoadingController,
    private frAuth: AngularFireAuth
  ) { }

  ngOnInit() {}

  async login(user: User) {
    if (this.formValidation()) {
      //show loader
      let loader = this.loadingCtrl.create({
        message: "Please wait..."
      });
      (await loader).present();

      try {
        await this.frAuth.auth.signInWithEmailAndPassword(user.email, user.password)
            .then(data => {
              console.log(data);

              // redirect to homepage
              this.navCtrl.navigateRoot("home");
            });
      } catch (e) {
        this.showToast(e);
      }

      //dismiss loader
      (await loader).dismiss();
    }
  }

  formValidation() {
    if (!this.user.email){
      this.showToast("Insira um email");
      return false;
    }

    if (!this.user.password){
      this.showToast("Insira uma senha válida");
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
