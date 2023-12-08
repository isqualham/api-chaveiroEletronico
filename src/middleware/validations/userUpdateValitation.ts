import { Joi, Segments } from "celebrate";

const userUpdateValitation = {
    [Segments.PARAMS]: Joi.object().keys({
        id: Joi.number().required(),
    }),
    [Segments.BODY]: Joi.object().keys({
        name: Joi.string().min(3).max(255),
        registration: Joi.string().min(10).max(10)
    }),
}

export { userUpdateValitation };