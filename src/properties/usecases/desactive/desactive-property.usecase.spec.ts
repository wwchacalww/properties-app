import { Property } from "../../domain/entity/property";
import { prisma } from "../../../@shared/infra/db/prisma.client";
import { PropertyRepositoryInterface } from "properties/domain/repository/property.repository";
import { PropertyRepository } from "../../repository/prisma/property.repository";
import { DesactivePropertyUseCase } from "./desactive-property.usecase";

describe("Change Room usecase test", () => {
  let usecase: DesactivePropertyUseCase;
  let repository: PropertyRepositoryInterface;
  beforeEach(() => {
    usecase = new DesactivePropertyUseCase();
    repository = new PropertyRepository();
  });
  it("should active property", async () => {
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

    await usecase.execute(entity.id);

    let result = await prisma.properties.findFirst({
      where: { id: entity.id },
    });

    expect(result?.status).toBeFalsy();

    await prisma.properties.delete({
      where: { id: entity.id },
    });
  });
});
