import * as React from "react";
import * as BABYLON from 'babylonjs';
import * as $ from 'jquery';
import { CommonUtility } from './CommonUtility';
import { BabylonUtility, Line } from './BabylonUtility';

import { EventCenter, Event, TextToCmd } from './MessageCenter';



export class Scene
    extends React.Component<{ eventCenter: EventCenter }> {

    static chatRoomIndex: number = null;

    private engine: BABYLON.Engine;
    private scene: BABYLON.Scene;


    private camera: BABYLON.UniversalCamera;
    private lightOfCamera: BABYLON.PointLight;
    private cameraLocations: BABYLON.Vector3[] = [];
    private viewPort = { position: BABYLON.Vector3.Zero(), rotation: BABYLON.Vector3.Zero() };


    private glowLayerForParticle: BABYLON.GlowLayer;
    private bubbleSpray: BABYLON.SolidParticleSystem;

    private createLinesWorker: AsyncWorker<BABYLON.Vector3[], BABYLON.Vector3[][]>;


    render() {
        return <div>
            <canvas id="renderCanvas" touch-action="none"></canvas>
            <div id="greenMask"></div>
        </div>;
    };


    componentDidMount() {

        this.initScene();
        this.getTexts();
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

        const updateMask = () => {
            const setting = CommonUtility.getQueryString('greenMask');
            const color = setting || `rgba(0, 255, 0, ${CommonUtility.getRandomNumberInRange(0, 0.5, 2)})`;
            $('#greenMask').css('background-color', color);
            this.props.eventCenter.trigger(Event.UpdateDevPanelData, { greenMask: color });
            if (setting) return;
            setTimeout(() => {
                updateMask();
            }, 2000);
        };
        updateMask();
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
        skyboxMaterial.reflectionTexture = new BABYLON.CubeTexture("assets/skybox/sb", scene);
        skyboxMaterial.reflectionTexture.coordinatesMode = BABYLON.Texture.SKYBOX_MODE;
        skyboxMaterial.diffuseColor = new BABYLON.Color3(0, 0, 0);
        skyboxMaterial.specularColor = new BABYLON.Color3(0, 0, 0);
        skyboxMaterial.disableLighting = true;
        const skybox = BABYLON.Mesh.CreateBox("skyBox", 1500.0, scene);
        skybox.material = skyboxMaterial;
        skybox.infiniteDistance = true;
        skybox.renderingGroupId = 0;
    };


    private renderBefore() {
        this.updateCameraPosition();
        this.translateLinesForTextNodes();
        this.translateParticles();
        this.checkAlgaes();
        if (this.bubbleSpray) this.bubbleSpray.setParticles();
    };



    private updateCameraPosition() {
        const cameraLocationsLen = this.cameraLocations.length;
        if (cameraLocationsLen > 0) {
            this.camera.position = this.cameraLocations.shift();
            if (cameraLocationsLen > 1) {
                this.camera.setTarget(BABYLON.Vector3.Zero());
            } else {
                const center = this.chatRoomsCenter[Scene.chatRoomIndex];
                this.createBubbleSpray(center);

                this.viewPort.position = this.camera.position.clone();
                this.viewPort.rotation = this.camera.rotation.clone();
            }
        }
        /*  else if (Scene.chatRoomIndex !== null) {
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
         } */

        this.lightOfCamera.position = this.camera.position;
    };


    private checkAlgaes() {
        if (this.algaes.length === 0) return;
        const disposeTime = new Date(Date.now() - 30 * 60 * 1000);
        if (this.algaes[0].createTime < disposeTime) {
            const algae = this.algaes.shift();
            algae.sprite.dispose();
        }
    };


    private renderAfter() {
        this.props.eventCenter.trigger(Event.UpdateDevPanelData, {
            fps: this.engine.getFps().toFixed() + ' fps',
            coordinate: BabylonUtility.positionToString(this.camera.position)
        });
    };



    private createBubbleSpray(position: BABYLON.Vector3) {
        // creation
        const sphere = BABYLON.MeshBuilder.CreateSphere("s", { diameter: 0.3, segments: 12 }, this.scene);
        const bubbleSpray = new BABYLON.SolidParticleSystem('bubbleSpray', this.scene);

        bubbleSpray.addShape(sphere, 20);
        const mesh = bubbleSpray.buildMesh();
        mesh.material = function () {
            const bubbleMat = new BABYLON.StandardMaterial("bubbleMat", this.scene);
            //mat.backFaceCulling = false;
            bubbleMat.alpha = 0.2;

            return bubbleMat;
        }.bind(this)();

        mesh.position = position;

        sphere.dispose();


        const speed = 0.01;

        // init
        bubbleSpray.initParticles = function () {
            for (var p = 0; p < this.nbParticles; p++) {
                this.recycleParticle(this.particles[p]);
            }
        };


        bubbleSpray.recycleParticle = (particle) => {
            particle.position.x = 0;
            particle.position.y = 0;
            particle.position.z = 0;
            particle.velocity.x = (Math.random() - 0.5) * speed / 3;
            particle.velocity.y = Math.random() * speed;
            particle.velocity.z = (Math.random() - 0.5) * speed / 3;
            const scale = 1 * Math.random() + 0.2;
            particle.scale.x = scale;
            particle.scale.y = scale;
            particle.scale.z = scale;
            particle['age'] = Math.random() * 2 + 2;

            return particle;
        };

        bubbleSpray.updateParticle = (particle) => {
            if (particle.position.y < 0 || particle['age'] < 0) {
                bubbleSpray.recycleParticle(particle);
            }
            particle.position.addInPlace(particle.velocity);
            particle.position.y += speed / 2;

            particle['age'] -= 0.01;

            return particle;
        };


        bubbleSpray.initParticles();
        bubbleSpray.setParticles();

        bubbleSpray.computeParticleColor = false;
        bubbleSpray.computeParticleTexture = false;
        bubbleSpray.computeParticleRotation = false;

        this.bubbleSpray = bubbleSpray;
    };


    private colorsSetForParticle = [
        { diffuseColor: [253, 245, 134], glowColor: [255, 252, 193, 0.85] },
        { diffuseColor: [253, 229, 210], glowColor: [255, 219, 225, 0.85] },
        { diffuseColor: [252, 247, 255], glowColor: [255, 249, 254, 0.85] }
    ].map(set => {
        set.diffuseColor = set.diffuseColor.map(n => n / 255);
        set.glowColor = set.glowColor.map((n, i) => i !== 3 ? n / 255 : n);
        return set;
    });

    private getTextureForParticle = function () {
        let textures: { [key: number]: BABYLON.Texture } = null;
        return () => {
            if (!textures) {
                textures = {
                    0: new BABYLON.Texture('assets/background_particles/pink_particle.png', this.scene),
                    1: new BABYLON.Texture('assets/background_particles/white_particle.png', this.scene),
                    2: new BABYLON.Texture('assets/background_particles/yellow_particle.png', this.scene)
                };

            }
            const key = CommonUtility.getRandomIntInRange(0, 2);
            return textures[key];
        }
    }.bind(this)();


    private particles: {
        mesh: BABYLON.Mesh,
        translateVector: BABYLON.Vector3,
        duration: number
    }[] = [];
    private createParticle(center: BABYLON.Vector3) {
        // const range = 15;

        /*  const position = new BABYLON.Vector3(
             center.x + (CommonUtility.getRandomIntInRange(range * -1, range) * 0.1),
             center.y + (CommonUtility.getRandomIntInRange(range * -1, range) * 0.1),
             center.z + (CommonUtility.getRandomIntInRange(range * -1, range) * 0.1),
         ); */


        const colorSetIndex = CommonUtility.getRandomIntInRange(0, 2);
        // const colorSet = this.colorsSetForParticle[colorSetIndex];
        // const colorInRGB = colorSet.diffuseColor;
        // const color = new BABYLON.Color3(colorInRGB[0], colorInRGB[1], colorInRGB[2]);

        // const radius = CommonUtility.getRandomIntInRange(10, 20) * 0.01;

        // const particle = BABYLON.Mesh.CreateSphere(`colorSetIndex:${colorSetIndex}`, 8, radius, this.scene);

        const particle = BABYLON.Mesh.CreatePlane(`colorSetIndex:${colorSetIndex}`, 0.5, this.scene);
        particle.position = center.clone();
        particle.billboardMode = BABYLON.Mesh.BILLBOARDMODE_ALL;

        const material = particle.material = new BABYLON.StandardMaterial(`particleMaterial`, this.scene);

        material.diffuseTexture = this.getTextureForParticle();
        material.diffuseTexture.hasAlpha = true

        /*         material.diffuseColor = color;
                material.emissiveColor = BABYLON.Color3.Black(); */


        /*         if (!this.glowLayerForParticle) {
                    this.glowLayerForParticle = new BABYLON.GlowLayer("glowLayerForParticle", this.scene);
                    this.glowLayerForParticle.intensity = 0.5;
                    this.glowLayerForParticle.customEmissiveColorSelector = (mesh, subMesh, material, result) => {
                        const colorSetIndex = mesh.name.replace('colorSetIndex:', '');
                        const glowColor = this.colorsSetForParticle[colorSetIndex].glowColor;
                        result.set(glowColor[0], glowColor[1], glowColor[2], glowColor[3]);
                    }
                }
                this.glowLayerForParticle.addIncludedOnlyMesh(particle); */




        this.particles.push({
            mesh: particle,
            translateVector: BabylonUtility.getRandomVector3(),
            duration: this.getDurationForParticle()
        });
    };



    private linesForLinesystem: BABYLON.Vector3[][] = [];
    private linesystem: BABYLON.LinesMesh = null;
    private translateType: TranslateType = TranslateType.Simple;
    private linesystemPerformance = 0;


    private startUpdateTextNodes(textNodes: TranslatableNode[]) {
        let updatedNodes: TranslatableNode[];
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

    private updateTextNodeForSimpleMotion(nodesToTranslate: TranslatableNode[]) {
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
    private updateTextNodeForForward(nodesToTranslate: TranslatableNode[]) {
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

        if (linesForChatRoomLen === linesystemLen) return;
        else if (linesForChatRoomLen > linesystemLen) {
            const toAdd = this.linesForChatRooms[linesystemLen - 1];
            this.linesForLinesystem.push([toAdd.from, toAdd.to]);
        } else if (linesForChatRoomLen < linesystemLen) {
            this.linesForLinesystem.pop();
        }
    };

    private translateParticles() {
        if (this.particles.length === 0) return;
        const scale = 0.003;
        this.particles.forEach(p => {
            if (p.duration <= 0) {
                p.translateVector = BabylonUtility.getRandomVector3();
                p.duration = this.getDurationForParticle();// unit: frame number
            }
            BabylonUtility.updatePosition(p.mesh.position, p.translateVector, scale);
            p.duration -= 1;
        });
    };

    private getDurationForParticle() {
        return CommonUtility.getRandomIntInRange(60 * 3, 60 * 6);
    };


    private chatRoomsNodes: BABYLON.Vector3[] = [];
    private chatRoomsCenter: BABYLON.Vector3[] = [];
    private linesForChatRooms: Line[] = [];

    private getPoints() {
        $.getJSON(
            'apis/getPoints',
            (data: { 'key': BABYLON.Vector3[] }) => {
                let pointInGroups: BABYLON.Vector3[][] = [];
                Object.keys(data).forEach((key, i) => {
                    const pointInGroup = data[key].map(p =>
                        new BABYLON.Vector3(p.x, p.y, CommonUtility.getRandomNumber(3) * 0.006)
                    );
                    this.chatRoomsNodes = this.chatRoomsNodes.concat(pointInGroup);
                    pointInGroups[i] = pointInGroup;
                });
                this.chatRoomsNodes = CommonUtility.shuffle(this.chatRoomsNodes);
                let lines: Line[] = [];

                const take = 120;
                pointInGroups.forEach(points => {
                    const linesInGroup = BabylonUtility.getLineToEachOther(points);
                    const maxLine = CommonUtility.sort(linesInGroup, e => e.distance)[linesInGroup.length - 1];
                    const center = new BABYLON.Vector3(0, 0, 0);
                    Object.keys(center).forEach(axis => {
                        center[axis] = (maxLine.from[axis] + maxLine.to[axis]) / 2
                    });
                    this.chatRoomsCenter.push(center);
                    lines = lines.concat(linesInGroup.slice(0, take));
                });
                this.linesForChatRooms = lines;
            }
        );
    };


    private createParticles() {
        this.chatRoomsCenter.forEach(center => {
            for (let i = 0; i < 10; i++) {
                this.createParticle(center);
            }
        });
    };



    private colorSetForLines = [
        [199, 222, 205],
        [192, 231, 164],
        [168, 213, 133]
    ].map(set => set.map(n => n / 255));

    private drawLine() {

        if (this.linesForChatRooms.length === 0) return;

        const highlightForLine = new BABYLON.HighlightLayer("highlightForLine", this.scene);
        highlightForLine.innerGlow = false;
        const glowColor = new BABYLON.Color3(246 / 255, 255 / 255, 201 / 255);

        const materials = this.colorSetForLines.map((colorInRGB, i) => {
            const color = new BABYLON.Color3(colorInRGB[0], colorInRGB[1], colorInRGB[2]);
            const mat = new BABYLON.StandardMaterial(`lineMat${i}`, this.scene);
            mat.diffuseColor = color;
            return mat;
        });

        const meshContainer: BABYLON.Mesh[][] = [[], [], []];
        this.linesForChatRooms.forEach((e, i) => {
            const materialIndex = CommonUtility.getRandomIntInRange(0, 2);
            const line = BABYLON.MeshBuilder.CreateTube(`line${i}`, {
                path: [e.from, e.to],
                radius: 0.03,
                updatable: false
            }, this.scene);
            line.material = materials[materialIndex];
            meshContainer[materialIndex].push(line);
        });
        meshContainer.forEach(group => {
            if (group.length === 0) return;
            const merged = BABYLON.Mesh.MergeMeshes(group, true, false);
            highlightForLine.addMesh(merged, glowColor);
        });
    };



    private getTexts() {
        const img = new Image();
        img.src = 'assets/textImage/image.png';
        img.onload = () => {
            const canvas = document.createElement('canvas');
            const height = canvas.height = img.height;
            const width = canvas.width = img.width;
            const context = canvas.getContext('2d');
            context.drawImage(img, 0, 0, width, height);


            // inputs
            const startX = 64 * CommonUtility.getRandomIntInRange(0, 6);
            const startY = 64 * CommonUtility.getRandomIntInRange(0, 6);
            const takeWidth = 64;
            const rateOfWoverH = 1 / 1;

            const takeHeight = takeWidth / rateOfWoverH;
            const imgData = context.getImageData(startX, startY, takeWidth, takeHeight);


            const pixels: {
                x: number,
                y: number,
                r: number,
                g: number,
                b: number,
                brightness: number
            }[] = [];
            const len = imgData.data.length;
            for (let i = 0; i < len; i += 4) {

                const r = imgData.data[i];
                const g = imgData.data[i + 1];
                const b = imgData.data[i + 2];
                const brightness = (0.299 * r) + (0.587 * g) + (0.114 * b);

                const pixelNumber = (i / 4) + 1;
                const rowNumber = Math.floor(pixelNumber / takeWidth);
                const culNumber = pixelNumber % takeWidth;
                pixels.push({
                    x: culNumber,
                    y: rowNumber,
                    r: r,
                    g: g,
                    b: b,
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
                        initialZ + CommonUtility.getRandomNumberInRange(-2, 2, 3)
                    );
                    return {
                        position: position, // 初始位置
                        scale: CommonUtility.getRandomNumberInRange(0.005, 0.01, 3), // 控制速度
                        translateVector: new BABYLON.Vector3(0, 0, position.z < initialZ ? 1 : -1) // 初始方向
                    };
                });
            this.startUpdateTextNodes(textNodes);
        };
    };

    private algaes: { sprite: BABYLON.Sprite, createTime: Date }[] = [];
    private cmdHandler(cmd: TextToCmd) {
        const algaeManager = new BABYLON.SpriteManager("algaeManager", "assets/Algae_particles.png", 1, 375, this.scene);
        const center = this.chatRoomsCenter[Scene.chatRoomIndex];
        var algae = new BABYLON.Sprite("algae", algaeManager);
        algae.size = 1;
        algae.position.x = center.x + CommonUtility.getRandomNumberInRange(-3, 3, 2);
        algae.position.y = center.y + CommonUtility.getRandomNumberInRange(-3, 3, 2);
        algae.position.z = center.z + CommonUtility.getRandomNumberInRange(-3, 3, 2);
        algae.isPickable = false;
        this.algaes.push({ sprite: algae, createTime: new Date() });
    };


    private transformation() {
        this.translateType = TranslateType.Forward;
        setTimeout(() => {
            this.translateType = TranslateType.Expand;
            setTimeout(() => {
                this.linesForLinesystem.length = 0;
                this.drawLine();
                setTimeout(() => this.createParticles());
            }, 0.8 * 1000);
        }, 2 * 1000);
    };

    private zoomIn() {
        Scene.chatRoomIndex = CommonUtility.getRandomIntInRange(0, this.chatRoomsCenter.length - 1);
        const chatRoom = this.chatRoomsCenter[Scene.chatRoomIndex];
        const destination = chatRoom ?
            new BABYLON.Vector3(chatRoom.x * 2.5, chatRoom.y * 2.5, 0) :
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


interface TranslatableNode {
    position: BABYLON.Vector3,
    scale?: number,
    translateVector?: BABYLON.Vector3
};


class AsyncWorker<inT, outT> {

    private worker: Worker;

    constructor(
        src: string
    ) {
        if (!window['Worker'])
            throw 'Worker not support';

        this.worker = new Worker(src);
    };

    asyncExcute(input: inT) {
        return new Promise<outT>((resolve, reject) => {
            const worker = this.worker;
            worker.onmessage = message => resolve(message.data);
            worker.onerror = e => reject(e.error);
            worker.postMessage(input);
        });
    };
};