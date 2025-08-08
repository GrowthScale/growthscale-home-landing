// supabase/functions/suggest-schedule/index.ts

import { serve } from "https://deno.land/std@0.177.0/http/server.ts";
import { OpenAI } from "https://deno.land/x/openai/mod.ts";

const openAIKey = Deno.env.get("OPENAI_API_KEY");

// Interface para os dados de entrada
interface InputData {
  employees: { id: string; name: string; workload: number; constraints?: string[] }[];
  shiftsToFill: { id: string; startTime: string; endTime: string; requiredSkill?: string }[];
  rules: string[]; // Regras gerais, ex: "Mínimo 1, máximo 3 funcionários por turno"
}

// Interface para a resposta
interface ScheduleSuggestion {
  shiftId: string;
  employeeId: string;
}

// O prompt que instrui a IA
function buildSystemPrompt(input: InputData): string {
  const employeeList = input.employees.map(e => `- ID: ${e.id}, Nome: ${e.name}, Carga Semanal: ${e.workload}h, Restrições: ${e.constraints?.join(', ') || 'Nenhuma'}`).join('\n');
  const shiftList = input.shiftsToFill.map(s => `- ID do Turno: ${s.id}, Início: ${s.startTime}, Fim: ${s.endTime}, Habilidade: ${s.requiredSkill || 'Qualquer'}`).join('\n');
  const ruleList = input.rules.map(r => `- ${r}`).join('\n');

  return `
Você é um especialista em logística e alocação de pessoal para o setor de food service. Sua tarefa é criar a escala de trabalho mais otimizada possível.

**Entradas:**
1.  **Funcionários Disponíveis:**
${employeeList}

2.  **Turnos a Preencher:**
${shiftList}

3.  **Regras Obrigatórias:**
${ruleList}
- RESPEITE o intervalo mínimo de 11 horas entre os turnos de um mesmo funcionário.
- NÃO ULTRAPASSE a carga horária semanal de cada funcionário.
- Tente distribuir os turnos de forma EQUITATIVA.
- Considere as habilidades e restrições de cada funcionário.
- Priorize a cobertura adequada de cada turno.

**Sua Saída:**
Responda APENAS com um objeto JSON válido, sem nenhum texto ou explicação adicional. O JSON deve ser um array de objetos, onde cada objeto contém "shiftId" e "employeeId", representando a alocação de um funcionário a um turno.

Exemplo de formato de saída:
[
  { "shiftId": "s1", "employeeId": "e2" },
  { "shiftId": "s2", "employeeId": "e1" }
]

**IMPORTANTE:**
- Retorne apenas o JSON, sem texto adicional
- Certifique-se de que o JSON seja válido
- Cada turno deve ter pelo menos um funcionário alocado
- Respeite todas as regras mencionadas
  `;
}

serve(async (req) => {
  if (req.method !== 'POST') {
    return new Response("Method Not Allowed", { status: 405 });
  }

  if (!openAIKey) {
    return new Response(JSON.stringify({ error: "Chave da API da OpenAI não configurada." }), { 
      status: 500,
      headers: { "Content-Type": "application/json" }
    });
  }

  try {
    const inputData: InputData = await req.json();

    // Validação básica dos dados de entrada
    if (!inputData.employees || !inputData.shiftsToFill || !inputData.rules) {
      return new Response(JSON.stringify({ error: "Dados de entrada inválidos. São necessários: employees, shiftsToFill, rules" }), { 
        status: 400,
        headers: { "Content-Type": "application/json" }
      });
    }

    if (inputData.employees.length === 0 || inputData.shiftsToFill.length === 0) {
      return new Response(JSON.stringify({ error: "É necessário pelo menos um funcionário e um turno para gerar sugestões" }), { 
        status: 400,
        headers: { "Content-Type": "application/json" }
      });
    }

    const systemPrompt = buildSystemPrompt(inputData);
    const openai = new OpenAI(openAIKey);

    const chatCompletion = await openai.createChatCompletion({
      model: "gpt-3.5-turbo-1106", // Este modelo é bom com JSON
      messages: [{ "role": "user", "content": systemPrompt }],
      response_format: { type: "json_object" }, // Força a saída em JSON
      temperature: 0.3,
      max_tokens: 1000,
    });

    const responseContent = chatCompletion.choices[0].message.content;
    
    if (!responseContent) {
      throw new Error("Resposta vazia da OpenAI");
    }

    // Tenta fazer o parse do JSON
    let suggestion: ScheduleSuggestion[];
    try {
      const parsedResponse = JSON.parse(responseContent);
      // Verifica se a resposta tem o formato esperado
      if (Array.isArray(parsedResponse)) {
        suggestion = parsedResponse;
      } else if (parsedResponse.suggestions && Array.isArray(parsedResponse.suggestions)) {
        suggestion = parsedResponse.suggestions;
      } else {
        throw new Error("Formato de resposta inesperado");
      }
    } catch (parseError) {
      console.error('Erro ao fazer parse da resposta:', responseContent);
      throw new Error(`Erro ao processar resposta da IA: ${parseError.message}`);
    }

    return new Response(JSON.stringify({ suggestion }), {
      headers: { "Content-Type": "application/json" },
      status: 200,
    });

  } catch (error) {
    console.error('Erro no suggest-schedule:', error);
    return new Response(JSON.stringify({ 
      error: `Erro ao gerar sugestão: ${error.message}` 
    }), { 
      status: 500,
      headers: { "Content-Type": "application/json" }
    });
  }
});
