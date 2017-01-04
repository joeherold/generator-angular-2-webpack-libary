import {NgModule, ModuleWithProviders} from "@angular/core";
import {SampleService} from "./sample.service";

@NgModule({
    imports: [],
    exports: [],
    declarations: [],
    providers: [],
    entryComponents: []
})
export class SampleModule {
    static forRoot(): ModuleWithProviders {
        return {
            ngModule: SampleModule,
            providers: [SampleService]
        };
    }
}

