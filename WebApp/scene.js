'use strict';
!function () {


    var canvas = document.getElementById("renderCanvas"); // Get the canvas element 

    var engine = new BABYLON.Engine(canvas, true); // Generate the BABYLON 3D engine


    var texts = [];
    var scene = createScene(); //Call the createScene function
    var camera = createCamera(scene);


    function createCamera(scene) {
        // Add a camera to the scene and attach it to the canvas
        var camera = new BABYLON.UniversalCamera("Camera", new BABYLON.Vector3(0, 0, -10), scene);
        camera.setTarget(BABYLON.Vector3.Zero());
        camera.attachControl(canvas, true);

        camera.position.x = 0;
        camera.position.y = 0;
        camera.position.z = -100;
        return camera;
    };

    var light;
    var lightOfCamera;
    var spotLight;
    /******* Add the create scene function ******/
    function createScene() {

        // Create the scene space
        var scene = new BABYLON.Scene(engine);


        // Add lights to the scene
        new BABYLON.HemisphericLight("HemiLight", new BABYLON.Vector3(0, 0, -10), scene);

        light = new BABYLON.PointLight("light", new BABYLON.Vector3(0, 0, 0), scene);
        light.intensity = 0.8;
        lightOfCamera = new BABYLON.PointLight("lightOfCamera", new BABYLON.Vector3(0, 0, 0), scene);
        lightOfCamera.diffuse = new BABYLON.Color3(1, 1, 1);
        lightOfCamera.specular = new BABYLON.Color3(0.8, 0.8, 0.2);
        spotLight = new BABYLON.SpotLight("spotLight", new BABYLON.Vector3(-10, 0, 0), new BABYLON.Vector3(0, 0, 0), Math.PI / 4, 20, scene);
        spotLight.diffuse = new BABYLON.Color3(1, 0, 0);
        spotLight.specular = new BABYLON.Color3(1, 0, 0);
        spotLight.intensity = 0.8;


        var skyboxMaterial = new BABYLON.StandardMaterial("skyBox", scene);
        skyboxMaterial.backFaceCulling = false;
        skyboxMaterial.reflectionTexture = new BABYLON.CubeTexture("https://www.babylonjs.com/assets/skybox/nebula", scene);
        skyboxMaterial.reflectionTexture.coordinatesMode = BABYLON.Texture.SKYBOX_MODE;
        skyboxMaterial.diffuseColor = new BABYLON.Color3(0, 0, 0);
        skyboxMaterial.specularColor = new BABYLON.Color3(0, 0, 0);
        skyboxMaterial.disableLighting = true;
        var skybox = BABYLON.Mesh.CreateBox("skyBox", 1500.0, scene);
        skybox.material = skyboxMaterial;

        var fountain = BABYLON.Mesh.CreateBox("foutain", 0.01, scene);
        fountain.visibility = 0;

        // Create a particle system
        var particleSystem;

        var createParticleSystem = function () {
            if (particleSystem) {
                particleSystem.dispose();
            }

            if (BABYLON.GPUParticleSystem.IsSupported) {
                particleSystem = new BABYLON.GPUParticleSystem("particles", { capacity: 50000 }, scene);
                particleSystem.activeParticleCount = 1500;
                particleSystem.manualEmitCount = particleSystem.activeParticleCount;

            } else {
                particleSystem = new BABYLON.ParticleSystem("particles", 2500, scene);
                particleSystem.manualEmitCount = particleSystem.getCapacity();
            }


            particleSystem.minEmitBox = new BABYLON.Vector3(-50, -50, -50); // Starting all from
            particleSystem.maxEmitBox = new BABYLON.Vector3(50, 50, 50); // To..
            particleSystem.particleTexture = new BABYLON.Texture("https://raw.githubusercontent.com/aWeirdo/Babylon.js/master/smoke_15.png", scene);
            particleSystem.emitter = fountain;

            particleSystem.color1 = new BABYLON.Color4(0.8, 0.8, 0.8, 0.1);
            particleSystem.color2 = new BABYLON.Color4(.95, .95, .95, 0.15);
            particleSystem.colorDead = new BABYLON.Color4(0.9, 0.9, 0.9, 0.1);
            particleSystem.minSize = 3.5;
            particleSystem.maxSize = 5.0;
            particleSystem.minLifeTime = Number.MAX_SAFE_INTEGER;
            particleSystem.emitRate = 50000;
            particleSystem.blendMode = BABYLON.ParticleSystem.BLENDMODE_STANDARD;
            particleSystem.gravity = new BABYLON.Vector3(0, 0, 0);
            particleSystem.direction1 = new BABYLON.Vector3(0, 0, 0);
            particleSystem.direction2 = new BABYLON.Vector3(0, 0, 0);
            particleSystem.minAngularSpeed = -2;
            particleSystem.maxAngularSpeed = 2;
            particleSystem.minEmitPower = .5;
            particleSystem.maxEmitPower = 1;
            particleSystem.updateSpeed = 0.005;
        }

        createParticleSystem();



        // SPS creation

        var s = BABYLON.MeshBuilder.CreateSphere("s", { diameter: 3, segments: 12 }, scene);
        var SPS = new BABYLON.SolidParticleSystem('SPS', scene);

        SPS.addShape(s, 30);
        var mesh = SPS.buildMesh();
        mesh.material = function () {
            var mat = new BABYLON.StandardMaterial("mat", scene);
            //mat.backFaceCulling = false;
            mat.alpha = 0.2;

            return mat;
        }();

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
        var scale;
        SPS.recycleParticle = function (particle) {
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
            particle.age = Math.random();
        };

        // update : will be called by setParticles()
        SPS.updateParticle = function (particle) {
            // some physics here 
            if (particle.position.y < 0 || particle.age < 0) {
                this.recycleParticle(particle);
            }
            // particle.velocity.y += gravity;                         // apply gravity to y
            (particle.position).addInPlace(particle.velocity);      // update particle new position
            particle.position.y += speed / 2;

            particle.age -= 0.01;

        };


        // init all particle values and set them once to apply textures, colors, etc
        SPS.initParticles();
        SPS.setParticles();

        // Tuning : 
        SPS.computeParticleColor = false;
        SPS.computeParticleTexture = false;
        SPS.computeParticleRotation = false;


        var alpha = 0;

        scene.registerBeforeRender(function () {
            SPS.setParticles();

            lightOfCamera.position = camera.position;

            alpha += 0.01;
            light.intensity = Math.cos(alpha);

            particleSystem.activeParticleCount;
        });

        return scene;
    };

    /******* End of the create scene function ******/
    var origin = { x: 0, y: 0, z: 0 };
    var viewport = camera.viewport.toGlobal(camera.getEngine());
    var $mark = $('.mark');

    engine.runRenderLoop(function () { // Register a render loop to repeatedly render the scene
        scene.render();
        var test = texts[0];
        if (!test) return;
        var transformationMatrix = camera.getViewMatrix().multiply(camera.getProjectionMatrix());
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

    function getRandomInt() {
        var r = getRandomNegativeInt() > 4 ? 1 : -1;
        return getRandomNegativeInt() * r;
    };
    function getRandomNegativeInt() {
        return Math.round(Math.random() * 10);
    };
    function addText(text, x, y, z) {
        var outputplaneTexture = new BABYLON.DynamicTexture("dynamic texture", { width: 500, height: 80 }, scene, true);
        // outputplaneTexture.hasAlpha = true;
        outputplaneTexture.drawText(text, 0, 60, "60px verdana", "white", true, true);

        var outputplane = BABYLON.MeshBuilder.CreatePlane("outputplane", { width: 5, height: 1 }, scene);
        outputplane.billboardMode = BABYLON.AbstractMesh.BILLBOARDMODE_ALL;
        outputplane.position = new BABYLON.Vector3(x, y, z);
        outputplane.scaling.y = 1;

        outputplane.material = new BABYLON.StandardMaterial("outputplane", scene);
        outputplane.material.diffuseTexture = outputplaneTexture;
        outputplane.material.specularColor = new BABYLON.Color3(0, 0, 0);
        outputplane.material.emissiveColor = new BABYLON.Color3(1, 1, 1);
        outputplane.material.backFaceCulling = false;

        outputplane._message = text;
        texts.push(outputplane);
    };

    var images = [];
    function addImage(image, x, y, z) {
        var outputplaneTexture = new BABYLON.Texture.CreateFromBase64String(image, 'image-' + (images.length + 1), scene);
        // outputplaneTexture.hasAlpha = true;

        var outputplane = BABYLON.MeshBuilder.CreatePlane("outputplane", { width: 5, height: 5 }, scene);
        outputplane.billboardMode = BABYLON.AbstractMesh.BILLBOARDMODE_ALL;
        outputplane.position = new BABYLON.Vector3(x, y, z);
        outputplane.scaling.y = 1;

        outputplane.material = new BABYLON.StandardMaterial("outputplane", scene);
        outputplane.material.diffuseTexture = outputplaneTexture;
        outputplane.material.specularColor = new BABYLON.Color3(0, 0, 0);
        outputplane.material.emissiveColor = new BABYLON.Color3(1, 1, 1);
        outputplane.material.backFaceCulling = false;

        images.push(image);
    };

    $('.js-sent').on('click', function () {
        var $input = $('.js-input');
        var text = $input.val();
        if (!text) return;

        $input.val('').focus();

        addText(text, getRandomInt() * 2, getRandomInt(), -3 + getRandomNegativeInt());


        // mock response
        window.setTimeout(function () {
            addText(text + '! ' + text + '! ' + text + '!!!', getRandomInt() * 2, getRandomInt(), -3 + getRandomNegativeInt());
        }, 700);
    });


    $('#js-upload').on('change', handleFiles);

    function handleFiles($ele) {
        var image = $ele.currentTarget.files[0];
        if (!image) return;

        var FR = new FileReader();

        FR.addEventListener("load", function (e) {
            addImage(e.target.result, getRandomInt() * 2, getRandomInt(), -3 + getRandomNegativeInt());
        });

        FR.readAsDataURL(image);


        $.get('/uploadImage').done(function (resp) {
            console.log(resp);
        }).fail(function (err) {
            console.log(err);
        });
    };

    window.addEventListener("resize", function () { // Watch for browser/canvas resize events
        engine.resize();
    });
}();