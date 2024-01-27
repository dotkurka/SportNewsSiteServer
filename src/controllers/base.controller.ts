import PropagateError from '../decorators/PropagateError.decorator.js';

// I still don't know how it should work
@PropagateError
class BaseController {}

export default BaseController;
