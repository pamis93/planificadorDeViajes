import randomstring from 'randomstring';
import Joi from 'joi';

import selectUserByEmailService from '../services/users/selectUserByEmailService.js';
import generateErrorsUtils from '../utils/generateErrorsUtils.js';
import recoverPasswordService from '../services/users/recoverPasswordService.js';




const recoverPasswordController = async (req, res, next) => {
    try {
        const schema = Joi.object().keys({
            email: Joi.string().email().required(),
        });

        const validation = schema.validate(req.body);

        if (validation.error) generateErrorsUtils(validation.error.message, 401);

        const { email } = req.body;

        const user = await selectUserByEmailService(email);

        if (!user)
            return res.send({
                status: 'ok',
                message:
                    'No existe una cuenta con tu email',
            });
            

        const recoverPassCode = randomstring.generate(10);

        await recoverPasswordService(email, recoverPassCode);

        res.send({
            status: 'ok',
            message:
                'Si existe una cuenta con tu email recibirás un código de recuperación',
        });
    } catch (error) {
        next(error);
    }
};

export default recoverPasswordController;