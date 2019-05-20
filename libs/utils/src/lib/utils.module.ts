import { NgModule } from "@angular/core";
import { ArraySortPipe } from "./array-sort.pipe";

@NgModule({
  declarations: [
    ArraySortPipe,
  ],
  exports: [
    ArraySortPipe
  ]
})
export class UtilsModule {}