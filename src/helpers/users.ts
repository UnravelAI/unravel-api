import { getConnection, Repository } from "typeorm";
import { User } from "../entity/user";
import { isName, isDate, isGender, isEmail } from "./validations"


interface UniqueUserElements {
    email: string,
    passwordSalt: string,
}

// Define unique validation errors and return a string of errors
const generateErrors = (
    { email, passwordSalt }: UniqueUserElements,
    validationData: User[]
) => {
    const errors: string[] = [];
    validationData.forEach((user: User, index, array) => {
        if (email === user.email && email != null) {
            if (!errors.includes("EMAIL_EXISTS")) {
                errors.push("EMAIL_EXISTS");
            }
        }
        if (passwordSalt === user.passwordSalt) {
            if (!errors.includes("PASSWORD_SALT_EXISTS")) {
                errors.push("PASSWORD_SALT_EXISTS");
            }
        }

    });
    return errors;
};

// check for existing unique parameters before creating users
const checkIfExists = async ({ email = "", passwordSalt = "" }: UniqueUserElements) => {
    try {
        const or = [];
        if (email !== "") {
            or.push({ email });
        }
        if (passwordSalt !== "") {
            or.push({ passwordSalt });
        }
        if (or.length === 0) {
            return ["NO_FIELDS_SUPPLIED_FOR_CHECK"];
        }
        const userRepository: Repository<User> = await getConnection().getRepository(User);
        const existingUsers: User[] = await userRepository.find({
            where: or,
        });
        if (existingUsers.length === 0) {
            return [];
        } else {
            return generateErrors({ email, passwordSalt }, existingUsers);
        }
    } catch (error) {
        throw error;
    }
};

// validate all user fields
const validateUserFields = (user: User) => {
    const errors: string[] = [];
    if (!isName(user.firstName) || !isName(user.lastName)) {
        errors.push("INVALID_FIRST/LAST_NAME");
    }
    // if (!isDate(user.dob)) {
    //     errors.push("INVALID_DOB");
    // }
    if (!isGender(user.gender)) {
        errors.push("INVALID_GENDER");
    }
    if (!isEmail(user.email)) {
        errors.push("INVALID_EMAIL");
    }

    return errors;
};

// validate given fields
const validateFieldsOnUpdate = (
    firstName = "",
    lastName = "",
    dob = "",
    userGender = "male",
    email = ""
) => {
    if (
        (!isName(firstName) && firstName !== "") ||
        (!isName(lastName) && lastName !== "") ||
        (!isDate(dob) && dob !== "") ||
        (!isGender(userGender) && userGender !== "") ||
        (!isEmail(email) && email !== "")
    ) {
        return false;
    }
    return true;
};

export {
    checkIfExists,
    validateUserFields,
    validateFieldsOnUpdate,
    UniqueUserElements
};
