export const checkWhiteSpace = (value, key, setError) => {
    // const regex = /^\s+/;
    // return regex.test(value);
    console.log(value, 'value');
    if (value == '') {
        setError((prev) => ({ ...prev, [key]: "Field Cannot be empty" }))
        return false

    } else {
        setError((prev) => ({ ...prev, [key]: "" }))
        return true
    }

};

export const emailValidation = (email, key, setError) => {

    if (!/\S+@\S+\.\S+/.test(email)) {
        setError((prev) => ({ ...prev, [key]: "Invalid Email Type" }))
        return false
    } else {
        setError((prev) => ({ ...prev, [key]: "" }))
        return true
    }

}

export const nameValidation = (name, key, setError) => {
    const regex = /^[a-zA-Z0-9]+$/;
    console.log(name.length, ' name validation');

    if (name.length < 5) {
        setError((prev) => ({ ...prev, [key]: "Length must be 5 character long" }));
        return false;
    }

    if (!regex.test(name)) {
        setError((prev) => ({ ...prev, [key]: "Must not contain special characters" }));
        return false;
    } else {
        setError((prev) => ({ ...prev, [key]: "" }));
        return true;
    }
}

export const ageValidation = (age, key, setError) => {
    console.log(age, 'this is age');
    
    if (age < 1 || age > 120) {
        setError((prev) => ({ ...prev, [key]: "Age must be between 1 to 120" }))
        return false
    } else {
        setError((prev) => ({ ...prev, [key]: "" }))
        return true
    }

}

