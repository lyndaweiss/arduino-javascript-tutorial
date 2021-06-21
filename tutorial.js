(function() {
  const pages = {
    overview: { next: "requirements", prev: "" },
    requirements: { next: "installation", prev: "overview" },
    installation: { next: "client", prev: "requirements" },
    client: { next: "server", prev: "installation" },
    server: { next: "arduino", prev: "client" },
    arduino: { next: "circuit", prev: "server" },
    circuit: { next: "running", prev: "arduino" },
    running: { next: "", prev: "circuit" },
  };
  const contentContainer = document.querySelector(".content-container");
  const articleContainer = document.querySelector(".content-container article");

  let req = new XMLHttpRequest();
  req.addEventListener("load", () => {
    if (req.readyState === XMLHttpRequest.DONE && req.status === 200) {
      articleContainer.textContent = "";
      articleContainer.insertAdjacentHTML("afterbegin", req.responseText);
      window.Prism.highlightAll();
    } else if (req.readyState === XMLHttpRequest.DONE && req.status === 404) {
      contentContainer.textContent = "";
      contentContainer.insertAdjacentHTML("afterbegin", "404 - Not found");
    }
  });

  function getContents(name) {
    req.open("GET", `pages/${name}.html`);
    req.send();
  }

  function getTargetFileBasename(fileName) {
    const lastSlashIndex = fileName.lastIndexOf("/");
    return fileName.slice(lastSlashIndex + 1);
  }

  function getTargetFileName(target) {
    let targetFileName = target.pathname;
    if (targetFileName.endsWith("/")) {
      targetFileName += "overview";
    }
    return targetFileName;
  }

  const nextLink = document.querySelector("#next");
  const prevLink = document.querySelector("#prev");
  function setNextPrev(page) {
    const nextPage = pages[page]["next"];
    const prevPage = pages[page]["prev"];
    nextLink.href = nextPage;
    nextLink.textContent =
      nextPage !== "" ? `${titleCase(nextPage)} \u2192` : nextPage;
    prevLink.href = prevPage;
    prevLink.textContent =
      prevPage !== "" ? `\u2190 ${titleCase(prevPage)}` : prevPage;
  }

  function titleCase(str) {
    return str.charAt(0).toUpperCase() + str.substring(1);
  }

  // Event Listeners
  if (window.innerWidth <= 768) {
    const tableOfContentsContainer = document.querySelector(".toc-container");
    const navMenu = document.querySelector(".toc");

    tableOfContentsContainer.addEventListener("click", (event) => {
      navMenu.classList.toggle("active");
    });
  }

  const sectionLinks = document.querySelectorAll(".toc li ul li a, footer a");
  sectionLinks.forEach((link) => {
    link.addEventListener("click", (event) => {
      event.preventDefault();

      const targetFileName = getTargetFileName(event.target);
      getContents(targetFileName);

      setNextPrev(getTargetFileBasename(targetFileName));
      history.pushState({}, "", targetFileName);

      contentContainer.scroll(0, 0);
    });
  });

  window.addEventListener("beforeunload", () => {
    localStorage.setItem("contentScroll", contentContainer.scrollTop);
  });

  window.addEventListener("load", (event) => {
    const targetFileName = getTargetFileName(window.location);

    getContents(targetFileName);

    setNextPrev(getTargetFileBasename(targetFileName));

    history.pushState({}, "", targetFileName);
  });

  window.addEventListener("popstate", (event) => {
    const targetFileName = getTargetFileName(event.target.location);
    getContents(targetFileName);
    setNextPrev(getTargetFileBasename(targetFileName));
  });
}());
