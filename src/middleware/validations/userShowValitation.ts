import { Joi, Segments } from "celebrate";

const userShowValitation = {
    [Segments.PARAMS]: Joi.object().keys({
        id: Joi.number().required(),
    }),
}

export { userShowValitation };