// https://auth0.com/blog/critical-vulnerabilities-in-json-web-token-libraries/

const now = Math.floor(Date.now() / 1000);
const supportedAlgorithms = ['HS256', 'HS384', 'HS512'];
const payload = { sub: 'koikibabatunde14@gmail.com', iat: now };
const key = 'secretkey';
const SEC_MS = 1000;
const MIN_MS = 60 * SEC_MS;
const HOUR_MS = 60 * MIN_MS;
const DAY_MS = 24 * HOUR_MS;
const MONTH_MS = 30 * DAY_MS;
const YEAR_MS = 365 * DAY_MS;

function base64URLencode(str) {
    return btoa(str)
        .replace(/\+/g, '-')
        .replace(/\//g, '_')
        .replace(/=+$/, '');
}

const base64URLDecode = str => {
    let padding = '='.repeat((4 - str.length % 4) % 4);
    str = (str + padding).replace(/\-/g, '+').replace(/_/g, '/');
    return atob(str);
}

function bufferToBase64URL(buffer) {
    const binary = String.fromCharCode(...new Uint8Array(buffer));
    return base64URLencode(binary);
}

const base64URLToBuffer = str => {
    const binary = base64URLDecode(str);
    const bytes = new Uint8Array(binary.length);
    for (let i = 0; i < binary.length; i++) {
        bytes[i] = binary.charCodeAt(i);
    }
    return bytes;
}

const getKey = async (key, type, algorithm) => {
    if (type !== 'sign' && type !== 'verify') {
        throw new Error('Invalid key type');
    }

    if (!supportedAlgorithms.includes(algorithm)) {
        throw new Error('Invalid algorithm');
    }

    let hash = 'SHA-256';
    if (algorithm === 'HS384') {
        hash = 'SHA-384';
    } else if (algorithm === 'HS512') {
        hash = 'SHA-512';
    } else {
        hash = 'SHA-256';
    }

    const k = await crypto.subtle.importKey(
        'raw',
        new TextEncoder().encode(key),
        { name: 'HMAC', hash: { name: hash } },
        true,
        [type]
    );

    return k;
}

const computeExpiry = (exp) => {
    // only the last character can be a letter, others must be numbers and the last character must be one of the following
    // s, m, h, d, i, y or a number
    if (typeof exp === 'string') {
        for (let i = 0; i < exp.length - 1; i++) {
            if (isNaN(exp[i])) {
                throw new Error('Invalid expiry');
            }
        }

        const lastChar = exp[exp.length - 1].toLowerCase();
        if (lastChar !== 's' && lastChar !== 'm' && lastChar !== 'h' && lastChar !== 'd' && lastChar !== 'i' && lastChar !== 'y') {
            if (isNaN(lastChar)) {
                throw new Error('Invalid expiry');
            }
        }

        return exp.toLowerCase();
    }

    if (typeof exp === 'number') {
        return exp;
    }

    throw new Error('Invalid expiry');
}

const verifyTokenExpiry = (exp, iat) => {
    exp = computeExpiry(exp);

    if (typeof exp === 'string') {
        const now = Date.now();
        const lastChar = exp[exp.length - 1];
        const value = parseInt(exp.substring(0, exp.length - 1));
        if (lastChar === 'd') {
            const expDate = new Date(iat * 1000 + value * DAY_MS);
            if (now > expDate) {
                throw new Error('Token has expired');
            }
        }

        if (lastChar === 'm') {
            const expDate = new Date(iat * 1000 + value * MONTH_MS);
            if (now > expDate) {
                throw new Error('Token has expired');
            }
        }

        if (lastChar === 'y') {
            const expDate = new Date(iat * 1000 + value * YEAR_MS);
            if (now > expDate) {
                throw new Error('Token has expired');
            }
        }

        // if it contains only a number then it is in seconds
        if (!isNaN(exp)) {
            const expDate = new Date(iat * 1000 + exp * 1000);
            if (now > expDate) {
                throw new Error('Token has expired');
            }
        }

        if (lastChar === 'h') {
            const expDate = new Date(iat * 1000 + value * 60 * 60 * 1000);
            if (now > expDate) {
                throw new Error('Token has expired');
            }
        }

        if (lastChar === 's') {
            const expDate = new Date(iat * 1000 + value * 1000);
            if (now > expDate) {
                throw new Error('Token has expired');
            }
        }

        // minute
        if (lastChar === 'i') {
            const expDate = new Date(iat * 1000 + value * 60 * 1000);
            if (now > expDate) {
                throw new Error('Token has expired');
            }
        }
    }
    if (typeof exp === 'number') {
        if (Math.floor(Date.now() / 1000) > exp) {
            throw new Error('Token has expired');
        }
    }
}

const signToken = async (payload, key, algorithm, exp) => {
    if (!exp) {
        exp = payload.exp ? computeExpiry(payload.exp) : Math.floor(Date.now() / 1000) + 3600;
    }
    if (!payload.iat) {
        payload.iat = Math.floor(Date.now() / 1000);
    }

    payload.exp = exp;

    const header = { alg: algorithm, typ: 'JWT' };
    const encodedHeader = base64URLencode(JSON.stringify(header));
    const encodedPayload = base64URLencode(JSON.stringify(payload));
    const unsignedToken = `${encodedHeader}.${encodedPayload}`;
    const unsignedTokenArr = new TextEncoder().encode(unsignedToken);

    // Import the key
    const k = await getKey(key, 'sign', algorithm);

    // Generate the signature
    const signature = await crypto.subtle.sign('HMAC', k, unsignedTokenArr);

    // Convert the signature to Base64 URL
    const encodedSignature = bufferToBase64URL(signature);

    return `${unsignedToken}.${encodedSignature}`;
};

const verifyToken = async (token, key) => {
    const [encodedHeader, encodedPayload, encodedSignature] = token.split('.');
    const header = JSON.parse(base64URLDecode(encodedHeader));
    const unsignedToken = `${encodedHeader}.${encodedPayload}`;
    let k
    try {
        k = await getKey(key, 'verify', header.alg);
    } catch (err) {
        throw new Error('Invalid token');
    }
    const signature = base64URLToBuffer(encodedSignature);
    const unsignedTokenArr = new TextEncoder().encode(unsignedToken);
    const result = await crypto.subtle.verify('HMAC', k, signature, unsignedTokenArr);
    return result;
}

const decodeToken = token => {
    const [encodedHeader, encodedPayload, _] = token.split('.');
    const header = JSON.parse(base64URLDecode(encodedHeader));
    if (!header.alg || !supportedAlgorithms.includes(header.alg)) {
        throw new Error('Invalid token');
    }
    const payload = JSON.parse(base64URLDecode(encodedPayload));
    const exp = payload.exp;
    if (!exp) {
        throw new Error('Invalid token');
    }

    verifyTokenExpiry(exp, payload.iat);
    return { header, payload };
}

const waitFor = (ms) => new Promise(resolve => setTimeout(resolve, ms));

// Generate the token

const regenerateTokenWithDifferentAlgorithm = (token) => {
    const [_, encodedPayload, encodedSignature] = token.split('.');
    const updatedHeader = { alg: 'HS3841', typ: 'JWT' };
    const updatedEncodedHeader = base64URLencode(JSON.stringify(updatedHeader));
    return`${updatedEncodedHeader}.${encodedPayload}.${encodedSignature}`;
}

const oneHrTimeSec = (Date.now() + HOUR_MS)/SEC_MS;
signToken(payload, key, 'HS256', Math.floor(oneHrTimeSec))
    .then(async token => {
        console.log(token);
        // if we tamper with the token's header's alg claim it will throw an error
        // regenerate the token header with a different algorithm
        // try to decode the token
        const updatedToken = regenerateTokenWithDifferentAlgorithm(token);
        try {
            console.log(decodeToken(updatedToken));
        } catch (err) {
            console.error(err);
        }

        try {
            const t = await verifyToken(updatedToken, key);
            console.log(t, '245');
        } catch (err) {
            console.error(err);
        }

        console.log(decodeToken(token));

        const v = await verifyToken(token, key);
        console.log(v);
    })
    .catch(err => console.error(err));
