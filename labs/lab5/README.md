Resources:

1. https://www.keycdn.com/support/reduce-dns-lookups
2. https://dev.to/ekafyi/lazy-loading-images-with-vanilla-javascript-2fbj
3. 1x1 pmg: https://upload.wikimedia.org/wikipedia/commons/c/ca/1x1.png
4. https://www.keycdn.com/support/defer-parsing-of-javascript

Design Choices & Optimizations:

1. Moved JS and CSS code from index.html to separate files to

- Follow sepatation of concerns

2. Minimize DNS Lookups
   a) Prefetch links and images \ May make navigation/viewing of certain content quicker for users

   - Image lazy loading to reduce resource usage
     b) Move script tag to bottom of body tag and add defer attribute

   * Did consider a manual defer parsing technique, however I believe it may overcomplicate a pre-built method

   Issues:

3. "Flattening CNAME record". I tried minimizing the CNAME records, but got stonewalled by CloudFlare due to permissions and subscription model.
