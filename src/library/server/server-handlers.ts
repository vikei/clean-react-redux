import {categoriesHandlers} from "./categories-handlers";
import {productsHandlers} from "./products-handlers";
import {userHandlers} from "./user-handlers";

const serverHandlers = [...userHandlers, ...categoriesHandlers, ...productsHandlers];

export {serverHandlers};
