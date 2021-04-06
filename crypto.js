const crypto = require("crypto");

const iv = Buffer.from('00000000000000000000000000000000', 'hex');
const key = Buffer.from('11328F38F29BA5B60C2AA633DB78281C', 'hex');

encrypt = (str) => {
    const string = Buffer.from(str)
    const padding = Buffer.alloc(setPadding(str))
    const s_p = [string, padding];
    const s_p_concat = Buffer.concat(s_p);
    const cipher = crypto.createCipheriv('aes-128-cbc', key, iv)
    cipher.setAutoPadding(false)
    let encrypted = cipher.update(s_p_concat, 'utf8', 'base64')
    encrypted += cipher.final('base64')
    return encrypted
}

setPadding = (str) => {
    if (!str) { return 16 }
    const length = str.length
    if (length % 16 === 0) {
        return 16
    }
    const multiplicador = Math.ceil(length / 16)
    console.log(multiplicador)
    return (16 * multiplicador) - length
}

const enc = encrypt('Mauricio');
console.log(enc);