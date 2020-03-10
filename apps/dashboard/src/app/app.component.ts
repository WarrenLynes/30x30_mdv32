import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ProjectsFacade } from '@mdv32/core-state';
import { Project } from '@mdv32/core-data';

@Component({
  selector: 'mdv32-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  projects$: Observable<Project[]> = this.facade.allProjects$;
  project$: Observable<Project> = this.facade.selectedProject$;

  constructor(
    private facade: ProjectsFacade
  ) { }

  ngOnInit() {
    this.facade.loadProjects();
  }

  onSelectProject(projectId: number) {
    this.facade.selectProject(projectId);
  }

  onDeleteProject(projectId: any) {
    this.facade.deleteProject(projectId);
  }

  saveProject(project: Project) {
    if(project.id) {
      this.facade.updateProject(project);
    } else {
      this.facade.createProject(project);
    }

    this.reset();
  }

  reset() {
    this.facade.selectProject(null);
  }
}
