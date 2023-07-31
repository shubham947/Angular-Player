---
label: Introduction
order: 1000
icon: rocket
tags: [config]
---
# Introduction

An HTML5 media player, built using Angular. It has interface similar to Youtube player.
It can be used in Angular >= 14.

It is and open-source project, so feel free to use it in your Angular projects, to build awesome media player with minimal efforts.

## Installation
To install ng-plyr in your Angular project, run the following command
```
npm i ng-plyr
```

## Usage
### Add NgPlyr to your AppModule:
```
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
```
<ng-plyr src='https://example.com/video.mp4'></ng-plyr>
```
**OR**
```
<ng-plyr [src]='mediaUrl'></ng-plyr>
```
**OR**
```
<ng-plyr [playlist]='mediaArr'></ng-plyr>
```
And assign value to mediaUrl in component.ts

**Note:** `playlist` is preferred over `src`, so if both are passed, media will play from `playlist`

## Events and Attributes
You can pass the following as attributes to `<ng-plyr>` tag.

### Input attributes
| Input               | Type                 | Description                                   |
| ------------------- | -------------------- | --------------------------------------------- |
| `src`               | `string`             | URL of media source                           |
| `loadingImgSrc`     | `string`             | URL of custom loading image                   |
| `playFrom`          | `number`             | Play media starting from specified second     |
| `volume`            | `number`             | Keep playing the same media over and over     |
| `loop`              | `boolean`            | Play media starting from specified second     |
| `bookmarks`         | `number[]`           | Array of seconds within media max duration    |
| `autoplay`          | `boolean`            | Enable/disable autoplay                       |
| `nextMedia`         | `Media`              | Media to be played next                       |
| `playlist`          | `Media[]`            | Pass entire playlist to play                  |
| `loopPlaylist`      | `boolean`            | Loop over playlist                            |

### Output events
| Output              | Type                 | Description                                   |
| ------------------- | -------------------- | --------------------------------------------- |
| `playing`           | `boolean`            | Media started to play                         |
| `paused`            | `boolean`            | Media paused                                  |
| `ended`             | `boolean`            | Media ended                                   |
| `onnext`            | `Media`              | Playing next media                            |
| `onprev`            | `Media`              | Playing previous media                        |
| `fullscreen`        | `boolean`            | Media entered/exited fullscreen               |
| `volumechange`      | `{ level:number, muted:boolean }` | Volume changed or muted/unmuted  |


### Upcoming Inputs and Output events
| Input               | Type                              | Description                                  |
| ------------------- | --------------------------------- | -------------------------------------------- |
| `type`              | `MediaType`                       | Specify media type                           |
| `captions`          | `[{ path: string, lang: string }]`| Add captions to media                        |

| Output              | Type                 | Description                                   |
| ------------------- | -------------------- | --------------------------------------------- |
| `error`             | `object`             | Details of any error if occured               |

## Methods
| Method(arg:type)                                | Description                                   |
| ----------------------------------------------- | --------------------------------------------- |
| `play()`                                        | Play current media                            |
| `pause()`                                       | Pause current media                           |
| `next()`                                        | Play next media                               |
| `prev()`                                        | Play prev media                               |
| `enableMediaLooping(loop?:boolean)`             | Turn on loop for media (default true)         |
| `enablePlaylistLooping(loop?:boolean)`          | Turn on loop for playlist (default true)      |
| `changeVolume(level:number)`                    | Set volume to level (0 to 1)                  |
| `seekTo(atSecond:number)`                       | Seek media to specific second                 |
| `setPlaybackSpeed(rate:number)`                 | Set media playback rate (range, .25 to 2)     |
| `getCurrentlyPlaying()`                         | Get currently playing Media                   |
| `getNextMedia()`                                | Get nextMedia                                 |
| `getNumOfMediaInPlaylist()`                     | Get number of media items in playlist         |
| `addToPlaylist(mediaItems:Media[], atStart?:boolean)` | Add mediaItems to playlist at end/start |
| `playNext(media:Media[])`                       | Add media to playlist after current media     |

