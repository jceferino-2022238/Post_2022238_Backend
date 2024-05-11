import { Router } from "express";
import { check } from 'express-validator'
import { validateFields } from "../middlewares/validate-fields.js";
import { postGet, postPost } from "./posts.controller.js";
const router = Router()
router.get("/", postGet)
router.post(
    "/",
    [
        check('title', 'Title isnt optional').not().isEmpty(),
        check("classI", 'Class of the Post isnt optional').not().isEmpty(),
        check("text", "Text of the Post isnt optional").not().isEmpty(),
        check("imageURL", "ImageURL isnt optional").not().isEmpty(),
        validateFields
    ], postPost
)

export default router