<p align="center">
    <a href="https://ng-plyr.web.app"><img src="https://github.com/shubham947/Angular-Player/actions/workflows/firebase-hosting-merge.yml/badge.svg" alt="Firebase Deployment"></a>
    <a href="https://shubham947.github.io/Angular-Player"><img src="https://github.com/shubham947/Angular-Player/actions/workflows/retype-action.yml/badge.svg" alt="Documentation"></a>
    <br />
    <a href="https://www.npmjs.com/package/ng-plyr"><img src="https://img.shields.io/npm/v/ng-plyr.svg?style=flat-square" alt="npm"></a>
    <a href="http://packagequality.com/#?package=ng-plyr"><img src="https://npm.packagequality.com/shield/ng-plyr.svg?style=flat-square" alt="Package Quality"></a>
    <a href="https://www.npmjs.com/package/ng-plyr"><img src="https://img.shields.io/npm/dm/ng-plyr.svg?style=flat-square" alt="npm"></a>
    <a href="https://www.npmjs.com/package/ng-plyr"><img src="https://img.shields.io/npm/dt/ng-plyr?style=flat-square" alt="npm"></a>
    <a href="https://github.com/shubham947/ng-plyr/blob/master/LICENSE.md"><img src="https://img.shields.io/badge/license-MIT-blue.svg?style=flat-square" alt="MIT licensed"></a>
    <br /><br />
</p>

# Angular Player

An HTML5 media player, built using Angular. It has interface similar to Youtube player.
It can be used in Angular 14 and above.

## Usage
### Add NgPlyrModule to your AppModule:
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

### ng-plyr input attributes
| Input               | Type                 | Description                                   |
| ------------------- | -------------------- | --------------------------------------------- |
| `src`               | `string`             | URL of media source                           |
| `preload`           | `string`             | Same as HTML `<video>` preload Attribute      |
| `loadingImgSrc`     | `string`             | URL of custom loading image                   |
| `playFrom`          | `number`             | Play media starting from specified second     |
| `volume`            | `number`             | Keep playing the same media over and over     |
| `loop`              | `boolean`            | Play media starting from specified second     |
| `bookmarks`         | `number[]`           | Array of seconds within media max duration    |
| `autoplay`          | `boolean`            | Enable/disable autoplay                       |
| `nextMedia`         | `Media`              | Media to be played next                       |
| `playlist`          | `Media[]`            | Pass entire playlist to play                  |
| `loopPlaylist`      | `boolean`            | Loop over playlist                            |
| `poster`            | `string`             | URL of the poster image                       |

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

### Methods
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

## Features
- [x] Shortcuts available for different buttons
- [x] Can switch to PIP and Fullscreen
- [x] Double tap to seek back/forward
- [x] Shows buffer status on timeline
- [x] Autofetch Video metadata
- [x] Change playback speed
- [x] Seek to specific time by clicking on timeline
- [x] Control for media volume
- [x] Show loading animation on buffering
- [x] Play Next/Prev media
- [x] Button for looping
- [x] Show media title
- [x] Cast to other devices
- [x] While casting local player acts as remote
- [ ] Playing audio
- [ ] Switch for autoplay

### For Developers
- [x] Provide media src
- [x] Custom loading image can be set
- [x] Bookmarks can be shown on timeline
- [x] Looping the same media
- [x] Provide more controls like volume, playfrom, loop etc.
- [x] Emit events from ng-plyr: ended, playing, paused, volumechange, fullscreen etc.
- [x] Playlist support
- [x] Access to Player methods: play, pause, next, prev etc.
- [x] Cast service methods are accessible
- [x] Player theme can be customised
- [x] Hide controls
- [ ] Multiple media sources
- [ ] Hover to play media thumnails
- [ ] Show bookmark text on hovering a bookmark
- [ ] Show image previews on hovering timeline

## Shortcuts
| Key          | Function             |
| ------------ | -------------------- |
| Space bar    | Play/Pause           |
| `m`          | Mute/Unmute          |
| `i`          | Toggle miniplayer    |
| `f`          | Toggle fullscreen    |
| `k`          | Play/Pause           |
| `0` or `home`| Go to start          |
| `1 to 9`     | Go to 10% to 90%     |
| `end`        | Go to end            |
| Up arrow     | Volume up            |
| Down arrow   | Volume down          |
| Left arrow   | Seek back 5 sec      |
| Right arrow  | Seek ahead 5 sec     |
| `<`          | Decrease playback speed by .25x |
| `>`          | Increase playback speed by .25x |
| `Shift + N`  | Play next media      |
| `Shift + P`  | Play prev media      |

## Cast setup
Add below script in `index.html`
```
<script type="text/javascript" src="https://www.gstatic.com/cv/js/sender/v1/cast_sender.js?loadCastFramework=1"></script>
```
Now you an use CastService methods in your components.

## Known issues
- Volume slider UI
