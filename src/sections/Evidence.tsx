import React from 'react';
import { getContent } from '../lib/content';

interface EvidenceItem {
  title: string;
  description: string;
  date?: string;
  image?: string;
  file?: string;
}

const Evidence: React.FC = () => {
  const content = getContent();
  
  if (!content.evidence || !Array.isArray(content.evidence)) {
    return null;
  }
  
  const evidenceItems: EvidenceItem[] = content.evidence;
  
  return (
    <section className="py-16 px-4 bg-gradient-to-b from-gray-50 to-white">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-gray-800">Evidencias</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {evidenceItems.map((item, index) => (
            <div 
              key={index} 
              className="bg-white rounded-xl shadow-md overflow-hidden transition-transform duration-300 hover:shadow-lg hover:-translate-y-1"
            >
              {item.image ? (
                <img 
                  src={item.image} 
                  alt={item.title} 
                  className="w-full h-48 object-cover"
                />
              ) : item.file ? (
                <div className="w-full h-48 bg-gray-200 flex items-center justify-center">
                  <span className="text-gray-500">Archivo adjunto</span>
                </div>
              ) : null}
              
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-2 text-gray-800">{item.title}</h3>
                {item.date && (
                  <p className="text-sm text-gray-500 mb-2">{item.date}</p>
                )}
                <p className="text-gray-600">{item.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Evidence;