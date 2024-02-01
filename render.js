const ifcLoader = new IFCLoader();
ifcLoader.ifcManager.setWasmPath("assets/");

const dragArchive = document.querySelector('.drag-archive');

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


const input = document.getElementById("file-input");
input.addEventListener("change", changed => {
    const file = changed.target.files[0];
    
    renderFile(file);
}, false);

function renderFile(file) {
    isLoading = !0;
    mainContent.classList.add("loading-archive");
    var ifcURL = URL.createObjectURL(file);

    ifcLoader.load(ifcURL, ifcModel => {
        scene.add(ifcModel);
        
        isLoading = !1;
        console.log(ifcModel);
        mainContent.classList.remove("loading-archive");
        mainContent.classList.remove("no-archive");
        mainContent.classList.add("has-archive");

    });
};