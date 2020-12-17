import {categoriesHandlers} from "./categories-handlers";
import {userHandlers} from "./user-handlers";

const serverHandlers = [...userHandlers, ...categoriesHandlers];

export {serverHandlers};
