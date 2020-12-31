const EMAIL_REGEX = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
import { userGender } from "../entity/User"


// check if input is valid first/last name
const isName = (name: string): boolean => {
    if (!/^[a-zA-Z]+$/.test(name)) return false;
    return true;
};

// check if input is valid date string
const isDate = (dateString: string): boolean => {
    const date: Date = new Date(dateString);
    return !isNaN(date.valueOf());
};

// check if input is valid gender
const isGender = (gender: string): boolean => {
    if (gender === userGender.MALE || gender === userGender.FEMALE || gender === userGender.OTHER)
        return true;
    return false;
};

const isEmail = (email: string): boolean => { // TODO: Fix to assigne a type
    if ((String(email).match(EMAIL_REGEX)) === null) {
        return false;
    }
    return true;
};


export {
    isName,
    isDate,
    isGender,
    isEmail,
}