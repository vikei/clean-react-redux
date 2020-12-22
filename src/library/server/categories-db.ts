import lodash from "lodash";
import {CategoryData} from "../categories/api/categories-response";
import {buildCategory} from "../test/generate";
import {hash} from "./utils";

const categoriesKey = "__example__categories__";

type CategoriesDb = {[id: string]: CategoryData};

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

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
window.__private__.fakeCategories = () => {
  lodash.times(5, () => {
    const category = buildCategory();
    categories[category.id] = category;
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

  if (active === undefined || active === null) {
    throw Error("A active is required");
  }

  return {name, active};
}

async function create(form: CategoryForm) {
  const data = validateCategoryForm(form);
  const id = hash(data.name);
  categories[id] = {id, ...data};
  persist();
  return read(id);
}

async function read(id: string) {
  validateCategory(id);
  return categories[id];
}

async function find() {
  return Object.values(categories);
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

export {create, reset, find};
