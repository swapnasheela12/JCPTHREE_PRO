import { TemplateRef } from '@angular/core';

export interface LayerPatchSettingsModelsData<T = undefined> {
  headerText: string;
  template: TemplateRef<any>;
  context?: T;
}
