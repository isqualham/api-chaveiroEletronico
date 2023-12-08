import { Joi, Segments } from "celebrate";

const userCreateValitation = {
    [Segments.BODY]: Joi.object().keys({
        name: Joi.string().min(3).max(255).required(),
        password: Joi.string().min(8).max(14).required(),
        registration: Joi.string().min(10).max(10)
    }),
}

export { userCreateValitation };