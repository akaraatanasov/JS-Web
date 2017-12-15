// Modules
import { NgModule } from '@angular/core';
import { ModulesExport } from "./export/modules/export-modules";
// Providers
import { ProvidersExport } from "./export/providers/export-providers";
// Components
import { AppComponent } from "./app.component";
import { Components } from "./export/components/export-components";



@NgModule({
  declarations: Object.values(Components),
  imports: [...ModulesExport],
  providers: [...ProvidersExport],
  bootstrap: [AppComponent]
})

export class AppModule {
}
