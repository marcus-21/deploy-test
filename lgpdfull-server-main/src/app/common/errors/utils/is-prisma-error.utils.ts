import { PrismaClientError } from "../types/PrismaClientError";

export const isPrismaError = (e: PrismaClientError) => {
    return (
        typeof e.code === 'string' &&
        typeof e.clientVersion === 'string'
    );
}