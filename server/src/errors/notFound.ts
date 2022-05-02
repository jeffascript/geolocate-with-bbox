// eslint-disable-next-line import/no-extraneous-dependencies
import { CustomError } from '@jeff/shared';

export default class NotFound extends CustomError {
    errorName = 'NotFound';

    statusCode = 400;

    // eslint-disable-next-line no-useless-constructor
    constructor(message: string) {
        super(message);
    }
}
