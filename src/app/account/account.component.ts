import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.scss'],
})
export class AccountComponent implements OnInit {
  public emailAddress: string;
  constructor(private store: Store<any>) {}

  ngOnInit() {
    console.log('loaded account component');
  }

  logout() {}
}
