const {fork} = require("child_process");
const bcryptChild = fork(__dirname + "/non-blocking-bcrypt-nodejs");
const q = {};

const genMicroTime = () => {
    return Number(process.hrtime().join(""));
};

bcryptChild.on("message", msg => {
    const microTime = msg.microTime;
    if (msg.err !== undefined) {
        q[microTime].reject(msg.err);
        delete  q[microTime];
        return;
    }
    if (msg.match !== undefined) {
        msg = msg.match;
    }
    q[microTime].resolve(msg);
    delete  q[microTime];
});

const bcryptChildRequest = (params) => {
    params.microTime = genMicroTime();
    q[params.microTime] = {};
    const p = new Promise((resolve, reject) => {
        q[params.microTime].resolve = resolve;
        q[params.microTime].reject = reject;
    });
    q[params.microTime].p = p;

    bcryptChild.send(params);
    return q[params.microTime].p;
};

exports.genSalt = (rounds = 10) => {
    return bcryptChildRequest({method: "genSalt", rounds});
};
exports.genHash = (salt, password) => {
    if (!salt || !password) {
        return Promise.reject("salt and password are required");
    }
    return bcryptChildRequest({method: "genHash", salt, password});
};
exports.compare = async (password, hashedPassword) => {
    if (!password || !hashedPassword) {
        return Promise.reject("password and hashedPassword are required");
    }
    return bcryptChildRequest({method: "compare", password, hashedPassword});
};
exports.saltAndHash = async (password, rounds) => {
    if (!password) {
        return Promise.reject("password is required");
    }
    return bcryptChildRequest({method: "saltAndHash", password, rounds});
};
exports.getRounds = async (encrypted) => {
    if (!encrypted) {
        return Promise.reject("password is required");
    }
    return bcryptChildRequest({method: "compare", encrypted});
};



