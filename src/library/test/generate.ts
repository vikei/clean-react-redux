import faker from "faker";
import {CategoryData} from "../categories/api/fetch-categories";

function buildCategory(overrides: Partial<CategoryData> = {}): CategoryData {
  return {
    id: faker.random.uuid(),
    name: faker.random.words(2),
    active: faker.random.boolean(),
    ...overrides,
  };
}

export {buildCategory};
