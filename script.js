    const inputBox = document.getElementById("input-box");
    const listVessel = document.getElementById("list-vessel");
    
    function addTask() {
      if (inputBox.value === '') {
        alert("You must write something!");
      } else {
        let li = document.createElement("li");
        li.textContent = inputBox.value;
        let span = document.createElement("span");
        span.innerHTML = "\u00d7";
        span.setAttribute("aria-label", "Delete task");
        li.appendChild(span);
        listVessel.appendChild(li);
        inputBox.value = "";
        saveData();
      }
    }
    
    listVessel.addEventListener("click", function(e) {
      if (e.target.matches("li")) {
        e.target.classList.toggle("checked");
        saveData();
      } else if (e.target.matches("li span")) {
        const li = e.target.parentElement;
        li.classList.add("remove");
        setTimeout(() => {
          li.remove();
          saveData();
        }, 300);
      }
    });
    
    
    function saveData() {
      try {
        const tasks = Array.from(listVessel.children).map(li => ({
          text: li.firstChild.textContent,
          checked: li.classList.contains("checked")
        }));
        localStorage.setItem("data", JSON.stringify(tasks));
      } catch (e) {
        console.error("Failed to save to localStorage:", e);
      }
    }
    
    function showTask() {
      try {
        const tasks = JSON.parse(localStorage.getItem("data") || "[]");
        listVessel.innerHTML = "";
        tasks.forEach(task => {
          const li = document.createElement("li");
          li.textContent = task.text;
          if (task.checked) li.classList.add("checked");
          const span = document.createElement("span");
          span.innerHTML = "\u00d7";
          span.setAttribute("aria-label", "Delete task");
          li.appendChild(span);
          listVessel.appendChild(li);
        });
      } catch (e) {
        console.error("Failed to load from localStorage:", e);
      }
    }
    
    showTask();
