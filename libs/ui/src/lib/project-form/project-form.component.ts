import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { Project } from '@mdv32/core-data';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'mdv32-project-form',
  templateUrl: './project-form.component.html',
  styleUrls: ['./project-form.component.scss']
})
export class ProjectFormComponent implements OnChanges {

  form: FormGroup;

  @Input() selected: Project;
  @Output() saveProject = new EventEmitter<Project>();
  @Output() deleteProject = new EventEmitter<any>();
  @Output() resett = new EventEmitter();

  constructor() {
  }

  ngOnChanges(changes: SimpleChanges): void {
    if( changes.selected ) {
      this.buildForm();
    }
  }

  submit() {
    if(this.form.valid) {
      this.saveProject.emit(this.form.value);
      this.form.reset();
    }
  }

  buildForm() {
    if(this.selected && this.selected.id) {
      this.form = new FormGroup({
        id: new FormControl(this.selected.id),
        title: new FormControl(this.selected.title),
        details: new FormControl(this.selected.details),
        importanceLevel: new FormControl(this.selected.importanceLevel),
      });
    } else {
      this.form = new FormGroup({
        id: new FormControl(null),
        title: new FormControl(null),
        details: new FormControl(null),
        importanceLevel: new FormControl(null),
      });
    }
  }

  onCancel() {
    this.form.reset();
    this.resett.emit();
  }

}
