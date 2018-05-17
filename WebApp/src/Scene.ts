import * as BABYLON from 'babylonjs';
import * as $ from 'jquery';
import { CommonUtility } from './CommonUtility';
import { Panel } from './Panel';

export class Scene {


    private texts: BABYLON.Mesh[] = [];
    private panel: Panel = new Panel();


    private canvas = document.getElementById("renderCanvas");
    private engine = new BABYLON.Engine(this.canvas as HTMLCanvasElement, true);
    private scene: BABYLON.Scene;
    private camera: BABYLON.Camera;
    private glowLayerForParticle: BABYLON.GlowLayer;
    private glowLayerForLine: BABYLON.GlowLayer;

    private light: BABYLON.Light;
    private lightOfCamera: BABYLON.Light;
    private spotLight: BABYLON.Light;


    private sps: BABYLON.SolidParticleSystem;

    /******* Add the create scene function ******/
    init() {

        this.initScene();
        this.createSPS();
        this.drawLine();

        this.registerBeforeRender();
        this.runRenderLoop();
        this.panel.initPanel(this.addText.bind(this), this.addImage.bind(this));

        window.addEventListener("resize", () => {
            this.engine.resize();
        });
    };

    private initScene() {
        const scene = this.scene = new BABYLON.Scene(this.engine);

        const camera = this.camera = new BABYLON.UniversalCamera("Camera", new BABYLON.Vector3(0, 0, -30), this.scene);
        camera.speed = 0.5;
        camera.setTarget(BABYLON.Vector3.Zero());
        camera.attachControl(this.canvas, true);


        new BABYLON.HemisphericLight("HemiLight", new BABYLON.Vector3(0, 0, 0), scene);

        this.light = new BABYLON.PointLight("light", new BABYLON.Vector3(0, 0, 0), scene);
        this.light.intensity = 0.8;
        this.lightOfCamera = new BABYLON.PointLight("lightOfCamera", new BABYLON.Vector3(0, 0, 0), scene);
        this.lightOfCamera.diffuse = new BABYLON.Color3(1, 1, 1);
        this.lightOfCamera.specular = new BABYLON.Color3(0.8, 0.8, 0.2);
        /*      this.spotLight = new BABYLON.SpotLight("spotLight", new BABYLON.Vector3(-10, 0, 0), new BABYLON.Vector3(0, 0, 0), Math.PI / 4, 20, scene);
             this.spotLight.diffuse = new BABYLON.Color3(1, 0, 0);
             this.spotLight.specular = new BABYLON.Color3(1, 0, 0)
             this.spotLight.intensity = 0.8; */


        this.glowLayerForParticle = new BABYLON.GlowLayer("glowLayerForParticle", this.scene);
        this.glowLayerForParticle.intensity = 0.3;
        this.glowLayerForLine = new BABYLON.GlowLayer("glowLayerForLine", this.scene);
        this.glowLayerForLine.intensity = 0.01;


        var skyboxMaterial = new BABYLON.StandardMaterial("skyBox", scene);
        skyboxMaterial.backFaceCulling = false;
        skyboxMaterial.reflectionTexture = new BABYLON.CubeTexture(
            "assets/skybox/sb", scene);
        skyboxMaterial.reflectionTexture.coordinatesMode = BABYLON.Texture.SKYBOX_MODE;
        skyboxMaterial.diffuseColor = new BABYLON.Color3(0, 0, 0);
        skyboxMaterial.specularColor = new BABYLON.Color3(0, 0, 0);
        skyboxMaterial.disableLighting = true;
        var skybox = BABYLON.Mesh.CreateBox("skyBox", 1500.0, scene);
        skybox.material = skyboxMaterial;
    };


