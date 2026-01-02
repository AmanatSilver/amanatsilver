import React, { useEffect, useState } from 'react';
import { apiService } from '../services/api';
import { Product, HomepageContent, Collection } from '../types';
import { useGSAPAnimation } from '../hooks';
import {
  HeroSection,
  PhilosophySection,
  CollectionGrid,
  CraftsmanshipSection,
  SignatureItems
} from '../components/home';

const Home: React.FC = () => {
  const [data, setData] = useState<HomepageContent | null>(null);
  const [featured, setFeatured] = useState<Product[]>([]);
  const [collections, setCollections] = useState<Collection[]>([]);
  const [loading, setLoading] = useState(true);
  
  const heroRef = useGSAPAnimation(loading, data);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [hp, feat, colls] = await Promise.all([
          apiService.getHomepage(),
          apiService.getFeaturedProducts(),
          apiService.getCollections()
        ]);
        setData(hp);
        setFeatured(feat);
        setCollections(colls);
      } catch (error) {
        console.error("Home data failed:", error);
      } finally {
        setLoading(false);
        // Trigger scroll update after data loads
        setTimeout(() => {
          const event = new CustomEvent('updateScroll');
          window.dispatchEvent(event);
        }, 200);
      }
    };
    fetchData();
  }, []);

  if (loading || !data) {
    return null;
  }

  return (
    <div className="bg-stone-50 overflow-hidden animate-fade-in" ref={heroRef}>
      <HeroSection 
        heroImage={data.heroImage}
        heroTitle={data.heroTitle}
        heroSubtitle={data.heroSubtitle}
      />
      
      <PhilosophySection brandStoryShort={data.brandStoryShort} />
      
      <CollectionGrid collections={collections} />
      
      <CraftsmanshipSection 
        craftsmanshipImage={data.craftsmanshipImage}
        craftsmanshipTitle={data.craftsmanshipTitle}
        craftsmanshipDescription={data.craftsmanshipDescription}
      />
      
      <SignatureItems featured={featured} />
    </div>
  );
};

export default Home;
