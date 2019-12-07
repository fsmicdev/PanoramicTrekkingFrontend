import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import {Tag} from '../../_models/model';

@Injectable({
  providedIn: 'root'
})
export class TagService {

  constructor() {
  }

  grabUsersTags(userId: number): Tag[] { // Observable<Tag[]> {
    // ###########################################
    // ##### N.B. Mocked data only initially #####
    // ###########################################
    const tags = [] as Tag[];

    const tag1 = new Tag();
    tag1.id = 1;
    tag1.ownerUserId = 1;
    tag1.tagWord = 'RUSSIA';

    const tag2 = new Tag();
    tag2.id = 2;
    tag2.ownerUserId = 1;
    tag2.tagWord = 'ISLAND';

    const tag3 = new Tag();
    tag3.id = 3;
    tag3.ownerUserId = 1;
    tag3.tagWord = 'SOLVETSKY ISLANDS';

    const tag4 = new Tag();
    tag4.id = 4;
    tag4.ownerUserId = 1;
    tag4.tagWord = 'MONASTERY';

    tags.push(tag1);
    tags.push(tag2);
    tags.push(tag3);
    tags.push(tag4);

    return tags;
  }
}
