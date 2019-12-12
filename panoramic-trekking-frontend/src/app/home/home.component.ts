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

          this.photosService.getAllPhotosForOwnerUser(this.currentUser.id).subscribe(
              resp => {
                console.log('ALL PHOTOS RESPONSE: ', resp);
                // const keys = resp.headers.keys();
                // this.headers = keys.map(key =>
                //   `${key}: ${resp.headers.get(key)}`);

                // for (const data of resp.body) {
                //  this.smartphone.push(data);
                // }

                console.log('>>>>> Photos data: ' + resp);
                // const loggedInUser = Object.assign(new Photos(), data);
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
