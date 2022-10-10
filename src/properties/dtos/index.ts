interface OutputProperty {
  id: string;
  description: string;
  code: string;
  room: string;
  status: "encontrado" | "não encontrado";
  page: number;
  line: number;
  labeled: "etiquetado" | "não etiquetado";
}

export { OutputProperty };
