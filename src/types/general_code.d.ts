export type PropertyGeneralCodeList = {
  propertyGeneralCodeList: Array<PropertyGeneralCode>;
};

export type PropertyGeneralCode = {
  id: string;
  code: number;
  name: string;
  displayOrder: number;
  version: number;
};

export type PropertyGeneralCodeCategoryList = {
  propertyGeneralCodeCategoryList: Array<PropertyGeneralCodeCategory>;
};

export type PropertyGeneralCodeCategory = {
  id: string;
  category: string;
  displayName: string;
  propertyGeneralCodeList: Array<PropertyGeneralCode>;
  version: number;
};
