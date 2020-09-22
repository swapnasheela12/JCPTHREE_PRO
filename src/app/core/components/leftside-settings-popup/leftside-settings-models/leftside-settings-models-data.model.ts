import { TemplateRef } from '@angular/core';

export interface LeftsideSettingsModelsData<T = undefined> {
  headerText: string;
  template: TemplateRef<any>;
  context?: T;
}
