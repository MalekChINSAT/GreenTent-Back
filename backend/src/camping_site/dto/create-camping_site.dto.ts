import { IsNumber, IsString } from "class-validator";

export class CreateCampingSiteDto {

@IsString()
locationName: string;

@IsString()
price: string;

@IsString()
address: string;



}
