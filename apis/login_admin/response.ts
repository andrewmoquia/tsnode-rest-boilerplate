
import { HttpResponse } from "../../core/libs/ApiEvent";

/*
  Your Custom Response */
export class Response200 {
    static SUCCESS: HttpResponse = {
        code: 200,
        message: 'Success',
    }
}

export class NotFound {
    code = 404;
    message = 'Username not found';
}

export class PasswordError {
    code = 400;
    message = 'Invalid Username or Password';
}
