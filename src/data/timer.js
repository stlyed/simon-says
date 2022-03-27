

// (function () {
//     let nativeSetTimeout = window.setTimeout;

//     window.bindTimeout = function (listener, interval) {
//         function setTimeout(code, delay) {
//             let elapsed = 0,
//                 h;

//             h = window.setInterval(function () {
//                 elapsed += interval;
//                 if (elapsed < delay) {
//                     listener(delay - elapsed);
//                 } else {
//                     window.clearInterval(h);
//                 }
//             }, interval);
//             return nativeSetTimeout(code, delay);
//         }

//         window.setTimeout = setTimeout;
//         setTimeout._native = nativeSetTimeout;
//     };

//     window.clearTimeout = function () {
//         // window.setTimeout = 0
//     }
// })();

// window.bindTimeout(function (t) {
//     console.log(parseInt(t.toString().slice(0, 2)));
// }, 1000);
// window.setTimeout(function () {
//     console.log("All done.");
// }, 30000);
