import { createApp } from "vue";
import App from "./App.vue";

createApp(App).mount("#app");
browser.devtools.panels.create(
	"webgal-devtool",
	"wxt.svg",
	"devtools-panel.html"
);