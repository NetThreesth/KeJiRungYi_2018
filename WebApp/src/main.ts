import { Scene } from './Scene';
import { LoginPanel } from './LoginPanel';
import { ControlPanel } from './ControlPanel';
import { MessageBoard } from './MessageBoard';


const loginPanel = new LoginPanel();
loginPanel.init();
const scene = new Scene();
scene.init();
loginPanel.afterLogin = scene.zoomIn.bind(scene);

const messageBoard = new MessageBoard();
// new ControlPanel().initPanel();