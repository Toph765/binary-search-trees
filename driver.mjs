import Tree from "./binary-search-tree.mjs";

function createArray(n) {
    let newArray = [];

    while (newArray.length !== n) {
        let num = Math.floor(Math.random() * 99);
        newArray.push(num);
    }

    return newArray;
}

const foo = createArray(10);

let tree = Tree(foo);