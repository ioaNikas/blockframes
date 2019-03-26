export interface Template {
  id: string;
  name: string;
  materialsId: string[];
}

/**
 * A factory function that creates Template
 */
export function createTemplate(params: Partial<Template>) {
  return {

  } as Template;
}
