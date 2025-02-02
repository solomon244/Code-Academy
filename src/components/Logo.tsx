import React from 'react';
import { Code2 } from 'lucide-react';

const Logo: React.FC = () => {
  return (
    <div className="flex items-center gap-2">
      <div className="flex items-center">
        <Code2 className="w-8 h-8 text-primary" />
        <div className="ml-2">
          <div className="text-xl font-bold text-primary">Ethio Code</div>
          <div className="text-xs text-muted-foreground">Empowering Ethiopia's Digital Future</div>
        </div>
      </div>
    </div>
  );
};

export default Logo;