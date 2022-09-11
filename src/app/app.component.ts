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
  
  videoList = [
    "https://joy.videvo.net/videvo_files/video/free/2021-04/large_watermarked/210329_06B_Bali_1080p_013_preview.mp4",
    "https://joy.videvo.net/videvo_files/video/free/2021-04/large_watermarked/210329_06B_Bali_1080p_005_preview.mp4",
    "https://joy.videvo.net/videvo_files/video/free/2021-04/large_watermarked/210329_06B_Bali_1080p_007_preview.mp4",
    "https://joy.videvo.net/videvo_files/video/free/2021-04/large_watermarked/210329_13B_Bali_1080p_005_preview.mp4",
    "https://joy.videvo.net/videvo_files/video/free/2021-04/large_watermarked/210329_01A_Bali_4k_021_preview.mp4",
    "https://joy.videvo.net/videvo_files/video/free/2021-04/large_watermarked/210329_01B_Bali_1080p_009_preview.mp4"
  ];
  videoSrc = this.videoList[0];
  
  ngOnInit(): void {
    // this.nextMedia = new Media(this.videoList[1], MediaType.VIDEO);
  }

  track = 0;
  onEnd(ended:boolean) {
    // this.videoSrc = this.videoList[(this.track++) % this.videoList.length];
    // this.nextMedia = new Media(this.videoList[(this.track) % this.videoList.length], MediaType.VIDEO);
  }
  
}
