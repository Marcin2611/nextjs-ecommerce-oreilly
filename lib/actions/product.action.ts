'use server';

import { LATEST_PRODUCTS_LIMIT } from '../constants';
import { prisma } from '@/db/prisma';
import { convertToPlainObject } from '../utils';

export async function getLatestProducts() {
    const data = await prisma.product.findMany({
        take: LATEST_PRODUCTS_LIMIT,
        orderBy: { createdAt: 'desc' }
    });

    return convertToPlainObject(data);
}