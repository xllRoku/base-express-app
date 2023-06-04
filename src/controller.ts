import { Controller, Route, Get } from 'tsoa';

@Route('/')
export class SayHiController extends Controller {
    constructor() {
        super();
    }

    @Get()
    public async sayHi() {}
}
