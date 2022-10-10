import { Property } from "../../domain/entity/property";
import { prisma } from "../../../@shared/infra/db/prisma.client";
import { LabeledPropertyUseCase } from "./labeled-property.usecase";
import { PropertyRepositoryInterface } from "properties/domain/repository/property.repository";
import { PropertyRepository } from "../../repository/prisma/property.repository";

describe("Change Room usecase test", () => {
  let usecase: LabeledPropertyUseCase;
  let repository: PropertyRepositoryInterface;
  beforeEach(() => {
    usecase = new LabeledPropertyUseCase();
    repository = new PropertyRepository();
  });
  it("should change room of property", async () => {
    const props = {
      description: "Description test",
      code: "234",
      room: "sala test",
      status: true,
      labeled: false,
      page: 13,
      line: 12,
    };
    const entity = new Property(props);
    await repository.add(entity);

    entity.labeled = true;

    await usecase.execute(entity.id, entity.labeled);

    let result = await prisma.properties.findFirst({
      where: { id: entity.id },
    });

    expect(result?.labeled).toBeTruthy;

    await prisma.properties.delete({
      where: { id: entity.id },
    });
  });
});
