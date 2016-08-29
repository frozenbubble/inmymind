'use strict'

let template = [
    {
        label: 'File',
        submenu: [
            {
                label: 'New notebook',
                accelerator: 'CmdOrCtrl+N',
                click(item, focusWindow) {
                    console.log('new notebook')
                }
            }
        ]
    }
];

module.exports = template;