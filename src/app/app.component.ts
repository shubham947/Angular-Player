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
  mediaItems:Media[] = [];
  
  videoList = [
    {
      "description": "Big Buck Bunny tells the story of a giant rabbit with a heart bigger than himself. When one sunny day three rodents rudely harass him, something snaps... and the rabbit ain't no bunny anymore! In the typical cartoon tradition he prepares the nasty rodents a comical revenge.\n\nLicensed under the Creative Commons Attribution license\nhttp://www.bigbuckbunny.org",
      "src": "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
      "subtitle": "By Blender Foundation",
      "thumb": "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/images/BigBuckBunny.jpg",
      "title": "Big Buck Bunny"
    },
    {
      "description": "Tears of Steel was realized with crowd-funding by users of the open source 3D creation tool Blender. Target was to improve and test a complete open and free pipeline for visual effects in film - and to make a compelling sci-fi film in Amsterdam, the Netherlands.  The film itself, and all raw material used for making it, have been released under the Creatieve Commons 3.0 Attribution license. Visit the tearsofsteel.org website to find out more about this, or to purchase the 4-DVD box with a lot of extras.  (CC) Blender Foundation - http://www.tearsofsteel.org",
      "src": "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/TearsOfSteel.mp4",
      "subtitle": "By Blender Foundation",
      "thumb": "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/images/TearsOfSteel.jpg",
      "title": "Tears of Steel"
    },
    {
      "description": "Sintel is an independently produced short film, initiated by the Blender Foundation as a means to further improve and validate the free/open source 3D creation suite Blender. With initial funding provided by 1000s of donations via the internet community, it has again proven to be a viable development model for both open 3D technology as for independent animation film.\nThis 15 minute film has been realized in the studio of the Amsterdam Blender Institute, by an international team of artists and developers. In addition to that, several crucial technical and creative targets have been realized online, by developers and artists and teams all over the world.\nwww.sintel.org",
      "src": "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/Sintel.mp4",
      "subtitle": "By Blender Foundation",
      "thumb": "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/images/Sintel.jpg",
      "title": "Sintel"
    },
    "https://joy.videvo.net/videvo_files/video/free/2021-04/large_watermarked/210329_06B_Bali_1080p_013_preview.mp4",
    "https://joy.videvo.net/videvo_files/video/free/2021-04/large_watermarked/210329_06B_Bali_1080p_005_preview.mp4",
    "https://joy.videvo.net/videvo_files/video/free/2021-04/large_watermarked/210329_06B_Bali_1080p_007_preview.mp4",
    "https://joy.videvo.net/videvo_files/video/free/2021-04/large_watermarked/210329_13B_Bali_1080p_005_preview.mp4",
    "https://joy.videvo.net/videvo_files/video/free/2021-04/large_watermarked/210329_01A_Bali_4k_021_preview.mp4",
    "https://joy.videvo.net/videvo_files/video/free/2021-04/large_watermarked/210329_01B_Bali_1080p_009_preview.mp4"
  ];
  videoSrc = "https://joy.videvo.net/videvo_files/video/free/2021-04/large_watermarked/210329_06B_Bali_1080p_013_preview.mp4";

  constructor() {}
  
  ngOnInit(): void {
    // this.nextMedia = new Media(this.videoList[1], MediaType.VIDEO);
    this.videoList.forEach((video)=> {
      if (typeof video === 'string') {
        this.mediaItems.push(new Media(video));
      } else {
        let m = new Media(video.src);
        m.title = video.title;
        m.thumb = video.thumb;
        m.description = video.description;
        this.mediaItems.push(m);
      }
    });
  }

  track = 0;
  onEnd(ended:boolean) {
    // this.videoSrc = this.videoList[(this.track++) % this.videoList.length];
    // this.nextMedia = new Media(this.videoList[(this.track) % this.videoList.length], MediaType.VIDEO);
  }
  
}
