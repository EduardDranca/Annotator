import { app, BrowserWindow, Menu, dialog, ipcMain } from 'electron';
import * as path from 'path';
let win: BrowserWindow;
let dirDialog = null;
const indexFilePath = 'Annotator/index.html'

app.on('ready', () => {
    win = new BrowserWindow({
        webPreferences: {
            nodeIntegration: true
    }});

    const menuTemplate: Electron.MenuItemConstructorOptions[] = [
        {
            label: 'File',
            submenu: [
                {
                    label: 'Open Directory',
                    click: () => {
                        dirDialog = dialog.showOpenDialog({properties: ['openDirectory']});
                        dirDialog.then(value => {
                            if (!value.canceled) {
                                win.webContents.send("directory-opened", value.filePaths);
                            }
                        });
                    }
                },
                {
                    type: 'separator'
                },
                {
                    label: 'Exit'
                }
            ]
        },
        {
            label: 'Debug',
            submenu: [
                {role: 'toggleDevTools'}
            ]
        }
    ];
    const menu = Menu.buildFromTemplate(menuTemplate);
    Menu.setApplicationMenu(menu);
    const fileUrl = new URL(path.join(__dirname, indexFilePath));
    fileUrl.protocol = 'file';
    win.loadURL(fileUrl.toString());
});