import { useLanguage } from '@/hooks/use-language';
import MedicalFacilityCard from '@/components/medical-facility';
import { Button } from '@/components/ui/button';
import { mockMedicalFacilities, mockEmergencyContacts } from '@/lib/mock-data';

export default function MedicalServices() {
  const { t } = useLanguage();

  const handleGetDirections = (facilityId: string) => {
    console.log('Getting directions to facility:', facilityId);
  };

  const handleCallEmergency = (phone: string) => {
    window.location.href = `tel:${phone}`;
  };

  return (
    <div className="min-h-screen bg-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-kumbh-text mb-2" data-testid="text-page-title">
            {t('medical.title')} | <span className="font-devanagari">{t('medical.title.hindi')}</span>
          </h1>
          <p className="text-gray-700">Find nearby hospitals, medical camps, and emergency healthcare</p>
        </div>

        {/* Emergency Contact Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {mockEmergencyContacts.slice(1, 4).map((contact, index) => {
            const colors = [
              { bg: 'bg-red-50', border: 'border-red-200', icon: 'bg-red-600', text: 'text-red-600' },
              { bg: 'bg-blue-50', border: 'border-blue-200', icon: 'bg-blue-600', text: 'text-blue-600' },
              { bg: 'bg-green-50', border: 'border-green-200', icon: 'bg-green-600', text: 'text-green-600' }
            ];
            const color = colors[index];
            
            return (
              <div key={contact.id} className={`${color.bg} border-2 ${color.border} p-6 rounded-2xl text-center`} data-testid={`card-emergency-${contact.id}`}>
                <div className={`${color.icon} text-white p-4 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4`}>
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path>
                  </svg>
                </div>
                <h3 className={`font-bold ${color.text} mb-2`} data-testid={`text-emergency-name-${contact.id}`}>
                  {contact.name}
                </h3>
                <p className="font-devanagari text-sm mb-3">{contact.name}</p>
                <p className={`text-2xl font-bold ${color.text} mb-2`} data-testid={`text-emergency-phone-${contact.id}`}>
                  {contact.phone}
                </p>
                <Button 
                  onClick={() => handleCallEmergency(contact.phone)}
                  className={`${color.icon} text-white w-full hover:opacity-90`}
                  data-testid={`button-call-emergency-${contact.id}`}
                >
                  {t('button.call')}
                </Button>
              </div>
            );
          })}
        </div>

        {/* Medical Facilities List */}
        <div className="bg-white rounded-2xl shadow-lg p-6">
          <h2 className="text-xl font-bold text-kumbh-text mb-6">
            Nearby Medical Facilities | पास की चिकित्सा सुविधाएं
          </h2>
          
          <div className="space-y-4">
            {mockMedicalFacilities.map((facility) => (
              <MedicalFacilityCard 
                key={facility.id} 
                facility={facility} 
                onGetDirections={handleGetDirections}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
