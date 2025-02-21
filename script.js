const csvUrl = 'data.csv';
let blocksData = [];
let currentBlockIndex = 0;

async function fetchCsvData(url) {
    const response = await fetch(url);
    const data = await response.text();
    return data;
}

function parseCSV(data) {
    const rows = data.trim().split('\n').slice(1); // Skip header row
    return rows.map(row => {
        const cols = row.split(',');
        
        // Log cols to debug
        console.log(cols);
        
        if (cols.length < 7) {
            console.warn('Skipping row due to insufficient columns:', row);
            return null;
        }
        
        return {
            imageUrl: cols[1].trim(),
            backText: cols[6].trim().replace(/"/g, ''), // Adjust index based on CSV structure
            linkUrl: cols[4].trim() // Adjust index based on CSV structure
        };
    }).filter(row => row !== null); // Filter out any null entries
}

function createBlockElement(block) {
    const blockElement = document.createElement('a');
    blockElement.classList.add('block');
    blockElement.href = block.linkUrl;
    
    blockElement.innerHTML = `
        <div class="block-front" style="background-image: url('${block.imageUrl}');"></div>
        <div class="block-back">
            <p>${block.backText}</p>
        </div>
        <div class="block-sides" style="background-image: url('${block.imageUrl}');"></div>
    `;
    return blockElement;
}

function loadVisibleBlocks() {
    const blocksContainer = document.getElementById('blocks-container');
    if (!blocksContainer) {
        console.error('Blocks container not found.');
        return;
    }

    blocksContainer.innerHTML = ''; // Clear current blocks

    const start = currentBlockIndex;
    const end = Math.min(start + 3, blocksData.length);

    for (let i = start; i < end; i++) {
        const blockElement = createBlockElement(blocksData[i]);
        blockElement.classList.add('visible'); // Make the block visible
        blocksContainer.appendChild(blockElement);
    }
}

function prevBlock() {
    currentBlockIndex = (currentBlockIndex > 0) ? currentBlockIndex - 3 : blocksData.length - 3;
    loadVisibleBlocks();
}

function nextBlock() {
    currentBlockIndex = (currentBlockIndex < blocksData.length - 3) ? currentBlockIndex + 3 : 0;
    loadVisibleBlocks();
}

async function init() {
    const csvData = await fetchCsvData(csvUrl);
    blocksData = parseCSV(csvData);
    loadVisibleBlocks();
}

init();

let currentBlock = 0;
let autoScrollInterval;

function updateBlocks() {
    const blocksContainer = document.querySelector('.blocks-container');
    
    if (!blocksContainer) {
        console.error('Blocks container not found.');
        return;
    }
    
    const block = blocksContainer.querySelector('.block');
    if (!block) {
        console.error('Block element not found in the container.');
        return;
    }
    
    const blockWidth = block.offsetWidth;
    blocksContainer.style.transform = `translateX(${-currentBlock * blockWidth}px)`;
}

function prevBlock() {
    const blocks = document.querySelectorAll('.block');
    currentBlock = (currentBlock > 0) ? currentBlock - 1 : blocks.length - 1;
    updateBlocks();
}

function nextBlock() {
    const blocks = document.querySelectorAll('.block');
    currentBlock = (currentBlock < blocks.length - 1) ? currentBlock + 1 : 0;
    updateBlocks();
}

function startAutoScroll() {
    autoScrollInterval = setInterval(nextBlock, 3000);
}

function stopAutoScroll() {
    clearInterval(autoScrollInterval);
}

const blocksContainer = document.querySelector('.blocks-container');
blocksContainer.addEventListener('mouseover', stopAutoScroll);
blocksContainer.addEventListener('mouseout', startAutoScroll);

startAutoScroll(); // Start auto-scroll on page load
