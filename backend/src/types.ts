import { z } from "zod"

export const DietaPlanRequestSchema = z.object({
  nome: z.string().min(2),
  idade: z.number().positive(),
  altura_cm: z.number().positive(),
  peso_kg: z.number().positive(),
  sexo: z.enum(["masculino", "feminino"]),
  nivel_atividade: z.enum(["Sedentario", "2x_semana", "4x_semana"]),
  objetivo: z.enum(["perda_de_peso", "hipertofria", "manter_massa_muscular"]),
})

export type DietaPlanRequest = z.infer<typeof DietaPlanRequestSchema>