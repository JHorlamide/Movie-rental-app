import supertest from "supertest";
import domainServer from "../../server.js";
import Genre from "../../models/genres";

const request = supertest;
let server;

describe("/api/genres", () => {
  beforeEach(() => {
    server = domainServer;
  });

  afterEach(async () => {
    server.close();
    await Genre.remove({});
  });

  /* GET: all genres */
  describe("GET /", () => {
    it("Should return all genres", async () => {
      await Genre.collection.insertMany([
        { name: "genre1" },
        { name: "genre2" },
      ]);

      const res = await request(server).get("/api/genres");

      expect(res.status).toBe(200);
      expect(res.body.length).toBe(2);
      expect(res.body.some((genre) => (genre.name = "genre1"))).toBeTruthy();
      expect(res.body.some((genre) => (genre.name = "genre2"))).toBeTruthy();
    });
  });

  /* GET: single genre */
  describe("GET /:id", () => {
    it("Should return 404 if invalid id is passed", async () => {
      const res = await request(server).get("/api/genres/1");

      expect(res.status).toBe(404);
      expect(res.body).toEqual(expect.arrayContaining([]));
    });

    it("Should return a genre if valide id is passed/given", async () => {
      const genre = new Genre({ name: "genre1" });
      await genre.save();

      console.log(genre);

      const res = await request(server).get(`/api/genres/${genre._id}`);

      expect(res.status).toBe(200);
      expect(res.body).toHaveProperty("name", genre.name);
    });
  });
});
