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
    id: params.id,
    name: params.name,
    materialsId: params.materialsId || []
  } as Template;
}
