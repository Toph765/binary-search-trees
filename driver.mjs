import Tree from "./binary-search-tree.mjs";

function createArray(n) {
    let newArray = [];

    while (newArray.length !== n) {
        let num = Math.floor(Math.random() * 99);
        newArray.push(num);
    }

    return newArray;
}

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


// Create array of random number below 100
const foo = createArray(10);

// Create binary tree object
let tree = Tree(foo);

prettyPrint(tree.root);

// check if tree is balanced
console.log("Is Balanced: ", tree.isBalanced());

// print out elements level order traversal
console.log("Level order: ", tree.levelOrder());

// print out elements in pre order traversal
console.log("Pre Order: ", tree.preOrder());

// print out elements in inorder traversal
console.log("Inorder: ", tree.inOrder());

// print out elements in post order traversal
console.log("Post Order: ", tree.postOrder());

// unbalance the tree by adding number greater than 100
tree.insert(145);
tree.insert(354);
tree.insert(109);
tree.insert(287);
tree.insert(201);

console.log("Unbalance tree:");
prettyPrint(tree.root);

// check if tree is balanced
console.log("Is Balanced: ", tree.isBalanced());

// rebalance tree
tree.root = tree.reBalance();

console.log("Rebalance tree:");
prettyPrint(tree.root);

// check if tree is balanced
console.log("Is Balanced: ", tree.isBalanced());

// print out elements level order traversal
console.log("Level order: ", tree.levelOrder());

// print out elements in pre order traversal
console.log("Pre Order: ", tree.preOrder());

// print out elements in inorder traversal
console.log("Inorder: ", tree.inOrder());

// print out elements in post order traversal
console.log("Post Order: ", tree.postOrder());
