import { DOCUMENT } from '@angular/common';
import { AfterViewInit, Component, ElementRef, HostListener, Inject, Input, OnChanges, SimpleChanges, ViewChild } from '@angular/core';
import { MediaType } from './media.model';

@Component({
  selector: 'ng-plyr',
  templateUrl: './ng-plyr.component.html',
	styleUrls: [ './ng-plyr.component.scss' ]
})
export class NgPlyrComponent implements AfterViewInit, OnChanges {
  // Flags
  isPlaying = false;
  isMuted = false;
  isFullscreen = false;
  isPIP = false;
  isAutoplayEnabled = false;
  isLoopingEnabled = false;
  // Variables
  playerVolume = 1;
  currentTime = '0:00';
  totalTime = '0:00';
  progressPercent = 0;
  mediaBuffers: Array<{ start: number; end: number }> = [];
  isMediaLoading = true;
  // TODO:
  mediaMarkers?:[] = [];

  // Inputs
  @Input('src') mediaURL?:string;
  @Input('type') mediaType?:MediaType;
  @Input('loadingImgSrc') loadingImgSrc?:string;
  @Input('bookmarks') bookmarks?:Array<number>;
  @Input('volume') volume?:any;
  @Input('loop') enableLooping?:Boolean;
  @Input('captions') captions?:Array<{path:string, lang:string}>;
  @Input('seekTo') playFrom?:Number;
  
  @ViewChild('videoContainer') videoContainer!: ElementRef;
  @ViewChild('video') video!: ElementRef;
  
  constructor(@Inject(DOCUMENT) private document: any) {}
  
  ngOnChanges(changes: SimpleChanges) {
    console.log(changes);
    this.mediaMarkers = changes['bookmarks'].currentValue;
    this.changeVolume(changes['volume'].currentValue);
    this.isLoopingEnabled = changes['enableLooping'].currentValue;
    this.seekTo(changes['playFrom'].currentValue);
  }

  ngAfterViewInit() {
    this.isPlaying = !this.video.nativeElement.paused;
    this.isMuted = this.video.nativeElement.muted;
    this.isFullscreen = this.document.fullscreenElement ? true : false;

    this.document.addEventListener('fullscreenchange', () => {
      if (!this.document.fullscreenElement) this.isFullscreen = false;
    });
  }

  // Shortcut keys
  @HostListener('window:keydown', [ '$event' ])
  doShortcutKeyAction(event: KeyboardEvent) {
    const tagName = this.document.activeElement.tagName.toLowerCase();
    if (tagName === 'input') return;

    const key = event.key.toLowerCase();
    if ((key === ' ' && tagName != 'button') || key === 'k') {
      this.togglePlay();
    } else if (key === 'm') {
      this.toggleMute();
    } else if (key === 'f') {
      this.toggleFullscreen();
    } else if (key === 'i') {
      this.togglePIP();
    } else if (key === 'arrowleft') {
      this.seekTo(Math.max(0, this.video.nativeElement.currentTime - 5));
    } else if (key === 'arrowright') {
      this.seekTo(Math.min(this.video.nativeElement.duration, this.video.nativeElement.currentTime + 5));
    } else if (key === 'arrowup') {
      this.changeVolume((this.playerVolume * 100 + 5) / 100);
    } else if (key === 'arrowdown') {
      const vol = (this.playerVolume * 100 - 5) / 100;
      this.changeVolume(vol < 0 ? 0 : vol);
    } else if (key === '0' || key === 'home') {
      this.seekTo(0);
    } else if (key === 'end') {
      this.stopVideo();
    }
    // console.log(event);
  }

  // Volume control
  changeVolume(value: any) {
    value = Number(value).toPrecision(2);
    if (value > 1 || value < 0) return;

    this.video.nativeElement.volume = value;
    this.playerVolume = value;
    if (this.video.nativeElement.muted && value > 0) {
      this.toggleMute();
    }
  }

  // Update video metadata in player
  updateAfterVideoInfoLoaded() {
    if (this.isAutoplayEnabled) {
      this.video.nativeElement.play();
    }
    this.isPlaying = !this.video.nativeElement.paused;
    this.currentTime = this.formatDuration(this.video.nativeElement.currentTime);
    this.totalTime = this.formatDuration(this.video.nativeElement.duration);
    this.showBuffers();
  }

  // Display video buffers on timeline
  showBuffers() {
    const buf = this.video.nativeElement.buffered;
    if (buf.length === 1 && buf.end(0) - buf.start(0) === this.video.nativeElement.duration) return;

    this.mediaBuffers = [];
    for (let i = 0; i < buf.length; i++) {
      let start = Number((buf.start(i) / this.video.nativeElement.duration).toPrecision(3)) * 100;
      let end = Number((buf.end(i) / this.video.nativeElement.duration).toPrecision(3)) * 100;
      this.mediaBuffers.push({ start, end });
    }
  }

  // Seek to specific time
  seekTo(atSecond: Number | string) {
    this.video.nativeElement.currentTime = atSecond;
    this.progressPercent =
      Number((this.video.nativeElement.currentTime / this.video.nativeElement.duration).toPrecision(3)) * 100;
  }

  updateCurrentTime() {
    this.currentTime = this.formatDuration(this.video.nativeElement.currentTime);
    this.progressPercent =
      Number((this.video.nativeElement.currentTime / this.video.nativeElement.duration).toPrecision(3)) * 100;
    this.showBuffers();
    if (this.video.nativeElement.currentTime >= this.video.nativeElement.duration) {
      if (this.isAutoplayEnabled) {
        this.playNextVideo();
      } else {
        this.stopVideo();
      }
    }
  }

  // TODO: Play previous video from Q
  playPrevVideo() {}

  // TODO: Play next video from Q
  playNextVideo() {}

  // End/Stop current video
  stopVideo() {
    this.video.nativeElement.pause();
    this.isPlaying = false;
    this.seekTo(this.video.nativeElement.duration);
  }

  setPlaybackSpeed(rate: Number) {
    if (rate < 0.25 || rate > 2) return;
    this.video.nativeElement.playbackRate = rate;
  }

  // Utility functions
  formatDuration(time: any): string {
    const sec = Math.floor(time % 60);
    const min = Math.floor(time / 60) % 60;
    const hr = Math.floor(time / 3600);

    if (hr > 0) {
      return `${hr}:${min < 10 ? '0' + min : min}:${sec < 10 ? '0' + sec : sec}`;
    } else {
      return `${min}:${sec < 10 ? '0' + sec : sec}`;
    }
  }

  // Toggles
  toggleLoop() {
    this.isLoopingEnabled = !this.isLoopingEnabled;
  }

  togglePlay() {
    this.video.nativeElement.paused ? this.video.nativeElement.play() : this.video.nativeElement.pause();
    this.isPlaying = !this.video.nativeElement.paused;
  }

  toggleMute() {
    this.video.nativeElement.muted = !this.video.nativeElement.muted;
    this.isMuted = this.video.nativeElement.muted;
  }

  togglePIP() {
    if (this.isPIP) {
      this.document.exitPictureInPicture();
      this.isPIP = false;
    } else {
      this.video.nativeElement.requestPictureInPicture();
      this.isPIP = true;
    }
  }

  toggleFullscreen() {
    if (this.document.fullscreenElement) {
      this.document.exitFullscreen();
      this.isFullscreen = false;
    } else {
      this.videoContainer.nativeElement.requestFullscreen();
      this.isFullscreen = true;
    }
  }
}
