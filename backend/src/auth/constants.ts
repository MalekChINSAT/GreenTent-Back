//We'll use this secret to share our key between the JWT signing and verifying steps.
import * as dotenv from 'dotenv';

dotenv.config();

export const jwtConstants = {
    secret: process.env.JWT_SECRET
};