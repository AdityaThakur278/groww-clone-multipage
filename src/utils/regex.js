function numberRegex(value) {
    value = parseFloat(value);
    if (isNaN(value) || value <= 0) {
        return true;
    }
    return false;
}

function usernameRegex(username) {
    if (!username) {
        return true;
    }
    const regex = /^\S*$/;
    if (username.length < 6 || !regex.test(username)) {
        return true;
    }

    return false;
}

function emailRegex(email) {
    if (!email) {
        return true
    }
    var pattern = new RegExp(/^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i);
    if (!pattern.test(email)) {
        return true;
    }

    return false;
}

function passwordRegex(password) {
    if (!password) {
        return true;
    }
    if (password.length < 6) {
        return true;
    }

    return false;
}

export { numberRegex, usernameRegex, emailRegex, passwordRegex };
