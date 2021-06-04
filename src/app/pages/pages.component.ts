import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MENU_ITEMS } from './pages-menu';

@Component({
  selector: 'app-pages',
  templateUrl: './pages.component.html',
})
export class PagesComponent implements OnInit {

  constructor( public router: Router) { }

  treeNodes = MENU_ITEMS;

  searchText = ''

  public thyIcons = { expand: 'angle-down', collapse: 'angle-right' };

  ngOnInit(): void {
  }

  onClickTitle(node){
    if(node.link){
      this.router.navigateByUrl(node.link)
    }
  }

}
