import {Component, OnInit} from '@angular/core';
import {MatIconRegistry} from '@angular/material/icon';
import {DomSanitizer} from '@angular/platform-browser';

@Component({
  selector: 'app-view-photo-details',
  templateUrl: './view-photo-details.component.html',
  styleUrls: ['./view-photo-details.component.css']
})
export class ViewPhotoDetailsComponent implements OnInit {

  constructor(iconRegistry: MatIconRegistry, sanitizer: DomSanitizer) {
    iconRegistry.addSvgIcon(
      'facebook-share',
      sanitizer.bypassSecurityTrustResourceUrl('assets/images/facebook.svg'));
    // Icon attained from https://www.flaticon.com/free-icon/facebook_174848
    // Icon made by [author link] from www.flaticon.com
    // Attribution style:
    // <p class="wysiwyg-text-align-center"><strong><em>Icon made by&nbsp;
    // </em></strong><a href="https://www.freepik.com/home"><strong><em>Freepik</em></strong></a><strong>
    // <em>&nbsp;from&nbsp;</em></strong><strong><em>
    // <a href="http://www.flaticon.com/">www.flaticon.com</a></em></strong>
    // </p>
  }

  ngOnInit() {
  }

}
