// {"name": "Driving Car", "author": "Alex Dev404", "version": "04072023", "icon": "driving_icon.png", "file": "driving car.js"}

let fntcpy = new Font();
fntcpy.scale = (0.4f);
Screen.setFrameCounter(true);
//Screen.setVSync(false);

const canvas = Screen.getMode(NTSC);
const gray = Color.new(40, 40, 40, 128);
canvas.zbuffering = true;
canvas.psmz = Z16S;

Screen.setMode(canvas);

Render.setView(4/3);

os.chdir("render");

Camera.position(0.0f, 0.0f, 50.0f);
Camera.rotation(0.0f, 0.0f,  0.0f);

Lights.set(0, Lights.DIRECTION, 0.0,  1.0, -1.0);
Lights.set(0, Lights.DIFFUSE, 0.8, 0.8, 0.8);

Lights.set(1, Lights.DIRECTION, 0.0,  1.0, 1.0);
Lights.set(1, Lights.DIFFUSE, 0.4, 0.0, 0.8);
var car00_player =  new WavefrontObj("render/dragon.obj", "render/dragon.png");
let ee_info = System.getCPUInfo();
let free_mem = `RAM Usage: ${Math.floor(System.getMemoryStats().used / 1048576)}MB / ${Math.floor(ee_info.RAMSize / 1048576)}MB`;
let free_vram = Screen.getFreeVRAM();

let pad = Pads.get(0);
let modeltodisplay = 0;
let lx = null;
let ly = null;
let rx = null;
let ry = null;
let savedlx = 0.0f;
let savedly = 180.0f;
let savedrx = 100.0f;
let savedry = 0.0f;

while(true){
    pad.update();
    Screen.clear(gray);
    lx = ((pad.lx > 25 || pad.lx < -25)? pad.lx : 0) / 1024.0f;
    ly = ((pad.ly > 25 || pad.ly < -25)? pad.ly : 0) / 1024.0f;
    savedlx = savedlx - lx;
    savedly = savedly - ly;

    rx = ((pad.rx > 25 || pad.rx < -25)? pad.rx : 0) / 1024.0f;
    ry = ((pad.ry > 25 || pad.ry < -25)? pad.ry : 0) / 1024.0f;
    savedrx = savedrx - rx;
    savedry = savedry - ry;

    Camera.position(0.0f, savedry,  savedrx);
    car00_player.draw(car00_player, 0.0f, 0.0f, 30.0f, savedly, savedlx, 0.0f);
    fntcpy.print(10, 10, Screen.getFPS(360) + " FPS | " + free_mem + " | Free VRAM: " + free_vram + "KB");
    Screen.flip();
}