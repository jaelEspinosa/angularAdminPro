import { Component, OnInit } from '@angular/core';
import { SettingsService } from '../../services/settings.service';

@Component({
  selector: 'app-account-settings',
  templateUrl: './account-settings.component.html',
  styles: [
  ]
})
export class AccountSettingsComponent implements OnInit {

  /* public linkTheme: Element | null = document.querySelector('#theme')
  public linkThemeArray!: NodeListOf<Element> */

  constructor(private settingsService: SettingsService){}

  ngOnInit(){
    this.settingsService.checkTheme()
  }


  changeTheme( theme :string ){

  this.settingsService.changeTheme(theme)

  }


}
