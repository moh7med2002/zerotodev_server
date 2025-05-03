import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';

export function createImageInterceptor(fieldName: string, folder = 'images') {
    return FileInterceptor(fieldName, {
        storage: diskStorage({
        destination: `./public/${folder}`,
        filename: (req, file, cb) => {
            const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
            cb(null, uniqueSuffix + extname(file.originalname));
        }
        }),
        fileFilter:(req,file,cb)=>
        {
            if(!file.mimetype.match(/\/(jpg|jpeg|png)$/))
            {
                return cb(new Error('نوع الصورة غير مدعوم'),false)
            }
            return cb(null,true)
        }
    });
}