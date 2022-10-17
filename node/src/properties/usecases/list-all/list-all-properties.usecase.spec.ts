import { prisma } from "../../../@shared/infra/db/prisma.client";
import { ImportPropertiesUseCase } from "../import/import-properties.usecase";
import { ListAllPropertiesUseCases } from "./list-all-properties.usecase";

describe("List All Properties Usecase test", () => {
  let importProperties: ImportPropertiesUseCase;
  let listAllProperties: ListAllPropertiesUseCases;
  beforeEach(() => {
    importProperties = new ImportPropertiesUseCase();
    listAllProperties = new ListAllPropertiesUseCases();
  });

  it("should list all properties", async () => {
    await importProperties.execute("./src/properties/usecases/import/test.txt");

    const result = await listAllProperties.execute();

    expect(result.length).toEqual(3);

    await prisma.properties.deleteMany({
      where: {
        id: {
          in: [result[0].id, result[1].id, result[2].id],
        },
      },
    });
  });
});
