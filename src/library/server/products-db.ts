import {hash} from "./utils";

const productsKey = "__example_products__";

interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  active: boolean;
  categoryId: string;
}

type ProductsDb = {[id: string]: Product};

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

export interface ProductForm {
  name?: string;
  description?: string;
  price?: number;
  active?: boolean;
  categoryId: string;
}

function validateProductForm({name, description, active, price, categoryId}: ProductForm) {
  if (!name) {
    throw Error("A name is required");
  }

  if (!description) {
    throw Error("A description is required");
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

  return {name, description, active, price, categoryId};
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