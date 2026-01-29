import React, { useEffect, useState } from 'react';
import { apiService } from '../services/api';
import { Product, HomepageContent, Collection, Review } from '../types';
import { useGSAPAnimation } from '../hooks';
import {
  HeroSection,
  PhilosophySection,
  CollectionGrid,
  ReviewSection,
  SignatureItems,
  NewArrivals
} from '../components/home';

const Home: React.FC = () => {
  const [data, setData] = useState<HomepageContent | null>(null);
  const [featured, setFeatured] = useState<Product[]>([]);
  const [collections, setCollections] = useState<Collection[]>([]);
  const [newArrivals, setNewArrivals] = useState<Product[]>([]);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);
  
  const heroRef = useGSAPAnimation(loading, data);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [hp, feat, colls, newArr, revs] = await Promise.all([
          apiService.getHomepage(),
          apiService.getFeaturedProducts(),
          apiService.getCollections(),
          apiService.getNewArrivals(),
          apiService.getReviews()
        ]);
        setData(hp);
        setFeatured(feat);
        setCollections(colls);
        setNewArrivals(newArr);
        setReviews(revs);
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
      
      <CollectionGrid collections={collections} />
      
      <NewArrivals products={newArrivals} />
      
      <SignatureItems featured={featured} />
      
      <PhilosophySection brandStoryShort={data.brandStoryShort} />
      
      <ReviewSection 
        reviews={reviews}
        monthlyImage={data.craftsmanshipImage}
      />
    </div>
  );
};

export default Home;
