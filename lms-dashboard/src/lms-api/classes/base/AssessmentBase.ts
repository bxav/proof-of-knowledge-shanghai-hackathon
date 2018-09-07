export class AssessmentBase {
  public static readonly _resource: string = 'assessments';
  get _resource(): string { return AssessmentBase._resource; };

  id?: string;
  assessmentTemplate: string;
  data: any;
}
