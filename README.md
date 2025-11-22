# JavaScript Logger - minimal, file-aware, tag-aware logging for modern javascript


`js-logger` is a tiny, zero-dependency logging utility for browser-based ES modules and lightweight applications.

It provides:

* global on/off switch
* per-tag filtering (`ui`, `clean`, `debug`, etc.)
* per-file filtering (auto-detected via `track(import.meta)`)
* automatic discovery of tags and filenames
* a simple, predictable API

Ideal for debugging tools, parsing pipelines, prototypes, and web apps.

---

## **Installation**

Import directly from GitHub using a raw ES-module URL:

```js
import { Logger, track } from 'https://raw.githubusercontent.com/oyoli/js-logger/main/Logger.js';
```

This gives you the latest version instantly and keeps your project lightweight.

---

## **Quick Start**

```js
import { Logger, track } from 'https://raw.githubusercontent.com/oyoli/js-logger/main/Logger.js';

Logger.setOn(true);  // enable logs globally

const log = track(import.meta);

log('ui', 'page initialized');
log('clean', 'normalized text');
log('debug', 'debug info:', data);

console.log(Logger.dump());
```

---

## **Global Controls**

### enable / disable everything

```js
Logger.setOn(true);   // enable all logs
Logger.setOn(false);  // silence all logs
```

---

## **tag-based controls**

tags are the first argument you pass into `log(tag, ...)`:

```js
log('ui', 'clicked submit');
log('clean', 'removed whitespace');
log('debug', 'loop iteration', i);
```

mute/unmute tags:

```js
Logger.muteTag('debug');
Logger.unmuteTag('debug');
```

---

## **file-based controls**

`track(import.meta)` automatically detects the calling filename:

```js
const log = track(import.meta); // e.g. "Analyzer.js"
```

mute/unmute logs from that file:

```js
Logger.muteFile('Analyzer.js');
Logger.unmuteFile('Analyzer.js');
```

---

## **inspect logger state**

```js
console.log(Logger.dump());
```

output example:

```json
{
  "on": true,
  "files": { "Analyzer.js": false },
  "tags": { "debug": false },
  "knownFiles": ["Analyzer.js","Extractor.js","ui.js"],
  "knownTags": ["ui","clean","debug"]
}
```

---

## **suggested tag conventions**

| tag         | meaning                         |
| ----------- | ------------------------------- |
| `ui`        | user interface events           |
| `extract`   | file/data extraction            |
| `clean`     | text cleaning / normalization   |
| `interpret` | higher-level logic              |
| `debug`     | noisy debug info                |
| `trace`     | extremely detailed debug info   |
| `error`     | errors (usually remain visible) |

---

## **example: logging-config.js**

centralize your logging rules:

```js
import { Logger, track } from 'https://raw.githubusercontent.com/oyoli/js-logger/main/Logger.js';

Logger.setOn(true);

// tag filters
Logger.muteTag('noisy');
// Logger.muteTag('debug');

// file filters
// Logger.muteFile('Analyzer.js');

const log = track(import.meta);
log('config', 'logging config loaded');

console.log(Logger.dump());
```

---

## **API Reference**

### `Logger.setOn(boolean)`

enable/disable all logs

### `Logger.muteTag(tag)`

mute logs with this tag

### `Logger.unmuteTag(tag)`

unmute logs with this tag

### `Logger.muteFile(filename)`

mute logs from a specific file

### `Logger.unmuteFile(filename)`

unmute logs from that file

### `Logger.dump()`

returns `{ on, files, tags, knownFiles, knownTags }`

### `track(import.meta)`

returns a per-file logger:

```js
const log = track(import.meta);
log('tag', 'message');
```

---

## **Philosophy**

* ultra-small and self-contained
* zero dependencies
* readable in one minute
* structured logging without complexity
* designed for clean browser-based debugging