    private createSPS() {
        // SPS creation
        var sphere = BABYLON.MeshBuilder.CreateSphere("s", { diameter: 1, segments: 12 }, this.scene);
        var SPS = new BABYLON.SolidParticleSystem('SPS', this.scene);

        SPS.addShape(sphere, 20);
        var mesh = SPS.buildMesh();
        mesh.material = function () {
            var mat = new BABYLON.StandardMaterial("mat", this.scene);
            //mat.backFaceCulling = false;
            mat.alpha = 0.1;

            return mat;
        }.bind(this)();

        mesh.position.x = 0;
        mesh.position.y = 0;
        mesh.position.z = 0;

        sphere.dispose();


        // SPS behavior definition
        var speed = 0.1;
        var gravity = -0.02;

        // init
        SPS.initParticles = function () {
            // just recycle everything
            for (var p = 0; p < this.nbParticles; p++) {
                this.recycleParticle(this.particles[p]);
            }
        };

        // recycle
        let scale;
        SPS.recycleParticle = (particle) => {
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
        SPS.updateParticle = function (particle) {
            // some physics here 
            if (particle.position.y < 0 || particle['age'] < 0) {
                this.recycleParticle(particle);
            }
            // particle.velocity.y += gravity;                         // apply gravity to y
            (particle.position).addInPlace(particle.velocity);      // update particle new position
            particle.position.y += speed / 2;

            particle['age'] -= 0.01;

            return particle;
        };


        // init all particle values and set them once to apply textures, colors, etc
        SPS.initParticles();
        SPS.setParticles();

        // Tuning : 
        SPS.computeParticleColor = false;
        SPS.computeParticleTexture = false;
        SPS.computeParticleRotation = false;

        this.sps = SPS;
    };


    private registerBeforeRender() {
        var alpha = 0;

        this.scene.registerBeforeRender(() => {
            this.sps.setParticles();

            this.lightOfCamera['position'] = this.camera.position;

            alpha += 0.01;
            const variable = Math.cos(alpha);
            this.light.intensity = Math.cos(variable);
        });
    };

    private runRenderLoop() {

        const origin = { x: 0, y: 0, z: 0 } as BABYLON.Vector3;
        const viewport = this.camera.viewport.toGlobal(this.camera.getEngine(), null);
        const $mark = $('.mark');

        this.engine.runRenderLoop(() => { // Register a render loop to repeatedly render the scene
            this.scene.render();
            var text = this.texts[0];
            if (!text) return;
            var transformationMatrix = this.camera.getViewMatrix().multiply(this.camera.getProjectionMatrix());
            var projectedPosition = BABYLON.Vector3.Project(origin, text.computeWorldMatrix(false), transformationMatrix, viewport);

            if (projectedPosition.z > 1) {
                $mark.hide();
                return;
            }
            $mark.show();
            $mark.css('top', projectedPosition.y + 60);
            $mark.css('left', projectedPosition.x);
            var scale = 1 / (1 - projectedPosition.z);
            // $mark.css('transform', 'translate(-50%, -50%) scale(' + scale + ',' + scale + ')');
            $mark.text(JSON.stringify(projectedPosition));
        });
    };


    private addText(text: string, x: number, y: number, z: number) {
        var outputplaneTexture = new BABYLON.DynamicTexture(
            "dynamic texture",
            { width: 500, height: 80 },
            this.scene,
            true
        );
        outputplaneTexture.drawText(text, 0, 60, "60px verdana", "white", 'true');
        outputplaneTexture.hasAlpha = true;

        var outputplane = BABYLON.MeshBuilder.CreatePlane(
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
        this.createParticle();
    };


    private addImage(image: string, x: number, y: number, z: number) {
        var outputplaneTexture = BABYLON.Texture.CreateFromBase64String(
            image,
            'image-' + Date.now,
            this.scene
        );
        // outputplaneTexture.hasAlpha = true;

        var outputplane = BABYLON.MeshBuilder.CreatePlane("outputplane", { width: 5, height: 5 }, this.scene);
        outputplane.billboardMode = BABYLON.AbstractMesh.BILLBOARDMODE_ALL;
        outputplane.position = new BABYLON.Vector3(x, y, z);
        outputplane.scaling.y = 1;

        const material = outputplane.material = new BABYLON.StandardMaterial("outputplane", this.scene);
        material.diffuseTexture = outputplaneTexture;
        material.specularColor = new BABYLON.Color3(0, 0, 0);
        material.emissiveColor = new BABYLON.Color3(1, 1, 1);
        material.backFaceCulling = false;
    };


    private createParticle() {
        const center = [5, 5, -8];
        const range = 15;
        const position = new BABYLON.Vector3(
            center[0] + (CommonUtility.getRandomIntInRange(range * -1, range) * 0.1),
            center[1] + (CommonUtility.getRandomIntInRange(range * -1, range) * 0.1),
            center[2] + (CommonUtility.getRandomIntInRange(range * -1, range) * 0.1),
        );

        let colorInRGB = [251, 235, 13];
        const random = CommonUtility.getRandomNegativeInt();
        if (random > 3) colorInRGB = [252, 203, 165];
        if (random > 6) colorInRGB = [250, 239, 255];
        console.log(colorInRGB);
        const color = new BABYLON.Color3(colorInRGB[0] / 255, colorInRGB[1] / 255, colorInRGB[2] / 255);

        const radius = CommonUtility.getRandomIntInRange(5, 8) * 0.01;


        // start creation
        /*        const ico = BABYLON.MeshBuilder.CreateIcoSphere("ico", {
                   radius: radius,
                   radiusY: radius * CommonUtility.getRandomIntInRange(6, 14) * 0.1,
                   subdivisions: CommonUtility.getRandomIntInRange(1, 5)
               }, this.scene);
               ico.position = position;
               const icoMaterial = new BABYLON.StandardMaterial("icoMaterial", this.scene);
               icoMaterial.diffuseColor = color;
               icoMaterial.emissiveColor = color;
               // icoMaterial.alpha = 0.05;
               ico.material = icoMaterial; */


        var core = BABYLON.Mesh.CreateSphere("core", 2, radius, this.scene);
        core.position = position;

        const coreMaterial = core.material = new BABYLON.StandardMaterial('coreMaterial', this.scene);
        coreMaterial.diffuseColor = color;
        coreMaterial.specularColor = color;
        coreMaterial.emissiveColor = color;


        this.glowLayerForParticle.addIncludedOnlyMesh(core);
    };


    private drawLine() {
        $.getJSON(
            'apis/getPoints',
            (data: { 'key': { x: number, y: number, z: number }[] }) => {
                let points: BABYLON.Vector3[] = [];
                Object.keys(data).forEach(key => {
                    const pointInGroup = data[key].map(p =>
                        new BABYLON.Vector3(p.x, p.y, CommonUtility.getRandomNegativeInt()));
                    points = points.concat(pointInGroup);
                });
                const lines: {
                    key: string,
                    from: BABYLON.Vector3,
                    to: BABYLON.Vector3,
                    distance: number
                }[] = [];

                const maxDistance = 2.2;
                points.forEach((from, iOfFrom) => {
                    points.forEach((to, iOfTo) => {
                        if (iOfFrom < iOfTo) {
                            const distance = CommonUtility.distanceVector(from, to);
                            if (distance < maxDistance) {
                                const key = `${iOfFrom}-${iOfTo}`;
                                lines.push({
                                    key: key,
                                    from: from,
                                    to: to,
                                    distance: distance
                                });
                            }
                        }
                    });
                });
                console.log(`max distance: ${maxDistance}, line count: ${lines.length}`);

                //Create lines 
                const colors = [
                    [71, 148, 90],
                    [166, 221, 125],
                    [168, 213, 133]
                ];

                lines.forEach((e, i) => {
                    const color = colors[CommonUtility.getRandomIntInRange(0, 2)];
                    console.log(`line${i}: ${color}`)
                    var greenMat = new BABYLON.StandardMaterial("greenMat" + i, this.scene);
                    greenMat.emissiveColor = greenMat.diffuseColor = new BABYLON.Color3(color[0], color[1], color[2]);
                    const line = BABYLON.MeshBuilder.CreateTube("line" + i, {
                        path: [e.from, e.to],
                        radius: 0.03,
                        updatable: true,
                        instance: null
                    }, this.scene);
                    line.material = greenMat;

                    this.glowLayerForLine.addIncludedOnlyMesh(line);
                });
            }
        );
    };
};