import { Component, OnInit } from '@angular/core';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer, Title } from '@angular/platform-browser';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { filter, map } from 'rxjs/operators';

const suffixTitle = ' : Panoramic Trekking';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  constructor(private titleService: Title,
              private router: Router,
              private activatedRoute: ActivatedRoute) {
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
}
