import { BrowserModule, DomSanitizer } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ThyIconRegistry } from 'ngx-tethys';
import { HttpClientModule } from '@angular/common/http';

const appIconNames = ['app-wiki-square-fill', 'app-wiki-square-fill-large', 'logo'];

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})

export class AppModule {
  constructor(private iconRegistry: ThyIconRegistry, private sanitizer: DomSanitizer) {
      this.registerGlobalIcons();
  }

  private registerGlobalIcons() {
      const svgIconUrl = 'http://lib.worktile.live/icons/assets/icons/defs/svg/sprite.defs.svg';

      this.iconRegistry.addSvgIconSet(this.sanitizer.bypassSecurityTrustResourceUrl(svgIconUrl));
      // appIconNames.forEach(iconName => {
      //     this.iconRegistry.addSvgIcon(
      //         iconName,
      //         this.sanitizer.bypassSecurityTrustResourceUrl(`sr/assets/app-icons/${iconName}.svg`)
      //     );
      // });
  }
}

