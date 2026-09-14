import fs from "node:fs";

// Patch Node v24 Windows libuv issue where readlink throws EISDIR instead of EINVAL/UNKNOWN on regular files
if (fs.readlinkSync) {
  const origSync = fs.readlinkSync;
  fs.readlinkSync = function (...args) {
    try {
      return origSync.apply(this, args);
    } catch (err) {
      if (err && err.code === "EISDIR") {
        err.code = "EINVAL";
      }
      throw err;
    }
  };
}

if (fs.readlink) {
  const origAsync = fs.readlink;
  fs.readlink = function (...args) {
    const cb = typeof args[args.length - 1] === "function" ? args.pop() : null;
    if (cb) {
      return origAsync.call(this, ...args, (err, link) => {
        if (err && err.code === "EISDIR") {
          err.code = "EINVAL";
        }
        cb(err, link);
      });
    }
    return origAsync.apply(this, args);
  };
}

if (fs.promises && fs.promises.readlink) {
  const origPromise = fs.promises.readlink;
  fs.promises.readlink = function (...args) {
    return origPromise.apply(this, args).catch((err) => {
      if (err && err.code === "EISDIR") {
        err.code = "EINVAL";
      }
      throw err;
    });
  };
}

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    unoptimized: true,
  },
  webpack: (config) => {
    config.resolve.symlinks = false;
    return config;
  },
};

export default nextConfig;
