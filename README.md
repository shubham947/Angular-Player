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
<ng-plyr [src]='videoUrl'></ng-plyr>
```
And assign value to videoUrl in component.ts

### ng-plyr input attributes
- **src**: URL of video source (type: string)
- **loadingImgSrc**: URL of custom loading image (type: string)
- **bookmarks**: Array of seconds within video max duration (type: Number[])

## Features
- [x] Shortcuts available for different buttons
- [x] Can switch to PIP and Fullscreen
- [x] Double tap to seek back/forward
- [x] Shows buffer status on timeline
- [x] Autofetch Video metadata
- [x] Change playback speed
- [x] Seek to specific time by clicking on timeline
- [x] Control for video volume
- [x] Show loading animation on buffering
- [ ] Show video title
- [ ] Button for looping
- [ ] Switch for autoplay

### For Developers
- [x] Provide media src
- [x] Custom loading image can be set
- [x] Bookmarks can be shown on timeline
- [ ] Hide controls
- [ ] Hover to play video thumnails
- [ ] Looping the same video
- [ ] Show bookmark text on hovering a bookmark
- [ ] Show image previews on hovering timeline
- [ ] Emit events from ng-plyr: onend, onplay, onpause, onnext, onprev etc.
- [ ] Provide more controls like volume, playfrom, loop, autoplay etc.

## Shortcuts
| Key          | Function             |
| ------------ | -------------------- |
| Space bar    | Play/Pause           |
| `m`          | Mute/Unmute          |
| `i`          | Toggle miniplayer    |
| `f`          | Toggle fullscreen    |
| `k`          | Play/Pause           |
| `0` or `home`| Go to start          |
| `end`        | Go to end            |
| Up arrow     | Volume up            |
| Down arrow   | Volume down          |
| Left arrow   | Seek back 5 sec      |
| Right arrow  | Seek ahead 5 sec     |

## Known issues
- Not supported in all Angular versions
- Volume slider UI
