
import { API_RESPONSE } from "../../core";
import { HttpResponse } from "../../core/libs/ApiEvent";
import { Request, Response, NextFunction } from "express";
import { Database } from "../../core/database";
import { Connection } from "typeorm";

import { SUCCESS } from "./response";
import { Validate } from "./validate";
import { RegisterAction } from "./action";

export async function execute(req: Request, res: Response, next: NextFunction): Promise<HttpResponse> {
    try {
        const request = Validate(req.body);
        const connection: Connection = await Database.getConnection();  
        const action = new RegisterAction(connection);
        await action.execute(request);
        
        return API_RESPONSE({
            ...SUCCESS,
        }, res);
    }
    catch(e) {
        return API_RESPONSE(e, res);
    }
    finally {
        console.log('close');
        await Database.closeConnection();
    }
}
