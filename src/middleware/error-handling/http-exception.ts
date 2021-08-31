/**
 * Class to handle the http exception.
 */
class HttpException extends Error {
    
    readonly status: number;
    readonly message: string;

    /**
     * Constructor
     * @param {number} status 
     * @param {string} message
     */
    constructor(status: number, message: string) {
        super(message);
        this.status = status;
        this.message = message;
    }
    
}
   
export default HttpException;