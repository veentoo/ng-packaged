# Demonstration of packaging Angular libraries with `ng-packagr`


#### Install

Set up an Angular CLI project, add `ng-packagr`:

```bash
$ ng new ng-packaged
$ yarn add ng-packagr
```


#### Create Library

Create a library in `my-lib`.

It's recommended to provide a single `public_api.ts` as the entry point to your library.

You must provide a tsconfig for compiling your library.
It's **required**  to have at least the following values.
For a recommended, reasonable default configuration look at [`my-lib/tsconfig.lib.json`](my-lib/tsconfig.lib.json).

```json
{
  "angularCompilerOptions": {
    "flatModuleId": "@<put-your-prefix-here>/<put-your-name-here>",
    "flatModuleOutFile": "index"
  },
  "compilerOptions": {
    "target": "es2015",
    "module": "es2015",
    "declaration": true,
    "sourceMap": true
  },
  "files": [
    "src/public_api.ts"
  ]
}
```


#### Add Build Script and Configuration

In root `package.json`:

```json
{
  "name": "ng-packaged",
  "scripts": {
    "build:lib": "ng-packagr"
  },
```

It picks up a configuration in `.ng-packagr.json`:

```json
{
  "src": "my-lib",
  "dest": "dist/my-lib",
  "workingDirectory": ".ng_build",
  "ngc": {
    "tsconfig": "tsconfig.lib.json"
  }
}
```


#### Build

Now, build your library:

```bash
$ yarn build:lib
```
