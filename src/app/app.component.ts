import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'AngularPlayer';

  videoSrc = "https://cdn.videvo.net/videvo_files/video/free/2015-02/large_watermarked/Pine_Trees_in_Sunlight_01_Videvo_preview.mp4";
  
}
