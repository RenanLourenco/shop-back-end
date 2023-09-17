import { IsEmail, IsNotEmpty, Validate } from "class-validator";
import { PassValidate } from "src/common/validator/validate-pass/validate-pass.decorator";

export class RegisterUserDTO {

    @IsNotEmpty()
    name: string

    @IsEmail()
    @IsNotEmpty()
    email: string

    @Validate(PassValidate)
    @IsNotEmpty()
    password:string
    

}