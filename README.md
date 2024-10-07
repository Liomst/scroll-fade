# scroll-fade
The scroll-fade library enhances webpage interactivity by making elements fade into view as they enter the viewport. It supports smooth fade animations for both individual elements and text, with word-by-word text fading. Multiple fade directions (up, down, left, right) can be applied, adding dynamic visual effects during scrolling.


To use the scroll-fade library, follow these steps:

1. **Single Object Fade**: To make an element fade in when it enters the viewport, add the class `scroll-fade` to the element.

2. **Text Fade (Word by Word)**: For text that fades in word by word as it enters the viewport, use the class `scroll-fade-text`. You can control the delay between each word's fade-in by setting the `data-text-fade-delay` attribute. For example: `data-text-fade-delay="50"`, where the delay is in milliseconds.

3. **Fade Orientations**: By default, elements fade from `opacity: 0` to `opacity: 1`. To change the fade direction, use the class `.f-u` (fade up). You can combine directions, such as `.f-u-r` to fade from up-right.

These options give you control over how and when elements fade in as users scroll through the page.
