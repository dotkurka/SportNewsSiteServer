import { NextFunction, Request, Response } from 'express';

function PropagateError(_target: unknown, _propertyKey: string, descriptor: PropertyDescriptor): void {
    const originalAction = descriptor.value;

    descriptor.value = function (req: Request, res: Response, next: NextFunction) {
        return originalAction.call(this, req, res, next).catch(next);
    };
}

export default PropagateError;
