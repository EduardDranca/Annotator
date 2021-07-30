import { Injectable } from '@angular/core';
import { CommunicationSubscriber } from '../helpers/communication-subscriber';

@Injectable({
  providedIn: 'root'
})
export class CommunicationService {
  //maps a subject to its subscribers
  private subscriberMap = new Map<string, CommunicationSubscriber[]>();

  public subscribe(subscriber: CommunicationSubscriber,  subject: string) {
    console.log(subscriber);
    let subscribers = this.subscriberMap.get(subject);
    if (subscribers !== undefined) {
      subscribers.push(subscriber);
      this.subscriberMap.set(subject, subscribers);
    } else {
      this.subscriberMap.set(subject, [subscriber]);
    }
  }

  public send(subject: string, args: any[]) {
    const subscribers = this.subscriberMap.get(subject);
    if (subscribers !== undefined) {
      for (let subscriber of subscribers) {
        subscriber.onEvent(subject, args);
      }
    }
  }

  constructor() { }
}
