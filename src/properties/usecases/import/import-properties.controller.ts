import { Request, Response } from "express";
import { ImportPropertiesUseCase } from "./import-properties.usecase";

export class ImportPropertiesController {
  async handle(request: Request, response: Response): Promise<Response> {
    const usecase = new ImportPropertiesUseCase();
    const { file } = request;

    if (!file) {
      throw Error("File not found");
    }
    const result = await usecase.execute(file.path);

    return response.status(200).json(result);
  }
}
