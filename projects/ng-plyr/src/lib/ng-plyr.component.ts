import { DOCUMENT } from '@angular/common';
import { AfterViewInit, Component, ElementRef, EventEmitter, HostListener, Inject, Input, OnChanges, OnInit, OnDestroy, Output, SimpleChanges, ViewChild, ChangeDetectorRef } from '@angular/core';
import { Media, MediaType } from './models/media.model';
import { Playlist, PlaylistItem } from './models/playlist.model';
import { PlayerService } from './services/ng-plyr.service';
import { CastService } from './services/cast.service';

@Component({
	selector: 'ng-plyr',
	templateUrl: './ng-plyr.component.html',
	styleUrls: [ './ng-plyr.component.scss' ]
})
export class NgPlyrComponent implements AfterViewInit, OnChanges, OnInit, OnDestroy {
	// Flags
	isPlaying = false;
	isMuted = false;
	isFullscreen = false;
	isPIP = false;
	isCasting = false;
	// isAutoplayEnabled = false;
	isLoopingEnabled = false;
	isControlSettingsOpen = false;
	isMenuSettingsOpen = false;

	// Variables
	seekStepInSec = 5;
	playerVolume = 1;
	currentTime = '0:00';
	totalTime = '0:00';
	progressPercent = 0;
	mediaBuffers: Array<{ start: number; end: number }> = [];
	isMediaLoading = true;
	media!:Media;
	prevMedia?:Media;
	nextMedia?:Media;
	playlist:Playlist = new Playlist();
	playingTrack:number = 0;
	// TODO:
	mediaMarkers: [] = [];

	// Keeping input changes to trigger required actions on other events (like, after VideoInfoLoaded)
	inpChanges?: SimpleChanges;
	// Inputs
	@Input('src') mediaURL: string = '';
	@Input('type') mediaType?:MediaType;
	@Input('playFrom') playFrom?: number;
	@Input('loadingImgSrc') loadingImgSrc?: string;
	@Input('captions') captions?: Array<{ path: string, lang: string }>;
	@Input('bookmarks') bookmarks?: Array<number>;
	@Input('volume') volume?: number;
	@Input('loop') loopMedia?: boolean;
	@Input('autoplay') isAutoplayEnabled?: boolean;
	@Input('nextMedia') nextMediaToAdd?: Media;
	@Input('playlist') mediaItems?: Media[];
	@Input('loopPlaylist') loopPlaylist?: boolean;

	// Output events
	@Output() playing = new EventEmitter<boolean>();
	@Output() paused = new EventEmitter<boolean>();
	@Output() ended = new EventEmitter<boolean>();
	@Output() onprev = new EventEmitter<Media>();
	@Output() onnext = new EventEmitter<Media>();
	@Output() fullscreen = new EventEmitter<boolean>();
	@Output() volumechange = new EventEmitter<object>();
	// @Output() error = new EventEmitter<object>();
	// @Output() pip = new EventEmitter<boolean>();

	// HTML element references
	@ViewChild('videoContainer') videoContainer!: ElementRef;
	@ViewChild('video') video!: ElementRef;

	constructor(@Inject(DOCUMENT) private document: any,
				private _plyrService:PlayerService,
				private _castService:CastService,
				private _cd: ChangeDetectorRef) { }

	// Lifecycle hooks
	// OnChanges LC hook
	ngOnChanges(changes: SimpleChanges) {
		this.inpChanges = changes;

		// When both mediaURL & mediaItems are present, media will be set from mediaItems
		if (changes['mediaURL'] && !changes['mediaItems']) { this.changeMedia(); }
		if (changes['mediaItems']) { this.createPlaylist(this.mediaItems!); }

		// nextMediaToAdd after playlist is initialized, or not present in same changes
		if (changes['nextMediaToAdd'] && !changes['mediaItems']) { this.onNextMediaInput(); }
		
		this.mediaMarkers = changes['bookmarks']?.currentValue;
		this.isLoopingEnabled = changes['loopMedia']?.currentValue;
	}
	
	ngOnInit() {
		this._plyrService.addComponentRef(this);
	}

	ngAfterViewInit() {
		this.isPlaying = !this.video.nativeElement.paused;
		this.isMuted = this.video.nativeElement.muted;
		this.isFullscreen = this.document.fullscreenElement ? true : false;

		this.document.addEventListener('fullscreenchange', () => {
			if (!this.document.fullscreenElement) this.isFullscreen = false;
		});
	}

