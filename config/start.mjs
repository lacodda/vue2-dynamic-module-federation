#! /usr/bin/env node

// start.mjs

import { $, chalk, cd, argv, spinner, fs } from 'zx';
import { readdir } from 'fs/promises';
import path from 'path';

const PACKAGES_DIR = path.resolve('packages');
const CONFIG_DEV = path.resolve('config', 'webpack.dev.js');
const CONFIG_PROD = path.resolve('config', 'webpack.prod.js');
const colors = ['#009dd6', '#ec33ec', '#d6f028', '#1034a6', '#edb3eb', '#00cc99', '#fdf35e', '#E74C3C', '#27AE60', '#C70039'];

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

async function runApps (apps) {
  try {
    await Promise.all(apps.map(async dir => {
      $.verbose = false;
      cd(path.resolve(PACKAGES_DIR, dir));
      $.verbose = true;
      return argv.mode === 'development' ? await webpackServe() : await webpackBuild();
    }));
  } catch (error) {
    exitWithError(`Error: ${error.message}`);
  }
}

async function webpackServe () {
  $.verbose = false;
  try {
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
  $.verbose = true;
}

async function webpackBuild () {
  try {
    await $`npx webpack --config ${CONFIG_PROD.replaceAll(path.sep, '/')}`;
  } catch (error) {
    exitWithError(`Error: ${error.message}`);
  }
}

const apps = await getDirectories(PACKAGES_DIR);
await spinner('working...', () => runApps(apps));
