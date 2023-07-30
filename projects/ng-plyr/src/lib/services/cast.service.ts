import { Injectable } from '@angular/core';

declare const cast: any;
declare const chrome: any;

@Injectable({
  providedIn: 'root'
})
export class CastService {
  private isInitialized = false;
  private castContext: any;
  private currentSession: any;
  player:any;
  playerController:any;

  constructor() {}

  
  isSdkAvailable(): boolean {
    return !!cast?.framework;
  }

  initializeCastApi() {
    // Check if the Cast SDK is already initialized
    if (this.isInitialized) return;

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
  }
  
  // Cast Media to receiver
  loadMedia(mediaURL?:string, contentType:string = 'video/mp4') {
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
        console.error('Error in casting media: ' + error);
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
    this.stopListeningRemotePlayerEvents();
  }

	// Remote Player controls
	private playOrPauseCasting() {
		if (this.currentSession && !this.player.isPlayingBreak) {
			this.playerController.playOrPause();
		}
	}

  play() {
    if (this.player?.isPaused) {
      this.playOrPauseCasting();
    }
  }

  pause() {
    if (!this.player?.isPaused) {
      this.playOrPauseCasting();
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
  
  private muteOrUnmute() {
    if (this.currentSession) {
      this.playerController.muteOrUnmute();
    }
  }
  
  mute() {
    if (!this.player?.isMuted) {
      this.muteOrUnmute();
    }
  }
  
  unmute() {
    if (this.player?.isMuted) {
      this.muteOrUnmute();
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

  // Create RemotePlayer events
  onCastEvent(eventName:string, cb:Function) {
    return new Promise((resolve, reject)=> {
      this.playerController.addEventListener(cast.framework.RemotePlayerEventType[eventName], ()=> {
        try {
          cb();
        } catch (error) {
          reject(error);
        }
      });
      resolve('Added event listener on ' + eventName);
    });
  }

  // Stop all event listeners on playerController
  stopListeningRemotePlayerEvents() {
    console.info('Stop listening to events');
    this.playerController.removeEventListener(cast.framework.RemotePlayerEventType.IS_PAUSED_CHANGED, ()=> {});
    this.playerController.removeEventListener(cast.framework.RemotePlayerEventType.IS_PLAYING_BREAK_CHANGED, ()=> {});
    this.playerController.removeEventListener(cast.framework.RemotePlayerEventType.CURRENT_TIME_CHANGED, ()=> {});
    this.playerController.removeEventListener(cast.framework.RemotePlayerEventType.VOLUME_LEVEL_CHANGED, ()=> {});
    this.playerController.removeEventListener(cast.framework.RemotePlayerEventType.IS_MUTED_CHANGED, ()=> {});
  }
}
