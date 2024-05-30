
const CheckName = (name) => 
{
    //It allows only letters and one space between words
    const nameRegex = /^[A-za-z]+(|\s[A-za-z]+)$/;
    if(!nameRegex.test(name)) return false;
        return true;
}
const CheckPassword = (pass) => 
{
    //It should have at least 8 characters and not be empty
    if(pass === "" || pass.length < 8) return false;
        return true; 
}

const CheckEmail = (email) => 
{
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
        if(!emailRegex.test(email)) return false;
            return true;
}

export {CheckName, CheckPassword, CheckEmail};
    