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
And assign value to mediaUrl in component.ts

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
| `playlist`          | `Media[]`                         | Pass entire playlist to play                 |
| `type`              | `MediaType`                       | Specify media type                           |
| `captions`          | `[{ path: string, lang: string }]`| Add captions to media                        |

| Output              | Type                 | Description                                   |
| ------------------- | -------------------- | --------------------------------------------- |
| `error`             | `object`             | Details of any error if occured               |

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
- [ ] Playing audio
- [ ] Show media title
- [ ] Button for looping
- [ ] Switch for autoplay

### For Developers
- [x] Provide media src
- [x] Custom loading image can be set
- [x] Bookmarks can be shown on timeline
- [x] Looping the same media
- [x] Provide more controls like volume, playfrom, loop etc.
- [x] Emit events from ng-plyr: ended, playing, paused, volumechange, fullscreen etc.
- [ ] Playlist support
- [ ] Play Next/Prev media
- [ ] Hide controls
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
