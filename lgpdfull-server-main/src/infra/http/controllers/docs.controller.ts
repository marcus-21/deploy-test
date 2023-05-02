import { Controller, Get, Param } from "@nestjs/common";
import { DocService } from "src/app/use-cases/doc.service";

@Controller('docs')
export class DocController {
    constructor(private readonly docService: DocService) {}

    @Get('datamap/:id')
    getDataMap(@Param('id') id: string ) {
        return this.docService.getDataMap(id);
    }
}
