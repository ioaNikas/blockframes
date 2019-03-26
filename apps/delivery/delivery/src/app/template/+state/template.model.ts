export interface Template {
  id: string;
  name: string;
  materialsId: string[];
}

/**
 * A factory function that creates Template
 */
export function createTemplate(template: Partial<Template>) {
  return template ? {
    materialsId: [],
    ...template
  } as Template : {} as Template
}

