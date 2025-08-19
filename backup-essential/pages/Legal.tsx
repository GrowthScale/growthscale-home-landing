import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowLeft, FileText } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function LegalPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b bg-muted/30">
        <div className="container mx-auto px-6 py-8">
          <div className="flex items-center space-x-4">
            <Link to="/">
              <Button variant="outline" size="sm">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Voltar
              </Button>
            </Link>
            <div className="flex items-center space-x-3">
              <div className="p-3 bg-gradient-primary rounded-lg shadow-soft">
                <FileText className="h-8 w-8 text-white" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-foreground font-body">Documentos Legais</h1>
                <p className="text-foreground/80 mt-1">
                  Políticas, termos e condições do GrowthScale
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Política de Privacidade */}
          <Card>
            <CardHeader>
              <CardTitle>Política de Privacidade - LGPD</CardTitle>
            </CardHeader>
            <CardContent className="prose prose-sm max-w-none">
              <p className="text-sm text-gray-600 mb-4">
                <strong>Última atualização:</strong> 17 de agosto de 2024
              </p>
              
              <h3>1. Responsável pelo Tratamento</h3>
              <p>
                <strong>GrowthScale</strong><br/>
                E-mail: privacy@growthscale.com<br/>
                Endereço: [Endereço da empresa]<br/>
                CNPJ: [CNPJ da empresa]
              </p>
              
              <h3>2. Base Legal para Tratamento</h3>
              <p>
                Tratamos seus dados pessoais com base nas seguintes hipóteses legais da LGPD:
              </p>
              <ul>
                <li><strong>Execução de contrato:</strong> Para prestação dos serviços contratados</li>
                <li><strong>Legítimo interesse:</strong> Para melhorar nossos serviços e segurança</li>
                <li><strong>Consentimento:</strong> Para marketing e comunicações promocionais</li>
                <li><strong>Cumprimento de obrigação legal:</strong> Para atender requisitos legais</li>
              </ul>
              
              <h3>3. Dados Coletados</h3>
              <p>
                <strong>Dados pessoais:</strong> Nome, e-mail, telefone, CPF/CNPJ<br/>
                <strong>Dados de uso:</strong> Logs de acesso, cookies, analytics<br/>
                <strong>Dados empresariais:</strong> Informações da empresa e funcionários
              </p>
              
              <h3>4. Finalidade do Tratamento</h3>
              <ul>
                <li>Prestação dos serviços contratados</li>
                <li>Suporte técnico e atendimento ao cliente</li>
                <li>Melhoria e desenvolvimento de produtos</li>
                <li>Comunicações sobre serviços e atualizações</li>
                <li>Cumprimento de obrigações legais</li>
              </ul>
              
              <h3>5. Compartilhamento de Dados</h3>
              <p>
                Não vendemos seus dados pessoais. Compartilhamos apenas com:
              </p>
              <ul>
                <li>Prestadores de serviços essenciais (hospedagem, pagamentos)</li>
                <li>Autoridades competentes quando exigido por lei</li>
                <li>Com seu consentimento expresso</li>
              </ul>
              
              <h3>6. Seus Direitos LGPD</h3>
              <p>Você tem direito a:</p>
              <ul>
                <li><strong>Acesso:</strong> Saber quais dados temos sobre você</li>
                <li><strong>Correção:</strong> Corrigir dados incompletos ou incorretos</li>
                <li><strong>Exclusão:</strong> Solicitar a exclusão de seus dados</li>
                <li><strong>Portabilidade:</strong> Receber seus dados em formato estruturado</li>
                <li><strong>Revogação:</strong> Revogar consentimento a qualquer momento</li>
                <li><strong>Oposição:</strong> Opor-se ao tratamento de dados</li>
              </ul>
              
              <h3>7. Segurança dos Dados</h3>
              <p>
                Implementamos medidas técnicas e organizacionais adequadas para proteger seus dados, incluindo:
              </p>
              <ul>
                <li>Criptografia de dados em trânsito e em repouso</li>
                <li>Controle de acesso rigoroso</li>
                <li>Monitoramento contínuo de segurança</li>
                <li>Backup regular e seguro</li>
              </ul>
              
              <h3>8. Retenção de Dados</h3>
              <p>
                Mantemos seus dados apenas pelo tempo necessário para cumprir as finalidades descritas ou exigido por lei.
              </p>
              
              <h3>9. Contato</h3>
              <p>
                Para exercer seus direitos ou esclarecer dúvidas:<br/>
                <strong>E-mail:</strong> privacy@growthscale.com<br/>
                <strong>Telefone:</strong> [Telefone de contato]
              </p>
            </CardContent>
          </Card>

          {/* Termos de Uso */}
          <Card>
            <CardHeader>
              <CardTitle>Termos de Uso</CardTitle>
            </CardHeader>
            <CardContent className="prose prose-sm max-w-none">
              <h3>1. Aceitação dos Termos</h3>
              <p>
                Ao acessar e usar o GrowthScale, você concorda com estes termos 
                de uso e todas as leis e regulamentos aplicáveis.
              </p>
              
              <h3>2. Uso Permitido</h3>
              <p>
                Você pode usar nossos serviços apenas para fins legais e de 
                acordo com estes termos.
              </p>
              
              <h3>3. Propriedade Intelectual</h3>
              <p>
                O GrowthScale e seu conteúdo são protegidos por direitos autorais, 
                marcas registradas e outras leis de propriedade intelectual.
              </p>
              
              <h3>4. Limitação de Responsabilidade</h3>
              <p>
                O GrowthScale não será responsável por danos indiretos, incidentais 
                ou consequenciais decorrentes do uso de nossos serviços.
              </p>
            </CardContent>
          </Card>

          {/* Política de Cookies */}
          <Card>
            <CardHeader>
              <CardTitle>Política de Cookies</CardTitle>
            </CardHeader>
            <CardContent className="prose prose-sm max-w-none">
              <h3>1. O que são Cookies</h3>
              <p>
                Cookies são pequenos arquivos de texto armazenados em seu dispositivo 
                quando você visita nosso site.
              </p>
              
              <h3>2. Como Usamos Cookies</h3>
              <p>
                Utilizamos cookies para melhorar sua experiência, analisar o uso 
                do site e personalizar conteúdo.
              </p>
              
              <h3>3. Tipos de Cookies</h3>
              <ul>
                <li><strong>Essenciais:</strong> Necessários para o funcionamento do site</li>
                <li><strong>Analíticos:</strong> Nos ajudam a entender como você usa o site</li>
                <li><strong>Funcionais:</strong> Lembram suas preferências</li>
              </ul>
              
              <h3>4. Gerenciar Cookies</h3>
              <p>
                Você pode controlar e/ou excluir cookies conforme desejar através 
                das configurações do seu navegador.
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Contact Information */}
        <Card className="mt-8">
          <CardHeader>
            <CardTitle>Informações de Contato</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-semibold mb-2">Dados da Empresa</h4>
                <p className="text-sm text-muted-foreground">
                  GrowthScale Tecnologia Ltda.<br />
                  CNPJ: 00.000.000/0001-00<br />
                  São Paulo, SP - Brasil
                </p>
              </div>
              <div>
                <h4 className="font-semibold mb-2">Entre em Contato</h4>
                <p className="text-sm text-muted-foreground">
                  Email: legal@growthscale.com<br />
                  Telefone: (11) 3000-0000<br />
                  Horário: Segunda a Sexta, 9h às 18h
                </p>
              </div>
            </div>
            <div className="mt-6 pt-6 border-t">
              <p className="text-xs text-muted-foreground">
                Última atualização: Janeiro de 2024. Reservamo-nos o direito de 
                modificar estes documentos a qualquer momento. As alterações entrarão 
                em vigor imediatamente após a publicação no site.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}