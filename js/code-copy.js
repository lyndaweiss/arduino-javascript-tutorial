function startCodeCopy() {
  const copyButtons = document.querySelectorAll('.copy-button');
  const copyCodeContainers = document.querySelectorAll('.can-copy');

  let copyMessage = document.createElement('span');
  const errorProps = {textContent: 'Copy denied!', style: `color: red; font-weight: bold`};
  const successProps = {textContent: 'Copied!', style: `color: green; font-weight: bold`};

  const hideCopyMessage = (btn, messageNode) => btn.removeChild(messageNode); 
  const showCopyMessage = btn => {return btn.appendChild(copyMessage);}
  const handleCopyMessage = (btn, messageType) => {
    // Assign properties to message element
    if (messageType === 'error') {
      Object.assign(copyMessage, errorProps);
    } else if (messageType === 'success') {
      Object.assign(copyMessage, successProps);
    }
    // Display message
    const messageNode = showCopyMessage(btn);
    // Hide message after delay
    setTimeout(() => hideCopyMessage(btn, messageNode), 1500);
  }

  const copyCodeToClipboard = async index => {
    const copiedCode = copyCodeContainers[index].textContent;

    try {
      await navigator.clipboard.writeText(copiedCode);
      handleCopyMessage(copyButtons[index], 'success');
    } catch (error) {
      handleCopyMessage(copyButtons[index], 'error');
    }
  }
  
  copyButtons.forEach((btn, index) => btn.addEventListener('click', async () => {
    copyCodeToClipboard(index);
  }));
}

export default startCodeCopy;