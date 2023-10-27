Resources:

1. https://www.keycdn.com/support/reduce-dns-lookups
2. https://dev.to/ekafyi/lazy-loading-images-with-vanilla-javascript-2fbj
3. 1x1 pmg: https://upload.wikimedia.org/wikipedia/commons/c/ca/1x1.png
4. https://www.keycdn.com/support/defer-parsing-of-javascript
5. https://jscompress.com/
6. https://www.toptal.com/developers/cssminifier
7. https://compresspng.com/
8. https://htmlcolorcodes.com/colors/shades-of-yellow/
9. https://www.google.com/search?q=fetch+api&rlz=1C1VDKB_enUS1021US1021&oq=fetch+api&gs_lcrp=EgZjaHJvbWUyDwgAEEUYORiDARixAxiABDINCAEQABiDARixAxiABDIHCAIQABiABDIHCAMQABiABDIHCAQQABiABDIHCAUQABiABDIHCAYQABiABDIHCAcQABiABDIHCAgQABiABDIHCAkQABiABNIBCDEzODdqMGo5qAIAsAIA&sourceid=chrome&ie=UTF-8
10. https://new.express.adobe.com/tools/resize-image
11. https://www.sohostudiocorp.com/classic-hex-black-10-hexagon-tlgtclhexblack10

Creativity:

1. Changed color scheme to match that of a bee
2. Updated navbar
3. Kept links as blue to break up motnotony and to stand out in both light and dark mode
4. Black hex backgroun to match the bee vibe
5. I didn't change too much or any functionality because I wanted the site to remain simple and feel authentic. A global leaderboard would be nice but additional storage would be necessary which I felt would have been unnecessarily complex.

Design Choices & Optimizations:
\*\* There may be more than 7 optimizations here, but I just put them in general groups here for easier navigation

1. Moved JS and CSS code from index.html to separate files to

- Follow sepatation of concerns

2. Minimize DNS Lookups
   a) Prefetch links and images \ May make navigation/viewing of certain content quicker for users

   - Image lazy loading to reduce resource usage
     b) Move script tag to bottom of body tag and add defer attribute
   - Did consider a manual defer parsing technique, however I believe it may overcomplicate a pre-built method

3. Minfied CSS

   - Used minifier
   - Removed "extra and inefficient" selectors, i.e., "\*" since our content is in body

4. Minified JavaScript

   - Combined statements and loops for the function darkmode, much more readable (reducing maintence overhead) and has better worst case complexity
     -Made an additional function to shorten display()
     -Created a function to update some repeated element updates

5. Compressed all pngs

6. GZip compression

   - Added HTML compressiom
   - Added CSS compression
   - Added JS Compression

7. Changed old-style AJAX requests to fetch API method

Issues:

1. "Flattening CNAME record". I tried minimizing the CNAME records, but got stonewalled by CloudFlare due to permissions and subscription model.

2. Optimizing the JS
   a) A lot of the functionality is super niche, making it hard to generalize with loops nad functions

3. Switching old ajax calls to fetch method
   a) Had to use ChatGPT to understand the similar parts between the two methods

4. Using lazy loading found to be useless
5. Loading proper images onto page due to paths/not being in folder
6. Sometimes the "yesterday" box will say not data is available, i.e., undefined or NaN for no apparent reason.
