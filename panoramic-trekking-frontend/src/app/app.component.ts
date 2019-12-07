import { Component, OnInit } from '@angular/core';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer, Title } from '@angular/platform-browser';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { filter, map } from 'rxjs/operators';

import { AuthenticationService } from './_services';
import { User } from './_models';

const suffixTitle = ' : Panoramic Trekking';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  currentUser: User;
  isLoginPage = true;

  constructor(private titleService: Title,
              private router: Router,
              private activatedRoute: ActivatedRoute,
              private authenticationService: AuthenticationService) {
    this.authenticationService.currentUser.subscribe(x => this.currentUser = x);
  }

  ngOnInit() {
    const title = this.titleService.getTitle();

    this.router
      .events.pipe(
      filter(event => event instanceof NavigationEnd),
      map(() => {
        const child = this.activatedRoute.firstChild;

        if (child.snapshot.data.title) {
          return child.snapshot.data.title;
        }

        console.log('>>> title: ', title);

        return title;
      })
    ).subscribe((documentTitle: string) => {
      const docTitleForPage = documentTitle + suffixTitle;

      this.titleService.setTitle(docTitleForPage);
    });
  }

  logout() {
    this.authenticationService.logout();
    this.router.navigate(['/login']);
  }
}
