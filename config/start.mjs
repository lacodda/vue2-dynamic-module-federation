#! /usr/bin/env node

// start.mjs

import { $, chalk, cd, argv, spinner } from 'zx';
import { readdir } from 'fs/promises';
import path from 'path';
import * as dotenv from 'dotenv';

const PACKAGES_DIR = path.resolve('packages');
const DIST_DIR = path.resolve('dist');
const CONFIG_DEV = path.resolve('config', 'webpack.dev.js');
const CONFIG_PROD = path.resolve('config', 'webpack.prod.js');
const colors = ['#009dd6', '#ec33ec', '#d6f028', '#1034a6', '#edb3eb', '#00cc99', '#fdf35e', '#E74C3C', '#27AE60', '#C70039'];
$.env.DIST_DIR = DIST_DIR;
$.verbose = false;

function exitWithError (errorMessage) {
  // eslint-disable-next-line no-console
  console.error(chalk.red(errorMessage));
  process.exit(1);
}

async function getDirectories (source) {
  return (await readdir(source, { withFileTypes: true }))
    .filter(dirent => dirent.isDirectory())
    .map(dirent => dirent.name);
}

async function getPorts () {
  const ports = {};
  if (argv.mode !== 'serve') {
    return ports;
  }
  const apps = await getDirectories(PACKAGES_DIR);
  apps.forEach(async dir => {
    const appPath = path.resolve(PACKAGES_DIR, dir, '.env.production');
    dotenv.config({ path: appPath, override: true });
    ports[process.env.APP_NAME] = process.env.APP_PORT;
  });
  return ports;
}

async function runApps (apps) {
  try {
    const ports = await getPorts();
    await Promise.all(apps.map(async dir => {
      switch (argv.mode) {
        case 'development':
          return await webpackServe(dir);
        case 'production':
          return await webpackBuild(dir);
        case 'serve':
          return await serve(dir, ports[dir]);
        default:
          return true;
      }
    }));
  } catch (error) {
    exitWithError(`Error: ${error.message}`);
  }
}

async function webpackServe (dir) {
  try {
    cd(path.resolve(PACKAGES_DIR, dir));
    const stream = $`npx webpack serve --config ${CONFIG_DEV.replaceAll(path.sep, '/')}`;
    for await (const chunk of stream.stdout) {
      if (chunk.includes('APP_LISTENING')) {
        const [, appName, host, port] = chunk.toString().split('|');
        const random = Math.floor(Math.random() * colors.length);
        // eslint-disable-next-line no-console
        console.log(chalk.bgGreen.white(' SUCCESS '), 'App', chalk.white.bgHex(colors[random]).bold(` ${appName} `), `starting on ${host}:${port}`);
        return true;
      }
    }
  } catch (error) {
    exitWithError(`Error: ${error.message}`);
  }
}

async function webpackBuild (dir) {
  try {
    cd(path.resolve(PACKAGES_DIR, dir));
    const stream = $`npx webpack --config ${CONFIG_PROD.replaceAll(path.sep, '/')}`;
    for await (const chunk of stream.stdout) {
      if (chunk.includes('APP_BUILT')) {
        const [, appName] = chunk.toString().split('|');
        const random = Math.floor(Math.random() * colors.length);
        // eslint-disable-next-line no-console
        console.log(chalk.bgGreen.white(' SUCCESS '), 'App', chalk.white.bgHex(colors[random]).bold(` ${appName} `), 'built');
        return true;
      }
    }
  } catch (error) {
    exitWithError(`Error: ${error.message}`);
  }
}

async function serve (dir, port) {
  try {
    cd(path.resolve(DIST_DIR, dir));
    const stream = $`npx serve -p ${port}`;
    const msg = 'INFO  Accepting connections at ';
    for await (const chunk of stream.stdout) {
      if (chunk.includes(msg)) {
        const [, host] = chunk.toString().split(msg);
        const random = Math.floor(Math.random() * colors.length);
        // eslint-disable-next-line no-console
        console.log(chalk.bgGreen.white(' SUCCESS '), 'App', chalk.white.bgHex(colors[random]).bold(` ${dir} `), `serving on ${host}`);
      }
    }
  } catch (error) {
    exitWithError(`Error: ${error.message}`);
  }
}

if (!argv.mode) {
  process.exit(1);
}

if (argv.mode === 'production') {
  await $`rm -rf ${DIST_DIR.replaceAll(path.sep, '/')}`;
}

const apps = await getDirectories(argv.mode === 'serve' ? DIST_DIR : PACKAGES_DIR);
await spinner('working...', () => runApps(apps));
