import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ExplorerService {
  loadedImages: Subject<(string | undefined)[]> = new Subject();
  loadedDirectory: Subject<string> = new Subject();
  imageChanged: Subject<number> = new Subject();
  constructor() { }
}
