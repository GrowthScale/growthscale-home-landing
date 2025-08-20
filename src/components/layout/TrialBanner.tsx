import { useAccessControl } from '@/hooks/useAccessControl';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { differenceInDays } from 'date-fns';

export function TrialBanner() {
  const { isTrialActive, trialEndsAt } = useAccessControl();

  if (!isTrialActive || !trialEndsAt) {
    return null;
  }

  const daysRemaining = differenceInDays(trialEndsAt, new Date());

  const getMessage = () => {
    if (daysRemaining <= 0) return "O seu teste gratuito terminou!";
    if (daysRemaining === 1) return "O seu teste gratuito termina amanhã!";
    return `Você tem mais ${daysRemaining} dias de teste gratuito.`;
  };

  return (
    <div className="w-full bg-accent text-accent-foreground p-2 text-center text-sm">
      <span>{getMessage()}</span>
      <Button asChild variant="link" className="ml-2 h-auto p-0 text-accent-foreground font-bold underline">
        <Link to="/billing">Fazer Upgrade Agora</Link>
      </Button>
    </div>
  );
}
