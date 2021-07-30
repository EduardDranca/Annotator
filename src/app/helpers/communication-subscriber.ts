export class CommunicationSubscriber {
    private callbacks = new Map<string, (eventArgs: any[]) => any>();

    public onEvent(event: string, eventArgs: any[]) {
        const callback = this.callbacks.get(event);

        if (callback != undefined) {
            callback(eventArgs);
        }
    }

    public setCallbackOnEvent(event: string, callback: (eventArgs: any[]) => any) {
        this.callbacks.set(event, callback);
    }

    constructor() {

    }
}