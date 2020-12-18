import faker from "faker";
import {CategoryData} from "../categories/api/categories-response";
import {ProductData} from "../products/api/products-response";

function buildCategory(overrides: Partial<CategoryData> = {}): CategoryData {
  return {
    id: faker.random.uuid(),
    name: faker.random.words(2),
    active: faker.random.boolean(),
    ...overrides,
  };
}

function buildProduct(overrides: Partial<ProductData> = {}): ProductData {
  return {
    id: faker.random.uuid(),
    name: faker.random.words(2),
    description: faker.lorem.sentence(2),
    price: parseFloat(faker.commerce.price()),
    active: faker.random.boolean(),
    categoryId: faker.random.uuid(),
    ...overrides,
  };
}

export {buildCategory, buildProduct};
