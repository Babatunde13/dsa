function isSameTree1(p, q) {
    if (p == null && q == null) {
        return true
    }

    if (p == null || q == null || p.val !== q.val) {
        return false
    }

    return isSameTree1(p.left, q.left) && isSameTree1(p.right, q.right)
};
