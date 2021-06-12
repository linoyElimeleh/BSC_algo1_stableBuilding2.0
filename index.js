// linoy elimeleh - 319122610
// mor revivo - 318572716

const maxTowerHeight = (height, width, length) => {
    const boxes = [];
    for (let i = 0; i < height.length; i++) boxes.push(i);

    boxes.sort((a, b) => {
        if (width[a] > width[b] && length[a] > length[b]) return -1;
        else return 1;
    });

    const mth = Array(boxes.length).fill(-1);
    const maxBoxes = Array(boxes.length).fill(null);

    for(let i = 0; i < boxes.length; i++) {
        let val = 0;

        let maxBox;
        for(let j = 0; j < i; j++) {
            if(width[boxes[i]] < width[boxes[j]] && length[boxes[i]] < length[boxes[j]]) {
                if (val < mth[boxes[j]]) {
                    maxBox = boxes[j];
                    val = mth[boxes[j]];
                }
            }
        }
        mth[boxes[i]] = val + height[boxes[i]];
        maxBoxes[boxes[i]] = maxBox;
    }

    let maxMthVal = 0;
    let topBox;

    for (let i = 0; i < mth.length; i++) {
        if (mth[boxes[i]] > maxMthVal) {
            maxMthVal = mth[boxes[i]];
            topBox = boxes[i];
        }
    }

    let maxTower = [topBox];

    let nextBox = maxBoxes[topBox];
    while (nextBox) {
        maxTower.push(nextBox);
        nextBox = maxBoxes[nextBox];
    }

    return { maxMthVal, maxTower };
}

const main = () => {
    let BOXES_NUM = 20;

    let width = [BOXES_NUM];
    let length = [BOXES_NUM];
    let height = [BOXES_NUM];

    for (let i = 0; i < BOXES_NUM; i++) {
        length[i] = randomInteger(1, 200);
        width[i]  = randomInteger(1, 200);
        height[i] = randomInteger(1, 200);
    }

    let result = maxTowerHeight(height, width, length);

    console.log("Max tower height for 20 boxes is " + result.maxMthVal);
    console.log('The max tower order: ');
    printBoxesArray(result.maxTower, height, width, length);

    BOXES_NUM = 30;

    for (let i = 0; i < BOXES_NUM; i++) {
        length[i] = randomInteger(1, 200);
        width[i]  = randomInteger(1, 200);
        height[i] = randomInteger(1, 200);
    }

    result = maxTowerHeight(height, width, length);

    console.log("Max tower height for 30 boxes is " + result.maxMthVal);
    console.log('The max tower order: ');
    printBoxesArray(result.maxTower, height, width, length);
}

const printBoxesArray = (boxesArr, height, width, length) => {
    boxesArr.map(i => {
        console.log('(' + length[i] + ', ' + width[i] + ', H: ' + height[i] + ')');
    })
}

const randomInteger = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

main();