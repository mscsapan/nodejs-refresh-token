export const validateRegister = (data) => {
    const errors = {};

    if (!data.firstName) errors.firstName = "First name is required";
    if (!data.lastName) errors.lastName = "Last name is required";

    if (!data.email) {
        errors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(data.email)) {
        errors.email = "Invalid email";
    }

    if (!data.password) {
        errors.password = "Password is required";
    } else if (data.password.length < 6) {
        errors.password = "Password must be at least 6 characters";
    }

    if (!data.phone) errors.phone = "Phone is required";

    return errors;
};

export const validateLogin = (data) => {
    const errors = {};

    if (!data.email) errors.email = "Email is required";
    if (!data.password) errors.password = "Password is required";

    return errors;
};