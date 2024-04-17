const node = (data = null, left = null, right = null) => {
    return {
        data,
        left,
        right
    };
}

const mergeSort = (arr) => {
    if (arr.length === 1) return arr;
    else {
        let newArr = []
        let a = mergeSort(arr.slice(0, arr.length / 2));
        let b = mergeSort(arr.slice(arr.length / 2, arr.length));

        if (a[0] === b[0]) {
            newArr = [a[0]];
        }
        else if (a[0] < b[0]) {
            b = mergeSort([...a.slice(1, a.length), ...b]);
            newArr = [a[0], ...b];
        } else {
            a = mergeSort([...b.slice(1, b.length), ...a]);
            newArr = [b[0], ...a];
        }

        return newArr;
    }
};

const prettyPrint = (node, prefix = "", isLeft = true) => {
   if (node === null) {
     return;
   }
   if (node.right !== null) {
     prettyPrint(node.right, `${prefix}${isLeft ? "│   " : "    "}`, false);
   }
   console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.data}`);
   if (node.left !== null) {
     prettyPrint(node.left, `${prefix}${isLeft ? "    " : "│   "}`, true);
   }
 };

const tree = (array) => {
    const treeArray = mergeSort(array);

    function buildTree(array) {
        let tree = node();

        if (array.length === 1) {
            let currentNode = node();
            currentNode.data = array[0];
            return tree.data = currentNode;
        };
        if (array.length === 2) {
            let leftNode = node();
            leftNode.data = array[0];
            tree.data = array[1];
            tree.left = leftNode;
            return tree;
        }
        let mid = Math.floor((0 + array.length - 1) / 2);
        tree.data = array[mid];
        tree.left = buildTree(array.slice(0, mid));
        tree.right = buildTree(array.slice(mid + 1, array.length));

        return tree;
    };

    function insert(value) {
        return value
    }

    let root = buildTree(treeArray);

    return {
        root,
        insert,
    }
}



let a = tree([1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324]);

prettyPrint(a.root);
console.log(a.insert(1))
