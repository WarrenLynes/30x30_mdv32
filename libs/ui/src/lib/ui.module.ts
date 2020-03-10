import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProjectFormComponent } from './project-form/project-form.component';
import { MaterialModule } from '@mdv32/material';

@NgModule({
  imports: [CommonModule, MaterialModule],
  declarations: [ProjectFormComponent],
  exports: [ProjectFormComponent]
})
export class UiModule {}
