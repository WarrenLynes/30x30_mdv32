import { Injectable } from '@angular/core';
import { Actions, createEffect } from '@ngrx/effects';
import { DataPersistence } from '@nrwl/angular';
import { map, tap } from 'rxjs/operators';
import { of } from 'rxjs';

import { ProjectsFacade } from './projects.facade';
import * as projectsActions from './projects.actions';
import { Project, ProjectsService } from '@mdv32/core-data';
import { ProjectsPartialState } from './projects.reducer';


@Injectable()
export class ProjectsEffects {
  load$ = createEffect(() =>
    this.dataPersistence.fetch(projectsActions.loadProjects, {
      run: (
        action: ReturnType<typeof projectsActions.loadProjects>,
        state: ProjectsPartialState
      ) => this.projectsService.all().pipe(
        map((projects: Project[]) => projectsActions.projectsLoaded({projects}))
      ),
      onError: (action: ReturnType<typeof projectsActions.loadProjects>, err) => {
        return of(err)
      }
    })
  );

  addProject$ = createEffect(() =>
    this.dataPersistence.pessimisticUpdate(projectsActions.createProject, {
      run: (
        action: ReturnType<typeof projectsActions.createProject>,
        state: ProjectsPartialState
      ) => this.projectsService.create(action.project).pipe(
        map((project: Project) => projectsActions.projectCreated({ project })),
      ),
      onError: (action: ReturnType<typeof projectsActions.createProject>, error) => {
        console.log('Effect Error:', error);
      }
    })
  );

  updateProject$ = createEffect(() =>
    this.dataPersistence.pessimisticUpdate(projectsActions.updateProject, {
      run: (
        action: ReturnType<typeof projectsActions.updateProject>,
        state: ProjectsPartialState
      ) => this.projectsService.update(action.project).pipe(
        map((project: Project) => projectsActions.projectUpdated({ project })),
      ),
      onError: (action: ReturnType<typeof projectsActions.updateProject>, error) => {
        console.log('Effect Error:', error);
      }
    })
  );

  deleteProject$ = createEffect(() =>
    this.dataPersistence.pessimisticUpdate(projectsActions.deleteProject, {
      run: (
        action: ReturnType<typeof projectsActions.deleteProject>,
        state: ProjectsPartialState
      ) => this.projectsService.delete(action.projectId).pipe(
        map((projectId: any) => projectsActions.projectDeleted({ projectId })),
        tap(() => this.projectsFacade.loadProjects()),
      ),
      onError: (action: ReturnType<typeof projectsActions.deleteProject>, error) => {
        console.log('Effect Error:', error);
      }
    })
  );


  constructor(
    private actions$: Actions,
    private dataPersistence: DataPersistence<ProjectsPartialState>,
    private projectsService: ProjectsService,
    private projectsFacade: ProjectsFacade
  ) {}
}
