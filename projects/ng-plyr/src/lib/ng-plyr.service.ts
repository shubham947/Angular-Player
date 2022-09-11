import { Injectable } from '@angular/core';
import { Media } from './models/media.model';
import { Playlist } from './models/playlist.model';

@Injectable({
  providedIn: 'root'
})
export class PlayerService {
  plyr:any;

  constructor() { }

  // Accessing `this` from player component
  addComponentRef(plyrComponent:any) {
    this.plyr = plyrComponent;
  }
  removeComponentRef() {
    this.plyr = undefined;
  }
  
  // Public functions
	// Actions
	play() {
		this.plyr.video?.nativeElement.play();
	}
	pause() {
		this.plyr.video?.nativeElement.pause();
	}

	next() { this.plyr.playNextMedia(); }
	prev() { this.plyr.playPrevMedia(); }

	enableMediaLooping(loop:boolean = true) { this.plyr.isLoopingEnabled = loop; }
	enablePlaylistLooping(loop:boolean = true) { this.plyr.loopPlaylist = loop; }

  changeVolume(level:number) {
    this.plyr.changeVolume(level);
  }
  seekTo(atSecond:number) {
    this.plyr.seekTo(atSecond);
  }
  
  setPlaybackSpeed(rate:number) {
    this.plyr.setPlaybackSpeed(rate);
  }

	// Getter functions
	getCurrentlyPlaying() {
		return this.plyr.media;
	}
	getNextMedia() {
		return this.plyr.nextMedia;
	}
	getNumOfMediaInPlaylist() {
		return this.plyr.playlist.itemCount;
	}

	// Modify playlist
  addToPlaylist(mediaItems:Media[], atStart:boolean) {
    let items = Playlist.mediaArrToPaylistItems(mediaItems);
    this.plyr.playlist.appendPlaylist(items, atStart);
  }
  playNext(media:Media[]) {
    let items = Playlist.mediaArrToPaylistItems([...media]);
    this.plyr.playlist.addNext(items);
  }

}
