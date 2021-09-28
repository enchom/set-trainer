import {deepCopy, setCharAt, randomInteger} from './Util';

const fillValue = (v1, v2) => {
    if (v1 === v2) return v1;

    if (v1 !== '0' && v2 !== '0') return '0';
    if (v1 !== '1' && v2 !== '1') return '1';
    return '2';
}

const fillSet = (card1, card2) => {
    var res = "";
    
    for (var i = 0; i < card1.length; i++) {
        res += fillValue(card1[i], card2[i]);
    }

    return res;
}

const mutateCard = (card, mutations = 1) => {
    if (mutations === 0) {
        return card;
    }
    
    var newCard = deepCopy(card);
    for (var i = 0; i < mutations; i++) {
        const randomIndex = randomInteger(0, 3);
        newCard = setCharAt(newCard, randomIndex, randomInteger(0, 2).toString());
    }

    if (newCard !== card)
        return newCard;
    else
        return mutateCard(card, mutations);
}

export {fillSet, mutateCard}