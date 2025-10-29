export interface DietData {
  nome: string;
  idade: number;
  altura_cm: number;
  peso_kg: number;
  sexo: "masculino" | "feminino";
  nivel_atividade: "Sedentario" | "2x_semana" | "4x_semana";
  objetivo: "perda_de_peso" | "hipertofria" | "manter_massa_muscular";
}