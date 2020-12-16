import {hash} from "./utils";

const categoriesKey = "__example__categories__";

interface Categories {
  id: string;
  name: string;
  active: boolean;
}

type CategoriesDb = {[id: string]: Categories};

let categories: CategoriesDb = {};
const persist = () => window.localStorage.setItem(categoriesKey, JSON.stringify(categories));
const load = () =>
  Object.assign(categories, JSON.parse(window.localStorage.getItem(categoriesKey) ?? "{}"));

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
window.__private__.purgeCategories = () => {
  Object.keys(categories).forEach(key => {
    delete categories[key];
  });
  persist();
};

export interface CategoryForm {
  name?: string;
  active?: boolean;
}

function validateCategoryForm({name, active}: CategoryForm) {
  if (!name) {
    throw Error("A name is required");
  }

  if (!active) {
    throw Error("A active is required");
  }

  return {name, active};
}

async function create(form: CategoryForm) {
  const {name, active} = validateCategoryForm(form);
  const id = hash(name);
  categories[id] = {id, name, active};
  persist();
  return read(id);
}

async function read(id: string) {
  validateCategory(id);
  return categories[id];
}

async function reset() {
  categories = {};
  persist();
}

function validateCategory(id: string) {
  load();
  if (!categories[id]) {
    throw new Error(`No categories with the id "${id}"`);
  }
}

export {create, reset};
