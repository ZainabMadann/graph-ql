import { isLoggedIn } from "./utils";
import { showHomePage } from "./view/homeview";
import { showLoginPage } from "./view/loginview";

document.addEventListener('DOMContentLoaded', () => {
    if (!isLoggedIn()) {
        showLoginPage()
    } else {
        showHomePage()
    }
    
});


