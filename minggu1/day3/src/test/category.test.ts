import request from "supertest";
import app from "../app";

describe("Category API", () => {
  let createdCategoryId: number;

  /* =====================
     GET /category
  ===================== */
  describe("GET /category", () => {
    it("should return list of categories with pagination", async () => {
      const res = await request(app).get("/category");

      expect(res.statusCode).toBe(200);
      expect(res.body.success).toBe(true);
      expect(Array.isArray(res.body.data)).toBe(true);
      expect(res.body.pagination).toBeDefined();
    });
  });

  /* =====================
     POST /category
  ===================== */
  describe("POST /category", () => {
    it("should create a new category", async () => {
      const res = await request(app)
        .post("/category")
        .send({ name: "Test Category" });

      expect(res.statusCode).toBe(201);
      expect(res.body.success).toBe(true);
      expect(res.body.data.name).toBe("Test Category");

      createdCategoryId = res.body.data.id;
    });

    it("should return 400 if name is missing", async () => {
      const res = await request(app)
        .post("/category")
        .send({});

      expect(res.statusCode).toBe(400);
      expect(res.body.success).toBe(false);
    });
  });

  /* =====================
     GET /category/:id
  ===================== */
  describe("GET /category/:id", () => {
    it("should return category by id", async () => {
      const res = await request(app).get(`/category/${createdCategoryId}`);

      expect(res.statusCode).toBe(200);
      expect(res.body.success).toBe(true);
      expect(res.body.data.id).toBe(createdCategoryId);
    });

    it("should return 404 if category not found", async () => {
      const res = await request(app).get("/category/999999");

      expect(res.statusCode).toBe(404);
      expect(res.body.success).toBe(false);
    });
  });

  /* =====================
     PUT /category/:id
  ===================== */
  describe("PUT /category/:id", () => {
    it("should update category", async () => {
      const res = await request(app)
        .put(`/category/${createdCategoryId}`)
        .send({ name: "Updated Category" });

      expect(res.statusCode).toBe(200);
      expect(res.body.success).toBe(true);
      expect(res.body.data.name).toBe("Updated Category");
    });
  });

  /* =====================
     GET /category/find/complex
  ===================== */
  describe("GET /category/find/complex", () => {
    it("should return categories by name", async () => {
      const res = await request(app)
        .get("/category/find/complex")
        .query({ name: "Test" });

      expect(res.statusCode).toBe(200);
      expect(res.body.success).toBe(true);
      expect(Array.isArray(res.body.data)).toBe(true);
    });

    it("should return 400 if no query params", async () => {
      const res = await request(app)
        .get("/category/find/complex");

      expect(res.statusCode).toBe(400);
      expect(res.body.success).toBe(false);
    });
  });

  /* =====================
     DELETE /category/:id
  ===================== */
  describe("DELETE /category/:id", () => {
    it("should soft delete category", async () => {
      const res = await request(app).delete(
        `/category/${createdCategoryId}`
      );

      expect(res.statusCode).toBe(200);
      expect(res.body.success).toBe(true);
    });

    it("should return 404 if deleted category accessed", async () => {
      const res = await request(app).get(
        `/category/${createdCategoryId}`
      );

      expect(res.statusCode).toBe(404);
      expect(res.body.success).toBe(false);
    });
  });
});
