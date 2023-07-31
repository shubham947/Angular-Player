---
label: Cast
order: 500
icon: rss
tags: [config, guide]
---
### Setup
To enable chromecast and send the media playing in ng-plyr to big screen, add below script in `index.html`

```
<script type="text/javascript" src="https://www.gstatic.com/cv/js/sender/v1/cast_sender.js?loadCastFramework=1"></script>
```
Now you an use CastService methods in your components.