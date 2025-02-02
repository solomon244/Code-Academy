import { useEffect, useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import CertificateCard from '@/components/CertificateCard';
import DashboardHeader from '@/components/dashboard/DashboardHeader';
import { Alert, AlertDescription } from '@/components/ui/alert';

interface Certificate {
  id: string;
  certificateNumber: string;
  issueDate: string;
  completionDate: string;
  course: {
    title: string;
    description: string;
  };
}

export default function Certificates() {
  const { user } = useAuth();
  const [certificates, setCertificates] = useState<Certificate[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCertificates = async () => {
      try {
        const response = await fetch('/api/certificates');
        if (!response.ok) {
          throw new Error('Failed to fetch certificates');
        }
        const data = await response.json();
        setCertificates(data);
      } catch (err) {
        setError('Failed to load certificates');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    if (user) {
      fetchCertificates();
    }
  }, [user]);

  const handleDownload = async (certificateNumber: string) => {
    // TODO: Implement certificate download functionality
    console.log('Downloading certificate:', certificateNumber);
  };

  if (!user) {
    return null;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <DashboardHeader
        heading="My Certificates"
        text="View and download your course completion certificates"
      />

      {error && (
        <Alert variant="destructive" className="mb-6">
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      {loading ? (
        <div className="flex justify-center items-center min-h-[200px]">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
        </div>
      ) : certificates.length === 0 ? (
        <div className="text-center py-8">
          <h3 className="text-lg font-semibold mb-2">No Certificates Yet</h3>
          <p className="text-muted-foreground">
            Complete a course to earn your first certificate!
          </p>
        </div>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {certificates.map((certificate) => (
            <CertificateCard
              key={certificate.id}
              certificate={certificate}
              onDownload={() => handleDownload(certificate.certificateNumber)}
            />
          ))}
        </div>
      )}
    </div>
  );
}