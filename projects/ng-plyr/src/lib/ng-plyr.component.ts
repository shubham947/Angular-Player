import { DOCUMENT } from '@angular/common';
import { AfterViewInit, Component, ElementRef, HostListener, Inject, Input, OnChanges, SimpleChanges, ViewChild } from '@angular/core';
import { Media, MediaType } from './models/media.model';

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
  seekStepInSec = 5;
  playerVolume = 1;
  currentTime = '0:00';
  totalTime = '0:00';
  progressPercent = 0;
  mediaBuffers: Array<{ start: number; end: number }> = [];
  isMediaLoading = true;
  // TODO:
  mediaMarkers?:[] = [];
  // media = new Media();

  // Inputs
  @Input('src') mediaURL?:string;
  @Input('type') mediaType?:MediaType;
  @Input('loadingImgSrc') loadingImgSrc?:string;
  @Input('bookmarks') bookmarks?:Array<number>;
  @Input('volume') volume?:any;
  @Input('loop') enableLooping?:boolean;
  @Input('captions') captions?:Array<{path:string, lang:string}>;
  @Input('playFrom') playFrom?:number;
  
  // HTML element references
  @ViewChild('videoContainer') videoContainer!: ElementRef;
  @ViewChild('video') video!: ElementRef;
  
  constructor(@Inject(DOCUMENT) private document: any) {}
  
  ngOnChanges(changes: SimpleChanges) {
    this.mediaMarkers = changes['bookmarks']?.currentValue;
    this.isLoopingEnabled = changes['enableLooping']?.currentValue;

    if (changes['volume']?.currentValue) {
      this.changeVolume(changes['volume'].currentValue);
    }
    if (changes['playFrom']?.currentValue) {
      this.seekTo(changes['playFrom'].currentValue);
    }
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
  seekTo(atSecond: number | string) {
		if (atSecond > this.video.nativeElement.duration) {
			this.stopVideo();
			return;
		} else if (atSecond < 0) {
			this.video.nativeElement.currentTime = 0;
		} else {
			this.video.nativeElement.currentTime = atSecond;
		}
		this.progressPercent =
			Number((this.video.nativeElement.currentTime / this.video.nativeElement.duration).toPrecision(3)) * 100;
	}
  
	// Call seekTo fn in specific direction and set count to 0
	seekAfterTimeout(direction:string) {
		if (direction === 'fwd') {
			this.seekTo(this.video.nativeElement.currentTime + this.seekStepInSec * this.fwdClickCount);
			this.fwdClickCount = 0;
		} else if (direction === 'bwd') {
			this.seekTo(this.video.nativeElement.currentTime - this.seekStepInSec * this.bwdClickCount);
			this.bwdClickCount = 0;
		}
	}

	// Seek backward on mouseclick
	bwdClickCount = 0;
	bwdClickTimeout = setTimeout(() => this.bwdClickCount = 0, 500);
	seekBwd(e: MouseEvent | PointerEvent) {
		if (e.type === 'dblclick') {
			this.bwdClickCount = 1;
			clearTimeout(this.bwdClickTimeout);
			this.bwdClickTimeout = setTimeout(() => this.seekAfterTimeout('bwd'), 500);
		} else if (e.type === 'click' && this.bwdClickCount > 0) {
			this.bwdClickCount++;
			clearTimeout(this.bwdClickTimeout);
			this.bwdClickTimeout = setTimeout(() => this.seekAfterTimeout('bwd'), 500);
		}
	}

	// Seek forward on mouseclick
	fwdClickCount = 0;
	fwdClickTimeout = setTimeout(() => this.fwdClickCount = 0, 500);
	seekFwd(e: MouseEvent | PointerEvent) {
		if (e.type === 'dblclick') {
			this.fwdClickCount = 1;
			clearTimeout(this.fwdClickTimeout);
			this.fwdClickTimeout = setTimeout(() => this.seekAfterTimeout('fwd'), 500);
		} else if (e.type === 'click' && this.fwdClickCount > 0) {
			this.fwdClickCount++;
			clearTimeout(this.fwdClickTimeout);
			this.fwdClickTimeout = setTimeout(() => this.seekAfterTimeout('fwd'), 500);
		}
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

  setPlaybackSpeed(rate: number) {
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
		if (this.video.nativeElement.currentTime === this.video.nativeElement.duration) {
			this.video.nativeElement.currentTime = 0;
		}
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
