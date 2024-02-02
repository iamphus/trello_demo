import { createApp } from 'vue'
import App from './App.vue'
import './index.css'


//Font awesome
import { library } from "@fortawesome/fontawesome-svg-core";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { faEllipsis } from '@fortawesome/free-solid-svg-icons';
library.add(faPlus, faEllipsis)

import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";


createApp(App)
    .component("font-awesome-icon", FontAwesomeIcon)
    .mount('#app')
