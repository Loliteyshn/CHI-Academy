import "reflect-metadata";
import { Get, JsonController } from "routing-controllers";

@JsonController('/')
export class MainController {
    @Get('')
    getAuthor() {
        return { author: 'Lolita Golovach'}
    }
}