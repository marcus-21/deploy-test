import { Request } from "express";
import { UserEntity } from "src/app/entities/user.entity";

export interface AuthRequest extends Request{
    user: UserEntity;
}