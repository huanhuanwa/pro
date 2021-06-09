import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  model = {
    username: '',
    password: ''
};

saving = false;

constructor(public authService: AuthService, private router: Router) {}


login() {
    if (this.saving) {
        return;
    }
    this.saving = true;
    this.authService.fakeAccountLogin(this.model).subscribe(item=>{
      this.saving = false;
      this.router.navigate(['/', ])
    })
}

cancel() {
    this.model = {
         username: '',
        password: ''
    };
}
  ngOnInit(): void {
  }

}
