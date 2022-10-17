import { prisma } from "../../../@shared/infra/db/prisma.client";
import { ImportPropertiesUseCase } from "../import/import-properties.usecase";
import { SearchByDescriptionPropertiesUseCase } from "./search-by-description-properties.usecase";

describe("List by room properties usecase", () => {
  let importProperties: ImportPropertiesUseCase;
  let searchByDescriptionProperties: SearchByDescriptionPropertiesUseCase;
  beforeEach(() => {
    importProperties = new ImportPropertiesUseCase();
    searchByDescriptionProperties = new SearchByDescriptionPropertiesUseCase();
  });

  it("should list properties search by description ", async () => {
    const imports = await importProperties.execute(
      "./src/properties/usecases/import/test.txt"
    );

    const properties = await searchByDescriptionProperties.execute({
      term: "Mesa Redonda",
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

  it("should throw error when not found property with description informed", async () => {
    expect(async () => {
      await searchByDescriptionProperties.execute({
        term: "fake-description",
      });
    }).rejects.toThrowError("Produto não encontrado");
  });
});
