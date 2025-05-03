import { ArgumentsHost, Catch, ExceptionFilter } from "@nestjs/common";
import { Response } from "express";
import { MulterError } from "multer";

@Catch(MulterError, Error)
export class MulterExceptionFilter implements ExceptionFilter {
    catch(exception: MulterError, host: ArgumentsHost) {
        const ctx = host.switchToHttp()
        const response = ctx.getResponse<Response>()
        response.status(400).json({
            statusCode:400,
            message:exception.message || 'خطأ بتحميل الصورة'
        })
    }
}