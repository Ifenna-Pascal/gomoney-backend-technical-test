import { Router } from "express";
import { apiSearch } from "../controller/public/public.controller";

const router = Router();

router.get('/search', apiSearch )

export default router