import { NextFunction, Request, Response } from 'express';

function PropagateError<This, Arg extends any[]>(target: new (...arg: Arg) => This) {
    Object.getOwnPropertyNames(target.prototype).forEach((name) => {
        const originalAction = target.prototype[name];

        target.prototype[name] = function (req: Request, res: Response, next: NextFunction) {
            return originalAction.call(this, req, res, next).catch(next);
        };
    });
}

export default PropagateError;
