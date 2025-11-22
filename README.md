# **JavaScript Logger**
### _minimal, file-aware, tag-aware logging for modern javascript_

## quick start (import directly from github)

```js
import { Logger, track } from "https://raw.githubusercontent.com/oyoli/js-logger/main/Logger.js";

Logger.setOn(true);                         // enable all logs
const log = track(import.meta);
log("tag1", "message");
````

this works in any modern browser supporting ES modules.

---

## logging usage

### 1. get a logger for the file

```js
import { track } from "https://raw.githubusercontent.com/oyoli/js-logger/main/Logger.js";

const log = track(import.meta);
log("tag1", "message");
```

`track(import.meta)` automatically extracts the filename (`script1.js`, `script2.js`, etc.) so logs can be muted per-file.

---

### 2. basic global on/off

```js
Logger.setOn(true);   // enable all logs
Logger.setOn(false);  // disable ALL logs (production)
```

---

### 3. per-tag control

```js
Logger.muteTag("tag1");
Logger.muteTag("tag2");
Logger.unmuteTag("tag2");
```

call site:

```js
log("tag1", "message", variable);
log("tag1", "message");
```

---

### 4. per-file control

```js
Logger.muteFile("script1.js");
Logger.unmuteFile("script1.js");
```

---

### 5. inspect logger state

```js
console.log(Logger.debugInfo());
```

example output:

```json
{
  "on": true,
  "files": { "script1.js": false },
  "tags": { "tag": false },
  "knownFiles": ["script1.js", "script2.js"],
  "knownTags": ["tag1", "tag2", "tag3"]
}
```

---

## full configuration template

🡒 see **`logging-config.example.js`** in this repository.
