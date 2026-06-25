const fs = require('fs');
const path = require('path');

const appJsPath = path.join(__dirname, '../frontend/app.js');
let appJs = fs.readFileSync(appJsPath, 'utf8');

const captureScript = `
    const document = {
        getElementById: (id) => ({ 
            innerText: '', 
            value: 'toi', 
            options: [],
            addEventListener: () => {}, 
            appendChild: () => {}, 
            innerHTML: '', 
            style: {},
            classList: { add: ()=>{}, remove: ()=>{} }
        }),
        createElement: (tag) => ({ 
            style: {}, 
            appendChild: () => {}, 
            innerText: '', 
            className: '' 
        }),
        querySelector: (sel) => ({ 
            innerText: '', 
            style: {},
            addEventListener: () => {},
            classList: { add: ()=>{}, remove: ()=>{} }
        }),
        querySelectorAll: (sel) => ([]),
        documentElement: { style: { setProperty: ()=>{} } }
    };
    
    const window = { 
        addEventListener: () => {},
        requestAnimationFrame: () => {},
        onload: () => {}
    };

    // Prevent hanging timeouts/intervals in node environment
    const setTimeout = () => {};
    const setInterval = () => {};

    ${appJs}
    module.exports = {
        getEngine: getEngine
    };
`;

const extractedModule = {};
(function(module) {
    eval(captureScript);
})(extractedModule);

module.exports = extractedModule.exports;
