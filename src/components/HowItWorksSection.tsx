import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { landingPageCopy } from "@/constants/neuromarketing";

const HowItWorksSection = () => {
  const { howItWorks } = landingPageCopy;
  
  return (
    <section className="bg-white py-16 sm:py-20 lg:py-24" aria-labelledby="how-it-works-title">
      <Container>
        <header className="text-center mb-16 sm:mb-20">
          <h2 id="how-it-works-title" className="text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-900 mb-6 leading-tight">
            {howItWorks.title}
          </h2>
          <p className="text-lg sm:text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
            {howItWorks.subtitle}
          </p>
        </header>
        
        <div className="grid md:grid-cols-3 gap-8 lg:gap-12">
          {howItWorks.steps.map((step, index) => (
            <Card key={index} className="relative p-8 text-center border-0 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
              <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                <Badge className="bg-success text-white text-lg font-bold w-10 h-10 rounded-full flex items-center justify-center shadow-lg">
                  {step.step}
                </Badge>
              </div>
              
              <div className="text-4xl mb-4 mt-4">
                {step.icon}
              </div>
              
              <h3 className="text-xl font-bold text-slate-900 mb-4">
                {step.title}
              </h3>
              
              <p className="text-slate-600 leading-relaxed">
                {step.desc}
              </p>
            </Card>
          ))}
        </div>
      </Container>
    </section>
  );
};

export default HowItWorksSection;
