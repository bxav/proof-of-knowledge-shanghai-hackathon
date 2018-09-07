import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {JsonEditorComponent, JsonEditorOptions} from "ang-jsoneditor";
import {ActivatedRoute, Router} from "@angular/router";
import {AssessmentTemplatesService} from "../../../../lms-api/services";
import {AssessmentTemplate} from "../../../../lms-api/classes";

@Component({
  selector: 'ngx-assessment-template-editor-page',
  styleUrls: ['./assessment-template-editor.component.scss'],
  template: `
    <nb-card  *ngIf="template">
      <nb-card-header>
        <span>Assessment Template</span>
        <div class="dropdown" ngbDropdown>
          <button class="btn btn-primary" type="button" (click)="publish()">
            Publish
          </button>
        </div>
      </nb-card-header>
      <nb-card-body>
        <div class="input-group">
          <input type="text" placeholder="Title" class="form-control" [(ngModel)]="template.name"/>
        </div>        
      </nb-card-body>
    </nb-card>
    <div class="row"  *ngIf="template">
      <div class="col-lg-6">
        <nb-card>
          <nb-card-header>
            Editor
          </nb-card-header>
          <nb-card-body>
            <json-editor [options]="editorOptions" [data]="firstTemplate" ></json-editor>
          </nb-card-body>
        </nb-card>
      </div>
      <div class="col-lg-6">
        <nb-card>
          <nb-card-header>
            Preview
          </nb-card-header>
          <nb-card-body>
            <sf-form [schema]="previewDataSchema" [model]="dataPreview"></sf-form>
          </nb-card-body>
        </nb-card>
      </div>
    </div>
  `,
})
export class AssessmentTemplateEditorComponent implements OnInit, OnDestroy {
  private sub: any;
  public template: AssessmentTemplate = new AssessmentTemplate();
  public editorOptions: JsonEditorOptions;
  public data: any;
  public firstTemplate: any;
  public previewDataSchema: any = {
    "properties": {},
  };

  public dataPreview: any;

  @ViewChild(JsonEditorComponent) editor: JsonEditorComponent;

  constructor(private router: Router, private route: ActivatedRoute, private templateService: AssessmentTemplatesService) {
    this.editorOptions = new JsonEditorOptions();
    this.editorOptions.modes = ['code', 'text', 'tree', 'view']; // set all allowed modes
    //this.options.mode = 'code'; //set only one mode

    this.editorOptions.onChange = this.change.bind(this);

    this.data = {};
  }

  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
      if (params['id']) {
        this.loadContent(params['id']);
      } else {
        this.initDefaultAssessment();

        this.firstTemplate = this.template.template;
        this.previewDataSchema = this.template.template;
      }
    });
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  publish() {
    console.log(this.template);

    const template = this.template;

    const obs = template.id ? this.templateService.update(template) : this.templateService.add(template);

    obs.subscribe((newTemplate) => {
      console.log(newTemplate);

      this.router.navigate(['/pages/assessment-templates/assessment-template-table']);
    });
  }

  private loadContent(id) {
    this.templateService.get(id).subscribe(template => {
      this.template = template;

      if (!this.template.template) {
        this.initDefaultAssessment();
      }

      this.firstTemplate = this.template.template;
      this.previewDataSchema = this.template.template;
    });
  }

  private initDefaultAssessment() {
    this.template.template = {
      properties: {
        message: {
          type: 'string',
          description: 'Demo field',
          widget: 'textarea'
        }
      },
      required: []
    };
  }

  change() {
    this.template.template = this.editor.get();

    this.previewDataSchema = this.template.template;
  }
}
