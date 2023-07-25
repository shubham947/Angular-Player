import { Injectable, OnInit } from '@angular/core';
import { SafeUrl } from '@angular/platform-browser';

declare const cast: any;
declare const chrome: any;

@Injectable({
  providedIn: 'root'
})
export class CastService implements OnInit {
  private isInitialized = false;
  private castContext: any;
  private currentSession: any;
  player:any;
  playerController:any;

  constructor() {}

  ngOnInit() {
    this.initializeCastApi();
    this.listenToPlayerEvents();
  }
  
  isSdkAvailable(): boolean {
    return !!cast?.framework;
  }

  initializeCastApi() {
    // Check if the Cast SDK is already initialized
    if (this.isInitialized) return;

    // Check if the Cast SDK is available and initialized
		if (this.isSdkAvailable()) {
      console.log('Initializing Cast API...');

      // Initialize the Cast SDK
      cast.framework.CastContext.getInstance().setOptions({
        receiverApplicationId: chrome.cast.media.DEFAULT_MEDIA_RECEIVER_APP_ID,
        autoJoinPolicy: chrome.cast.AutoJoinPolicy.ORIGIN_SCOPED
      });
  
      // Store the CastContext object
      this.castContext = cast.framework.CastContext.getInstance();
      
      // Initializing Remote Player
      this.player = new cast.framework.RemotePlayer();
      this.playerController = new cast.framework.RemotePlayerController(this.player);
      
      this.isInitialized = true;
		} else {
			console.log('Cast SDK is not available or not initialized.');
		}
  }
  
  // Cast Media to receiver
  loadMedia(mediaURL?:string | SafeUrl, contentType:string = 'video/mp4') {
    if (!this.currentSession) return;
    if (!mediaURL) {
      this.currentSession.endSession(false);
    }

    let mediaInfo = new chrome.cast.media.MediaInfo(mediaURL, contentType);
    let request = new chrome.cast.media.LoadRequest(mediaInfo);

    this.currentSession = this.castContext.getCurrentSession();
    
    if (this.currentSession) {
      this.currentSession.loadMedia(request).then(
        function() { console.log('Media load succeed'); },
      ).catch((error: string)=> {
        console.log('Error in casting media: ' + error);
      });
    } else {
      console.log('Session ended or not present.');
    }
  }

  getCastContext(): any {
    return this.castContext;
  }

  // getCurrentSession(): any {
  //   return this.currentSession;
  // }

  isCasting(): boolean {
    return !!this.currentSession;
  }

  // Stop casting or just stop session
  endCurrentSession(stopCasting: boolean) {
    this.currentSession?.endSession(stopCasting);
  }

	// Remote Player controls
	playOrPauseCasting() {
		if (this.currentSession && !this.player.isPlayingBreak) {
			this.playerController.playOrPause();
		}
	}
	
	stopCasting() {
    if (this.currentSession) {
      this.playerController.stop();
    }
	}

  // Seeks the media item to player currentTime value
	seekTo(toSec: number) {
    if (this.currentSession && this.player.canSeek) {
      this.player.currentTime = toSec;
      this.playerController.seek();
    }
  }
  
  muteOrUnmute() {
    if (this.currentSession) {
      this.playerController.muteOrUnmute();
    }
  }
  
  setVolumeLevel(volume:number) {
    if (this.currentSession) {
      // Sets the volume level of the connected device to the player volumeLevel value.
      this.player.volumeLevel = volume;
      this.playerController.setVolumeLevel();
    }
  }
  
  // Skip the ad currently playing on the receiver
  skipAd() {
    if (this.currentSession) {
      this.playerController.skipAd();
    }
  }

  // To-Do: Listening to remote events
  listenToPlayerEvents() {
    this.playerController.addEventListener(
      cast.framework.RemotePlayerEventType.IS_CONNECTED_CHANGED, ()=> {
      if (!this.player.isConnected) {
        console.log('RemotePlayerController: Player disconnected', this.isCasting());
        // Update local player to disconnected state
      }
    });
  }
}
