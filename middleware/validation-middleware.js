import ApiError from "../utils/api-errors.js";

const validate = (validator) => (req, res, next) => {
    console.log(`request method from validator ${req.method}`);
    // const errors = validator(req.body);

    // if (Object.keys(errors).length > 0) {
    //     return next(new ApiError(400, JSON.stringify(errors)));
    // }

    // next();
};

export default validate;