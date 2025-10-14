import EventEmitter from 'eventemitter3';

export const eventUtil = {
    createEvent: <TCallbackValue>(name: string) => {
        const eventEmitter = new EventEmitter();
        const event = {
            name,
            listen: (callback: (value?: TCallbackValue) => void) => {
                eventEmitter.on(name, callback);
                return () => {
                    eventEmitter.removeListener(name, callback);
                };
            },
            emit: (value?: TCallbackValue) => {
                eventEmitter.emit(name, value);
            }
        };

        return event;
    }
};