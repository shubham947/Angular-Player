---
label: Events, attributes and Methods
order: 800
icon: zap
---
## Unleash the Power of Events and Attributes!
Hey there, fellow developer! Brace yourself as we dive into the world of ng-plyr events and attributes that will level up your video player game in Angular!

### 🎬 Input Attributes 🎬
The `<ng-plyr>` tag offers an array of input attributes, giving you the flexibility to fine-tune your media playback experience:

- **src**: Provide the URL of the media source to display your video or audio content.
- **preload**: Define when do you want to fetch video and/or its metadata. Same as HTML video tag's preload Attribute.
- **loadingImgSrc**: Set a custom loading image to charm your users while the media loads.
- **playFrom**: Start playing your media from a specific second to get the perfect playback.
- **volume**: Control the volume level and set it just right for your users.
- **loop**: Enable or disable looping so that the media plays from the beginning or stops at the end.
- **bookmarks**: Highlight specific seconds within the media's duration for easy navigation.
- **autoplay**: Decide whether your media starts playing automatically or waits for a user command.
- **nextMedia**: Define the media that should play next, making your playlist even more engaging.
- **playlist**: Pass an entire playlist to delight your users with continuous playback.
- **loopPlaylist**: Turn on the playlist loop to keep the fun going endlessly.
- **poster**: Greet your users with an awesome video poster.

### 🎉 Output Events 🎉
Get ready for the excitement of ng-plyr's output events, providing you with valuable information about your media playback:

- **playing**: Celebrate as the media starts to play, giving life to your content.
- **paused**: Pause for applause when the media takes a break.
- **ended**: Cue the applause again when the media ends its show.
- **onnext**: Stay ahead by knowing which media is set to play next in your playlist.
- **onprev**: Rewind and take a bow as the previous media steps into the spotlight.
- **fullscreen**: Feel the magic of entering or exiting fullscreen mode.
- **volumechange**: Watch the volume level change or mute/unmute with your commands.

### 🚀 Upcoming Inputs and Output Events 🚀
We're always upgrading ng-plyr to offer you more exciting features! Keep an eye out for these upcoming additions:

- **type**: Specify the media type to enhance playback versatility.
- **captions**: Enrich your media experience with captions in different languages.

The excitement doesn't stop there! Be prepared for the error event, which will provide you with vital details about any errors that might occur.

### Methods - Your Arsenal of Control!
Feel like a video playback maestro with ng-plyr's arsenal of powerful methods at your disposal:

- **play()**: Conquer the play button to start your media's performance.
- **pause()**: The pause button bows to your command, giving your media a break.
- **next()**: Seamlessly transition to the next media in your playlist.
- **prev()**: Rewind and replay the previous media to keep your audience entertained.
- **enableMediaLooping(loop?:boolean)**: Take control of media looping, setting it to your preferred state (default: true).
- **enablePlaylistLooping(loop?:boolean)**: Extend the excitement with playlist looping (default: true).
- **changeVolume(level:number)**: Master the volume knob and set the perfect level (range: 0 to 1).
- **seekTo(atSecond:number)**: Seamlessly seek the media to a specific second to nail the perfect moment.
- **setPlaybackSpeed(rate:number)**: Tune your media playback speed within the range of 0.25 to 2.
- **getCurrentlyPlaying()**: Discover which media is currently captivating your audience.
- **getNextMedia()**: Stay one step ahead by knowing what's coming up next in your playlist.
- **getNumOfMediaInPlaylist()**: Count the number of media items in your playlist.
- **addToPlaylist(mediaItems:Media[], atStart?:boolean)**: Expand your playlist with media items at the end or start.
- **playNext(media:Media[])**: Seamlessly add media to your playlist after the current media's performance.

So, are you ready to unleash the potential of ng-plyr and take your video player experience to new heights? Dive into the world of ng-plyr, and let the magic of seamless media playback begin! 🚀


## Some tables for all the geeky developers
### Events and Attributes
You can pass the following as attributes to `<ng-plyr>` tag.

#### Input attributes
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

#### Output events
| Output              | Type                 | Description                                   |
| ------------------- | -------------------- | --------------------------------------------- |
| `playing`           | `boolean`            | Media started to play                         |
| `paused`            | `boolean`            | Media paused                                  |
| `ended`             | `boolean`            | Media ended                                   |
| `onnext`            | `Media`              | Playing next media                            |
| `onprev`            | `Media`              | Playing previous media                        |
| `fullscreen`        | `boolean`            | Media entered/exited fullscreen               |
| `volumechange`      | `{ level:number, muted:boolean }` | Volume changed or muted/unmuted  |


#### Upcoming Inputs and Output events
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
