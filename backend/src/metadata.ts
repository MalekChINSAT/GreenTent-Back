import { SetMetadata } from '@nestjs/common';

export const IS_PUBLIC_KEY = 'isPublic';

//for public endpoints that don't need token authorization
export const Public = () => SetMetadata(IS_PUBLIC_KEY, true);