import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  LineChart, 
  Line, 
  BarChart, 
  Bar, 
  PieChart, 
  Pie, 
  Cell,
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  Legend
} from "recharts";

const ChartSection = () => {
  // Dados de exemplo para os gráficos
  const absenceData = [
    { month: "Jan", ausencias: 15, meta: 10 },
    { month: "Fev", ausencias: 12, meta: 10 },
    { month: "Mar", ausencias: 18, meta: 10 },
    { month: "Abr", ausencias: 8, meta: 10 },
    { month: "Mai", ausencias: 14, meta: 10 },
    { month: "Jun", ausencias: 6, meta: 10 },
  ];

  const complianceData = [
    { month: "Jan", compliance: 85 },
    { month: "Fev", compliance: 92 },
    { month: "Mar", compliance: 78 },
    { month: "Abr", compliance: 96 },
    { month: "Mai", compliance: 89 },
    { month: "Jun", compliance: 98 },
  ];

  const costData = [
    { category: "Horas Extras", value: 35, color: "hsl(var(--destructive))" },
    { category: "Ausências", value: 25, color: "hsl(var(--accent))" },
    { category: "Ineficiência", value: 20, color: "hsl(var(--muted-foreground))" },
    { category: "Otimizado", value: 20, color: "hsl(var(--accent))" },
  ];

  // Dados de produtividade removidos - serão implementados com dados reais na V2.0
  // const productivityData = [
  //   { day: "Seg", produtividade: 78, eficiencia: 85 },
  //   { day: "Ter", produtividade: 82, eficiencia: 88 },
  //   { day: "Qua", produtividade: 75, eficiencia: 82 },
  //   { day: "Qui", produtividade: 88, eficiencia: 92 },
  //   { day: "Sex", produtividade: 92, eficiencia: 95 },
  //   { day: "Sab", produtividade: 85, eficiencia: 89 },
  //   { day: "Dom", produtividade: 80, eficiencia: 86 },
  // ];

  return (
    <div className="grid lg:grid-cols-2 gap-6">
      {/* Ausências ao longo do tempo */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg font-semibold">Evolução de Ausências</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={absenceData}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis 
                dataKey="month" 
                stroke="hsl(var(--muted-foreground))"
                fontSize={12}
              />
              <YAxis 
                stroke="hsl(var(--muted-foreground))"
                fontSize={12}
              />
              <Tooltip 
                contentStyle={{
                  backgroundColor: "hsl(var(--card))",
                  border: "1px solid hsl(var(--border))",
                  borderRadius: "8px"
                }}
              />
              <Line 
                type="monotone" 
                dataKey="ausencias" 
                stroke="hsl(var(--destructive))" 
                strokeWidth={3}
                dot={{ fill: "hsl(var(--destructive))", strokeWidth: 2, r: 4 }}
                name="Ausências"
              />
              <Line 
                type="monotone" 
                dataKey="meta" 
                stroke="hsl(var(--muted-foreground))" 
                strokeDasharray="5 5"
                name="Meta"
              />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Compliance Score */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg font-semibold">Score de Compliance</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={complianceData}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis 
                dataKey="month" 
                stroke="hsl(var(--muted-foreground))"
                fontSize={12}
              />
              <YAxis 
                stroke="hsl(var(--muted-foreground))"
                fontSize={12}
                domain={[0, 100]}
              />
              <Tooltip 
                contentStyle={{
                  backgroundColor: "hsl(var(--card))",
                  border: "1px solid hsl(var(--border))",
                  borderRadius: "8px"
                }}
                formatter={(value) => [`${value}%`, "Compliance"]}
              />
              <Bar 
                dataKey="compliance" 
                fill="hsl(var(--primary))"
                radius={[4, 4, 0, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Análise de Custos */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg font-semibold">Distribuição de Custos</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={costData}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={120}
                paddingAngle={2}
                dataKey="value"
              >
                {costData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip 
                contentStyle={{
                  backgroundColor: "hsl(var(--card))",
                  border: "1px solid hsl(var(--border))",
                  borderRadius: "8px"
                }}
                formatter={(value) => [`${value}%`, "Percentual"]}
              />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Produtividade Semanal - Removido temporariamente até implementação com dados reais */}
      {/* <Card>
        <CardHeader>
          <CardTitle className="text-lg font-semibold">Produtividade da Equipe</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={productivityData}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis 
                dataKey="day" 
                stroke="hsl(var(--muted-foreground))"
                fontSize={12}
              />
              <YAxis 
                stroke="hsl(var(--muted-foreground))"
                fontSize={12}
                domain={[0, 100]}
              />
              <Tooltip 
                contentStyle={{
                  backgroundColor: "hsl(var(--card))",
                  border: "1px solid hsl(var(--border))",
                  borderRadius: "8px"
                }}
                formatter={(value) => [`${value}%`, ""]}
              />
              <Legend />
              <Bar 
                dataKey="produtividade" 
                fill="hsl(var(--primary))"
                radius={[2, 2, 0, 0]}
                name="Produtividade"
              />
              <Bar 
                dataKey="eficiencia" 
                fill="hsl(var(--accent))"
                radius={[2, 2, 0, 0]}
                name="Eficiência"
              />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card> */}
    </div>
  );
};

export default ChartSection;