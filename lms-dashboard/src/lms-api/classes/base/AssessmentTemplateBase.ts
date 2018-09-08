export class AssessmentTemplateBase {
  public static readonly _resource: string = 'assessment-templates';
  get _resource(): string { return AssessmentTemplateBase._resource; };

  id?: string;
  name: string;
  template: any;
  answers: any;
}