	ngOnDestroy() {
		this._plyrService.removeComponentRef();
	}
	
	
	resetPlayer() {
		this.currentTime = '0:00';
		this.totalTime = '0:00';
		this.progressPercent = 0;
		this.mediaBuffers = [];
		this.isMediaLoading = true;
		this.mediaMarkers = [];
	}

	changeMedia(media?:Media) {
		this.media = media ? media : new Media(this.mediaURL, this.mediaType);
		if(this.isCasting) this._castService.loadMedia(media?.src);
		this.resetPlayer();
	}

	// Playlist functions
	// Create new playlist / reinitialize playlist
	createPlaylist(mediaItems:Media[]) {
		if (mediaItems) {
			this.playlist.initializePlaylist(mediaItems);
			this.media = this.playlist.current?.media!;
			if (this.nextMediaToAdd) {
				this.playlist.addNext(new PlaylistItem(this.nextMediaToAdd));
			}
			this.nextMedia = this.playlist.current?.next?.media;
		}
	}

	// nextMedia will be used to play next inboth src and playlist cases
	onNextMediaInput() {
		if (this.playlist.current && this.nextMediaToAdd) {
			this.playlist.addNext(new PlaylistItem(this.nextMediaToAdd));
		}
		this.nextMedia = this.nextMediaToAdd;
	}

	// Output events for media
	onPlay(event:Event) {
		this.playing.emit(true);
		this.paused.emit(false);
		this.isPlaying = true;
		this.media.paused = false;
		if(this.isCasting) this.video.nativeElement.pause();
	}

	onPause(event:Event) {
		this.playing.emit(false);
		this.paused.emit(true);
		this.media.paused = true;
		if(!this.isCasting) this.isPlaying = false;
	}

	onEnd(event?:Event) {
		this.ended.emit(true);
		if (this.isAutoplayEnabled) {
			this.playNextMedia();
		}
	}

	onVolumeChange(event:Event) {
		this.volumechange.emit({
			level: this.video.nativeElement.volume,
			muted: this.video.nativeElement.muted
		});
	}

	// TODO: Emit custom error
	onError(event:Event) {
		console.error(event);
	}

