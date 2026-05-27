let download_button = document.querySelector("#download button");
let button_icon = download_button.querySelector("#download button span");

download_button.onclick = async () => {
    console.log("download button clicked");
    
    // UI state modification: Enable loading indicator
    download_button.click = true;
    button_icon.classList.add("spin-icon");

    try {
        // Fetch the file data into memory
        const response = await fetch('assets/Kids_Classium.apk');
        if (!response.ok) throw new Error('Network response was not ok');
        
        const blob = await response.blob();
        
        // Create a local URL for the downloaded blob object
        const blobUrl = window.URL.createObjectURL(blob);
        
        const link = document.createElement('a'); /*anchor element is used to give link to another website*/
        link.href = blobUrl;
        link.download = 'Kids Classium.apk';
        
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        
        // Clear the object URL from memory
        window.URL.revokeObjectURL(blobUrl);
    } catch (error) {
        console.error('Download failed:', error);
    } finally {
        // UI state modification: Reset button
        download_button.click = false;
        button_icon.classList.remove("spin-icon");
    }
};