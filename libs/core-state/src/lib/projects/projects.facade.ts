import { Injectable } from '@angular/core';
import { Action, select, Store, ActionsSubject } from '@ngrx/store';
import * as fromProjects from './projects.reducer';
import * as projectsActions from './projects.actions';
import {
  selectAllProjects,
  selectProject,
  selectProjectsLoading
} from './projects.selectors';
import { Project } from '@mdv32/core-data';
import { filter } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class ProjectsFacade {
  allProjects$ = this.store.pipe(select(selectAllProjects));
  selectedProject$ = this.store.pipe(select(selectProject));
  projectLoading$ = this.store.pipe(select(selectProjectsLoading));

  constructor(
    private store: Store<fromProjects.ProjectsPartialState>,
    private actions$: ActionsSubject
  ) {}

  selectProject(selectedProjectId: any) {
    this.dispatch(projectsActions.projectSelected({ selectedProjectId }));
  }

  loadProjects() {
    this.dispatch(projectsActions.loadProjects());
  }

  createProject(project: Project) {
    this.dispatch(projectsActions.createProject({ project }));
  }

  updateProject(project: Project) {
    this.dispatch(projectsActions.updateProject({ project }));
  }

  deleteProject(projectId: any) {
    this.dispatch(projectsActions.deleteProject({ projectId }));
  }

  private dispatch(action: Action) {
    this.store.dispatch(action);
  }
}
