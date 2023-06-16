// Orad Dostra : 208939736
// Niv Vardi: 209083278

const generateRandomId = () => {
    const timestamp = new Date().getTime();
    const randomNumber = Math.floor(Math.random() * 10000);
    const randomId = timestamp + randomNumber
    return randomId
}

module.exports = generateRandomId