import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';

import { MdDialog, MdDialogRef } from '@angular/material';
import { LoginComponent } from '../login/login.component';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, OnDestroy {

  username: string = undefined;
  subscription: Subscription;

  constructor(public dialog: MdDialog,
    private authService: AuthService ) { 
    }

  ngOnInit() {
    this.authService.loadUserCredentials();
    this.subscription = this.authService.getUsername()
      .subscribe(name => { console.log(name); this.username = name; });    
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  openLoginForm() {
    let loginRef = this.dialog.open(LoginComponent, {width: '500px', height: '450px'});

    loginRef.afterClosed()
      .subscribe(result => {
        console.log(result);
      });
  }

  logOut() {
    this.username = undefined;
    this.authService.logOut();
  }

}