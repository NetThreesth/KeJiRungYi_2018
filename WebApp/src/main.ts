import { Scene } from './Scene';
import { LoginPanel } from './LoginPanel';
import { ControlPanel } from './ControlPanel';
import { MessageBoard } from './MessageBoard';


const loginPanel = new LoginPanel();
const scene = new Scene();
loginPanel.afterWordCardsAnimation = scene.transformation.bind(scene);
loginPanel.afterLogin = scene.zoomIn.bind(scene);
loginPanel.init();
scene.init();

const messageBoard = new MessageBoard();
// new ControlPanel().initPanel();