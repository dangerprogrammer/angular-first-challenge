const ifcLoader = new IFCLoader();
ifcLoader.ifcManager.setWasmPath("assets/");

const mainContent = document.querySelector('.main-content');
const dragArchive = document.querySelector('.drag-archive');
const input = document.getElementById("file-input");
const headerTitle = document.querySelector('#header-title');
const titleDesc = document.querySelector('#desc-title');
const originLeftSidebar = document.querySelector('left-sidebar');
const leftSidebar = document.querySelector('.left-sidebar');

let isLoading = !1;
addEventListener("dragover", ev => {
    ev.preventDefault();

    if (!isLoading) dragArchive.classList.add("drag-hover");
});

addEventListener("dragend", ev => dragArchive.classList.remove("drag-hover"));

addEventListener("mouseout", () => dragArchive.classList.remove("drag-hover"));

addEventListener("drop", ev => {
    ev.preventDefault();

    dragArchive.classList.remove("drag-hover");

    const file = ev.dataTransfer.files[0];

    if (!isLoading) renderFile(file);
});

input.addEventListener("change", changed => {
    const file = changed.target.files[0];

    renderFile(file);
}, false);

function renderFile(file) {
    const typeFile = ".ifc";
    const isError = !file || !file.name.endsWith(typeFile);

    if (isError) {
        mainContent.classList.remove('no-archive');
        mainContent.classList.remove('has-archive');
        mainContent.classList.remove('loading-archive');
        mainContent.classList.add('error-archive');

        const errorContainer = document.querySelector('.error');
        const timingSeconds = 3;
        errorContainer.innerText = `Erro! Reiniciando em ${timingSeconds}s...`;
        for (let ind = 1; ind <= timingSeconds; ind++) {
            setTimeout(() => {
                errorContainer.innerText = `Erro! Reiniciando em ${timingSeconds - ind}s...`;
            }, 1e3 * ind);
        };
        setTimeout(() => location.reload(), timingSeconds * 1e3);
    } else {
        const fileName = file.name.slice(0, file.name.length - typeFile.length),
            descTitle = file.lastModifiedDate.toLocaleString().split(', ').join(' às ');

        isLoading = !0;
        mainContent.classList.add("loading-archive");
        
        titleDesc.innerText = `Última modificação: ${descTitle}`;
        headerTitle.innerText = fileName;

        var ifcURL = URL.createObjectURL(file);

        ifcLoader.load(ifcURL, loadFile);
    };

    function loadFile(ifcModel) {

        scene.add(ifcModel);

        isLoading = !1;
        
        ifcModel.material.forEach(generateMesh);

        originLeftSidebar.classList.remove("hidden");
        mainContent.classList.remove("loading-archive");
        mainContent.classList.remove("no-archive");
        mainContent.classList.add("has-archive");
    };

    function generateMesh(mesh, ind) {
        const mainMesh = createElement('div', { className: 'main-mesh' });
        const meshTitle = createElement('div', { className: 'mesh-title', innerText: `Mesh ${ind + 1}`});
        const meshContainer = createElement('div', { className: 'mesh-container' });
        const innerMesh = createElement('div', { className: 'inner-mesh', innerText: mesh.uuid });

        meshTitle.addEventListener("click", () => mainMesh.classList.toggle("active"), false);

        meshContainer.append(innerMesh);
        mainMesh.append(meshTitle, meshContainer);
        leftSidebar.appendChild(mainMesh);
        console.log(mesh);
    };
};

function createElement(elem, attr) {
    const element = document.createElement(elem);

    if (attr) for (const att in attr) element[att] = attr[att];

    return element;
};