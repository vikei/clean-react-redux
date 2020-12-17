import {hash} from "./utils";

const usersKey = "__example__users__";

interface User {
  id: string;
  username: string;
  passwordHash: string;
}

type UsersDb = {[id: string]: User};

let users: UsersDb = {};
const persist = () => window.localStorage.setItem(usersKey, JSON.stringify(users));
const load = () => Object.assign(users, JSON.parse(window.localStorage.getItem(usersKey) ?? "{}"));

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
  Object.keys(users).forEach(key => {
    delete users[key];
  });
  persist();
};

export interface UserForm {
  username?: string;
  password?: string;
}

function validateUserForm({username, password}: UserForm) {
  if (!username) {
    throw Error("A username is required");
  }

  if (!password) {
    throw Error("A password is required");
  }

  return {username, password};
}

async function authenticate(form: UserForm) {
  const {username, password} = validateUserForm(form);
  const id = hash(username);

  const user = users[id] || {};
  if (user.passwordHash === hash(password)) {
    return {...sanitizeUser(user), token: btoa(user.id)};
  }

  throw new Error("Invalid username or password");
}

async function create(form: UserForm) {
  const {username, password} = validateUserForm(form);
  const id = hash(username);
  const passwordHash = hash(password);
  if (users[id]) {
    throw new Error(`Cannot create a new user with the username "${username}"`);
  }
  users[id] = {id, username, passwordHash};
  persist();
  return read(id);
}

async function read(id: string) {
  validateUser(id);
  return sanitizeUser(users[id]);
}

async function reset() {
  users = {};
  persist();
}

function validateUser(id: string) {
  load();
  if (!users[id]) {
    throw new Error(`No user with the id "${id}"`);
  }
}

function sanitizeUser(user: User) {
  const {passwordHash, ...rest} = user;
  return rest;
}

export {create, authenticate, reset};
