import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { OpenedDirectory } from '../models/opened-directory';

@Injectable({
  providedIn: 'root'
})
export class ImageService {

  constructor(private http: HttpClient) {}

  test(directory: string) {
    return this.http.get('http://127.0.0.1:5000/get_images/' + encodeURIComponent(directory), {responseType: 'text'}).
      pipe(map<string, OpenedDirectory>(value => JSON.parse(value)));
  }
}
