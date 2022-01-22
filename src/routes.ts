import { Router } from "express";
import { CreateUserController } from "./controllers/CreateUserController";
import { CreateTagController } from "./controllers/CreateTagController";
import { ensureAdmin } from "./middlewares/ensureAdmin";
import { AuthenticateUserController } from "./controllers/AuthenticateUserController";

const router = Router();

const createUserController = new CreateUserController();
const createTagController = new CreateTagController();
const authenticateUserController = new AuthenticateUserController();

router.post("/tags", ensureAdmin, createTagController.handle);

/* se colocasse dessa forma, todas as rotas abaixo usariam o middleware
router.use(ensureAdmin); 
para isso n acontecer isso coloco o ensure admin da rota /tags */

router.post("/users", createUserController.handle);

router.post("/login", authenticateUserController.handle);

export { router };
