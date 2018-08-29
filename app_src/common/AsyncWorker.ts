export class AsyncWorker<inT, outT> {

    private worker: Worker;

    constructor(
        src: string
    ) {
        if (!window['Worker'])
            throw 'Worker not support';

        this.worker = new Worker(src);
    };

    asyncExcute(input: inT) {
        return new Promise<outT>((resolve, reject) => {
            const worker = this.worker;
            worker.onmessage = message => resolve(message.data);
            worker.onerror = e => reject(e.error);
            worker.postMessage(input);
        });
    };
};