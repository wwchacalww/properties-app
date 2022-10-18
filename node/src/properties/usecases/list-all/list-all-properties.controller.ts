import { Request, Response } from "express";
import { ListAllPropertiesUseCases } from "./list-all-properties.usecase";

export class ListAllPropertiesController {
  async handle(request: Request, response: Response): Promise<Response> {
    const usecase = new ListAllPropertiesUseCases();
    const properties = await usecase.execute();
    return response.status(200).json(properties);
  }
}
