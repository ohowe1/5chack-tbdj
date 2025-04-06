export interface QueryOptions {
  filter?: Record<string, any>;
  fields?: string | Record<string, 1 | 0>;
  sort?: Record<string, 1 | -1>;
}