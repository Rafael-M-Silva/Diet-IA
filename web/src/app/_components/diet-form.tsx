"use client";
import { z } from "zod";
import { Card } from "@/components/ui/card";
import { Utensils } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";

const dietSchema = z.object({
  nome: z.string().min(2, "O nome é obrigatório"),
  idade: z.number().int().positive(),
  altura_cm: z.number().positive(),
  peso_kg: z.number().positive(),
  sexo: z.enum(["masculino", "feminino"], { error: "selecione o sexo" }),
  nivel_atividade: z.enum(["Sedentario", "2x_semana", "4x_semana"], {
    error: "selecione o nivel de atividade",
  }),
  objetivo: z.enum(["perda_de_peso", "hipertofria", "manter_massa_muscular"], {
    error: "selecione o objetivo",
  }),
});

type dietSchemaFormData = z.infer<typeof dietSchema>;

interface dietFormProps {
  onSubmit: (data: dietSchemaFormData) => void;
}

export function DietForm({ onSubmit }: dietFormProps) {
  const form = useForm<dietSchemaFormData>({
    resolver: zodResolver(dietSchema),
    defaultValues: {
      nome: "",
      idade: undefined,
      altura_cm: undefined,
      peso_kg: undefined,
      sexo: undefined,
      nivel_atividade: undefined,
      objetivo: undefined,
    },
  });
  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <Card className="w-full max-w-2xl border-0">
        <div className="p-8">
          <div className="text-center mb-8">
            <div className="flex items-center justify-center mb-4 mx-auto">
              <Utensils className="w-14 h-14 text-green-500" />
            </div>
            <h1 className="text-3xl font-bold text-green-500 mb-2">
              Calcule sua dieta
            </h1>
          </div>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-gray-900 flex items-center">
                  Dados Pessoais
                </h3>
              </div>
              {/* Campos nome e idade */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="nome"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Nome</FormLabel>
                      <FormControl>
                        <Input {...field} placeholder="Digite seu nome..." />
                      </FormControl>
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="idade"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Idade</FormLabel>
                      <FormControl>
                        <Input
                          {...form.register("idade", {
                            setValueAs: (v) =>
                              v === "" ? undefined : Number(v),
                          })}
                          type="number"
                          step="any"
                          placeholder="Ex: 28"
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
              </div>

              {/* campos peso, sexo e altura */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                
                <FormField
                  control={form.control}
                  name="peso_kg"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Peso em kg</FormLabel>
                      <FormControl>
                        <Input
                          {...form.register("peso_kg", {
                            setValueAs: (v) =>
                              v === "" ? undefined : parseFloat(v),
                          })}
                          type="number"
                          step="any"
                          placeholder="Ex: 70.6"
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="altura_cm"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Altura em cm</FormLabel>
                      <FormControl>
                        <Input
                          {...form.register("altura_cm", {
                            setValueAs: (v) =>
                              v === "" ? undefined : parseFloat(v),
                          })}
                          type="number"
                          step="any"
                          placeholder="Ex: 70.6"
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="sexo"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Sexo</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger className="w-full">
                            <SelectValue placeholder="Selecione o sexo"/>
                          </SelectTrigger>
                        </FormControl>

                        <SelectContent>
                          <SelectItem value="masculino">Masculino</SelectItem>
                          <SelectItem value="feminino">Feminino</SelectItem>
                        </SelectContent>
                      </Select>
                    </FormItem>
                  )}
                />
              </div>
              {/* campos atividade e nivel */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                
                <FormField
                  control={form.control}
                  name="nivel_atividade"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Nível de Atividade</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger className="w-full">
                            <SelectValue placeholder="Selecione o nivel de atividade"/>
                          </SelectTrigger>
                        </FormControl>

                        <SelectContent>
                          <SelectItem value="Sedentario">Sedentario</SelectItem>
                          <SelectItem value="2x_semana">2x_semana</SelectItem>
                          <SelectItem value="4x_semana">4x_semana</SelectItem>
                        </SelectContent>
                      </Select>
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="objetivo"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Objetivo</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger className="w-full">
                            <SelectValue placeholder="Selecione o seu Objetivo"/>
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="perda_de_peso">Perda de peso</SelectItem>
                          <SelectItem value="hipertofria">hipertofria</SelectItem>
                          <SelectItem value="manter_massa_muscular">manter massa muscular</SelectItem>
                        </SelectContent>
                      </Select>
                    </FormItem>
                  )}
                />
              </div>

              <Button className="w-full mt-4 hover:opacity-90 cursor-pointer">
                Gerar minha dieta
              </Button>
            </form>
          </Form>
        </div>
      </Card>
    </div>
  );
}
