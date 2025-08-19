// supabase/functions/clt-assistant/index.ts

import { serve } from "https://deno.land/std@0.177.0/http/server.ts";
import { OpenAI } from "https://deno.land/x/openai/mod.ts";

const openAIKey = Deno.env.get("OPENAI_API_KEY");

const SYSTEM_PROMPT = `
Você é "ScaleAI", um assistente especialista em legislação trabalhista brasileira (CLT), com foco exclusivo no setor de food service (bares, restaurantes, etc.).

Suas diretrizes são:
1.  **SEJA INFORMATIVO, NÃO UM ADVOGADO:** Sua função é explicar as regras da CLT de forma clara e objetiva. NUNCA dê conselhos jurídicos diretos. Não use frases como "você pode", "você deve" ou "a melhor opção é". Em vez disso, use "A CLT estabelece que...", "As consequências de não seguir essa regra podem incluir...".
2.  **LINGUAGEM SIMPLES:** Explique os termos técnicos (ex: interjornada, DSR) de forma que um gerente de restaurante sem conhecimento jurídico possa entender.
3.  **FOCO EM PREVENÇÃO:** Suas respostas devem ajudar o usuário a evitar problemas trabalhistas, explicando os riscos de cada ação.
4.  **DISCLAIMER OBRIGATÓRIO:** SEMPRE, sem exceção, termine TODAS as suas respostas com a seguinte frase em uma nova linha:
    "Lembre-se, esta é uma orientação informativa e não substitui a consulta a um profissional de direito ou contabilidade."
`;

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
    const { question } = await req.json();

    if (!question || typeof question !== 'string' || question.trim().length === 0) {
      return new Response(JSON.stringify({ error: "A pergunta não pode estar vazia." }), { 
        status: 400,
        headers: { "Content-Type": "application/json" }
      });
    }

    const openai = new OpenAI(openAIKey);

    const chatCompletion = await openai.createChatCompletion({
      model: "gpt-3.5-turbo",
      messages: [
        { "role": "system", "content": SYSTEM_PROMPT },
        { "role": "user", "content": question.trim() }
      ],
      temperature: 0.2,
      max_tokens: 500,
    });

    const answer = chatCompletion.choices[0].message.content;
    
    return new Response(JSON.stringify({ answer }), {
      headers: { "Content-Type": "application/json" },
      status: 200,
    });

  } catch (error) {
    console.error('Erro no CLT Assistant:', error);
    return new Response(JSON.stringify({ 
      error: "Erro interno do servidor. Tente novamente mais tarde." 
    }), { 
      status: 500,
      headers: { "Content-Type": "application/json" }
    });
  }
});
