import lodash from "lodash";
import * as faker from "faker";
import {ProductData} from "../products/api/products-response";
import {buildProduct} from "../test/generate";
import * as categoriesDb from "./categories-db";
import {hash} from "./utils";

const productsKey = "__example_products__";

type ProductsDb = {[id: string]: ProductData};

let products: ProductsDb = {};
const persist = () => window.localStorage.setItem(productsKey, JSON.stringify(products));
const load = () =>
  Object.assign(products, JSON.parse(window.localStorage.getItem(productsKey) ?? "{}"));

try {
  load();
} catch (error) {
  persist();
}

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
window.__private__ = window.__private__ || {};
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
window.__private__.purgeUsers = () => {
  Object.keys(products).forEach(key => {
    delete products[key];
  });
  persist();
};
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
window.__private__.fakeProducts = async () => {
  const categories = await categoriesDb.find();
  lodash.times(5, () => {
    const categoryId = categories[faker.random.number(categories.length - 1)].id;
    const product = buildProduct({categoryId});
    products[product.id] = product;
  });
  persist();
};

export interface ProductForm extends Partial<ProductData> {
  name?: string;
  description?: string;
  shortDescription?: string;
  price?: number;
  active?: boolean;
  categoryId: string;
}

function validateProductForm({
  name,
  description,
  active,
  price,
  categoryId,
  shortDescription,
}: ProductForm) {
  if (!name) {
    throw Error("A name is required");
  }

  if (!description) {
    throw Error("A description is required");
  }

  if (!description) {
    throw Error("A description is required");
  }

  if (!shortDescription) {
    throw Error("A short description is required");
  }

  if (price === undefined || price === null) {
    throw Error("A price is required");
  }

  if (active === undefined || active === null) {
    throw Error("A active is required");
  }

  if (!categoryId) {
    throw Error("A category is required");
  }

  return {name, description, active, price, shortDescription, categoryId};
}

async function create(form: ProductForm) {
  const data = validateProductForm(form);
  const id = hash(data.name);
  products[id] = {id, ...data};
  persist();
  return read(id);
}

async function read(id: string) {
  return products[id];
}

async function reset() {
  products = {};
  persist();
}

async function find() {
  return Object.values(products);
}

export {create, reset, read, find};
