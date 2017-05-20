# Packaging Angular libraries with `ng-packagr`

> Packaging Angular libraries is fun!

Start-up the sample:

```bash
$ yarn install
$ yarn build:lib
$ ng serve
```

Here are instructions how this demo was created.


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


#### Show off in Demo App

First, in `.angular-cli.json` set `outDir` of the Angular CLI app, so that it does not conflict with output directory of your library!

```json
{
  "project": {
    "name": "ng-packaged"
  },
  "apps": [
    {
      "root": "src",
      "outDir": "dist/app",
      /* ... */
    }
  ]
}
```


Then, in `tsconfig.app.json`, map the TypeScript import path:

```json
{
  "extends": "../tsconfig.json",
  "compilerOptions": {
    "paths": {
      "@my/lib": [ "../dist/my-lib" ]
    }
  }
}
```

Finally, include in your application.
In `app.module.ts`:

```ts
import { MyLibModule } from '@my/lib';

@NgModule({
  imports: [
    /* .. */
    MyLibModule.forRoot()
  ],
})
export class AppModule { }
```

And use them in components like `app.component.ts`:

```ts
import { Component } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { BarService } from '@my/lib';

@Component({
  selector: 'app-root',
  template: `
<my-foo></my-foo>
<hr>
<marquee>{{ value$ | async }}</marquee>
`,
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  value$: Observable<string>;

  constructor (
    bar: BarService
  ) {
     this.value$ = bar.value;
  }

}
```
