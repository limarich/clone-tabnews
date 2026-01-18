test("GET to /api/v1/status returns status ok", async () => {
  const response = await fetch("http://localhost:3000/api/v1/status");
  expect(response.status).toBe(200);

  const responseBody = await response.json();
  const parsedDate = new Date(responseBody.updated_at);
  expect(parsedDate.toISOString()).toEqual(responseBody.updated_at);
  const database = responseBody.dependencies.database;

  expect(database.version).toEqual("16.0");
  expect(database.max_connections).toBeGreaterThan(0);
  expect(database.used_connections).toEqual(1);
});
