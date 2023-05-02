import { DpoEntity } from "src/app/entities/dpo.entity";
import { CreateDpoDto } from "src/infra/http/dtos/create-dpo.dto";
import { UpdateDpoDto } from "src/infra/http/dtos/update-dpo.dto";

export abstract class DpoRepository {
    abstract create(createDpoDto: CreateDpoDto): Promise<DpoEntity>;
    abstract findAll(id: string): Promise<{
        id: string;
        socialName: string;
        actual: boolean;
        naturalPerson: boolean;
    }[]>;
    abstract findOne(id: string): Promise<{
        name: string;
        id: string;
        socialName: string;
        email: string;
    } | null>;
    abstract findActual(): Promise<{
        name: string;
        id: string;
        socialName: string;
        email: string;
    } | null>;
    abstract findById(id: string): Promise<DpoEntity | null>;
    abstract update(id: string, updateDpoDto: UpdateDpoDto): Promise<DpoEntity>;
    abstract remove(id: string): Promise<void>;

}
