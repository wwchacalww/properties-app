import { Request, Response } from "express";
import { ListAllPropertiesUseCases } from "./list-all-properties.usecase";

export class ListAllPropertiesController {
  async handle(request: Request, response: Response): Promise<Response> {
    const {
      filter = "code",
      sort_dir = "asc",
      page = 1,
      per_page = 100,
    } = request.body;
    const usecase = new ListAllPropertiesUseCases();
    const properties = await usecase.execute({
      filter,
      sort_dir,
      page,
      per_page,
    });
    return response.status(200).json(properties);
  }
}
