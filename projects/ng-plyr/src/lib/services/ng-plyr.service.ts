import { Injectable } from '@angular/core';
import { ErrorCodes } from '../models/error.model';
import { Media } from '../models/media.model';
import { Playlist } from '../models/playlist.model';

@Injectable({
  providedIn: 'root'
})
export class PlayerService {
  private _plyr:any;

  constructor() { }

  private _checkForErrors(elements?:Array<any>) {
    let check = new Set(elements);
    
    if (!this._plyr) throw new Error(ErrorCodes['player/not-initialized']);
    if (check?.has('video') && !this._plyr.video) throw new Error(ErrorCodes['video/element-not-initialized']);
  }

  // Accessing `this` from player component
  addComponentRef(plyrComponent:any) {
    this._plyr = plyrComponent;
  }
  removeComponentRef() {
    this._plyr = undefined;
  }
  
  // Public functions
	// Actions
	play() {
    this._checkForErrors(['video']);
    this._plyr.video?.nativeElement.play();
	}
	pause() {
    this._checkForErrors(['video']);
		this._plyr.video?.nativeElement.pause();
	}

	next() {
    this._checkForErrors();
    this._plyr.playNextMedia();
  }
	prev() {
    this._checkForErrors();
    this._plyr.playPrevMedia();
  }

	enableMediaLooping(loop:boolean = true) {
    this._checkForErrors();
    this._plyr.isLoopingEnabled = loop;
  }
	enablePlaylistLooping(loop:boolean = true) {
    this._checkForErrors();
    this._plyr.loopPlaylist = loop;
  }

  changeVolume(level:number) {
    this._checkForErrors(['video']);
    this._plyr.changeVolume(level);
  }
  seekTo(atSecond:number) {
    this._checkForErrors(['video']);
    this._plyr.seekTo(atSecond);
  }

  setPlaybackSpeed(rate:number) {
    this._checkForErrors();
    this._plyr.setPlaybackSpeed(rate);
  }

	// Getter functions
	getCurrentlyPlaying() {
    this._checkForErrors();
		return this._plyr.media;
	}
	getNextMedia() {
    this._checkForErrors();
		return this._plyr.nextMedia;
	}
	getNumOfMediaInPlaylist() {
    this._checkForErrors();
		return this._plyr.playlist.itemCount;
	}

	// Modify playlist
  addToPlaylist(mediaItems:Media[], atStart?:boolean) {
    this._checkForErrors();
    let items = Playlist.mediaArrToPaylistItems(mediaItems);
    this._plyr.playlist.appendPlaylist(items, atStart);
  }
  playNext(media:Media[]) {
    this._checkForErrors();
    let items = Playlist.mediaArrToPaylistItems([...media]);
    this._plyr.playlist.addNext(items);
  }

}
