const domain = "http://localhost:8080/api";

async function getWorkers() {
  return fetch(`${domain}/workers`);
}

export { getWorkers };
