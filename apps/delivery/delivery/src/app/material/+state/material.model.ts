// tslint:disable-next-line: interface-over-type-literal
export type Material = {
  id: string;
  category: string;
  value: string;
  description: string;
  delivered: boolean;
  deliveriesIds: string[];
};


export function createMaterial(material: Partial<Material>) {
  return {
    id: material.id,
    category: material.category,
    value: material.value,
    description: material.description
  } as Material;
}
