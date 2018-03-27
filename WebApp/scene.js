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
        return camera;
    };

    /******* Add the create scene function ******/
    function createScene() {

        // Create the scene space
        var scene = new BABYLON.Scene(engine);


        // Add lights to the scene
        var light1 = new BABYLON.HemisphericLight("light1", new BABYLON.Vector3(1, 1, 0), scene);
        var light2 = new BABYLON.PointLight("light2", new BABYLON.Vector3(0, 1, -1), scene);

        var skyboxMaterial = new BABYLON.StandardMaterial("skyBox", scene);
        skyboxMaterial.backFaceCulling = false;
        skyboxMaterial.reflectionTexture = new BABYLON.CubeTexture("https://www.babylonjs.com/assets/skybox/nebula", scene);
        skyboxMaterial.reflectionTexture.coordinatesMode = BABYLON.Texture.SKYBOX_MODE;
        skyboxMaterial.diffuseColor = new BABYLON.Color3(0, 0, 0);
        skyboxMaterial.specularColor = new BABYLON.Color3(0, 0, 0);
        skyboxMaterial.disableLighting = true;
        var skybox = BABYLON.Mesh.CreateBox("skyBox", 1500.0, scene);
        skybox.material = skyboxMaterial;

        var fountain = BABYLON.Mesh.CreateBox("foutain", 0.1, scene);
        fountain.visibility = 0.1;
        fountain.isVisible = false;

        // Create a particle system
        var particleSystem;
        var useGPUVersion = true;

        var createNewSystem = function () {
            if (particleSystem) {
                particleSystem.dispose();
            }

            if (useGPUVersion && BABYLON.GPUParticleSystem.IsSupported) {
                particleSystem = new BABYLON.GPUParticleSystem("particles", { capacity: 1000000 }, scene);
                particleSystem.activeParticleCount = 200000;
                particleSystem.emitRate = 1000;
            } else {
                particleSystem = new BABYLON.ParticleSystem("particles", 50000, scene);
                particleSystem.emitRate = 10000;
            }

            particleSystem.particleEmitterType = new BABYLON.SphereParticleEmitter(1);
            particleSystem.particleTexture = new BABYLON.Texture("https://www.babylonjs-playground.com/textures/flare.png", scene);
            particleSystem.maxLifeTime = 10;
            particleSystem.minSize = 0.01;
            particleSystem.maxSize = 0.1;
            particleSystem.emitter = fountain;

            particleSystem.start();
        }

        createNewSystem();

        for (var i = 0; i < 10; i++) {
            addText('3D space text ' + i, getRandomInt() * 2, getRandomInt(), -3 + getRandomNegativeInt());
        }

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



        var alpha = 0;
        var moveEmitter = true;
        var rotateEmitter = true;

        scene.registerBeforeRender(function () {
            if (moveEmitter) {
                fountain.position.x = 5 * Math.cos(alpha);
                fountain.position.z = 5 * Math.sin(alpha);
            }

            if (rotateEmitter) {
                fountain.rotation.x += 0.01;
            }

            alpha += 0.01;

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


    window.addEventListener("resize", function () { // Watch for browser/canvas resize events
        engine.resize();
    });
}();