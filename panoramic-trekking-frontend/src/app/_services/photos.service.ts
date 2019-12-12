import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import {Photos, User} from '../_models';

import { environment } from '../../environments/environment';
import {Observable} from 'rxjs';

@Injectable({ providedIn: 'root' })
export class PhotosService {
    constructor(private http: HttpClient) { }

    getAllPhotosForOwnerUser(ownerUserId: number): Observable<Photos[]> {
        return this.http.get<Photos[]>(`${environment.photosApiUrl}/photos/owner/` + ownerUserId);
    }
}
