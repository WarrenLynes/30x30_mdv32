import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { Action, createReducer, on } from '@ngrx/store';
import {Project} from '@mdv32/core-data';
import * as projectsActions from './projects.actions';

export const PROJECTS_FEATURE_KEY = 'projects';
export interface ProjectsState extends EntityState<Project> {
  selectedProjectId?: string | number;
  isLoading: boolean;
}
export interface ProjectsPartialState {
  readonly [PROJECTS_FEATURE_KEY]: ProjectsState;
}
export const projectsAdapter: EntityAdapter<Project> =
  createEntityAdapter<Project>();

export const initialState: ProjectsState = projectsAdapter.getInitialState({
  selectedProjectId: null,
  isLoading: false
});

const projectsReducer = createReducer(
  initialState,
  on(projectsActions.projectCreated, (state, {project}) =>
    projectsAdapter.addOne(project, {...state, isLoading: false})
  ),
  on(projectsActions.projectDeleted, (state, {projectId}) =>
    projectsAdapter.removeOne(projectId, {...state, isLoading: false})
  ),
  on(projectsActions.projectsLoaded, (state, {projects}) =>
    projectsAdapter.addAll(projects, {...state, isLoading: false})
  ),
  on(projectsActions.projectUpdated, (state, {project}) =>
    projectsAdapter.upsertOne(project, {...state, isLoading: false})
  ),
  on(projectsActions.projectSelected, (state, {selectedProjectId}) => ({
    ...state, selectedProjectId
  })),

  on(
    projectsActions.loadProjects,
    projectsActions.createProject,
    projectsActions.updateProject,
    projectsActions.deleteProject,
    (state) => ({ ...state, isLoading: true })
  ),
);

export function reducer(state: ProjectsState | undefined, action: Action) {
  return projectsReducer(state, action);
}
