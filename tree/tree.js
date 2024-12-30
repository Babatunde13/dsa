class TreeNode1 {
    constructor(value, left, right) {
        this.value = value
        this.left = left
        this.right = right
    }
}

class Tree1 {
    constructor(rootVal, leftVal, rightVal) {
        const root = new TreeNode1(rootVal)
        if (leftVal != undefined) {
            const leftNode = new TreeNode1(leftVal)
            root.left = leftNode
        }
        if (rightVal != undefined) {
            const rightNode = new TreeNode1(rightVal)
            root.right = rightNode
        }
        this.root = root
    }

    // root -> left -> right
    #preOrderSearchHelper(node, data = []) {
        if (node == undefined || node == null) {
            return data
        }

        data.push(node.value)
        this.#preOrderSearchHelper(node.left, data)
        this.#preOrderSearchHelper(node.right, data)
        return data
    }

    // left -> root -> right
    #inOrderSearchHelper(node, data = []) {
        if (node == undefined || node == null) {
            return data
        }

        this.#inOrderSearchHelper(node.left, data)
        data.push(node.value)
        this.#inOrderSearchHelper(node.right, data)
        return data
    }

    // left -> right -> root
    #postOrderSearchHelper(node, data = []) {
        if (node == undefined || node == null) {
            return data
        }

        this.#postOrderSearchHelper(node.left, data)
        this.#postOrderSearchHelper(node.right, data)
        data.push(node.value)
        return data
    }

    preOrderSearch() {
        return this.#preOrderSearchHelper(this.root)
    }

    inOrderSearch() {
        return this.#inOrderSearchHelper(this.root)
    }

    postOrderSearch() {
        return this.#postOrderSearchHelper(this.root)
    }

    levelOrderSearch() {
        let currentNode = this.root
        const queue = [this.root] // queue
        const data = []
        while (queue.length > 0) {
            currentNode = queue.shift() // deque
            if (currentNode) {
                data.push(currentNode.value)
                if (currentNode.left) queue.push(currentNode.left)
                if (currentNode.right) queue.push(currentNode.right)
            }
        }

        return data
    }
}

//          1
//        /   \
//       2     3
//     /  \   /  \
//    4    5 6    7

const tree = new Tree1(1)
const leftNode = new TreeNode1(2)
const rightNode = new TreeNode1(3)
leftNode.left = new TreeNode1(4)
leftNode.right = new TreeNode1(5)

rightNode.left = new TreeNode1(6)
rightNode.right = new TreeNode1(7)
tree.root.left = leftNode
tree.root.right = rightNode

console.log(tree.inOrderSearch())
console.log(tree.preOrderSearch())
console.log(tree.postOrderSearch())
console.log(tree.levelOrderSearch())
