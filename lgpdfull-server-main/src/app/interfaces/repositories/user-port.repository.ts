import { UserEntity } from "src/app/entities/user.entity";
import { InsertUserDto } from "src/infra/http/dtos/insert-db-user.dto";
import { UpdateUserPassDto } from "src/infra/http/dtos/update-user-pass.dto";
import { UpdateUserDto } from "src/infra/http/dtos/update-user.dto";

export abstract class UserRepository {
    abstract create(insertUserDto: InsertUserDto): Promise<UserEntity>;
    abstract findAll(): Promise<{id: string; name: string; companyName: string;}[]>;
    abstract findById(id: string): Promise<UserEntity | null>;
    abstract findByEmail(email: string): Promise<UserEntity | null>;
    abstract update(id: string, updateUserDto: UpdateUserDto): Promise<{name: string; companyName: string; id: string;}>;
    abstract updatePass(id: string, pass: string): Promise<void>;
    abstract updateSavePass(id: string, newPass: string): Promise<void>;
    abstract remove(id: string): Promise<void>;
}
