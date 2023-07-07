function startCodeCopy() {
  const copyButtons = document.querySelectorAll('.copy-button');
  const copyCodeContainers = document.querySelectorAll('.can-copy');

  const copyCodeToClipboard = async index => {
    const copiedCode = copyCodeContainers[index].textContent;

    try {
      await navigator.clipboard.writeText(copiedCode);
      console.log('copied');
    } catch (error) {
      console.log(error);
    }
  }
  
  copyButtons.forEach((btn, index) => btn.addEventListener('click', async () => {
    copyCodeToClipboard(index);
  }));
}

export default startCodeCopy;