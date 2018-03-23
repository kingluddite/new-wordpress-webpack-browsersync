import "./../sass/style.scss";
import activateMalarkey from "./module/title";
import "./../img/background.gif";
import "./../img/basshead.gif";
import "./../img/bassist.gif";
import "./../img/guitarist.gif";
import "./../img/lineup.gif";
import "./../img/logo.gif";
import "./../img/navbar.gif";
import "./../img/placeholder.gif";
import "./../img/slideshow.gif";
// import homeLogoImg from './../img/home.png';

// const homeLogo = document.getElementById('logo');
// console.log(document.getElementById('logo'));
// homeLogo.src = homeLogoImg;
if (module.hot) {
    module.hot.accept();
}

// enables webpack-dev-server to hot reload stylesheets
// extracted with the ExtractTextWebpackPlugin
if (module.hot) {
    const hotEmitter = require("webpack/hot/emitter");
    const DEAD_CSS_TIMEOUT = 2000;

    hotEmitter.on("webpackHotUpdate", function(currentHash) {
        document
            .querySelectorAll("link[href][rel=stylesheet]")
            .forEach(link => {
                const nextStyleHref = link.href.replace(
                    /(\?\d+)?$/,
                    `?${Date.now()}`
                );
                const newLink = link.cloneNode();
                newLink.href = nextStyleHref;

                link.parentNode.appendChild(newLink);
                setTimeout(() => {
                    link.parentNode.removeChild(link);
                }, DEAD_CSS_TIMEOUT);
            });
    });
}

function loadingComplete() {
    // eslint-disable-next-line no-console
    console.log("Page Loaded Activating malarkey.");
    activateMalarkey();
}

document.addEventListener("DOMContentLoaded", loadingComplete);
