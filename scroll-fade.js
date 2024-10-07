import Utils from "./utils.js";

class ScrollFade {
    constructor() {
        this.text_scroll_elements = document.querySelectorAll('.scroll-fade-text');
        this.basic_scroll_elements = document.querySelectorAll('.scroll-fade');
        this.hideScrollElements();
        this.checkInView();
    }

    hideScrollElements() {
        this.text_scroll_elements.forEach(element => {
            const words = element.innerHTML.split(/\s+/);
            element.innerHTML = '';

            words.forEach(word => {
                if ( word !== "" ) {
                    const wordSpan = document.createElement('span');
                    wordSpan.classList.add('scroll-fade-invisible', 'd-inline-block'); // Makes span invisible, and adds d-inline-block to make the transform property work.
                    wordSpan.textContent = word;

                    element.appendChild(wordSpan);
                    element.appendChild(document.createTextNode(' '));
                }
            });
        });

        this.basic_scroll_elements.forEach(basic_scroll_element => {
            basic_scroll_element.classList.add('scroll-fade-invisible', 'd-inline-block');
        });
    }

    fadeOut(element, basicFade = false) {
        if (basicFade) { // Basic fade elements
            element.classList.replace('scroll-fade-fade-in', 'scroll-fade-invisible');
        } else {
            // For word-by-word fade out
            const wordSpans = element.querySelectorAll('.scroll-fade-fade-in');
            if (wordSpans.length > 0) {
                wordSpans.forEach( ( spanItem, index ) => {
                    setTimeout(() => {
                        spanItem.classList.replace('scroll-fade-fade-in', 'scroll-fade-invisible');
                    }, index * 100); // Fade out each word with a delay
                });
            }
        }
    }

    checkInView() {
        let observer = new IntersectionObserver((entries) => {
            entries.forEach( entry => {
                if ( entry.isIntersecting ) {
                    // When element comes into view, trigger the fade-in effect
                    if ( entry.target.classList.contains('scroll-fade-text') ) {
                        this.fadeWords( entry.target, entry.target.dataset.textFadeDelay ?? 100 );
                    } else {
                        this.basicFadeIn( entry.target );
                    }

                    // If the element doesn't have the exit-fade class, stop observing after the fade-in
                    if (!entry.target.classList.contains('exit-fade')) {
                        observer.unobserve( entry.target );
                    }

                } else {
                    // Only fade out if the element has the exit-fade class
                    if (entry.target.classList.contains('exit-fade')) {
                        if (entry.target.classList.contains('scroll-fade-text')) {
                            this.fadeOut( entry.target );
                        } else {
                            this.fadeOut( entry.target, true );
                        }
                    }
                }
            });
        });

        this.text_scroll_elements.forEach(text_element => {
            observer.observe( text_element );
        });

        this.basic_scroll_elements.forEach(basic_element => {
            observer.observe( basic_element );
        });
    }

    fadeWords(element, fadeDelay) {
        const wordSpans = element.querySelectorAll('span.scroll-fade-invisible');

        wordSpans.forEach( ( wordSpan, index ) => {
            setTimeout(() => {
                wordSpan.classList.replace('scroll-fade-invisible', 'scroll-fade-fade-in');
            }, ( index + 1 ) * fadeDelay );
        });
    }

    basicFadeIn( element ) {
        element.classList.replace('scroll-fade-invisible', 'scroll-fade-fade-in');
    }
}

Utils.onLoad(new ScrollFade());
