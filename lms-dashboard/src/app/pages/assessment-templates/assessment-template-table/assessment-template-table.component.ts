import {Component} from '@angular/core';
import {LocalDataSource} from 'ng2-smart-table';

import {Router} from "@angular/router";
import {AssessmentTemplatesService} from "../../../../lms-api/services";

@Component({
  selector: 'ngx-assessment-template-table',
  templateUrl: './assessment-template-table.component.html',
  styles: [`
    nb-card {
      transform: translate3d(0, 0, 0);
    }
  `],
})
export class AssessmentTemplateTableComponent {
  settings = {
    mode: 'external',
    add: {
      addButtonContent: '<i class="nb-plus"></i>',
      createButtonContent: '<i class="nb-checkmark"></i>',
      cancelButtonContent: '<i class="nb-close"></i>',
    },
    edit: {
      editButtonContent: '<i class="nb-edit"></i>',
      saveButtonContent: '<i class="nb-checkmark"></i>',
      cancelButtonContent: '<i class="nb-close"></i>',
    },
    delete: {
      deleteButtonContent: '<i class="nb-trash"></i>',
      confirmDelete: true,
    },
    columns: {
      id: {
        title: 'ID',
        type: 'number',
      },
      name: {
        title: 'Name',
        type: 'string',
      },
    },
  };

  source: LocalDataSource = new LocalDataSource();

  constructor(
    private router: Router,
    private service: AssessmentTemplatesService,
  ) {
    this.loadEntities();
  }

  onDelete(event): void {
    if (window.confirm('Are you sure you want to delete?')) {
      this.service.remove(event.data).subscribe(() => {
        this.loadEntities();
      });
    }
  }

  private loadEntities() {
    this.service.getAll().subscribe(data => {
      this.source.load(data);
    });
  }
}
