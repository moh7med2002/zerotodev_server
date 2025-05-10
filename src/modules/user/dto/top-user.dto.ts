import { Expose } from "class-transformer";

export class TopUserDto {
    @Expose()
    id:number;

    @Expose()
    image:string;

    @Expose()
    name:string;

    @Expose()
    points:number
}