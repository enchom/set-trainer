const deepCopy = x => JSON.parse(JSON.stringify(x));

const randomInteger = (low, high) => {
    return Math.floor(Math.random() * (high - low + 1) + low);
}

function setCharAt(str, index, chr) {
    return str.substring(0, index) + chr + str.substring(index + 1);
}

function randomCard() {
    var res = "";
    for (var i = 0; i < 4; i++) {
        res += randomInteger(0, 2).toString();
    }
    return res
}

function shuffleArray(orig) {
    const array = deepCopy(orig);
    for (var i = array.length - 1; i > 0; i--) {
        var j = randomInteger(0, i);
        var temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
    return array;
}

export {deepCopy, randomInteger, randomCard, setCharAt, shuffleArray}