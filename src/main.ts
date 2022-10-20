import { createApp } from "vue";
import { createPinia } from "pinia";
import { createORM } from "pinia-orm";

import App from "./App.vue";

createApp(App).use(createPinia().use(createORM())).mount("#app");
