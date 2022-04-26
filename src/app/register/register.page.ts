import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { AlertController, NavController } from '@ionic/angular';
import { AuthenticationService } from '../authentication-service';
/* import '../../assets/js/widgets.js';
import "../../assets/js/custom/authentication/sign-up/general.js"; */

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

  isLoad: boolean = false;
  token: any;
  
  constructor(private authService: AuthenticationService, private navCtrl: NavController, public alertController: AlertController, public afstore: AngularFirestore) { }

  ngOnInit() {
  
  }

  signUp(firstname, lastname, email, password, confirmpassword){
    console.log( firstname.value, lastname.value, email.value, password.value, confirmpassword.value);
    const nome = firstname.value;
    const sobrenome = lastname.value;
    const Email = email.value;
    const Password = password.value;
    setTimeout(()=>{
      this.isLoad = true;   
    },0);
    setTimeout(()=>{
      this.authService.RegisterUser(Email, Password)      
      .then((res) => {
        this.token = res.user.uid;
        console.log('Cadastrado feito com sucesso!');
        this.saveData(nome, sobrenome, Email)
        // Do something here
      }).catch(async (error) => {
        if(error.code == "auth/email-already-in-use"){
          const alert = await this.alertController.create({
            cssClass: 'my-custom-class',
            header: 'Atenção',
            subHeader: 'verifique e tente novamente',
            message: 'Esse e-mail já está cadastrado',
            buttons: ['OK']
          });
          await alert.present();
          this.isLoad = false;
        }
        if(error.code == "auth/invalid-email"){
          const alert = await this.alertController.create({
            cssClass: 'my-custom-class',
            header: 'Atenção',
            subHeader: 'verifique e tente novamente',
            message: 'Digite um E-mail válido!',
            buttons: ['OK']
          });
          await alert.present();
          this.isLoad = false;
        }
        console.log(error.message);
      });
    },1000);
  }

  saveData(nome, sobrenome, Email){
    const ID = this.token;   
    setTimeout(()=>{
      console.log( nome, sobrenome, Email);
    },0);
    setTimeout(()=>{
      this.afstore.doc(`usuarios/${this.token}`).set({
        ID, nome, sobrenome, Email
      });
      this.navCtrl.navigateForward('invoicing');
    },1000);
  }

  back(){
    this.navCtrl.navigateForward('login');
  }

}
