import React from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

interface CertificateCardProps {
  certificate: {
    certificateNumber: string;
    issueDate: string;
    completionDate: string;
    course: {
      title: string;
      description: string;
    };
  };
  onDownload?: () => void;
}

const CertificateCard: React.FC<CertificateCardProps> = ({
  certificate,
  onDownload,
}) => {
  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-xl font-bold">{certificate.course.title}</CardTitle>
          <Badge variant="secondary">Certified</Badge>
        </div>
        <CardDescription>{certificate.course.description}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Certificate Number:</span>
            <span className="font-mono">{certificate.certificateNumber}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Issue Date:</span>
            <span>{new Date(certificate.issueDate).toLocaleDateString()}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Completion Date:</span>
            <span>{new Date(certificate.completionDate).toLocaleDateString()}</span>
          </div>
        </div>
      </CardContent>
      <CardFooter>
        <Button
          className="w-full"
          onClick={onDownload}
        >
          Download Certificate
        </Button>
      </CardFooter>
    </Card>
  );
};

export default CertificateCard;