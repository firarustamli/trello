const draggables = document.querySelectorAll(".task");
const drop = document.querySelectorAll(".task-section");

draggables.forEach((task) => {
  task.addEventListener("dragstart", () => {
    task.classList.add("is-dragging");
  });
  task.addEventListener("dragend", () => {
    task.classList.remove("is-dragging");
  });
});

drop.forEach((element) => {
  element.addEventListener("dragover", (e) => {
    e.preventDefault();

    const bottomTask = insertTask(element);
    const currentTask = document.querySelector(".is-dragging");

    if (!bottomTask) {
      element.appendChild(currentTask);
    } else {
      element.insertBefore(currentTask,bottomTask);
    }
  });
});

const insertTask = (element, mouseY) => {
  const isNotDr = element.querySelectorAll(".task:not(.is-dragging)");
  let nextTask = null;
  let minBal = Number.NEGATIVE_INFINITY;

  isNotDr.forEach((task) => {
    const { top } = task.getBoundingClientRect();

    const balance = mouseY - top;

    if (balance < 0 && balance > minBal) {
      minBal = balance;
      nextTask = task;
    }
  });

  return nextTask;
};