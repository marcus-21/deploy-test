export interface UserPayload {
    id: string;
    email: string;
    name: string;
    companyName: string;
    iat?: number;
    exp?: number;
}