	// Shortcut keys
	@HostListener('window:keydown', ['$event'])
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
		} else if (Number(key) > 0 && Number(key) < 10 && this.media?.duration) {
			this.seekTo(this.media.duration * Number(key)/10);
		} else if (key === 'end') {
			this.stopVideo();
		} else if (event.key === 'N') {
			this.playNextMedia();
		} else if (event.key === 'P') {
			this.playPrevMedia();
		}
	}

	// Volume control
	changeVolume(value: any) {
		value = Number(value).toPrecision(2);
		if (!this.video || value > 1 || value < 0) return;

		if (this.isCasting) {
			// Not yet working
			this._castService.setVolumeLevel(value);
		} else {
			this.video.nativeElement.volume = value;
			this.playerVolume = value;
			if (this.video.nativeElement.muted && value > 0) {
				this.toggleMute();
			}
		}
	}

	// Update video metadata in player
	updateAfterVideoInfoLoaded() {
		if (this.inpChanges && this.inpChanges["mediaURL"]) {
			this.video.nativeElement.currentTime = 0;
			this.media.playFrom = this.playFrom;
			this.media.duration = this.video.nativeElement.duration ? this.video.nativeElement.duration : this.video.nativeElement.currentTime;
			this.media.captions = this.captions;
		}
		if (this.inpChanges && this.inpChanges['volume']?.currentValue) {
			this.changeVolume(this.inpChanges['volume'].currentValue);
		}
		if (this.inpChanges && this.inpChanges['playFrom']?.currentValue) {
			this.seekTo(this.inpChanges['playFrom'].currentValue);
		}
		if (this.isAutoplayEnabled) this.video.nativeElement.play();
		
		this.isPlaying = !this.video.nativeElement.paused;
		this.currentTime = this.formatDuration(this.media.playFrom);
		this.totalTime = this.formatDuration(this.media.duration);
		this.showBuffers();
	}

	// Display video buffers on timeline
	showBuffers() {
		const buf = this.video.nativeElement.buffered;
		if (buf.length === 1 && buf.end(0) - buf.start(0) === this.video.nativeElement.duration) {
			this.isMediaLoading = false;
			return;
		}
		this.isMediaLoading = true;

		this.mediaBuffers = [];
		for (let i = 0; i < buf.length; i++) {
			let start = Number((buf.start(i) / this.video.nativeElement.duration).toPrecision(3)) * 100;
			let end = Number((buf.end(i) / this.video.nativeElement.duration).toPrecision(3)) * 100;
			this.mediaBuffers.push({ start, end });
			if (this.video.nativeElement.currentTime >= buf.start(i) && this.video.nativeElement.currentTime <= buf.end(i)) {
				this.isMediaLoading = false;
			}
		}
	}

	// Seek to specific time
	seekTo(atSecond: number | string) {
		if (!this.video) return;
		if (atSecond > this.video.nativeElement.duration) {
			this.stopVideo();
			return;
		} else if (Number(atSecond) < 0) {
			this.video.nativeElement.currentTime = 0;
			this._castService.seekTo(0);
		} else {
			this.video.nativeElement.currentTime = Number(atSecond).toPrecision(3);
			this._castService.seekTo(Number(atSecond));
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
	}

	// Play previous media from Q
	playPrevMedia() {
		if (this.isLoopingEnabled) return this.onprev.emit(this.media);

		let mediaToPlay: Media | undefined;
		if (this.playlist.current?.hasPrev()) {
			this.playlist.current = this.playlist.current.prev;
			mediaToPlay = this.playlist.current?.media;
			// Update prevMedia
			if (this.playlist.current?.hasPrev()) {
				this.prevMedia = this.playlist.current.prev!.media;
			} else if (this.loopPlaylist) {
				this.prevMedia = this.playlist.tail?.media;
			}
		} else if (this.loopPlaylist) {
			this.playlist.current = this.playlist.tail;
			mediaToPlay = this.playlist.current?.media;
			this.prevMedia = this.playlist.current?.prev?.media;
		} else if (this.prevMedia) {
			mediaToPlay = this.prevMedia;
			this.prevMedia = undefined;
		}

		this.nextMedia = this.media;
		this.changeMedia(mediaToPlay);
		this.onprev.emit(mediaToPlay);
	}
	
	// Play next media from Q
	playNextMedia() {
		if (this.isLoopingEnabled) return this.onnext.emit(this.media);

		let mediaToPlay: Media | undefined;
		if (this.playlist.current?.hasNext()) {
			this.playlist.current = this.playlist.current.next;
			mediaToPlay = this.playlist.current?.media;
			// Updating nextMedia
			if (this.playlist.current?.hasNext()) {
				this.nextMedia = this.playlist.current.next!.media;
			} else if (this.loopPlaylist) {
				this.nextMedia = this.playlist.head?.media;
			}
		} else if (this.loopPlaylist) {
			this.playlist.current = this.playlist.head;
			mediaToPlay = this.playlist.current?.media;
			this.nextMedia = this.playlist.current?.next?.media;
		} else if (this.nextMedia) {
			mediaToPlay = this.nextMedia;
			this.nextMedia = undefined;
		}
		
		this.prevMedia = this.media;
		this.changeMedia(mediaToPlay);
		this.onnext.emit(mediaToPlay);
	}

	// End/Stop current video
	stopVideo() {
		this.video.nativeElement.pause();
		this.seekTo(this.video.nativeElement.duration);
		this._castService.stopCasting();
	}

	setPlaybackSpeed(rate: number) {
		if (rate < 0.25 || rate > 2) return;
		this.video.nativeElement.playbackRate = rate;
	}

	// Initialize Cast and requestSession
	castToChromecast() {
		// Check if the Cast SDK is available and initialized
		if (this._castService.isSdkAvailable()) {
			// Initialize Cast API
			this._castService.initializeCastApi();
	
			// Get the CastContext and show the Cast dialog to the user
			let castContext = this._castService.getCastContext();
			// Starts media casting after session starts
			castContext.requestSession().then((session: any)=> {
				// Add event listeners
				this.listenToPlayerEvents();
				this.enableCastingMode();
				// load media in receiver
				this._castService.loadMedia(this.media.src, 'video/mp4');
			}).catch((err: any)=> {
				console.error(err);
			});
		} else {
			console.warn('Cast SDK is not available or not initialized.');
		}
	}

	// After successful connection, use this method to change mode to casting
	enableCastingMode() {
		this.isCasting = true;
		// Stop playing on local device
		this.video.nativeElement.pause();
		this.isMuted = this._castService.player.isMuted;
		this.isPlaying = !this._castService.player.isPaused;
		this.playerVolume = this._castService.player.volumeLevel.toPrecision(2);
	}

	// Stop casting or just stop session
	endCurrentSession(stopCasting: boolean) {
		this._castService.endCurrentSession(stopCasting);
	}

	// Listening to remote events
	listenToPlayerEvents() {
		// Storing local player states in local variables to restore after receiver disconnects
		let isMutedLocal = this.isMuted;
		let playerVolumeLocal = this.playerVolume;

		// Cast Connected/disconnected
		this._castService.onCastEvent('IS_CONNECTED_CHANGED', () => {
			if (this._castService.player.isConnected) {
				console.log('Cast Player connected');
				// Stop playing on local device
				this.enableCastingMode();
			} else {
				console.log('Cast Player disconnected');
				this.isCasting = false;
				this._castService.stopListeningRemotePlayerEvents();
				// Start playing on local device
				this.seekTo(this._castService.player.currentTime);
				this.isPlaying ? this.video.nativeElement.play() : this.video.nativeElement.pause();
				// Setting local UI to original state
				this.isMuted = isMutedLocal;
				this.playerVolume = playerVolumeLocal;
			}
		}).then((res: any) => console.log(res))
		.catch((err: any) => console.error(err));

		// Pause/Play
		this._castService.onCastEvent('IS_PAUSED_CHANGED', () => {
			if (this._castService.player.isPaused) {
				console.log('Receiver paused');
				this.isPlaying = false;
			} else {
				console.log('Receiver playing');
				this.isPlaying = true;
			}
		}).then((res: any) => console.log(res))
		.catch((err: any) => console.error(err));

		// MediaInfo changes
		this._castService.onCastEvent('PLAYER_STATE_CHANGED', () => {
			// console.log('PlayerState:', this._castService.player.playerState);
			if (this._castService.player.playerState === 'IDLE' && this.media) {
				this.onEnd();
				this._castService.play();
			}
		}).then((res: any) => console.log(res))
		.catch((err: any) => console.error(err));

		// Paying break
		this._castService.onCastEvent('IS_PLAYING_BREAK_CHANGED', () => {
			if (this._castService.player.isPlayingBreak) {
				console.log('Player is playing break');
				// Change on local device
				this.video.nativeElement.pause();
				// Show Playing break, in UI
			} else {
				console.log('Player break ended');
				// Change on local device
			}
		}).then((res: any) => console.log(res))
		.catch((err: any) => console.error(err));

		// currentTime changed
		this._castService.onCastEvent('CURRENT_TIME_CHANGED', () => {
			// Change current time on local device
			let currentTime = this._castService.player.currentTime;
			this.progressPercent = Number((currentTime / this.video.nativeElement.duration).toPrecision(3)) * 100;
			this.currentTime = this.formatDuration(currentTime);
			// Update in UI on currentTime changes
			this._cd.detectChanges();
		}).then((res: any) => console.log(res))
		.catch((err: any) => console.error(err));

		// volumeLevel changed
		this._castService.onCastEvent('VOLUME_LEVEL_CHANGED', () => {
			// Change volume level in UI
			this.playerVolume = this._castService.player.volumeLevel.toPrecision(2);
			// Update in UI on volume changes
			this._cd.detectChanges();
		}).then((res: any) => console.log(res))
		.catch((err: any) => console.error(err));

		// Muted/unmuted
		this._castService.onCastEvent('IS_MUTED_CHANGED', () => {
			// Change mute icon in UI
			this.isMuted = this._castService.player.isMuted;
		}).then((res: any) => console.log(res))
		.catch((err: any) => console.error(err));
	}

	// To Do: Implement with a backend server
	// onLocalFileSelected(event: Event) {
	// 	const inputElement = event.target as HTMLInputElement;
	// 	if (inputElement?.files?.length) {
	// 		console.log(inputElement?.files);
	// 	}
	// }

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
		if (!this.isCasting) {
			if (this.video.nativeElement.currentTime === this.video.nativeElement.duration) {
				this.video.nativeElement.currentTime = 0;
			}
			this.video.nativeElement.paused ? this.video.nativeElement.play() : this.video.nativeElement.pause();
		} else {
			// Play/pause receiver
			this.isPlaying  ? this._castService.pause() : this._castService.play();
		}
	}

	toggleMute() {
		if (!this.isCasting) {
			this.video.nativeElement.muted = !this.video.nativeElement.muted;
			this.isMuted = this.video.nativeElement.muted;
		} else {
			// mute/unmute receiver
			this.isMuted ? this._castService.unmute() : this._castService.mute();
		}
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
			this.fullscreen.emit(false);
		} else {
			this.videoContainer.nativeElement.requestFullscreen();
			this.isFullscreen = true;
			this.fullscreen.emit(true);
		}
	}
}
