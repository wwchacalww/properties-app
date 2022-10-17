import { Property } from "./property";

describe("Property Entity Unit Test", () => {
  it("should create a new property", () => {
    const props = {
      id: "fake-id",
      description: "Description test",
      code: "234",
      room: "sala test",
      status: false,
      page: 13,
      line: 12,
    };
    const entity = new Property(props);

    expect(entity.id).toBe("fake-id");
    expect(entity.description).toBe("Description test");
    expect(entity.code).toBe("234");
    expect(entity.room).toBe("sala test");
    expect(entity.status).toBeFalsy();
    expect(entity.labeled).toBeFalsy();
    expect(entity.page).toBe(13);
    expect(entity.line).toBe(12);
  });

  it("should create a new property without prop id", () => {
    const props = {
      description: "Description test",
      code: "234",
      room: "sala test",
      status: false,
      labeled: true,
      page: 13,
      line: 12,
    };
    const entity = new Property(props);

    expect(entity.id).toBeDefined();
    expect(entity.description).toBe("Description test");
    expect(entity.code).toBe("234");
    expect(entity.room).toBe("sala test");
    expect(entity.status).toBeFalsy();
    expect(entity.labeled).toBeTruthy();
    expect(entity.page).toBe(13);
    expect(entity.line).toBe(12);
  });

  it("should change room the property", () => {
    const props = {
      id: "fake-id",
      description: "Description test",
      code: "234",
      room: "sala test",
      status: false,
      page: 13,
      line: 12,
    };
    const entity = new Property(props);

    expect(entity.id).toBe("fake-id");
    expect(entity.room).toBe("sala test");

    entity.room = "sala change";

    expect(entity.room).toBe("sala change");
  });

  it("should active and desactive status the property", () => {
    const props = {
      id: "fake-id",
      description: "Description test",
      code: "234",
      room: "sala test",
      status: true,
      page: 13,
      line: 12,
    };
    const entity = new Property(props);

    expect(entity.id).toBe("fake-id");
    expect(entity.status).toBeTruthy();

    entity.desactive();

    expect(entity.status).toBeFalsy();

    entity.active();
    expect(entity.status).toBeTruthy();
  });
});
