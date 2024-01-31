import * as THREE from 'three';
import * as OBC from 'openbim-components';
import * as WEBIFC from 'web-ifc';

/*
    const container = document.getElementById('container');

    const components = new OBC.Components();

    components.scene = new OBC.SimpleScene(components);
    components.renderer = new OBC.PostproductionRenderer(components, container);
    components.camera = new OBC.SimpleCamera(components);
    components.raycaster = new OBC.SimpleRaycaster(components);

    components.init();

    components.renderer.postproduction.enabled = true;

    const scene = components.scene.get();

    components.camera.controls.setLookAt(12, 6, 8, 0, 0, -10);

    components.scene.setup();

    const grid = new OBC.SimpleGrid(components, new THREE.Color(0x666666));
    const customEffects = components.renderer.postproduction.customEffects;
    customEffects.excludedMeshes.push(grid.get());

    let fragments = new OBC.FragmentManager(components);
    let fragmentIfcLoader = new OBC.FragmentIfcLoader(components);

    const mainToolbar = new OBC.Toolbar(components, { name: 'Main Toolbar', position: 'bottom' });
    components.ui.addToolbar(mainToolbar);
    const ifcButton = fragmentIfcLoader.uiElement.get("main");
    mainToolbar.addChild(ifcButton);

    await fragmentIfcLoader.setup()

    const excludedCats = [
        WEBIFC.IFCTENDONANCHOR,
        WEBIFC.IFCREINFORCINGBAR,
        WEBIFC.IFCREINFORCINGELEMENT,
    ];

    for(const cat of excludedCats) {
        fragmentIfcLoader.settings.excludedCategories.add(cat);
    }

    fragmentIfcLoader.settings.webIfc.COORDINATE_TO_ORIGIN = true;
    fragmentIfcLoader.settings.webIfc.OPTIMIZE_PROFILES = true;

    async function loadIfcAsFragments() {
        const file = await fetch('../../../resources/small.ifc');
        const data = await file.arrayBuffer();
        const buffer = new Uint8Array(data);
        const model = await fragmentIfcLoader.load(buffer, "example");
        scene.add(model);
    }

    async function exportFragments() {
        if (!fragments.groups.length) return;
        const group = fragments.groups[0];
        const data = fragments.export(group);
        const blob = new Blob([data]);
        const fragmentFile = new File([blob], 'small.frag');

        const files = [];
        files.push(fragmentFile);
        files.push(new File([JSON.stringify(group.properties)], 'small.json'));
        const result = await downloadZip(files).blob();
        result.name = 'example';
        download(result);
    }

    function download(file) {
        const link = document.createElement('a');
        link.href = URL.createObjectURL(file);
        link.download = file.name;
        document.body.appendChild(link);
        link.click();
        link.remove();
    }

    function disposeFragments() {
        fragments.dispose();
    }

    const stats = new Stats();
    stats.showPanel(2);
    document.body.append(stats.dom);
    stats.dom.style.left = '0px';
    const renderer = components.renderer;
    renderer.onBeforeUpdate.add(() => stats.begin());
    renderer.onAfterUpdate.add(() => stats.end());

    const settings = {
        loadFragments: () => loadIfcAsFragments(),
        exportFragments: () => exportFragments(),
        disposeFragments: () => disposeFragments(),
    };

    const gui = new dat.GUI();

    gui.add(settings, 'loadFragments').name('Import fragments');
    gui.add(settings, 'exportFragments').name('Export fragments');
    gui.add(settings, 'disposeFragments').name('Dispose fragments');

    fragmentIfcLoader.onIfcLoaded.add((model) => {

        console.log(model);
    });
*/

function render() {
    const container: HTMLElement | null = document.getElementById('container');
    const components = new OBC.Components();

    components.scene = new OBC.SimpleScene(components);
    return;
/**
    components.renderer = new OBC.PostproductionRenderer(components, container);
    components.camera = new OBC.SimpleCamera(components);
    components.raycaster = new OBC.SimpleRaycaster(components);

    components.init();

    components.renderer.postproduction.enabled = true;

    const scene = components.scene.get();

    components.camera.controls.setLookAt(12, 6, 8, 0, 0, -10);

    components.scene.setup();

    const grid = new OBC.SimpleGrid(components, new THREE.Color(0x666666));
    const customEffects = components.renderer.postproduction.customEffects;
    customEffects.excludedMeshes.push(grid.get());
 */
};

export { render };