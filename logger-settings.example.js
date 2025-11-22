// logging-config.example.js
//
// example configuration file for JavaScript Logger
// ------------------------------------------------
// this file shows how to configure logging in a single place.
// you can:
//   - keep it as documentation, OR
//   - rename it to logging-config.js and import it in your app
//
// IMPORTANT:
//   if you USE this configuration, ensure it loads BEFORE any script
//   that calls `track(import.meta)`.
//
//   example in your main file:
//     import "./logging-config.js";
//     import { something } from "./ui.js";

import { Logger, track } from 
  "https://raw.githubusercontent.com/oyoli/js-logger/main/Logger.js";

// ---------------------------------------------------------------------------
// 1. global on/off switch
// ---------------------------------------------------------------------------
//
// turn ALL logging on/off.
//
// - ON during development
// - OFF in production / deployment
//

Logger.setOn(true);              // enable all logs
// Logger.setOn(false);          // disable all logs (production)


// ---------------------------------------------------------------------------
// 2. per-tag filters
// ---------------------------------------------------------------------------
//
// tags are the first argument to `log(tag, ...)`:
//
//   log("ui", "button clicked");
//   log("clean", "normalized length", len);
//
// tags let you group logs and mute noisy categories.
//

Logger.muteTag("noisy");         // example: hide logs tagged as "noisy"

// optional examples:
// Logger.muteTag("debug");
// Logger.muteTag("trace");
// Logger.unmuteTag("clean");


// ---------------------------------------------------------------------------
// 3. per-file filters
// ---------------------------------------------------------------------------
//
// files are detected automatically via track(import.meta)
// so if inside Analyzer.js you do:
//
//   const log = track(import.meta);
//
// the logger will track logs as coming from "Analyzer.js".
//
// you can then silence logs from a specific file:
//

 // Logger.muteFile("Analyzer.js");
 // Logger.muteFile("Extractor.js");
 // Logger.unmuteFile("ui.js");


// ---------------------------------------------------------------------------
// 4. logger for THIS config file (optional)
// ---------------------------------------------------------------------------
//
// you can also obtain a logger for this file, just to confirm
// the config loaded successfully.
//

const log = track(import.meta);
log("config", "logging-config.example.js loaded");


// ---------------------------------------------------------------------------
// 5. debugInfo(): inspecting current logger state
// ---------------------------------------------------------------------------
//
// useful for development. prints:
//   - on/off
//   - active file rules
//   - active tag rules
//   - known files that used track(import.meta)
//   - known tags used in log()
//

console.log("logger debug info:", Logger.debugInfo());


// ---------------------------------------------------------------------------
// 6. recommended tag conventions (optional guidelines)
// ---------------------------------------------------------------------------
//
// "ui"        → user interface / page interactions
// "extract"   → file parsing / extraction
// "clean"     → text normalization & cleaning
// "interpret" → structural or semantic analysis
// "error"     → error output (normally should not be muted)
// "debug"     → noisy development logs
// "trace"     → extremely detailed loop-level logs
//
// example usage:
//
//   const log = track(import.meta);
//   log("ui", "user clicked submit");
//   log("extract", "parsed 42 lines");
//   log("clean", "whitespace normalized");
//   log("interpret", "3 sections detected");
//   log("error", "failed parsing pdf", err);
//   log("debug", "chunk:", chunk);
//   log("trace", "loop iteration", i);
//

// end of logging-config.example.js
