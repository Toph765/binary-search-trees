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
            b = mergeSort([...a.slice(1, a.length), ...b.slice(1, b.length)]);
            newArr = [a[0], ...b];
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
            let currentNode = node(array[0]);
            return tree.data = currentNode;
        };
        if (array.length === 2) {
            let leftNode = node(array[0]);
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

    let root = buildTree(treeArray);

    function insertRec(root, value) {
        if (root === null) {
            return root = node(value);
        }
        if (root.data > value) { root.left = insertRec(root.left, value) }
        else { root.right = insertRec(root.right, value) };

        return root;
    };

    function insert(value) {
        return root = insertRec(root, value); 
    }

    function deleteItemRec(root, value) {
        if (root.data === value) {
            if (root.right === null) {
                return root = root.left;
            }
            else if (root.left === null) {
                return root = root.right;
            };

            if (root.right && root.left) {
                let temp = root.right;

                while (temp.left !== null) {
                    temp = temp.left;
                };
                
                root.data = temp.data;
                temp = deleteItemRec(root.right, temp.data);

                return root;
            };
        };

        if (value < root.data) { root.left = deleteItemRec(root.left, value) }
        else if (value > root.data) { root.right = deleteItemRec(root.right, value) };

        return root;
    };

    function deleteItem(value) {
        return deleteItemRec(root, value);
    };

    function find(value) {
        let qRoot = root;

        while (qRoot.data !== value) {
            if (value < qRoot.data) { qRoot = qRoot.left }
            else if (value > qRoot.data) { qRoot = qRoot.right };
            
            if (qRoot === null) { return null };
        }

        return qRoot;
    };

    function levelOrder(callback) {
        let queue = [root];
        let levelOrderArray = [];

        while (queue.length !== 0) {
            levelOrderArray.push(queue[0].data);
            if (queue[0].left !== null) queue.push(queue[0].left);
            if (queue[0].right !== null) queue.push(queue[0].right);
            queue.shift();
        };

        if (callback && typeof callback === "function") return callback(levelOrderArray)
        else return levelOrderArray;
    };

    function preOrderRec(callback, root, preOrderArray = []) {
        if (root === null) return null;

        preOrderArray.push(root.data);
        preOrderRec(callback, root.left, preOrderArray);
        preOrderRec(callback, root.right, preOrderArray);

        if (callback && typeof callback === "function") return callback(preOrderArray)
        else return preOrderArray;
    };

    function preOrder(callback) {
        return preOrderRec(callback, root);
    };

    function inOrderRec(callback, root, inOrderArray = []) {
        if (root === null) return null;

        inOrderRec(callback, root.left, inOrderArray);
        inOrderArray.push(root.data);
        inOrderRec(callback, root.right, inOrderArray);

        if (callback && typeof callback === "function") return callback(inOrderArray)
        else return inOrderArray;
    };

    function inOrder(callback) {
        return inOrderRec(callback, root);
    };

    function postOrderRec(callback, root, postOrderArray = []) {
        if (root === null) return null;

        postOrderRec(callback, root.left, postOrderArray);
        postOrderRec(callback, root.right, postOrderArray);
        postOrderArray.push(root.data);

        if (callback && typeof callback === "function") return callback(postOrderArray)
        else return postOrderArray;
    };

    function postOrder(callback) {
        return postOrderRec(callback, root);
    };

    function heightRec(node, count = 0) {
        if (node === null) return count;
        else {
            if (node.left || node.right) count += 1;
            let left = heightRec(node.left, count);
            let right = heightRec(node.right, count);
            if (left > right) return left
            else return right;
        };
    };

    function height(node) {
        return heightRec(node);
    }

    function depth(node) {
        let count = 0;
        let current = root;

        while (current.data !== node.data) {
            if (node.data < current.data) {
                count += 1;
                current = current.left;
            }
            else if (node.data > current.data) {
                count += 1;
                current = current.right;
            }
        }
        return count;
    }

    function isBalanced() {
        const left = height(root.left);
        const right = height(root.right);
        let dif;

        if (left > right) dif = left - right
        else dif = right - left;

        if (dif <= 1) return true
        else return false;
    }

    return {
        root,
        insert,
        deleteItem,
        find,
        levelOrder,
        preOrder,
        inOrder,
        postOrder,
        height,
        depth,
        isBalanced,
    }
}

function thisIsArray(array) {
    return 'this is array: ' + array;
}

let a = tree([1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324]);

console.log(mergeSort([1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324]))

console.log(a.insert(10));

console.log(a.deleteItem(7))

console.log(a.find(236));

console.log(a.find(67));

prettyPrint(a.root);

console.log(a.levelOrder());

console.log(a.preOrder())

console.log(a.inOrder());

console.log(a.postOrder(thisIsArray));

let b = a.find(8);

console.log(a.height(b));

console.log(a.depth(b));

console.log(a.isBalanced());

a.insert(11);
a.insert(12);

console.log(a.isBalanced());

