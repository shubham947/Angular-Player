---
label: Cast
order: 500
icon: rss
tags: [cast, config, guide]
---
## Elevate Your Video Experience with Chromecast!
Are you ready to take your video playback to the big screen and wow your audience with Chromecast support? Let's set it up and get the show rolling!

### 🚀 Setup 🚀
To enable Chromecast and cast your ng-plyr media to the big screen, follow these simple steps:

1. Open your `index.html` file.

2. Add the following script just before the closing `</body>` tag to load the necessary Cast Sender Framework:

```html
<script type="text/javascript" src="https://www.gstatic.com/cv/js/sender/v1/cast_sender.js?loadCastFramework=1"></script>
```
Now, you're all set to unleash the power of Chromecast and bring your ng-plyr media to life on larger screens!

### 💻 Code snippet for Casting with ng-plyr

```ts
import { Component, OnInit } from '@angular/core';
import { CastService } from 'path/to/your/cast.service'; // Replace with the actual path to your CastService

@Component({
  selector: 'app-cast-page',
  templateUrl: './cast-page.component.html',
  styleUrls: ['./cast-page.component.scss']
})
export class CastPageComponent implements OnInit {

  constructor(private _castService: CastService) { }

  ngOnInit(): void {
    // Check if the Cast SDK is available and initialized
    if (this._castService.isSdkAvailable()) {
      // Initialize Cast API
      this._castService.initializeCastApi();

      // Get the CastContext and show the Cast dialog to the user
      let castContext = this._castService.getCastContext();
      // Starts media casting after session starts
      castContext.requestSession().then((session: any) => {
        // Add event listeners
        this.listenToPlayerEvents();
        // Load media in the receiver
        this._castService.loadMedia(this.media.src, 'video/mp4');
      }).catch((err: any) => {
        console.error(err);
      });
    } else {
      console.warn('Cast SDK is not available or not initialized.');
    }
  }

  private listenToPlayerEvents() {
    // Add event listeners to handle player events during casting
    // Implement your event handling logic here
  }

}
```
Please make sure to replace '**path/to/your/cast.service**' with the actual path to your CastService in the import statement. Additionally, implement the **listenToPlayerEvents()** method according to your application's requirements to handle player events and enable casting mode appropriately.

With this setup, you're all set to cast your media to the big screen and provide an immersive casting experience to your users!

## 📺 CastService - Your Gateway to Chromecast 📺
Are you ready to wield the power of ng-plyr and Chromecast like a true video wizard? Let's explore the incredible methods that will elevate your media experience to new heights.

With Chromecast enabled, you can now utilize the magic of **CastService** in your components. Let's explore the methods it offers:

1. **play()**: Embrace the magic of play! With this method, you can command your media to start playing, captivating your audience and bringing your content to life.

2. **pause()**: Sometimes, a pause is necessary for a moment of reflection. Use this method to gracefully pause your media and let your audience catch their breath.

3. **stopCasting()**: The grand finale! Stop casting your media to the big screen with this method and return to your ng-plyr player's local performance.

4. **mute()**: Silence, please! Use this method to mute the media and create a moment of peace amidst the sound.

5. **unmute()**: Unleash the sound once again! With this method, you can unmute the media and let the symphony continue.

6. **setVolumeLevel(volume: number)**: Take control of the volume and set it to your desired level (range: 0 to 1). Let the perfect audio balance harmonize with your content.

7. **seekTo(toSec: number)**: Want to take your audience to a specific moment? Use this method to seek the media to a particular second and create the perfect scene.

8. **initializeCastApi()**: Welcome to the world of Chromecast! This method initializes the Cast SDK and prepares your ng-plyr player for seamless casting.

9. **loadMedia(mediaURL?: string, contentType?: string)**: Unleash your media onto the big screen! Cast your media to the receiver using this method and choose the contentType for a flawless playback experience.

10. **endCurrentSession(stopCasting: boolean)**: The final act! Use this method to stop casting or gracefully end the current session with your ng-plyr player.

11. **skipAd()**: No more interruptions! Skip ads and keep your content flowing smoothly with this method.

12. **stopListeningRemotePlayerEvents()**: Sometimes, it's time to stop listening. Use this method to cease listening to remote player events.

13. **onCastEvent(eventName: string, cb: Function)**: Be the conductor of remote player events! Create and handle custom remote player events with this method, letting you orchestrate a mesmerizing media experience. In eventName you can put **RemotePlayerEventType** of **cast.framework.RemotePlayer**

### 💻 Code Snippet for *onCastEvent* method
```ts
// Listening to remote events
listenToPlayerEvents() {
    // Storing local player states in local variables to restore after receiver disconnects

    // Cast Connected/disconnected
    this._castService.onCastEvent('IS_CONNECTED_CHANGED', () => {
        if (this._castService.player.isConnected) {
            console.log('Cast Player connected');
            // Stop playing on local device
        } else {
            console.log('Cast Player disconnected');
            this._castService.stopListeningRemotePlayerEvents();
            // Start playing on local device
            // Set local UI to original state
        }
    }).then((res: any) => console.log(res))
    .catch((err: any) => console.error(err));
}
```

There you have it, an arsenal of methods to control your ng-plyr media and cast it to the grand stage of Chromecast. Embrace these methods and let your video masterpiece shine like never before!
