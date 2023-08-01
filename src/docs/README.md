---
label: Getting started
order: 1000
icon: rocket
---
# Introduction

Welcome to the world of ng-plyr, the ultimate video player library for Angular! Are you ready to transform your video playback experience and impress your users with a YouTube-like interface? Buckle up, because ng-plyr is about to take your video game to the next level!

An HTML5 media player, built using Angular.
It can be used in Angular 14 and up.

It is and open-source project, so feel free to use it in your Angular projects, to build awesome media player with minimal efforts.

## Installation
Getting started with ng-plyr is a breeze! Simply run the following command to add this powerful library to your Angular project:
```bash
npm i ng-plyr
```

## Usage
Now that you've installed ng-plyr, it's time to kickstart the fun! Inject the **NgPlyrModule** into your app.module.ts and prepare to embrace the world of video excellence.

### Add NgPlyr to your AppModule:
```ts
import { NgPlyrModule } from 'ng-plyr';
...

@NgModule({
  imports: [
    ...
    NgPlyrModule
  ],
  ...
})
export class AppModule { }
```

### Add this tag to your Component html
With ng-plyr integrated, you can effortlessly add the `<ng-plyr>` tag anywhere in your app, taking advantage of its various input attributes like src, playlist, and more. Exciting, right?

You can use it in your app like these.

```html
<ng-plyr src='https://example.com/video.mp4'></ng-plyr>
```
**OR**
```html
<ng-plyr [src]='mediaUrl'></ng-plyr>
```
**OR**
```html
<ng-plyr [playlist]='mediaArr'></ng-plyr>
```
And assign value to mediaUrl in component.ts

**Note:** `playlist` is preferred over `src`, so if both are passed, media will play from `playlist`
