import { prisma } from "../../../@shared/infra/db/prisma.client";
import { ImportPropertiesUseCase } from "../import/import-properties.usecase";
import { ListByRoomPropertiesUseCase } from "./list-by-room-properties.usecase";

describe("List by room properties usecase", () => {
  let importProperties: ImportPropertiesUseCase;
  let listByRoomProperties: ListByRoomPropertiesUseCase;
  beforeEach(() => {
    importProperties = new ImportPropertiesUseCase();
    listByRoomProperties = new ListByRoomPropertiesUseCase();
  });

  it("should list the properties by room selected", async () => {
    const imports = await importProperties.execute(
      "./src/properties/usecases/import/test.txt"
    );

    const properties = await listByRoomProperties.execute({
      term: "leitura",
    });

    expect(properties.properties.length).toBe(1);
    expect(properties.properties[0].code).toBe("00000.248.943");
    expect(properties.properties[0].line).toBe(3);
    expect(properties.properties[0].page).toBe(1);

    await prisma.properties.deleteMany({
      where: {
        id: {
          in: [imports[0].id, imports[1].id, imports[2].id],
        },
      },
    });
  });

  it("should throw error when select a fake room", async () => {
    expect(async () => {
      await listByRoomProperties.execute({
        term: "fake-room",
      });
    }).rejects.toThrowError("Sala não encontrada");
  });
});
