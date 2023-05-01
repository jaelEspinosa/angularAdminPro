import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SettingsService {

  private linkTheme = document.querySelector('#theme')
  private linkThemeArray!: NodeListOf<Element>

  constructor() {
    const theme = localStorage.getItem('theme') || './assets/css/colors/blue-dark-theme'
    this.linkTheme?.setAttribute('href', theme)

  }


  changeTheme( theme :string ){

    const url = `./assets/css/colors/${theme}.css`
    this.linkTheme?.setAttribute('href', url)
    localStorage.setItem('theme', url)
    this.checkTheme ()

  }

  checkTheme () {
    //obtento el array de elementos del dom a manipular
    this.linkThemeArray = document.querySelectorAll('.selector')

    //los itero para remover la clase 'working'
    this.linkThemeArray.forEach(element => {
      //removemos la clase 'working'
      element.classList.remove('working')
      // obtenemos la 'data-theme' del element iterado,
      const btnTheme = element.getAttribute('data-theme')
      // construimos el url
      const btnThemeUrl = `./assets/css/colors/${btnTheme}.css`
      // obtenemos el 'href' del link en el index.html que seria
      // el theme current
      const currentTheme = this.linkTheme?.getAttribute('href')
      // por último comparamos la url que hemos construido
      // con el 'href' del index. y si ambos son iguales,
      // es a este elemento al que hay que añadir la clase 'working'
      if(btnThemeUrl === currentTheme){
        element.classList.add('working')
      }

    })

 }


}
