export interface ICities {
  type: string;
  name: string;
  features: Feature[];
}

export interface Feature {
  type: string;
  properties: Properties;
  geometry: Geometry;
}

export interface Geometry {
  type: string;
  coordinates: number[];
}

export interface Properties {
  FID: number;
  OBJECTID: number;
  CITY_NAME: string;
  GMI_ADMIN: string;
  ADMIN_NAME: string;
  FIPS_CNTRY: string;
  CNTRY_NAME: string;
  STATUS: string;
  POP: number;
  POP_RANK: number;
  POP_CLASS: string;
  PORT_ID: number;
  LABEL_FLAG: number;
  POP_SOURCE: string;
}
