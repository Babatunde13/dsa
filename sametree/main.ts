class TreeNode2 {
    val: number
    left: TreeNode2 | null
    right: TreeNode2 | null
    constructor(val?: number, left?: TreeNode2 | null, right?: TreeNode2 | null) {
        this.val = (val===undefined ? 0 : val)
        this.left = (left===undefined ? null : left)
        this.right = (right===undefined ? null : right)
    }
}

function isSameTree(p: TreeNode2 | null, q: TreeNode2 | null): boolean {
    if (p == null && q == null) {
        return true
    }

    if (p == null || q == null || p.val !== q.val) {
        return false
    }

    return isSameTree(p.left, q.left) && isSameTree(p.right, q.right)
};
