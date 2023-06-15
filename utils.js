const generateRandomId = () => {
    const timestamp = new Date().getTime();
    const randomNumber = Math.floor(Math.random() * 10000);
    const randomId = timestamp + randomNumber
    return randomId
}

module.exports = generateRandomId