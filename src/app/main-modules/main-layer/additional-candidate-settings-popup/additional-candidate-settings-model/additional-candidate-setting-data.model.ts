import { TemplateRef } from '@angular/core';

export interface AdditionalSettingsModelsData<T = undefined> {
  headerText: string;
  template: TemplateRef<any>;
  context?: T;
}
