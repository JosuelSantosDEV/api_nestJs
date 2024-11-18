import { registerDecorator, ValidationArguments, ValidationOptions, ValidatorConstraint, ValidatorConstraintInterface } from "class-validator";
import { UserRepository } from "../User.repository";
import { Injectable } from "@nestjs/common";

@Injectable()
@ValidatorConstraint()
export class EmailIsUniqueValidate implements ValidatorConstraintInterface {

    constructor(private userRepositoty: UserRepository){}

    async validate(value: any, validationArguments?: ValidationArguments): Promise<boolean> {
        const userExist = await this.userRepositoty.getByEmail(value);
        return !userExist;
    }
    
}

export const EmailIsUnique = (validationOptions: ValidationOptions)=> {
    return (obj: object, property: string)=>{
        registerDecorator({
            target: obj.constructor,
            propertyName: property,
            options: validationOptions,
            constraints: [],
            validator: EmailIsUniqueValidate
        })
    }

}