const ifcLoader = new IFCLoader();
ifcLoader.ifcManager.setWasmPath("assets/");

const mainContent = document.querySelector('.main-content');
const dragArchive = document.querySelector('.drag-archive');
const input = document.getElementById("file-input");
const headerTitle = document.querySelector('#header-title');
const titleDesc = document.querySelector('#desc-title');
const originLeftSidebar = document.querySelector('left-sidebar');
const leftSidebar = document.querySelector('.left-sidebar');

Number.prototype.toFixed = function (chars) {
    return Math.round(this * (10 ** chars)) / (10 ** chars);
};

let isLoading = !1;
addEventListener("dragover", ev => {
    ev.preventDefault();

    if (!isLoading) dragArchive.classList.add("drag-hover");
});

addEventListener("dragend", ev => dragArchive.classList.remove("drag-hover"));

addEventListener("mouseout", () => dragArchive.classList.remove("drag-hover"));

mainContent.addEventListener("drop", ev => {
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
        const mainMesh = createElement('div', { className: 'main-mesh', id: `mesh-${ind}` });
        const meshTitle = createElement('div', { className: 'mesh-title' });
        const meshMainTitle = createElement('span', { innerText: `Mesh ${ind + 1}` });
        const meshTitleIcon = createElement('div', { className: 'title-icon', innerHTML: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="48" d="M184 112l144 144-144 144"/></svg>' });
        const meshContainer = createElement('div', { className: 'mesh-container' });
        const meshID = createElement('div', { className: 'inner-mesh mesh-id' });
        const meshIDTitle = createElement('div', { className: 'inner-mesh-title', innerText: 'ID: ' });
        const meshIDContent = createElement('div', { className: 'inner-mesh-content', innerText: mesh.id });
        const meshColor = createElement('div', { className: 'inner-mesh mesh-color' });
        const meshColorTitle = createElement('div', { className: 'inner-mesh-title', innerText: 'Color: ' });
        const meshColorContent = createElement('div', { className: 'inner-mesh-content' });

        const { color: { r, g, b }, opacity } = mesh, RGB = `rgba(${(r * 255).toFixed(0)}, ${(g * 255).toFixed(0)}, ${(b * 255).toFixed(0)}, ${opacity.toFixed(2)})`, iRGB = (r + g + b) < (3 / 2) ? 'white' : 'black';

        if (ind == 0) mainMesh.classList.add("active");
        meshTitle.addEventListener("click", () => toggleActiveMesh(mainMesh), false);

        meshColor.style.setProperty("--mesh-bg-color", RGB);
        meshColor.style.setProperty("--mesh-color", iRGB);

        meshColorContent.innerText = RGB;

        meshTitle.append(meshMainTitle, meshTitleIcon);
        meshColor.append(meshColorTitle, meshColorContent);
        meshID.append(meshIDTitle, meshIDContent);
        meshContainer.append(meshID, meshColor);
        mainMesh.append(meshTitle, meshContainer);
        leftSidebar.appendChild(mainMesh);
    };
};

function toggleActiveMesh(mainMesh) {
    const { parentElement, id: mainID } = mainMesh, { children: childrens } = parentElement;

    mainMesh.classList.toggle("active");

    const siblings = [...childrens].filter(({ id }) => id !== mainID);

    siblings.forEach(sibling => sibling.classList.remove("active"));
};

function createElement(elem, attr) {
    const element = document.createElement(elem);

    if (attr) for (const att in attr) element[att] = attr[att];

    return element;
};