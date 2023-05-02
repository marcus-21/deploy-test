import { Sector } from "@prisma/client"

export class SectorEntity implements Sector{
    id: string;
    userId: string;
    tagName: string;
    status: boolean | null;
}
