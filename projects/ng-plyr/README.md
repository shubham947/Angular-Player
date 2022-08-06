# NgPlyr

An HTML5 media player, built using Angular. It has interface similar to Youtube.

## Usage
`<ng-plyr src='https://example.com/video.mp4'></ng-plyr>`

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
- [ ] Show loading animation on buffering

### For Developers
- [x] Looping the same video
- [x] Custom loading image can be set
- [x] Bookmarks can be shown on timeline
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
| `end`        | Go to end            |
| Up arrow     | Volume up            |
| Down arrow   | Volume down          |
| Left arrow   | Seek back 5 sec      |
| Right arrow  | Seek ahead 5 sec     |

## References
- Youtube Video: https://youtube.com/watch?v=ZeNyjnneq_w
