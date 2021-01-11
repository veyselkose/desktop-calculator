const { app, BrowserWindow, ipcMain } = require("electron");
function createWindow() {
  const win = new BrowserWindow({
    width: 320,
    height: 500,
    frame: false,
    transparent: true,
    webPreferences: {
      nodeIntegration: true,
    },
  });
  win.setMinimumSize(320, 500);
  win.loadFile("calculator/index.html");
  ipcMain.on("minimize", (err, data) => {
    win.minimize();
  });
  ipcMain.on("resize", (err, data) => {
    if (!win.isMaximized()) {
      win.maximize();
    } else {
      win.setSize(320, 500, false);
      win.center();
    }
  });
  ipcMain.on("close", (err, data) => {
    win.close();
  });
}

app.whenReady().then(createWindow);

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

app.on("activate", () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});
