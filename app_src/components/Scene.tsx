import * as React from "react";
import * as BABYLON from 'babylonjs';
import * as $ from 'jquery';
import { socketClient } from '../common/SocketClient';
import { CommonUtility } from '../common/CommonUtility';
import { BabylonUtility, Line } from '../common/BabylonUtility';
import { AsyncWorker } from '../common/AsyncWorker';
import { GlobalData } from '../common/GlobalData';

import { EventCenter, Event, ChatBotResponse } from '../common/MessageCenter';

import "./Scene.scss";


export class Scene extends React.Component<
    { eventCenter: EventCenter }
    > {

    private engine: BABYLON.Engine;
    private scene: BABYLON.Scene;

    private camera: BABYLON.UniversalCamera;
    private lightOfCamera: BABYLON.PointLight;
    private cameraLocations: BABYLON.Vector3[] = [];
    private viewPort = { position: BABYLON.Vector3.Zero(), rotation: BABYLON.Vector3.Zero() };

    private bubbleSpray: BABYLON.SolidParticleSystem;
    private backgroundParticles: { [color: string]: ParticlesSetting }[] = function () {
        const backgroundParticles = [];
        for (let i = 0; i < 9; i++) {
            backgroundParticles.push({
                white: { targetCount: 0, particles: [] },
                yellow: { targetCount: 0, particles: [] },
                pink: { targetCount: 0, particles: [] }
            });
        }
        return backgroundParticles;
    }();


    private createLinesWorker: AsyncWorker<BABYLON.Vector3[], BABYLON.Vector3[][]>;

    private maskColor = { r: 0, g: 255, b: 0, a: 0.355 };

    render() {
        return <div>
            <canvas id="renderCanvas" touch-action="none"></canvas>
            <div id="greenMask"></div>
        </div>;
    };


    componentDidMount() {
        this.initScene();
        this.getText();
        this.getPoints();

        this.createLinesWorker = new AsyncWorker(
            (document.getElementById('CreateLinesWorker') as HTMLScriptElement).src
        );

        this.engine.runRenderLoop(() => {
            this.renderBefore();
            this.scene.render();
            this.renderAfter();
        });

        this.props.eventCenter.on(Event.AfterWordCardsAnimation, this.transformation.bind(this));
        this.props.eventCenter.on(Event.AfterLogin, this.zoomIn.bind(this));
        this.props.eventCenter.on(Event.AfterSubmitMessage, this.cmdHandler.bind(this));

        window.addEventListener("resize", this.engine.resize.bind(this.engine));
    };


    private updateMask() {
        const color = this.maskColor;
        const setting = `rgba(${color.r},${color.g},${color.b},${color.a})`;
        $('#greenMask').css('background-color', setting);
        this.props.eventCenter.trigger(Event.UpdateDevPanelData, { greenMask: setting });
    };

    private startUpdateBackgroundParticles() {
        socketClient.on('updateBackgroundParticles', dataForEachRoom => {
            dataForEachRoom.forEach((data, i) => {
                this.backgroundParticles[i].white.targetCount = data.white;
                this.backgroundParticles[i].yellow.targetCount = data.yellow;
                this.backgroundParticles[i].pink.targetCount = data.pink;
            });
        });
    };

    private initScene() {
        const canvas = document.getElementById("renderCanvas") as HTMLCanvasElement;
        this.engine = new BABYLON.Engine(canvas, true, { stencil: true });
        const scene = this.scene = new BABYLON.Scene(this.engine);

        const camera = this.camera = new BABYLON.UniversalCamera("Camera", new BABYLON.Vector3(0, 0, -25), this.scene);
        camera.speed = 0.5;
        camera.setTarget(BABYLON.Vector3.Zero());
        camera.attachControl(canvas, true);

        new BABYLON.HemisphericLight("HemiLight1", new BABYLON.Vector3(0, 0, 10), scene).intensity = 0.8;
        new BABYLON.HemisphericLight("HemiLight2", new BABYLON.Vector3(0, 0, -10), scene).intensity = 0.8;

        this.lightOfCamera = new BABYLON.PointLight("lightOfCamera", new BABYLON.Vector3(0, 0, 0), scene);
        this.lightOfCamera.diffuse = new BABYLON.Color3(1, 1, 1);
        this.lightOfCamera.specular = new BABYLON.Color3(0.8, 0.8, 0.2);
        this.lightOfCamera.intensity = 0.3;

        const skyboxMaterial = new BABYLON.StandardMaterial("skyBox", scene);
        skyboxMaterial.backFaceCulling = false;
        skyboxMaterial.reflectionTexture = new BABYLON.CubeTexture("3sth/skybox/sb", scene);
        skyboxMaterial.reflectionTexture.coordinatesMode = BABYLON.Texture.SKYBOX_MODE;
        skyboxMaterial.diffuseColor = new BABYLON.Color3(0, 0, 0);
        skyboxMaterial.specularColor = new BABYLON.Color3(0, 0, 0);
        skyboxMaterial.disableLighting = true;
        const skybox = BABYLON.Mesh.CreateBox("skyBox", 1500, scene);
        skybox.material = skyboxMaterial;
        skybox.infiniteDistance = true;
        skybox.renderingGroupId = 0;
    };


    private renderBefore() {
        this.updateCameraPosition();
        this.translateLinesForTextNodes();
        this.updateParticles();
        this.translateParticles();
        if (this.bubbleSpray) this.bubbleSpray.setParticles();
    };


    private updateCameraPosition() {
        const cameraLocationsLen = this.cameraLocations.length;
        if (cameraLocationsLen > 0) {
            this.camera.position = this.cameraLocations.shift();
            if (cameraLocationsLen > 1) {
                this.camera.setTarget(BABYLON.Vector3.Zero());
            } else {
                this.viewPort.position = this.camera.position.clone();
                this.viewPort.rotation = this.camera.rotation.clone();
            }
        }
        else if (GlobalData.chatRoomIndex !== null && !CommonUtility.getQueryString('freeCamera')) {
            const positionCorrelationRate = 0.02;
            const positionCorrelation = this.viewPort.position
                .subtract(this.camera.position)
                .multiply(new BABYLON.Vector3(positionCorrelationRate, positionCorrelationRate, positionCorrelationRate));
            this.camera.position = this.camera.position.add(positionCorrelation);

            const rotationCorrelationRate = 0.1;
            const rotationCorrelation = this.viewPort.rotation
                .subtract(this.camera.rotation)
                .multiply(new BABYLON.Vector3(rotationCorrelationRate, rotationCorrelationRate, rotationCorrelationRate));
            this.camera.rotation = this.camera.rotation.add(rotationCorrelation);
        }
        this.lightOfCamera.position = this.camera.position;
    };


    private renderAfter() {
        this.props.eventCenter.trigger(Event.UpdateDevPanelData, {
            fps: this.engine.getFps().toFixed() + ' fps',
            coordinate: BabylonUtility.positionToString(this.camera.position)
        });
    };


    private createBubbleSpray(position: BABYLON.Vector3, bubbleCount: number) {
        if (this.bubbleSpray) this.bubbleSpray.dispose();

        const bubbleSpray = new BABYLON.SolidParticleSystem('bubbleSpray', this.scene);
        bubbleSpray.computeParticleColor = false;
        bubbleSpray.computeParticleRotation = false;
        bubbleSpray.billboard = true;

        const bubbleMash = BABYLON.MeshBuilder.CreateBox("bubbleMash", { size: 0.5 }, this.scene);
        bubbleSpray.addShape(bubbleMash, bubbleCount);
        bubbleMash.dispose();

        const texture = new BABYLON.Texture('3sth/bubble/bubbles_combined.png', this.scene);
        texture.hasAlpha = true;

        const bubbles = new BABYLON.StandardMaterial("bubbles", this.scene);
        bubbles.backFaceCulling = false;
        bubbles.diffuseTexture = texture;

        const mesh = bubbleSpray.buildMesh();
        mesh.position = position;
        mesh.material = bubbles;

        const initParticle = (particle: BABYLON.SolidParticle) => {
            particle.position.x = 0;
            particle.position.y = 0;
            particle.position.z = 0;

            const speed = 0.006;
            particle.velocity.x = (Math.random() - 0.5) * speed / 3;
            particle.velocity.y = Math.random() * speed;
            particle.velocity.z = (Math.random() - 0.5) * speed / 3;

            const scale = (Math.random() / 2) + 0.5;
            particle.scale.x = scale;
            particle.scale.y = scale;
            particle.scale.z = scale;

            particle.uvs.x = Math.random() >= 0.5 ? 0.5 : 0;
            particle.uvs.y = Math.random() >= 0.5 ? 0.5 : 0;
            particle.uvs.z = particle.uvs.x + 0.5;
            particle.uvs.w = particle.uvs.y + 0.5;

            particle['age'] = Math.random() * 3;
            return particle;
        };

        const recycleParticle = (particle: BABYLON.SolidParticle) => {
            particle.position.x = 0;
            particle.position.y = 0;
            particle.position.z = 0;

            const scale = (Math.random() / 2) + 0.5;
            particle.scale.x = scale;
            particle.scale.y = scale;
            particle.scale.z = scale;
            particle['age'] = Math.random() * 3 + 2;

            return particle;
        };

        const direction = this.camera.rotation.clone();
        if (position.x > 0) {
            direction.x = direction.x * -1;
            direction.y = direction.y * -1;
        }

        bubbleSpray.updateParticle = (particle) => {
            if (particle['age'] < 0) {
                recycleParticle(particle);
            }

            particle.position.addInPlace(particle.velocity); // �散
            const rise = 0.001;
            particle.position.x += (direction.x * rise); // 上�x
            particle.position.y += (direction.y * rise); // 上�y 

            const scale = particle.scale.x + 0.000005;
            particle.scale.x = scale;
            particle.scale.y = scale;
            particle.scale.z = scale;

            particle['age'] -= 0.01;
            return particle;
        };

        bubbleSpray.particles.forEach(particle => initParticle(particle));
        this.bubbleSpray = bubbleSpray.setParticles();
    };


    private getTextureForParticle = function () {
        let textures: { [key: string]: BABYLON.Texture } = null;
        return (color: string) => {
            if (!textures) {
                textures = {
                    pink: new BABYLON.Texture('3sth/particles/pink_particle.png', this.scene),
                    white: new BABYLON.Texture('3sth/particles/white_particle.png', this.scene),
                    yellow: new BABYLON.Texture('3sth/particles/yellow_particle.png', this.scene)
                };
                Object.keys(textures).forEach(key => textures[key].hasAlpha = true);
            }
            return textures[color];
        }
    }.bind(this)();

    private createParticle(center: BABYLON.Vector3, color: string) {
        const particle = BABYLON.Mesh.CreatePlane(`particle`, 0.1, this.scene);
        particle.position = center.clone();
        particle.billboardMode = BABYLON.Mesh.BILLBOARDMODE_ALL;

        const material = particle.material = new BABYLON.StandardMaterial(`particleMaterial`, this.scene);
        material.diffuseTexture = this.getTextureForParticle(color);
        const scaling = 0.1;
        particle.scaling = new BABYLON.Vector3(scaling, scaling, scaling);
        return particle;
    };

    private updateParticles() {
        this.chatRoomsCenter.forEach((center, i) => {
            const particlesSettings = this.backgroundParticles[i];
            ['white', 'yellow', 'pink'].forEach(color => {
                if (!particlesSettings) debugger;
                const particlesForOneColor = particlesSettings[color];
                const count = particlesForOneColor.targetCount - particlesForOneColor.particles.length;
                if (count > 0) {
                    for (let i = 0; i < count; i++) {
                        const particle = this.createParticle(center, color);

                        particlesForOneColor.particles.push({
                            mesh: particle,
                            translateVector: BabylonUtility.getRandomVector3(),
                            duration: this.getDurationForParticle(),
                            scaleOut: false
                        });
                    }
                } else if (count < 0) {
                    const toScaleOutCount = count * -1;
                    particlesForOneColor.particles.forEach((particle, i) => {
                        if (i + 1 > toScaleOutCount) return;
                        particle.scaleOut = true;
                        const mesh = particle.mesh;
                        const scale = mesh.scaling.x * 0.98;
                        mesh.scaling = new BABYLON.Vector3(scale, scale, scale);
                    });
                    const first = particlesForOneColor.particles[0];
                    if (first.mesh.scaling.x < 0.05) {
                        particlesForOneColor.particles.shift();
                        first.mesh.dispose();
                    }
                }
            });
        });
    };

    private translateParticles() {
        let particles: Particle[] = [];
        this.backgroundParticles.forEach(particlesForOneRoom => {
            ['white', 'yellow', 'pink'].forEach(color => {
                particles = particles.concat(particlesForOneRoom[color].particles);
            });
        });
        if (particles.length === 0) return;

        particles.forEach(p => {
            if (p.duration <= 0) {
                p.translateVector = BabylonUtility.getRandomVector3();
                p.duration = this.getDurationForParticle();
            }
            if (!p.scaleOut && p.mesh.scaling.x < 1) {
                const oldScale = p.mesh.scaling.x;
                const newScale = (oldScale > 0.95) ? 1 : (1 - oldScale) * 0.01 + oldScale;
                p.mesh.scaling = new BABYLON.Vector3(newScale, newScale, newScale);
            }
            BabylonUtility.updatePosition(p.mesh.position, p.translateVector, 0.003);
            p.duration -= 1;
        });
    };



    private linesForLinesystem: BABYLON.Vector3[][] = [];
    private linesystem: BABYLON.LinesMesh = null;
    private translateType: TranslateType = TranslateType.Simple;
    private linesystemPerformance = 0;

    private startUpdateTextNodes(textNodes: TextNode[]) {
        let updatedNodes: TextNode[];
        switch (this.translateType) {
            case TranslateType.Simple: {
                updatedNodes = this.updateTextNodeForSimpleMotion(textNodes);
                break;
            }
            case TranslateType.Forward: {
                updatedNodes = this.updateTextNodeForForward(textNodes);
                break;
            }
            default: return;
        };
        this.createLinesWorker.asyncExcute(updatedNodes.map(e => e.position)).then(data => {
            this.linesForLinesystem = data;
            const linesystemPerformance = this.linesystemPerformance;
            if (linesystemPerformance < -3) {
                const newCount = updatedNodes.length + linesystemPerformance;
                if (newCount > 100) updatedNodes.length = newCount;
            }

            this.props.eventCenter.trigger(Event.UpdateDevPanelData, {
                linesystemPerformance: linesystemPerformance
            });
            this.linesystemPerformance = 0;
            this.startUpdateTextNodes(updatedNodes);
        });
    };

    private updateTextNodeForSimpleMotion(nodesToTranslate: TextNode[]) {
        const nodes = nodesToTranslate.map((node, i) => {
            if (node.position.z > -13)
                node.translateVector.z = -1;
            else if (node.position.z < -16)
                node.translateVector.z = 1;
            BabylonUtility.updatePosition(node.position, node.translateVector, node.scale);
            return node;
        });
        return nodes;
    };
    private updateTextNodeForForward(nodesToTranslate: TextNode[]) {
        const maxMove = 0.3;
        let count = 0;
        const nodes = nodesToTranslate.map((node, i) => {
            const chatRoomsNode = this.chatRoomsNodes[i];
            const distance = BABYLON.Vector3.Distance(chatRoomsNode, node.position);
            if (distance > maxMove) {
                const vector = BabylonUtility.subtractVector(chatRoomsNode, node.position).normalize();
                BabylonUtility.updatePosition(node.position, vector, maxMove);
            } else {
                node.position = chatRoomsNode;
                count++;
            }
            return node;
        });
        if (count > 70) {
            this.translateType = TranslateType.Expand;
        }
        return nodes;
    };


    private translateLinesForTextNodes() {
        if (this.linesForLinesystem.length === 0) {
            if (this.linesystem) {
                this.linesystem.dispose();
                this.linesystem = null;
            }
            return;
        } else if (this.translateType === TranslateType.Expand) {
            this.expandTextNodes();
        }

        this.linesystemPerformance--;
        this.linesystem = BABYLON.MeshBuilder.CreateLineSystem("linesystem", {
            lines: this.linesForLinesystem,
            updatable: true,
            instance: this.linesystem || null
        }, this.scene);
        this.linesystem.color = BABYLON.Color3.White();
    };

    private expandTextNodes() {
        const linesystemLen = this.linesForLinesystem.length;
        const linesForChatRoomLen = this.linesForChatRooms.length;

        const exchangeCount = 20;
        const maxIndex = Math.min(linesystemLen, linesForChatRoomLen) - 1 - exchangeCount;
        const startIndex = CommonUtility.getRandomIntInRange(0, maxIndex);
        for (let i = 0; i < exchangeCount; i++) {
            const index = startIndex + i;
            const toExchange = this.linesForChatRooms[index];
            this.linesForLinesystem[index] = [toExchange.from, toExchange.to];
        }

        if (linesForChatRoomLen < linesystemLen) this.linesForLinesystem.pop();
    };

    /** unit in frame number */
    private getDurationForParticle() {
        return CommonUtility.getRandomIntInRange(60 * 3, 60 * 6);
    };

    private chatRoomsCenter: BABYLON.Vector3[] = [];
    private chatRoomsNodes: BABYLON.Vector3[] = [];
    private linesForChatRooms: Line[] = [];
    private getPoints() {
        const createVector = BabylonUtility.createVector;
        $.getJSON('apis/getPoints').then((data: any) => {
            this.chatRoomsCenter = data.roomCenters.map(e => createVector(e));
            this.chatRoomsNodes = CommonUtility.shuffle(
                data.chatRoomsNodes,
                node => new BABYLON.Vector3(node.x, node.y, node.z)
            );
            if (CommonUtility.getQueryString('markNodes')) {
                const nodeMaterial = new BABYLON.StandardMaterial("nodeMaterial", this.scene);
                nodeMaterial.diffuseColor = new BABYLON.Color3(1, 0, 1);

                data.chatRoomsNodes.forEach(position => {
                    const node = BABYLON.MeshBuilder.CreateSphere("node", { diameter: 0.1 }, this.scene);
                    node.position = position;
                    if (position.isAdditional) node.material = nodeMaterial;
                });
            }
            this.linesForChatRooms = data.linesForChatRooms;
            this.drawLine();
        });
    };


    private lineMeshContainer: BABYLON.Mesh[][] = [[], [], []];
    private drawLine() {
        if (this.linesForChatRooms.length === 0) return;

        const colorSetForLines = [
            [199, 222, 205],
            [192, 231, 164],
            [168, 213, 133]
        ].map(set => set.map(n => n / 255));
        const materials = colorSetForLines.map((colorInRGB, i) => {
            const color = new BABYLON.Color3(colorInRGB[0], colorInRGB[1], colorInRGB[2]);
            const mat = new BABYLON.StandardMaterial(`lineMat${i}`, this.scene);
            mat.diffuseColor = color;
            mat.alpha = 0;
            return mat;
        });

        const createVector = BabylonUtility.createVector;
        this.linesForChatRooms.forEach((e, i) => {
            const materialIndex = CommonUtility.getRandomIntInRange(0, 2);
            const line = BABYLON.MeshBuilder.CreateTube(`line${i}`, {
                path: [createVector(e.from), createVector(e.to)],
                radius: 0.03,
                updatable: false
            }, this.scene);
            line.material = materials[materialIndex];
            this.lineMeshContainer[materialIndex].push(line);
        });
        this.tryAddHighlightLayer();
    };
    private tryAddHighlightLayer() {
        var ua = window.navigator.userAgent;
        var msie = ua.indexOf("MSIE ");

        if (msie > 0 || !!navigator.userAgent.match(/Trident.*rv\:11\./)) {
            alert('此網頁包含大量3D動畫，建議您使用chrome、safari等效能較好的瀏覽器瀏覽此頁');
            return;
        }

        const highlightForLine = new BABYLON.HighlightLayer("highlightForLine", this.scene);
        highlightForLine.innerGlow = false;
        const glowColor = new BABYLON.Color3(246 / 255, 255 / 255, 201 / 255);
        this.lineMeshContainer.forEach(group => {
            const merged = BABYLON.Mesh.MergeMeshes(group, true, true);
            highlightForLine.addMesh(merged, glowColor);
        });
    };
    private showLine() {
        this.lineMeshContainer.forEach(group => group.forEach(line => line.material.alpha = 1));
    };



    private getText() {
        const getTextNodes = (img: HTMLImageElement) => {
            const canvas = document.createElement('canvas');
            const height = canvas.height = img.height;
            const width = canvas.width = img.width;
            const context = canvas.getContext('2d');
            context.drawImage(img, 0, 0, width, height);
            const imgData = context.getImageData(0, 0, 64, 64);

            const pixels: {
                x: number, y: number,
                r: number, g: number, b: number,
                brightness: number
            }[] = [];
            const len = imgData.data.length;
            for (let i = 0; i < len; i += 4) {

                const r = imgData.data[i];
                const g = imgData.data[i + 1];
                const b = imgData.data[i + 2];
                const brightness = (0.299 * r) + (0.587 * g) + (0.114 * b);

                const pixelNumber = (i / 4) + 1;
                const rowNumber = Math.floor(pixelNumber / 64);
                const culNumber = pixelNumber % 64;
                pixels.push({
                    x: culNumber, y: rowNumber,
                    r: r, g: g, b: b,
                    brightness: brightness
                });
            }

            const initialZ = -15;
            const textNodes = CommonUtility.sort(pixels, p => p.brightness).reverse()
                .slice(0, 200)
                .map((p, i) => {
                    const rate = 0.12;
                    const position = new BABYLON.Vector3(
                        (p.x - 32) * rate,
                        (p.y - 32) * -1 * rate,
                        initialZ + CommonUtility.getRandomNumberInRange(-2, 2, 4)
                    );
                    return {
                        position: position,
                        scale: CommonUtility.getRandomNumberInRange(0.005, 0.01, 4),
                        translateVector: new BABYLON.Vector3(0, 0, position.z < initialZ ? 1 : -1)
                    };
                });
            this.startUpdateTextNodes(textNodes);
        };

        $.get('apis/getMetaPattern').then(metaPattern => {
            const img = new Image();
            img.src = `data:image/png;base64,${metaPattern.pattern}`;
            img.onload = () => getTextNodes(img);
        });
    };

    private cmdHandler(chatBotResponse: ChatBotResponse) {

        // Mask
        const color = chatBotResponse.color;
        if (color) {
            this.maskColor.r = color[0];
            this.maskColor.g = color[1];
            this.maskColor.b = color[2];
            this.maskColor.a = 0.355 - (chatBotResponse.led / 1000);
            this.updateMask();
        }

        // Bubble
        if (chatBotResponse.pump) {
            const center = this.chatRoomsCenter[GlobalData.chatRoomIndex];
            this.createBubbleSpray(center, chatBotResponse.pump);
        }
    };


    private transformation() {
        this.translateType = TranslateType.Forward;
        setTimeout(() => {
            this.translateType = TranslateType.Expand;
            setTimeout(() => {
                this.linesForLinesystem.length = 0;
                this.showLine();
                this.startUpdateBackgroundParticles();
            }, 0.8 * 1000);
        }, 2 * 1000);
    };

    private setBackground() {
        $.get(`/apis/getBaseline?rid=${GlobalData.chatRoomIndex}`)
            .then(data => {
                this.maskColor.a = 0.355 - (data.led / 1000);
                const center = this.chatRoomsCenter[GlobalData.chatRoomIndex];
                this.createBubbleSpray(center, data.pump);
            }).always(() => {
            this.updateMask();
        });
    };

    private setChatRoomIndex() {
        const checkChatRoomIndex = (chatRoomIndex) => {
            return !!chatRoomIndex || chatRoomIndex === '0' || chatRoomIndex === 0;
        };
        let chatRoomIndex = CommonUtility.getQueryString('chatRoomIndex');
        if (!checkChatRoomIndex(chatRoomIndex)) chatRoomIndex = CommonUtility.getCookie('chatRoomIndex');
        if (checkChatRoomIndex(chatRoomIndex)) GlobalData.chatRoomIndex = Number(chatRoomIndex);
        if (!checkChatRoomIndex(GlobalData.chatRoomIndex))
            GlobalData.chatRoomIndex = CommonUtility.getRandomIntInRange(0, this.chatRoomsCenter.length - 1);

        CommonUtility.setCookie('chatRoomIndex', String(GlobalData.chatRoomIndex), 30);
    };

    private zoomIn() {
        this.setChatRoomIndex();
        this.setBackground();

        const chatRoomCenter = this.chatRoomsCenter[GlobalData.chatRoomIndex];
        const destination = chatRoomCenter ?
            new BABYLON.Vector3(chatRoomCenter.x * 2, chatRoomCenter.y * 2, 0) :
            BABYLON.Vector3.Zero();

        const curve = BABYLON.Curve3.CreateHermiteSpline(
            this.camera.position,
            BABYLON.Vector3.Zero(),
            destination,
            BABYLON.Vector3.Zero(),
            60 * 5
        );
        const points = curve.getPoints();
        this.cameraLocations = points;
    };
};



enum TranslateType { 'Simple', 'Forward', 'Expand' };


interface TextNode {
    position: BABYLON.Vector3,
    scale?: number,
    translateVector?: BABYLON.Vector3
};

interface Particle {
    mesh: BABYLON.Mesh,
    scaleOut: boolean,
    translateVector: BABYLON.Vector3,
    duration: number
};

interface ParticlesSetting {
    targetCount: number,
    particles: Particle[]
};