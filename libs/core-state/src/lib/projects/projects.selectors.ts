import { createFeatureSelector, createSelector } from '@ngrx/store';

import {
  PROJECTS_FEATURE_KEY,
  projectsAdapter,
  ProjectsState
} from './projects.reducer';
import { emptyProject } from '@mdv32/core-data';

export const selectProjectsState =
  createFeatureSelector<ProjectsState>(PROJECTS_FEATURE_KEY);

const { selectAll, selectEntities } = projectsAdapter.getSelectors();

export const selectProjectsLoading = createSelector(
  selectProjectsState,
  (state: ProjectsState) => state.isLoading
);

export const selectAllProjects = createSelector(
  selectProjectsState,
  (state: ProjectsState) => selectAll(state)
);

export const selectProjectsEntities = createSelector(
  selectProjectsState,
  (state: ProjectsState) => selectEntities(state)
);

export const selectProjectId = createSelector(
  selectProjectsState,
  (state: ProjectsState) => state.selectedProjectId
);

export const selectProject = createSelector(
  selectProjectsEntities,
  selectProjectId,
  (entities, selectedId) => {
    return selectedId ? entities[selectedId] : emptyProject
  }
);
