const bcrypt = require('bcrypt-nodejs');

const genSalt = (rounds = 10) => {
    return new Promise((resolve, reject) => {
        bcrypt.genSalt(rounds, function (err, salt) {
            if (err) {
                reject(err);
            }
            else {
                resolve({
                    salt: salt
                });
            }
        });
    });
};
const genHash = (salt, password) => {
    return new Promise((resolve, reject) => {
        bcrypt.hash(password, salt, null, function (err, hash) {
            if (err) {
                reject(err);
            }
            else {
                resolve({
                    salt: salt,
                    password: password,
                    hash: hash
                });
            }
        });
    });
};
const compare = (password, hashedPassword) => {
    return new Promise((resolve, reject) => {
        bcrypt.compare(password, hashedPassword, (err, isMatch) => {
            if (err) {
                return reject(err);
            }
            resolve(isMatch);
        });
    });
};
const getRounds = (encrypted) => {
    return new Promise((resolve, reject) => {
        bcrypt.getRounds(encrypted, (err, result) => {
            if (err) {
                return reject(err);
            }
            resolve(result);
        });
    });
};

process.on('message', async (msg) => {
    let result = {};
    try {

        switch (msg.method) {
            case 'genSalt' : {
                result = await genSalt(msg.rounds || 10);
                break;
            }
            case 'genHash' : {
                result = await genHash(msg.salt, msg.password);
                break;
            }
            case 'saltAndHash' : {
                const salt = await genSalt(msg.password, msg.rounds || 10);
                result = await genHash(salt.salt, msg.password);
                break;
            }
            case 'compare' : {
                result.match = await compare(msg.password, msg.hashedPassword);
                break;
            }
            case 'getRounds' : {
                result = await getRounds(msg.encrypted);
                break;
            }


        }

        result.microTime = msg.microTime;
        process.send(result);

    }
    catch (err) {
        result.microTime = msg.microTime;
        result.err = err;
        process.send(result);
    }

});