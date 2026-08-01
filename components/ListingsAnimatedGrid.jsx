'use client';

import { motion } from 'framer-motion';
import PropertyCard from './PropertyCard';
import { staggerContainer, fadeInItem } from './MotionWrapper';

export default function ListingsAnimatedGrid({ properties = [], favoritedIds = new Set() }) {
  return (
    <motion.div
      key={JSON.stringify(properties.map((p) => p._id))}
      variants={staggerContainer}
      initial="hidden"
      animate="show"
      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
    >
      {properties.map((property) => (
        <motion.div key={property._id} variants={fadeInItem}>
          <PropertyCard
            property={property}
            isFavorited={favoritedIds.has(property._id.toString())}
          />
        </motion.div>
      ))}
    </motion.div>
  );
}
