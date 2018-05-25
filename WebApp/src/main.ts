import { Scene } from './Scene';
import { LoginPanel } from './LoginPanel';


const loginPanel = new LoginPanel();
loginPanel.init();
const scene = new Scene();
scene.init();
loginPanel.afterLogin = scene.zoomIn.bind(scene);