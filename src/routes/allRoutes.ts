import authRouter from "./user";
import productRouter from "./product";
import updateRouter from "./update";
import updatePointRouter from "./updatePoint";

const allRoutes = [authRouter, productRouter, updateRouter, updatePointRouter];

export default allRoutes;
