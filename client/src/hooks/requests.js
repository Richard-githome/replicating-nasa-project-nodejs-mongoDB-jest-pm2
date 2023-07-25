const API_URL = "v1";

// Load planets and return as JSON.
async function httpGetPlanets(req, res) {
  const response = await fetch(`${API_URL}/planets`);
  return response.json();
}

// Load launches, sort by flight number, and return as JSON.
async function httpGetLaunches() {
  try {
    const response = await fetch(`${API_URL}/launches`);
    const jsonResponse = await response.json();
    const fetchedLaunches = Array.from(jsonResponse).sort((a, b) => {
      return a.flightNumber - b.flightNumber;
    });

    return fetchedLaunches;
  } catch (error) {
    throw error;
  }
}

// Submit given launch data to launch system.
async function httpSubmitLaunch(launch) {
  try {
    return await fetch(`${API_URL}/launches`, {
      method: "post",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(launch),
    });
  } catch (error) {
    return { ok: false };
  }
}

// Delete launch with given ID.
async function httpAbortLaunch(id) {
  try {
    return await fetch(`${API_URL}/launches/${id}`, { 
      method: "delete" 
    });
  } catch (error) {
    console.log(error);
    return { ok: false };
  }
}

export { httpGetPlanets, httpGetLaunches, httpSubmitLaunch, httpAbortLaunch };
