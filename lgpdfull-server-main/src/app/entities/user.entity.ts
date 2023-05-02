import { User } from "@prisma/client"

export class UserEntity implements User {
    id: string;
    name: string;
    socialName: string;
    isAdmin: boolean;
    companyName: string;
    email: string;
    pass: string;
    state: string;
    status: boolean | null;
}
