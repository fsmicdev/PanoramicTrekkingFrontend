import {Component, OnInit} from '@angular/core';
import {TagService} from '@/_services/tag/tag.service';
import {Tag} from '@/_models/tag';

@Component({
  selector: 'app-manage-tags',
  templateUrl: './manage-tags.component.html',
  styleUrls: ['./manage-tags.component.css']
})
export class ManageTagsComponent implements OnInit {

  usersTags: Tag[];

  constructor(public tagService: TagService) {
  }

  ngOnInit() {
    console.log('In ManageTagsComponent.ngOnInit()');

    // @TODO: Grab the user's existing tags, via the TagService
    // tagService.grabUsersTags(loggedInUser.id);
    this.usersTags = this.tagService.grabUsersTags(1);

  }

}
