import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  password: string = ''; // Initialize password
  passwordFieldType: string = 'password'; // Default to password type
  showPasswordText: string = 'Show'; // Default button text
  eye: boolean = false;
  togglePasswordVisibility() {
    // Toggle password field type and button text
    if (this.passwordFieldType === 'password') {
      this.passwordFieldType = 'text';
      this.showPasswordText = 'Hide';
      this.eye = true;
    } else {
      this.passwordFieldType = 'password';
      this.showPasswordText = 'Show';
      this.eye = false;
    }
  }
  constructor() {}

  ngOnInit(): void {}
}
