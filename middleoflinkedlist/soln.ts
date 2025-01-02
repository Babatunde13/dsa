class ListNode {
    val: number
    next: ListNode | null
    constructor(val?: number, next?: ListNode | null) {
        this.val = (val===undefined ? 0 : val)
        this.next = (next===undefined ? null : next)
    }
}

class Solution {
    middleNode(head: ListNode | null): ListNode | null {
        let slow = head
        let fast = head

        while (fast != null && fast.next != null) {
            slow = fast.next
            fast = fast.next.next
        }

        return slow
    }
}
