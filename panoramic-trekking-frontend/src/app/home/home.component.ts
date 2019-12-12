import { Component, OnInit } from '@angular/core';

import { DomSanitizer } from '@angular/platform-browser';
import { MatIconRegistry } from '@angular/material/icon';

import { first } from 'rxjs/operators';

import {Photos, User} from '../_models';
import { UserService, AuthenticationService } from '../_services';
import {PhotosService} from "@/_services/photos.service";

@Component({ templateUrl: 'home.component.html' })
export class HomeComponent implements OnInit {
    currentUser: User;
    users = [];

    constructor(private authenticationService: AuthenticationService,
                private userService: UserService,
                private photosService: PhotosService) {
        this.currentUser = this.authenticationService.currentUserValue;
        console.log('>>>>> >>>>> >>>>> In HomeComponent, this.currentUser: ', this.currentUser);

        if (this.currentUser && this.currentUser.id) {
          console.log('>>>>> All photos for current logged-in user...');

          const photosArray: Photos[] = new Array()

          this.photosService.getAllPhotosForOwnerUser(this.currentUser.id).subscribe(
              resp => {
                console.log('>>>>> Photos RESPONSE data: ' + resp);

                for (const dataRec of resp) {
                  console.log('>>> Result record: ', dataRec);

                  const aPhoto = Object.assign(new Photos(), dataRec);
                  console.log('>>>>> AS A PHOTO: ', aPhoto);
                  photosArray.push(aPhoto);
                }

                console.log('>>>>> >>>>> >>>>> photosArray: ', photosArray);
              }
            );
        }
    }

    ngOnInit() {
        // this.loadAllUsers();
    }

    deleteUser(id: number) {
        this.userService.delete(id)
            .pipe(first())
            .subscribe(() => this.loadAllUsers());
    }

    private loadAllUsers() {
        this.userService.getAll()
            .pipe(first())
            .subscribe(users => this.users = users);
    }
}
