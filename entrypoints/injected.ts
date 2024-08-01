export default defineContentScript({
    main: () => {
        console.log('Script was injected!');
    },
    matches: [],
});
