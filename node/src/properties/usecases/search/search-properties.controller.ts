import { Request, Response } from "express";
import { SearchPropertiesUsecase } from "./serach-properties.usecase";

export class SearchPropertiesController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { term } = request.query;
    const usecase = new SearchPropertiesUsecase();

    const result = await usecase.execute(term as string);

    if (!result) {
      return response.status(400).json({ message: "Produto não encontrado" });
    }

    return response.status(200).json(result);
  }
}
