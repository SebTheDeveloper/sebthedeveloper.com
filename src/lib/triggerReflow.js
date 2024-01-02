export default function triggerReflow(node, className) {
  node.classList.remove(className);

  // Trigger reflow to reset animation
  void node.offsetHeight;

  node.classList.add(className);
}
