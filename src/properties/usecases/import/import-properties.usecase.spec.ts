import { prisma } from "../../../@shared/infra/db/prisma.client";
import { ImportPropertiesUseCase } from "./import-properties.usecase";

describe("Import Properties Usecases Test", () => {
  let usecase: ImportPropertiesUseCase;
  beforeEach(() => {
    usecase = new ImportPropertiesUseCase();
  });
  it("should import text file with list the properties", async () => {
    const properties = await usecase.execute(
      "./src/properties/usecases/import/test.txt"
    );

    const property = await prisma.properties.findFirst({
      where: {
        code: "1.203",
      },
    });

    const idsForDelete: string[] = [];
    await Promise.all(
      properties.map((entity) => {
        idsForDelete.push(entity.id as string);
      })
    );
    await prisma.properties.deleteMany({
      where: {
        id: { in: idsForDelete },
      },
    });
    expect(properties.length).toBe(3);
    expect(property?.room).toBe("Sala 11");
  });
});
