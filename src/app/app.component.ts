import { Component, OnInit } from '@angular/core';
import { Media, MediaType } from 'ng-plyr';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'Angular Player';
  playFrom?:number;
  vol?:number;
  nextMedia?:Media;
  
  videoSrc = "https://cdn.videvo.net/videvo_files/video/free/2015-02/large_watermarked/Pine_Trees_in_Sunlight_01_Videvo_preview.mp4";
  videoList = [
    "https://cdn.videvo.net/videvo_files/video/free/2015-02/large_watermarked/Pine_Trees_in_Sunlight_01_Videvo_preview.mp4",
    "https://cdn.videvo.net/videvo_files/video/free/2016-05/large_watermarked/482952308_preview.mp4",
    "https://cdn.videvo.net/videvo_files/video/free/2016-01/large_watermarked/Countryside_16_1_Videvo_preview.mp4",
    "https://cdn.videvo.net/videvo_files/video/free/2014-12/large_watermarked/Sqirrel_Eats_Close_preview.mp4"
  ];
  
  ngOnInit(): void {
    this.nextMedia = new Media(this.videoList[1], MediaType.VIDEO);
  }

  track = 0;
  onEnd(ended:boolean) {
    this.videoSrc = this.videoList[(this.track++) % this.videoList.length];
    this.nextMedia = new Media(this.videoList[(this.track) % this.videoList.length], MediaType.VIDEO);
  }
  
}
