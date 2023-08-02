---
label: Customization
order: 100
icon: paintbrush
tags: [theming, config, guide]
---
## Customize ng-plyr to Match Your Style!
ng-plyr allows you to personalize the look and feel of your video player to seamlessly blend with your application's design. Let's embark on a customization journey, where you can tweak various elements to achieve the perfect aesthetic.

### Font Properties 🖋️
```css
// Customize the font family and font color
--ng-plyr-font-family: 'Trebuchet MS', 'Lucida Sans Unicode', 'Lucida Grande', 'Lucida Sans', Arial, sans-serif;
--ng-plyr-font-color: white;
```

### Video Background 🎥
```css
// Define the background for your video player
--ng-plyr-video-bg: black;
```

### Header, Overlay, and Controls 🎛️
```css
// Set the background for the header, overlay, and controls
--ng-plyr-header-bg: linear-gradient(to bottom, rgba(0, 0, 0, .75), transparent);
--ng-plyr-overlay-bg: rgba(0, 0, 0, 0.6);
--ng-plyr-controls-bg: linear-gradient(to top, rgba(0, 0, 0, .75), transparent);
```

### Loading Spinner ⏳
```css
// Customize the buffering background, loading image, and its size
--ng-plyr-buffering-bg: rgba(0, 0, 0, 0.6) no-repeat center 45%;
--ng-plyr-buffering-img: url('assets/images/spinner.svg');
--ng-plyr-buffering-bg-size: 200px;
```

### Menu Box 📋
```css
// Customize the background and font color of the menu box
--ng-plyr-menu-bg: black;
--ng-plyr-menu-font-color: white;
```

### Progress bar 🚀
Your ng-plyr video player is now a canvas for your creativity! Take it a step further and customize the progress bar thumb to achieve the perfect visual balance, or just for fun.

```css
// Customize the background of progress bar thumb
--ng-plyr-progress-bar-thumb-bg: rgba(255, 255, 255, 0.85)
```

### Show your creativity 🎨 or just have fun 🎉
Get creative and go beyond the ordinary by adding any emoji, SVG, or image as the thumb of the progress bar. Let your imagination run wild, and infuse your player with a unique touch that sets it apart from the rest.

```css
// Customize the thumb of progress bar
--ng-plyr-progress-bar-thumb-bg: #a8d3a040 url('assets/animated-car.gif');
--ng-plyr-progress-bar-thumb-bg-size: 110% 110%;
--ng-plyr-progress-bar-thumb-width: 40px;
--ng-plyr-progress-bar-thumb-height: 40px;
```

Feel free to modify the above variables to your preferred colors, images, or gradients. Simply set these custom properties in your Angular stylesheets (e.g., styles.css) to see your ng-plyr player transform according to your choices.

Now, embrace the power of customization and make your ng-plyr video player a true reflection of your application's style!

Happy customizing! 🎨
