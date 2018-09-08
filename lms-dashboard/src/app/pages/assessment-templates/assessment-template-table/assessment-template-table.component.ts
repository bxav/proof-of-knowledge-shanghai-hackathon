import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {LocalDataSource, ViewCell} from 'ng2-smart-table';

import {ActivatedRoute, Router} from "@angular/router";
import {AssessmentTemplatesService} from "../../../../lms-api/services";
import {AssessmentTemplate} from "../../../../lms-api/classes";
import {NgbActiveModal, NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {environment} from "../../../../environments/environment";


@Component({
  selector: 'ngx-view-assessment-template-generate-qrcode-modal',
  template: `
    <div class="modal-header">
      <span>Generate QrCode</span>
      <button class="close" aria-label="Close" (click)="closeModal()">
        <span aria-hidden="true">&times;</span>
      </button>
    </div>
    <div class="modal-body">
      {{ uri }}
      <qrcode [qrdata]="uri" [size]="256" [level]="'M'"></qrcode>
    </div>
  `,
})
export class ViewAssessmentTemplateGenerateQrCodeModalComponent {
  @Input() uri: string;

  constructor(
    private activeModal: NgbActiveModal,
  ) { }

  closeModal() {
    this.activeModal.dismiss();
  }
}

@Component({
  selector: 'button-view',
  template: `
    <button (click)="onShare()">Share</button>
  `,
})
export class ButtonViewComponent implements ViewCell, OnInit {
  renderValue: string;

  @Input() value: string | number;
  @Input() rowData: any;

  @Output() save: EventEmitter<any> = new EventEmitter();

  constructor(
    private route: ActivatedRoute,
    private modalService: NgbModal
  ) {}

  ngOnInit() {
    this.renderValue = this.value.toString().toUpperCase();
  }

  onShare() {
    this.generateQrCode(this.rowData);
  }

  public generateQrCode(assessmentTemplate: AssessmentTemplate) {
    const activeModal = this.modalService.open(ViewAssessmentTemplateGenerateQrCodeModalComponent, { size: 'lg', container: 'nb-layout' });

    console.log(this.buildSubscriptionUrl(assessmentTemplate));
    activeModal.componentInstance.uri = this.buildSubscriptionUrl(assessmentTemplate);

    activeModal.result.then((result) => {
      this.save.emit(this.rowData);
    }, () => {
    });
  }

  private buildSubscriptionUrl(assessmentTemplate: AssessmentTemplate) {
    let url = environment.apiUrl.replace(/\/$/, "") + assessmentTemplate['@id'];

    return url;
  }
}


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
      button: {
        title: 'Button',
        type: 'custom',
        renderComponent: ButtonViewComponent,
        onComponentInitFunction(instance) {
          instance.save.subscribe(function (row) {
          }.bind(this));
        }
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

  onEdit(template): void {
    this.router.navigate(['/pages/assessment-templates/assessment-template-editor', template.data.id]);
  }

  onCreate(): void {
    this.router.navigate(['/pages/assessment-templates/assessment-template-editor']);
  }

  private loadEntities() {
    this.service.getAll().subscribe(data => {
      this.source.load(data);
    });
  }
}
