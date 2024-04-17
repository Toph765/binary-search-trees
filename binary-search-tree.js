const node = (data, left, right) => {
    return {
        data,
        left,
        right
    };
}

function mergeSort(arr) {
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
}

const tree = (array) => {
    function buildTree(array) {
        return array;
    }

    let root = buildTree(array);

    return {
        root
    }
}

let a = tree(1);

console.log(a);
