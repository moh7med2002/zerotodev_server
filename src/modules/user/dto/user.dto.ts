import { Expose } from "class-transformer";

export class UserDto {
    @Expose()
    id:number;

    @Expose()
    email:string;

    @Expose()
    image:string;

    @Expose()
    name:string;

    @Expose()
    bio:string;

    @Expose()
    points:number
}