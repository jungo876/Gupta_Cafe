import React from 'react';

interface BlogPost {
  id: number;
  title: string;
  teaser: string;
  imageUrl: string;
  slug: string;
}

const blogPosts: BlogPost[] = [
  {
    id: 1,
    title: "The Kolkata Streets that Inspired Our Monsoon Gupta",
    teaser: "Discover how the vibrant rain-soaked streets of our hometown sparked the flavor notes and cozy ambiance of this season's most anticipated monsoon coffee collection.",
    imageUrl: "https://www.skymetweather.com/content/wp-content/uploads/2018/05/Kolkata-Main.jpg",
    slug: "kolkata-streets-monsoon-Gupta",
  },
  {
    id: 2,
    title: "Meet the Roasters: The Hands Behind Your Favorite Beans",
    teaser: "Step into our roastery and meet the skilled artisans who transform raw green beans into the rich Guptas you love, each with years of dedication and craft.",
    imageUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQgYcVe3Yal0xbbXtL_LBon-wr7gnnCxT9T5w&s",
    slug: "roasters-behind-beans",
  },
  {
    id: 3,
    title: "From Local Café to National Craze: The Urban Bean Story",
    teaser: "Five years ago, our first café opened in Mumbai. Today, it's a household name. Discover how a passion for coffee and community created a movement.",
    imageUrl: "https://restaurantindia.s3.ap-south-1.amazonaws.com/s3fs-public/2023-06/Coffee.jpg",
    slug: "urban-bean-cafe-story",
  },
  {
    id: 4,
    title: "How Karan’s Signature Blend Fueled His Everest Ascent",
    teaser: "When mountaineer Karan Sharma needed a special blend for energy and warmth during his climb, our Guptamasters created something extraordinary. Here's his journey.",
    imageUrl: "https://images.pexels.com/photos/8116493/pexels-photo-8116493.jpeg",
    slug: "karan-everest-coffee-blend",
  },
  {
    id: 5,
    title: "Celebrating 10,000 Cups: A Milestone in Sustainable Guptaing",
    teaser: "This month we hit an incredible milestone in our sustainable coffee initiative. See how your daily Guptas are making a real difference in eco-conscious roasting.",
    imageUrl: "https://indian-retailer.s3.ap-south-1.amazonaws.com/s3fs-public/2021-06/cup-coffee-coffee-beans_164008-356.jpg",
    slug: "sustainable-coffee-milestone",
  }
  
];

const BlogPreviewSection: React.FC = () => {
  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-extrabold text-center text-gray-800 mb-12">
          Latest from Our Blog
        </h2>

        <div className="grid gap-10 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          {blogPosts.map((post) => (
            <article
              key={post.id}
              className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden"
            >
              <div className="h-56 w-full overflow-hidden">
                <img
                  src={post.imageUrl}
                  alt={post.title}
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
              </div>

              <div className="p-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{post.title}</h3>
                <p className="text-gray-600 mb-4">{post.teaser}</p>
                <a
                  href={`/blog/${post.slug}`}
                  className="text-blue-600 font-medium hover:text-blue-800 transition-colors duration-200"
                >
                  Read More →
                </a>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BlogPreviewSection;
