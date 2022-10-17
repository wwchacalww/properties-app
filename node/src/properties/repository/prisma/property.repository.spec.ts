import { prisma } from "../../../@shared/infra/db/prisma.client";
import { PropertyRepositoryInterface } from "../../domain/repository/property.repository";
import { Property } from "../../domain/entity/property";
import { PropertyRepository } from "./property.repository";

describe("Property Repository Integration Test", () => {
  let repository: PropertyRepositoryInterface;

  beforeEach(async () => {
    repository = new PropertyRepository();
  });

  it("should register a property into database", async () => {
    const props = {
      description: "Description test",
      code: "234",
      room: "sala test",
      status: true,
      labeled: true,
      page: 13,
      line: 12,
    };
    const entity = new Property(props);
    await repository.add(entity);

    const result = await prisma.properties.findFirst({
      where: { id: entity.id },
    });

    expect(entity.id).toBe(result?.id);
    expect(entity.description).toEqual(result?.description);
    expect(result?.labeled).toBeTruthy();

    await prisma.properties.delete({
      where: { id: entity.id },
    });
  });

  it("should list all property", async () => {
    let props = {
      description: "Description test",
      code: "234",
      room: "sala test",
      status: true,
      labeled: true,
      page: 13,
      line: 12,
    };
    const entity = new Property(props);
    await repository.add(entity);
    props = {
      description: "Description test2",
      code: "2341",
      room: "sala test",
      status: true,
      labeled: true,
      page: 13,
      line: 11,
    };
    const entit = new Property(props);
    await repository.add(entit);

    const result = await repository.all();
    expect(result.length).toEqual(2);

    await prisma.properties.deleteMany({
      where: {
        id: { in: [entity.id, entit.id] },
      },
    });
  });

  it("should change room the property into database", async () => {
    const props = {
      description: "Description test",
      code: "234",
      room: "sala test",
      status: true,
      labeled: true,
      page: 13,
      line: 12,
    };
    const entity = new Property(props);
    await repository.add(entity);

    let result = await prisma.properties.findFirst({
      where: { id: entity.id },
    });

    expect(entity.id).toBe(result?.id);
    expect(result?.room).toEqual("sala test");

    entity.room = "sala changed";

    await repository.changeRoom(entity.id, entity.room);

    result = await prisma.properties.findFirst({
      where: { id: entity.id },
    });
    expect(result?.room).toEqual("sala changed");

    await prisma.properties.delete({
      where: { id: entity.id },
    });
  });

  it("should active and desactive status the property into database", async () => {
    const props = {
      description: "Description test",
      code: "234",
      room: "sala test",
      status: true,
      labeled: true,
      page: 13,
      line: 12,
    };
    const entity = new Property(props);
    await repository.add(entity);

    let result = await prisma.properties.findFirst({
      where: { id: entity.id },
    });

    expect(entity.id).toBe(result?.id);
    expect(result?.status).toBeTruthy();

    await repository.desactive(entity.id);

    result = await prisma.properties.findFirst({
      where: { id: entity.id },
    });
    expect(result?.status).toBeFalsy();

    await repository.active(entity.id);
    result = await prisma.properties.findFirst({
      where: { id: entity.id },
    });
    expect(result?.status).toBeTruthy();

    await prisma.properties.delete({
      where: { id: entity.id },
    });
  });

  it("should change labeled the property into database", async () => {
    const props = {
      description: "Description test",
      code: "234",
      room: "sala test",
      status: true,
      labeled: true,
      page: 13,
      line: 12,
    };
    const entity = new Property(props);
    await repository.add(entity);

    let result = await prisma.properties.findFirst({
      where: { id: entity.id },
    });

    expect(entity.id).toBe(result?.id);
    expect(result?.labeled).toBeTruthy();

    entity.labeled = false;

    await repository.labeled(entity.id, entity.labeled);

    result = await prisma.properties.findFirst({
      where: { id: entity.id },
    });
    expect(result?.labeled).toBeFalsy();

    await prisma.properties.delete({
      where: { id: entity.id },
    });
  });

  it("should list properties with term for search room", async () => {
    const property_default = {
      status: true,
      labeled: true,
      page: 13,
      line: 12,
    };
    const arrange = [
      {
        code: "1.001",
        description: "Gaveteiro",
        room: "Sala leitura",
        ...property_default,
      },
      {
        code: "1.002",
        description: "TV 32",
        room: "Sala 11",
        ...property_default,
      },
      {
        code: "1.003",
        description: "Geladeira",
        room: "Sala de TV",
        ...property_default,
      },
      {
        code: "1.004",
        description: "Impressora",
        room: "Sala 05",
        ...property_default,
      },
      {
        code: "1.005",
        description: "Armario",
        room: "Sala 05",
        ...property_default,
      },
      {
        code: "1.006",
        description: "Estante",
        room: "Secretaria",
        ...property_default,
      },
      {
        code: "1.007",
        description: "Caixa de Som",
        room: "Secretaria",
        ...property_default,
      },
    ];

    const idsForDelete: string[] = [];
    await Promise.all(
      arrange.map(async (entity) => {
        const property = new Property(entity);
        idsForDelete.push(property.id);
        await repository.add(property);
      })
    );

    let search = await repository.listForRoom({
      term: "Sala",
    });

    expect(search?.total).toEqual(5);
    expect(search?.per_page).toEqual(10);
    expect(search?.sort_dir).toBe("asc");

    search = await repository.listForRoom({
      term: "Sala",
      per_page: 2,
      filter: "code",
      sort_dir: "desc",
    });

    expect(search?.total).toEqual(5);
    expect(search?.per_page).toEqual(2);
    expect(search?.sort_dir).toBe("desc");
    expect(search?.properties[0].code).toBe("1.005");

    search = await repository.listForRoom({
      term: "Sala",
      page: 3,
      per_page: 2,
      filter: "code",
      sort_dir: "desc",
    });

    expect(search?.properties[0].code).toBe("1.001");

    await prisma.properties.deleteMany({
      where: {
        id: { in: idsForDelete },
      },
    });
  });

  it("should list properties with term for search description", async () => {
    const property_default = {
      status: true,
      labeled: true,
      page: 13,
      line: 12,
    };
    const arrange = [
      {
        code: "1.001",
        description: "Gaveteiro 3 portas",
        room: "Sala leitura",
        ...property_default,
      },
      {
        code: "1.002",
        description: "TV 32 LG",
        room: "Sala 11",
        ...property_default,
      },
      {
        code: "1.003",
        description: "Geladeira 2 portas",
        room: "Sala de TV",
        ...property_default,
      },
      {
        code: "1.004",
        description: "Impressora LG",
        room: "Sala 05",
        ...property_default,
      },
      {
        code: "1.005",
        description: "Armario 2 portas",
        room: "Sala 05",
        ...property_default,
      },
      {
        code: "1.006",
        description: "Cadeira aluno",
        room: "Secretaria",
        ...property_default,
      },
      {
        code: "1.007",
        description: "Cadeira para professor",
        room: "Secretaria",
        ...property_default,
      },
    ];

    const idsForDelete: string[] = [];
    await Promise.all(
      arrange.map(async (entity) => {
        const property = new Property(entity);
        idsForDelete.push(property.id);
        await repository.add(property);
      })
    );

    let search = await repository.searchForDescription({
      term: "porta",
    });

    expect(search?.total).toEqual(3);
    expect(search?.per_page).toEqual(10);
    expect(search?.sort_dir).toBe("asc");

    search = await repository.searchForDescription({
      term: "lg",
      per_page: 2,
      filter: "code",
      sort_dir: "desc",
    });

    expect(search?.total).toEqual(2);
    expect(search?.per_page).toEqual(2);
    expect(search?.sort_dir).toBe("desc");
    expect(search?.properties[0].code).toBe("1.004");

    await prisma.properties.deleteMany({
      where: {
        id: { in: idsForDelete },
      },
    });
  });
});
