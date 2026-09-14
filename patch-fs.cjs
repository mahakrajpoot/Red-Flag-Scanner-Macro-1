const fs = require("fs");

function patch(target) {
  if (!target) return;
  if (target.readlinkSync) {
    const orig = target.readlinkSync;
    target.readlinkSync = function (...args) {
      try {
        return orig.apply(this, args);
      } catch (err) {
        if (err && (err.code === "EISDIR" || err.code === "UNKNOWN")) {
          err.code = "EINVAL";
        }
        throw err;
      }
    };
  }

  if (target.readlink) {
    const orig = target.readlink;
    target.readlink = function (...args) {
      const cb = typeof args[args.length - 1] === "function" ? args.pop() : null;
      if (cb) {
        return orig.call(this, ...args, (err, link) => {
          if (err && (err.code === "EISDIR" || err.code === "UNKNOWN")) {
            err.code = "EINVAL";
          }
          cb(err, link);
        });
      }
      return orig.apply(this, args);
    };
  }

  if (target.promises && target.promises.readlink) {
    const orig = target.promises.readlink;
    target.promises.readlink = function (...args) {
      return orig.apply(this, args).catch((err) => {
        if (err && (err.code === "EISDIR" || err.code === "UNKNOWN")) {
          err.code = "EINVAL";
        }
        throw err;
      });
    };
  }
}

patch(fs);
try {
  const nodeFs = process.getBuiltinModule ? process.getBuiltinModule("fs") : null;
  if (nodeFs) patch(nodeFs);
} catch (e) {}
