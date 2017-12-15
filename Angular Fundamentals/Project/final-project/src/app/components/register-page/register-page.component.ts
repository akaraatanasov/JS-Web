import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {AuthService} from "../../services/auth-service/auth.service";
import {ToastrService} from "../../services/toastr-service/toastr.service";

@Component({
  selector: 'app-register-page',
  templateUrl: './register-page.component.html',
  styleUrls: ['./register-page.component.css']
})
export class RegisterPageComponent implements OnInit {
  email: string;
  username: string;
  password: string;
  repeatedPassword: string;
  wallet: string;
  iban: string;
  bitBalance: number = 0;
  eurBalance: number = 0;

  constructor(private router: Router, private toastr: ToastrService, private auth: AuthService) {
  }

  ngOnInit() {
  }

  getBack() {
    window.history.back();
  }

  submitRegister() {
    const message = this.auth.validateRegisterForm(this.username, this.email, this.password, this.repeatedPassword, this.wallet, this.iban);
    if(!message.success){
      this.toastr.errorToast(message.error);
      return;
    }

    this.toastr.toast('Registering ...');
    this.auth.register(this.username, this.email, this.password, this.wallet, this.iban, this.bitBalance, this.eurBalance).subscribe(
      data => {
        if (data.isAdmin) {
          localStorage.setItem('role', data._kmd._id);
        } else {
          localStorage.setItem('role', 'init');
        }
        this.toastr.successToast('Successful registration.');
        localStorage.setItem('authtoken', data._kmd.authtoken);
        localStorage.setItem('username', data.username);
        localStorage.setItem('userId', data._id);
        this.router.navigate(['/offers']);
      },
      err => {
        this.toastr.errorToast((err.error.description ? err.error.description : 'Unknown error occured. Please try again'));
      }
    );
  }
}
