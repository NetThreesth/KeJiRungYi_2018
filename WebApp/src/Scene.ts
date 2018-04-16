import * as BABYLON from 'babylonjs';
import * as $ from 'jquery';

export class Scene {

    private texts: any[] = [];
    private images = [];


    private canvas = document.getElementById("renderCanvas");
    private engine = new BABYLON.Engine(this.canvas as HTMLCanvasElement, true);
    private scene: BABYLON.Scene;
    private camera: BABYLON.Camera;

    private light: BABYLON.Light;
    private lightOfCamera: BABYLON.Light;
    private spotLight: BABYLON.Light;


    private sps: BABYLON.SolidParticleSystem;

    /******* Add the create scene function ******/
    init() {

        this.initScene();
        this.createSPS();
        this.registerBeforeRender();
        this.runRenderLoop();
        this.initPanel();

        window.addEventListener("resize", () => {
            this.engine.resize();
        });
    };

    private initScene() {
        const scene = this.scene = new BABYLON.Scene(this.engine);

        const camera = this.camera = new BABYLON.UniversalCamera("Camera", new BABYLON.Vector3(0, 0, -10), this.scene);
        camera.setTarget(BABYLON.Vector3.Zero());
        camera.attachControl(this.canvas, true);

        camera.position.x = 0;
        camera.position.y = 0;
        camera.position.z = -100;


        // Add lights to the scene
        new BABYLON.HemisphericLight("HemiLight", new BABYLON.Vector3(0, 0, -10), scene);

        this.light = new BABYLON.PointLight("light", new BABYLON.Vector3(0, 0, 0), scene);
        this.light.intensity = 0.8;
        this.lightOfCamera = new BABYLON.PointLight("lightOfCamera", new BABYLON.Vector3(0, 0, 0), scene);
        this.lightOfCamera.diffuse = new BABYLON.Color3(1, 1, 1);
        this.lightOfCamera.specular = new BABYLON.Color3(0.8, 0.8, 0.2);
        this.spotLight = new BABYLON.SpotLight("spotLight", new BABYLON.Vector3(-10, 0, 0), new BABYLON.Vector3(0, 0, 0), Math.PI / 4, 20, scene);
        this.spotLight.diffuse = new BABYLON.Color3(1, 0, 0);
        this.spotLight.specular = new BABYLON.Color3(1, 0, 0);
        this.spotLight.intensity = 0.8;


        var skyboxMaterial = new BABYLON.StandardMaterial("skyBox", scene);
        skyboxMaterial.backFaceCulling = false;
        skyboxMaterial.reflectionTexture = new BABYLON.CubeTexture("https://www.babylonjs.com/assets/skybox/nebula", scene);
        skyboxMaterial.reflectionTexture.coordinatesMode = BABYLON.Texture.SKYBOX_MODE;
        skyboxMaterial.diffuseColor = new BABYLON.Color3(0, 0, 0);
        skyboxMaterial.specularColor = new BABYLON.Color3(0, 0, 0);
        skyboxMaterial.disableLighting = true;
        var skybox = BABYLON.Mesh.CreateBox("skyBox", 1500.0, scene);
        skybox.material = skyboxMaterial;
    };


    private createSPS() {
        // SPS creation
        var s = BABYLON.MeshBuilder.CreateSphere("s", { diameter: 3, segments: 12 }, this.scene);
        var SPS = new BABYLON.SolidParticleSystem('SPS', this.scene);

        SPS.addShape(s, 30);
        var mesh = SPS.buildMesh();
        mesh.material = function () {
            var mat = new BABYLON.StandardMaterial("mat", this.scene);
            //mat.backFaceCulling = false;
            mat.alpha = 0.2;

            return mat;
        }.bind(this)();

        mesh.position.x = 0;
        mesh.position.y = 0;
        mesh.position.z = 0;

        s.dispose();


        // SPS behavior definition
        var speed = 0.3;
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
            particle['age'] = Math.random();

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
            this.light.intensity = Math.cos(alpha);

        });

    };

    private runRenderLoop() {

        const origin = { x: 0, y: 0, z: 0 } as BABYLON.Vector3;
        const viewport = this.camera.viewport.toGlobal(this.camera.getEngine(), null);
        const $mark = $('.mark');

        this.engine.runRenderLoop(() => { // Register a render loop to repeatedly render the scene
            this.scene.render();
            var test = this.texts[0];
            if (!test) return;
            var transformationMatrix = this.camera.getViewMatrix().multiply(this.camera.getProjectionMatrix());
            var projectedPosition = BABYLON.Vector3.Project(origin, test.computeWorldMatrix(false), transformationMatrix, viewport);

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


    private initPanel() {
        $('.js-sent').on('click', () => {
            var $input = $('.js-input');
            var text = $input.val();
            if (!text) return;

            $input.val('').focus();

            this.addText(
                text,
                this.getRandomInt() * 2,
                this.getRandomInt(),
                -3 + this.getRandomNegativeInt()
            );


            // mock response
            window.setTimeout(() => {
                this.addText(text + '! ' + text + '! ' + text + '!!!',
                    this.getRandomInt() * 2,
                    this.getRandomInt(),
                    -3 + this.getRandomNegativeInt()
                );
            }, 700);
        });


        $('#js-upload').on('change', this.handleFiles);
    };

    private addText(text, x, y, z) {
        var outputplaneTexture = new BABYLON.DynamicTexture(
            "dynamic texture",
            { width: 500, height: 80 },
            this.scene,
            true
        );
        // outputplaneTexture.hasAlpha = true;
        outputplaneTexture.drawText(text, 0, 60, "60px verdana", "white", 'true', true);

        var outputplane = BABYLON.MeshBuilder.CreatePlane(
            "outputplane",
            { width: 5, height: 1 },
            this.scene
        );
        outputplane.billboardMode = BABYLON.AbstractMesh.BILLBOARDMODE_ALL;
        outputplane.position = new BABYLON.Vector3(x, y, z);
        outputplane.scaling.y = 1;

        const material = outputplane.material = new BABYLON.StandardMaterial("outputplane", this.scene);
        material.diffuseTexture = outputplaneTexture;
        material.specularColor = new BABYLON.Color3(0, 0, 0);
        material.emissiveColor = new BABYLON.Color3(1, 1, 1);
        material.backFaceCulling = false;

        outputplane['_message'] = text;
        this.texts.push(outputplane);
    };

    private handleFiles($ele) {
        var image = $ele.currentTarget.files[0];
        if (!image) return;

        var FR = new FileReader();

        FR.addEventListener("load", e => {
            this.addImage(
                e.target['result'],
                this.getRandomInt() * 2,
                this.getRandomInt(), -3 + this.getRandomNegativeInt()
            );
        });

        FR.readAsDataURL(image);


        $.get('/uploadImage').done(function (resp) {
            console.log(resp);
        }).fail(function (err) {
            console.log(err);
        });
    };

    private addImage(image, x, y, z) {
        var outputplaneTexture = BABYLON.Texture.CreateFromBase64String(
            image,
            'image-' + (this.images.length + 1),
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

        this.images.push(image);
    };


    private getRandomInt() {
        const r = this.getRandomNegativeInt() > 4 ? 1 : -1;
        return this.getRandomNegativeInt() * r;
    };
    private getRandomNegativeInt() {
        return Math.round(Math.random() * 10);
    };
};