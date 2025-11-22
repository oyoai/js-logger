// logging/Logger.js

export class Logger {

  static _settings = {
    on: true,
    files: {},
    tags: {},
    knownFiles: new Set(),
    knownTags: new Set()
  };

  // ---------------------------------------------------------------------------
  // public control api
  // ---------------------------------------------------------------------------
  // these are the functions user code is expected to call to control logging.
  // ---------------------------------------------------------------------------

  // enable or disable all logging
  static setOn(value) {
    Logger._settings.on = !!value;
  }

  // mute all logs coming from a specific file
  static muteFile(filename) {
    Logger._settings.files[filename] = false;
  }

  // explicitly enable logs for a specific file
  static unmuteFile(filename) {
    Logger._settings.files[filename] = true;
  }

  // mute all logs that use a given tag
  static muteTag(tag) {
    Logger._settings.tags[tag] = false;
  }

  // explicitly enable logs for a given tag
  static unmuteTag(tag) {
    Logger._settings.tags[tag] = true;
  }

  // dump the internal logger state to the console and return it
  //
  // usage:
  //   Logger.dump();
  //   Logger.dump('after ui init');
  //
  // this shows:
  //   - global on/off state
  //   - current per-file rules
  //   - current per-tag rules
  //   - which files have used track(import.meta)
  //   - which tags have been used in log() calls
  //
  static dump(label = 'logger debug info') {
    const s = Logger._settings;
    const snapshot = {
      on: s.on,
      files: { ...s.files },
      tags: { ...s.tags },
      knownFiles: Array.from(s.knownFiles),
      knownTags: Array.from(s.knownTags)
    };

    console.log(label, snapshot);
    return snapshot;
  }

  // ---------------------------------------------------------------------------
  // internal helpers
  // ---------------------------------------------------------------------------
  // these are not meant to be called from user code.
  // they support the behavior of the public api above.
  // ---------------------------------------------------------------------------

  static _isFileEnabled(filename) {
    const s = Logger._settings;
    const rules = s.files || {};

    if (filename in rules) return !!rules[filename];
    if ('*' in rules) return !!rules['*'];

    return true;
  }

  static _isTagEnabled(tag) {
    const s = Logger._settings;
    const rules = s.tags || {};

    if (!tag) {
      if ('*' in rules) return !!rules['*'];
      return true;
    }

    if (tag in rules) return !!rules[tag];
    if ('*' in rules) return !!rules['*'];

    return true;
  }

  // create a log function bound to a specific file (url)
  static for(url) {
    const filename = url.split('/').pop() || url;
    const s = Logger._settings;

    s.knownFiles.add(filename);

    function log(tagOrMsg, ...rest) {
      const settings = Logger._settings;

      if (!settings.on) return;
      if (!Logger._isFileEnabled(filename)) return;

      let tag = null;
      let args = [];

      if (typeof tagOrMsg === 'string' && rest.length > 0) {
        tag = tagOrMsg;
        args = rest;
      } else {
        args = [tagOrMsg, ...rest];
      }

      if (tag) settings.knownTags.add(tag);
      if (!Logger._isTagEnabled(tag)) return;

      const prefix = tag
        ? `[${filename}][${tag}]`
        : `[${filename}]`;

      console.log(prefix, ...args);
    }

    return log;
  }
}

// main entry point for user code
// usage:
//   import { track } from './logging/Logger.js';
//   const log = track(import.meta);
//   log('ui', 'ui initialized');
//   log('clean', 'normalized text length', len);
//
export function track(meta) {
  const url = meta?.url ?? String(meta);
  return Logger.for(url);
}
