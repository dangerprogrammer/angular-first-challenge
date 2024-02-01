const ifcLoader = new IFCLoader();
ifcLoader.ifcManager.setWasmPath("assets/");

const mainContent = document.querySelector('.main-content');
const dragArchive = document.querySelector('.drag-archive');
const input = document.getElementById("file-input");
const headerTitle = document.querySelector('.app-header');

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
    isLoading = !0;
    mainContent.classList.add("loading-archive");

    const isError = !file.name.endsWith(".ifc");

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
        var ifcURL = URL.createObjectURL(file);

        ifcLoader.load(ifcURL, ifcModel => {
            scene.add(ifcModel);

            isLoading = !1;
            console.log(ifcModel);
            console.log(file);
            headerTitle.innerText = 'Opa';
            mainContent.classList.remove("loading-archive");
            mainContent.classList.remove("no-archive");
            mainContent.classList.add("has-archive");

        });
    };
};