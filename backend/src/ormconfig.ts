import { DataSource, DataSourceOptions } from "typeorm";
import * as dotenv from 'dotenv';
import { CampingSite } from "./camping_site/entities/camping_site.entity";
import { Review } from "./review/entities/review.entity";
import { Booking } from "./booking/entities/booking.entity";
import { User } from "./user/entities/user.entity";

dotenv.config()

export const typeOrmConfig: DataSourceOptions = {
	type: 'mysql',
	host: process.env.DB_HOST,
	port: parseInt(process.env.DB_PORT),
	username: process.env.DB_USERNAME,
	password: process.env.DB_PASSWORD,
	database: process.env.DB_NAME,
	logging: true,
	synchronize: false, //synchronize: true will erase all data and will recreate tables
	migrations: ["dist/migration/*{.ts,.js}"],
	entities: [User, CampingSite, Review, Booking],
}

export const connectionSource = new DataSource(typeOrmConfig);