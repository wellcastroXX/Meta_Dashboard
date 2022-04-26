import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { AuthenticationService } from '../authentication-service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  isLoad: boolean = false;
  constructor(private authService: AuthenticationService, public navCtrl: NavController) { }

  ngOnInit() {
  }

  login(email, password){
    console.log(email.value, password.value);
    setTimeout(()=>{
      this.isLoad = true;   
    },0);
    setTimeout(()=>{
      console.log(email, password);
      this.authService.SignIn(email.value, password.value)
        .then((res) => {
          this.isLoad = false;
          this.navCtrl.navigateForward("invoicing");
        }).catch((error) => {
          this.isLoad = false;
        })
    },2500);
  }

  register(){
    this.navCtrl.navigateForward("register");
  }

}
