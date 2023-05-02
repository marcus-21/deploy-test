import { Quiz } from "@prisma/client"

export class QuizEntity implements Quiz{
    id: string;
    result: string;
    answers: string;
    userId: string;
    createdAt: Date;
    status: boolean | null;
}
