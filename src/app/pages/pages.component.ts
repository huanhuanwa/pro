import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserApiService } from '../core/services/api/user-api.service';
import { AuthService } from '../core/services/auth.service';
import { MENU_ITEMS } from './pages-menu';

@Component({
  selector: 'app-pages',
  templateUrl: './pages.component.html',
})
export class PagesComponent implements OnInit {

  constructor(public router: Router, public userApiService: UserApiService, public authService: AuthService) { }

  treeNodes = MENU_ITEMS;

  searchText = ''

  public thyIcons = { expand: 'angle-down', collapse: 'angle-right' };

  ngOnInit(): void {
    console.log(this.authService.user())
    // this.userApiService.fakeGetCurrentUser().subscribe(data=>{
    //   console.log(123,data)
    // })
  }

  onClickTitle(node) {
    if (node.link) {
      this.router.navigateByUrl(node.link)
    }
  }

}
