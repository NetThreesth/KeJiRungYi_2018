import * as BABYLON from 'babylonjs';
import * as $ from 'jquery';
import { CommonUtility } from './CommonUtility';
import { BabylonUtility, Line } from './BabylonUtility';
import { ControlPanel } from './ControlPanel';


export class Scene {

    private texts: BABYLON.Mesh[] = [];


    private canvas = document.getElementById("renderCanvas");
    private engine = new BABYLON.Engine(this.canvas as HTMLCanvasElement, true);
    private scene: BABYLON.Scene;


    private camera: BABYLON.UniversalCamera;
    private lightOfCamera: BABYLON.PointLight;
    private cameraLocations: BABYLON.Vector3[] = [];


    private glowLayerForParticle: BABYLON.GlowLayer;
    private bubbleSprays: BABYLON.SolidParticleSystem[] = [];



    /******* Add the create scene function ******/
    init() {

        this.initScene();
        this.getTexts();
        this.getPoints();

        this.registerRunRenderLoop();
        // new ControlPanel().initPanel(this.onTextAdd.bind(this), this.onImageAdd.bind(this));


        $('#devPanel').show();
        window.addEventListener("resize", () => {
            this.engine.resize();
        });
    };

    private initScene() {
        const scene = this.scene = new BABYLON.Scene(this.engine);

        const camera = this.camera = new BABYLON.UniversalCamera("Camera", new BABYLON.Vector3(0, 0, -25), this.scene);
        camera.speed = 0.5;
        camera.setTarget(BABYLON.Vector3.Zero());
        camera.attachControl(this.canvas, true);


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


    private createBubbleSpray(position: BABYLON.Vector3) {
        // creation
        const sphere = BABYLON.MeshBuilder.CreateSphere("s", { diameter: 0.08, segments: 12 }, this.scene);
        const bubbleSpray = new BABYLON.SolidParticleSystem('bubbleSpray', this.scene);

        bubbleSpray.addShape(sphere, 20);
        const mesh = bubbleSpray.buildMesh();
        mesh.material = function () {
            const bubbleMat = new BABYLON.StandardMaterial("bubbleMat", this.scene);
            //mat.backFaceCulling = false;
            bubbleMat.alpha = 0.1;

            return bubbleMat;
        }.bind(this)();

        mesh.position = position;

        sphere.dispose();


        // behavior definition
        const speed = 0.01;

        // init
        bubbleSpray.initParticles = function () {
            // just recycle everything
            for (var p = 0; p < this.nbParticles; p++) {
                this.recycleParticle(this.particles[p]);
            }
        };

        // recycle
        let scale;
        bubbleSpray.recycleParticle = (particle) => {
            // Set particle new velocity, scale and rotation
            // As this function is called for each particle, we don't allocate new
            // memory by using "new BABYLON.Vector3()" but we set directly the
            // x, y, z particle properties instead
            particle.position.x = 0;
            particle.position.y = 0;
            particle.position.z = 0;
            particle.velocity.x = (Math.random() - 0.5) * speed / 3;
            particle.velocity.y = Math.random() * speed;
            particle.velocity.z = (Math.random() - 0.5) * speed / 3;
            scale = 1 * Math.random() + 0.2;
            particle.scale.x = scale;
            particle.scale.y = scale;
            particle.scale.z = scale;
            particle['age'] = Math.random() * 0.8;

            return particle;
        };

        // update : will be called by setParticles()
        bubbleSpray.updateParticle = (particle) => {
            // some physics here 
            if (particle.position.y < 0 || particle['age'] < 0) {
                bubbleSpray.recycleParticle(particle);
            }
            (particle.position).addInPlace(particle.velocity);      // update particle new position
            particle.position.y += speed / 2;

            particle['age'] -= 0.01;

            return particle;
        };


        // init all particle values and set them once to apply textures, colors, etc
        bubbleSpray.initParticles();
        bubbleSpray.setParticles();

        // Tuning : 
        bubbleSpray.computeParticleColor = false;
        bubbleSpray.computeParticleTexture = false;
        bubbleSpray.computeParticleRotation = false;

        this.bubbleSprays.push(bubbleSpray);
    };


    private registerRunRenderLoop() {

        const origin = { x: 0, y: 0, z: 0 } as BABYLON.Vector3;
        const viewport = this.camera.viewport.toGlobal(this.camera.getEngine(), null);
        const $mark = $('.mark');


        this.engine.runRenderLoop(() => {

            /** render before */
            this.bubbleSprays.forEach(e => e.setParticles());

            if (this.cameraLocations.length > 0) {
                const position = this.camera.position = this.cameraLocations.shift();
                if (this.cameraLocations.length >= 1) {
                    this.camera.setTarget(BABYLON.Vector3.Zero());
                    if (this.cameraLocations.length === 1)
                        this.createBubbleSprayAndParticles();
                }
            }

            this.lightOfCamera.position = this.camera.position;
            this.translateLinesForTextNodes();
            this.translateParticles();
            this.bubbleSprays.forEach(e => e.setParticles());
            /** render before end */


            this.scene.render();


            /** render after */
            this.updateDevPanel();

            /*             const text = this.texts[0];
                        if (!text) return;
                        const transformationMatrix = this.camera.getViewMatrix().multiply(this.camera.getProjectionMatrix());
                        const projectedPosition = BABYLON.Vector3.Project(origin, text.computeWorldMatrix(false), transformationMatrix, viewport);
            
                        if (projectedPosition.z > 1) {
                            $mark.hide();
                            return;
                        }
                        $mark.show();
                        $mark.css('top', projectedPosition.y + 60);
                        $mark.css('left', projectedPosition.x);
                        const scale = 1 / (1 - projectedPosition.z);
                        // $mark.css('transform', 'translate(-50%, -50%) scale(' + scale + ',' + scale + ')');
                        $mark.text(JSON.stringify(projectedPosition)); */
            /** render after end */
        });
    };

    private updateDevPanel() {

        const $fps = document.getElementById('fps');
        $fps.innerHTML = this.engine.getFps().toFixed() + ' fps';
        const $coordinate = document.getElementById('coordinate');
        $coordinate.innerHTML = BabylonUtility.positionToString(this.camera.position);
    };

    private onTextAdd(text: string, x: number, y: number, z: number) {
        const outputplaneTexture = new BABYLON.DynamicTexture(
            "dynamic texture",
            { width: 500, height: 80 },
            this.scene,
            true
        );
        outputplaneTexture.drawText(text, 0, 60, "60px verdana", "white", 'true');
        outputplaneTexture.hasAlpha = true;

        const outputplane = BABYLON.MeshBuilder.CreatePlane(
            "outputplane",
            { width: 5, height: 1 },
            this.scene
        );
        outputplane.billboardMode = BABYLON.AbstractMesh.BILLBOARDMODE_ALL;
        outputplane.position = new BABYLON.Vector3(x, y, z);
        outputplane.scaling.y = 1;
        outputplane['_message'] = text;

        const material = outputplane.material = new BABYLON.StandardMaterial("outputplane", this.scene);
        material.diffuseTexture = outputplaneTexture;
        material.alpha = 0;
        material.backFaceCulling = false;

        this.texts.push(outputplane);
    };


    private onImageAdd(image: string, x: number, y: number, z: number) {
        const outputplaneTexture = BABYLON.Texture.CreateFromBase64String(
            image,
            'image-' + Date.now,
            this.scene
        );
        // outputplaneTexture.hasAlpha = true;

        const outputplane = BABYLON.MeshBuilder.CreatePlane("outputplane", { width: 5, height: 5 }, this.scene);
        outputplane.billboardMode = BABYLON.AbstractMesh.BILLBOARDMODE_ALL;
        outputplane.position = new BABYLON.Vector3(x, y, z);
        outputplane.scaling.y = 1;

        const material = outputplane.material = new BABYLON.StandardMaterial("outputplane", this.scene);
        material.diffuseTexture = outputplaneTexture;
        material.specularColor = new BABYLON.Color3(0, 0, 0);
        material.emissiveColor = new BABYLON.Color3(1, 1, 1);
        material.backFaceCulling = false;
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
    private particles: {
        mesh: BABYLON.Mesh,
        translateVector: BABYLON.Vector3,
        duration: number
    }[] = [];
    private createParticle(center: BABYLON.Vector3) {
        const range = 15;
        const position = new BABYLON.Vector3(
            center.x + (CommonUtility.getRandomIntInRange(range * -1, range) * 0.1),
            center.y + (CommonUtility.getRandomIntInRange(range * -1, range) * 0.1),
            center.z + (CommonUtility.getRandomIntInRange(range * -1, range) * 0.1),
        );


        const colorSetIndex = CommonUtility.getRandomIntInRange(0, 2);
        const colorSet = this.colorsSetForParticle[colorSetIndex];
        const colorInRGB = colorSet.diffuseColor;
        const color = new BABYLON.Color3(colorInRGB[0], colorInRGB[1], colorInRGB[2]);

        const radius = CommonUtility.getRandomIntInRange(50, 70) * 0.001;

        const core = BABYLON.Mesh.CreateSphere(`core-colorSetIndex:${colorSetIndex}`, 2, radius, this.scene);
        core.position = position;

        const coreMaterial = core.material = new BABYLON.StandardMaterial(`coreMaterial`, this.scene);
        coreMaterial.diffuseColor = color;
        coreMaterial.emissiveColor = BABYLON.Color3.Black();

        if (!this.glowLayerForParticle) {
            this.glowLayerForParticle = new BABYLON.GlowLayer("glowLayerForParticle", this.scene);
            this.glowLayerForParticle.intensity = 0.5;
            this.glowLayerForParticle.customEmissiveColorSelector = (mesh, subMesh, material, result) => {
                const colorSetIndex = mesh.name.replace('core-colorSetIndex:', '');
                const glowColor = this.colorsSetForParticle[colorSetIndex].glowColor;
                result.set(glowColor[0], glowColor[1], glowColor[2], glowColor[3]);
            }
        }
        this.glowLayerForParticle.addIncludedOnlyMesh(core);


        const translateVector = BabylonUtility.getRandomVector3();
        this.particles.push({
            mesh: core,
            translateVector: translateVector,
            duration: this.getDurationForParticle()
        });
    };

    private linesForLinesystem: BABYLON.Vector3[][] = [];
    private linesystem: BABYLON.LinesMesh = null;
    private translateFactor = 0;
    private translateType: 'Simple' | 'ToOrigin' | 'ToChatRoomNode' = 'Simple';
    private startUpdateTextNodeWorker() {
        if (!window['Worker']) return;
        const worker = new Worker("app/UpdateTextNodeWorker.js");
        const next = () => {
            let nodes: BABYLON.Vector3[] = [];
            if (this.translateType === 'Simple') {
                nodes = this.textNodes.map(node => {
                    BabylonUtility.updatePosition(node.position, node.translateVector, node.scale * Math.cos(this.translateFactor));
                    return node.position;
                });
                this.translateFactor += 0.01;
            }
            else if (this.translateType === 'ToOrigin') {
                nodes = this.textNodes.map(node => {
                    const vector = new BABYLON.Vector3(-node.position.x, -node.position.y, -node.position.z).normalize();
                    BabylonUtility.updatePosition(node.position, vector, 0.5);
                    return node.position;
                });
            }
            else if (this.translateType === 'ToChatRoomNode') {
                this.textNodes = this.textNodes.slice(0, this.chatRoomsNodes.length);
                nodes = this.textNodes.map((node, i) => {
                    const vector = BabylonUtility.subtractVector(this.chatRoomsNodes[i], node.position).normalize();
                    BabylonUtility.updatePosition(node.position, vector, 0.5);
                    return node.position;
                });
            }
            worker.postMessage(nodes);
        };
        worker.onmessage = (message) => {
            if (this.textNodes.length === 0) {
                this.linesForLinesystem.length = 0;
                this.linesystem.dispose();
                return;
            }
            this.linesForLinesystem = message.data;
            next();
        };
        worker.postMessage(this.textNodes);
    };

    private translateLinesForTextNodes() {
        if (this.linesForLinesystem.length === 0) return;

        this.linesystem = BABYLON.MeshBuilder.CreateLineSystem("linesystem", {
            lines: this.linesForLinesystem,
            updatable: true,
            instance: this.linesystem || null
        }, this.scene);
        this.linesystem.color = BABYLON.Color3.White();
    };

    private translateParticles() {
        if (this.particles.length === 0) return;
        const scale = 0.003;
        this.particles.forEach(p => {
            if (p.duration <= 0) {
                p.translateVector = BabylonUtility.getRandomVector3();
                p.duration = this.getDurationForParticle();
            }
            BabylonUtility.updatePosition(p.mesh.position, p.translateVector, scale);
            p.duration -= 1;
        });
    };


    // unit: frame number
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
                console.log(`line count: ${lines.length}`);
                this.linesForChatRooms = lines;
            }
        );
    };


    private createBubbleSprayAndParticles() {
        this.chatRoomsCenter.forEach(center => {

            this.createBubbleSpray(center);

            for (let i = 0; i < 10; i++) {
                this.createParticle(center);
            }
        });
    };



    private highlightForLine: BABYLON.HighlightLayer = null;
    private colorSetForLines = [
        [199, 222, 205],
        [192, 231, 164],
        [168, 213, 133]
    ].map(set => set.map(n => n / 255));


    private glowColor = function () {
        const glowColorInRGB = [246 / 255, 255 / 255, 201 / 255, 0.84];
        return new BABYLON.Color3(glowColorInRGB[0], glowColorInRGB[1], glowColorInRGB[2])
    }();

    private drawLine() {

        if (this.linesForChatRooms.length === 0) return;

        const highlightForLine = this.highlightForLine =
            this.highlightForLine ||
            function () {
                const highlightForLine = new BABYLON.HighlightLayer("highlightForLine", this.scene);
                highlightForLine.innerGlow = false;
                return highlightForLine;
            }.bind(this)();

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
            highlightForLine.addMesh(merged, this.glowColor);
        });
    };



    private textNodes: {
        position: BABYLON.Vector3,
        scale: number,
        translateVector: BABYLON.Vector3
    }[] = [];

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

            this.textNodes = CommonUtility.sort(pixels, p => p.brightness).reverse()
                .slice(0, 200)
                .map((p, i) => {
                    const rate = 0.12;
                    // const s = BABYLON.Mesh.CreateSphere(`pixels-${i}`, 2, 0.2, this.scene);
                    const position = new BABYLON.Vector3(
                        (p.x - 32) * rate,
                        (p.y - 32) * -1 * rate,
                        -15 + CommonUtility.getRandomNumberInRange(0, 2, 3)
                    );
                    return {
                        position: position,
                        scale: CommonUtility.getRandomNumberInRange(-0.03, 0.03, 3),
                        translateVector: BabylonUtility.getRandomVector3(false, false).normalize()
                    };
                });
            this.startUpdateTextNodeWorker();
        };
    };


    transformation() {
        this.translateType = 'ToOrigin';
        setTimeout(() => {
            this.translateType = 'ToChatRoomNode';
        }, 1 * 1000);
        setTimeout(() => {
            this.translateType = null;
            this.textNodes.length = 0;
            this.drawLine();
        }, 1.8 * 1000);
    };

    zoomIn() {
        const randomChatRoomIndex = CommonUtility.getRandomIntInRange(0, this.chatRoomsCenter.length - 1);
        const chatRoom = this.chatRoomsCenter[randomChatRoomIndex];
        const destination = chatRoom ?
            new BABYLON.Vector3(chatRoom.x * 3, chatRoom.y * 3, 0) :
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
