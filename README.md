# Angular Player

An HTML5 media player, built using Angular. It has interface similar to Youtube player.

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

### ng-plyr input attributes
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
- [ ] Playing audio
- [ ] Show media title
- [ ] Switch for autoplay
- [ ] Cast to other devices

### For Developers
- [x] Provide media src
- [x] Custom loading image can be set
- [x] Bookmarks can be shown on timeline
- [x] Looping the same media
- [x] Provide more controls like volume, playfrom, loop etc.
- [x] Emit events from ng-plyr: ended, playing, paused, volumechange, fullscreen etc.
- [x] Playlist support
- [x] Access to Player methods: play, pause, next, prev etc.
- [ ] Hide controls
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
| `Shift + N`  | Play next media      |
| `Shift + P`  | Play prev media      |

## Known issues
- Not supported in all Angular versions
- Volume slider UI
