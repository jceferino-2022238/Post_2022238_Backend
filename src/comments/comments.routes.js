import {Router} from 'express'
import {check} from 'express-validator'
import { validateFields } from '../middlewares/validate-fields.js'
import { exComment, exPostById } from '../helpers/db-validators.js'
import { commentGet, commentPost, getCommentsFromPost } from './comments.controller.js';
const router =  Router();
router.get("/", commentGet)
router.get("/:id",
    [
        check("id", "Not valid ID").isMongoId(),
    ], getCommentsFromPost)
router.post(
    "/:id",
    [
        check("id", "Not valid ID").isMongoId(),
        check("id").custom(exPostById),
        check("title").custom(exComment),
        check("title", "Title isnt optional").not().isEmpty(),
        check("content", "Content isnt optional").not().isEmpty(),
        validateFields
    ], commentPost)
export default router;