import { MouseEventHandler } from "react";
import styles from "./Package.module.css";

const onMouseDown: MouseEventHandler = (e) => {
  if (e.detail > 1) e.preventDefault();
};

export const PackageStyled = () => {
  return (
    <div className={styles.container}>
      <header className={styles.head}>
        <h1>packagename</h1>

        <select>
          <option>4.17.21</option>
        </select>
      </header>

      <nav className={styles.fileList}>
        <details open>
          <summary onMouseDown={onMouseDown}>package</summary>
          <nav>
            <a href="#li">LICENSE</a>
            <a href="#apl">apply.js</a>
            <details open>
              <summary onMouseDown={onMouseDown}>fp</summary>
              <nav>
                <a href="#con">convert.js</a>
                <a href="#add">add.js</a>
                <a href="#con">convert.js</a>
                <a href="#add">add.js</a>
              </nav>
            </details>
          </nav>
        </details>
      </nav>

      <main className={styles.content}>
        <pre>
          <code>{`# crypto-js

JavaScript library of crypto standards.

## Node.js (Install)

Requirements:

- Node.js
- npm (Node.js package manager)

'''bash
npm install crypto-js
'''

### Usage

ES6 import for typical API call signing use case:

'''javascript
import sha256 from 'crypto-js/sha256';
import hmacSHA512 from 'crypto-js/hmac-sha512';
import Base64 from 'crypto-js/enc-base64';

const message, nonce, path, privateKey; // ...
const hashDigest = sha256(nonce + message);
const hmacDigest = Base64.stringify(hmacSHA512(path + hashDigest, privateKey));
'''

Modular include:

'''javascript
var AES = require("crypto-js/aes");
var SHA256 = require("crypto-js/sha256");
...
console.log(SHA256("Message"));
'''

Including all libraries, for access to extra methods:

'''javascript
var CryptoJS = require("crypto-js");
console.log(CryptoJS.HmacSHA1("Message", "Key"));
'''

## Client (browser)

            `}</code>
        </pre>
      </main>
    </div>
  );
};
