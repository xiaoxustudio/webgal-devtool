export default defineContentScript({
    matches: ['<all_urls>'],
    main() {
        console.log("running xuran")
    },
});
