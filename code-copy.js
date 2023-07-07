function startCodeCopy() {
  const copyButtons = document.querySelectorAll('.copy-button');
  const copyCodeContainers = document.querySelectorAll('.can-copy');
  
  copyButtons.forEach((btn, index) => btn.addEventListener('click', () => {
    console.log(`Clicked button ${index}`)
  }));
}

export default startCodeCopy;