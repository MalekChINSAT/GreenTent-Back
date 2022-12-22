import { ValidationArguments } from "class-validator";

export const isEmpty = ((validationData: ValidationArguments) =>  `The field ${validationData.property} cannot be empty`);

export const IsMax = (type : boolean) => {

    return  (validationData: ValidationArguments) => {
        if (type === true){
            return `The field ${validationData.property} must have a maximal length of ${validationData.constraints[0]}`
        }
        return `The field ${validationData.property} must have a minimal length of ${validationData.constraints[0]}`
    }
}