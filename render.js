// Sets up the IFC loading
console.log("render!");
const ifcLoader = new IFCLoader();
ifcLoader.ifcManager.setWasmPath("assets/");
const mainContent = document.querySelector('.main-content');
const input = document.getElementById("file-input");
input.addEventListener(
    "change",
    (changed) => {
        const file = changed.target.files[0];
        mainContent.classList.add("loading-archive");
        var ifcURL = URL.createObjectURL(file);
        ifcLoader.load(
            ifcURL,
            (ifcModel) => {
                scene.add(ifcModel);
                console.log(ifcModel);
                mainContent.classList.remove("loading-archive");
                mainContent.classList.remove("no-archive");
                mainContent.classList.add("has-archive");

            });
    },
    false
);