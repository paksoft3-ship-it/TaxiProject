import { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { Calendar, Clock, ArrowRight, User, Tag } from 'lucide-react';
import { cn } from '@/lib/utils';

export const metadata: Metadata = {
  title: 'Blog',
  description:
    'Travel tips, Iceland guides, and news from PrimeTaxi & Tours. Discover the best places to visit, Northern Lights hunting tips, and more.',
};

// Sample blog posts data - in production this would come from CMS/database
const blogPosts = [
  {
    id: '1',
    slug: 'best-time-northern-lights-iceland',
    title: 'The Best Time to See Northern Lights in Iceland',
    excerpt:
      'Planning to chase the Aurora Borealis? Learn when and where to see the magical Northern Lights during your Iceland visit.',
    content: '',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCk0iDzJFS5IZBLpTWewxYw5leR1y4O_MbUU9RqbyLUXfcDTSHIl9UvOKrkFzRPhKW93Ymc7cqjsAKqXnhU9ANQYFVqes9U79cSo5651HXzfZui3bXewJwgDMmnM9waJ7KMi1FqJH4parVXHGn6TZX_OY8FMzQ6YPGc2Tt88nEHQAj_yacHyR3o-WfEsWvurjLI_bKTKYszNFsBGsDqCcKPb-F7CZVemjISx36raDWENU0D_3FG5_jDaJTKjjx1kvmldOsntIBJ5ys1',
    category: 'Travel Tips',
    author: 'Jónas Gunnarsson',
    publishedAt: '2024-01-15',
    readTime: '5 min read',
    featured: true,
  },
  {
    id: '2',
    slug: 'golden-circle-complete-guide',
    title: 'The Complete Guide to Iceland\'s Golden Circle',
    excerpt:
      'Everything you need to know about visiting Thingvellir, Geysir, and Gullfoss - Iceland\'s most famous attractions.',
    content: '',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuC10Q-hY2ws9134hG20NMVDn8vGv-tytWbsLHTDxUGTgf8pe5Dsy3bpH5wZCtizwFcL3I5Ga--PZhMCx_bdWYkEwX_sFssIF1EwdrKoLgMC4XaYECNsLMoXIAjzjOKYMD6VxpffKEd9YVT5C5OjaWyr8NyyD0W6TWaJsyyrWU5DVkV4ZanpPaEQppc03CO1XqfHQrHNjbcIWItbD04yDM4ciLseawjJL5Ux9122v_RtFeaa2YclITWf1yjVhqZv3rdyjKcvPd3Zxej9',
    category: 'Destinations',
    author: 'Sigríður Ólafsdóttir',
    publishedAt: '2024-01-10',
    readTime: '8 min read',
    featured: true,
  },
  {
    id: '3',
    slug: 'iceland-winter-driving-tips',
    title: 'Essential Winter Driving Tips for Iceland',
    excerpt:
      'Stay safe on Iceland\'s roads with our expert tips for driving in winter conditions, or why you might want to book a professional driver.',
    content: '',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAqSHelj7tuPiGCpHEDjjUoN2Ya8U2VNeYvul3FZWALp27_job5h2-idvL1W5So0IfXMEUhBt7NcVke75hC7_qNG1b3TNh_xePzwFLcb4GJL1JJGmE2uO0XK4VzfB6L2SU7I_M88R4komC5LI0wJdHt_t0m9m05pVzPioz-HueN-cTOZ5hrjiXKOW9N4S4oZefwEq6Z73GcCETvh-vzFibMuJFUIM8FZF65MHm2s_tFmRcMfS8xiZ31aRjYGl60YJmgD51WoRf1HBpK',
    category: 'Travel Tips',
    author: 'Magnús Ólafsson',
    publishedAt: '2024-01-05',
    readTime: '6 min read',
    featured: false,
  },
  {
    id: '4',
    slug: 'blue-lagoon-vs-sky-lagoon',
    title: 'Blue Lagoon vs Sky Lagoon: Which Should You Visit?',
    excerpt:
      'Comparing Iceland\'s two most popular geothermal spas to help you choose the perfect relaxation experience.',
    content: '',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAPXvrb1aP9kpKx-HXmoSB6b-3abWjRApv-GTl4XbGpqtH071cxb1IJjdrtCxu170xPeyH72NQvSpcof3QAdzoEAF2F1poyoUxQGiwcSpkipgI6QyODOAjU-d_MH4TyO-ZZscbMoy5ZIHNF1KJQPCTS8H2Su8McBPDILWZlVEBtnCrCE4Vn3CfQ7k8QrUQeg9rqD0mWtqpoKw7MfZmas0T1bJhf4AIyf9_rt5UzmikNpDwZHKboFVOBlnBTyMNFhGFvKnMbdztl0JmW',
    category: 'Destinations',
    author: 'Helga Jónsdóttir',
    publishedAt: '2024-01-02',
    readTime: '7 min read',
    featured: false,
  },
  {
    id: '5',
    slug: 'south-coast-waterfalls-guide',
    title: 'Iceland\'s South Coast Waterfalls: A Complete Guide',
    excerpt:
      'Discover the stunning waterfalls along Iceland\'s South Coast, from Seljalandsfoss to Skógafoss and hidden gems in between.',
    content: '',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAy-wRBE2pi35c1rrz7yalG2SVTHDeKqIm24koyvSHUf3c5MjHQb_o211pgV1tEERgV8rpnyccSQ3vkF-0OVOIca3hQYca6fUmOAcMpbAIS46Ep_ZDTZ4CWPq6EMk88fvLx97o9j5YfW0NITT3Jan1CpNLzzc3C9W5GnfE2dJyiHbiPV8mkUsESSD6EAkFxrUA1OpS5Y5OxP9oDxhyWACV6RDKflGXOw7M5D0vP_tSN1Z4MCXE7hITji-lUCq2-kCjktwXvEPYwxogX',
    category: 'Destinations',
    author: 'Jónas Gunnarsson',
    publishedAt: '2023-12-28',
    readTime: '10 min read',
    featured: false,
  },
  {
    id: '6',
    slug: 'reykjavik-airport-transfer-guide',
    title: 'Getting from Keflavík Airport to Reykjavik: All Your Options',
    excerpt:
      'A comprehensive guide to transportation options from Iceland\'s international airport to the capital city.',
    content: '',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCyNrM-b0O1gLH2FKFjF2HyYQY0uJJxXPfSLTlVFMKqL8j0jXqWYJjLsKQpVJFpDEWOXsMFxX8ND8k8vLqVZqFnPF8WtPEGxXYqK9wXxF8w',
    category: 'Travel Tips',
    author: 'Sigríður Ólafsdóttir',
    publishedAt: '2023-12-20',
    readTime: '4 min read',
    featured: false,
  },
];

const categories = ['All', 'Travel Tips', 'Destinations', 'News', 'Local Guide'];

export default function BlogPage() {
  const featuredPosts = blogPosts.filter((post) => post.featured);
  const regularPosts = blogPosts.filter((post) => !post.featured);

  return (
    <>
      {/* Hero Section */}
      <section className="bg-secondary text-white py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4">
          <div className="max-w-3xl">
            <h1 className="text-4xl sm:text-5xl font-black mb-4">
              Travel Blog & <span className="text-primary">Iceland Guide</span>
            </h1>
            <p className="text-lg text-slate-300">
              Discover travel tips, destination guides, and insider knowledge to make the most of your Iceland adventure.
            </p>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="bg-white dark:bg-slate-800 border-b border-slate-100 dark:border-slate-700 sticky top-20 z-30">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex gap-2 py-4 overflow-x-auto scrollbar-hide">
            {categories.map((category) => (
              <button
                key={category}
                className={cn(
                  'px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors',
                  category === 'All'
                    ? 'bg-primary text-black'
                    : 'bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-600'
                )}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Posts */}
      <section className="py-12 px-4 bg-background-light dark:bg-background-dark">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-8">Featured Articles</h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {featuredPosts.map((post, index) => (
              <Link
                key={post.id}
                href={`/blog/${post.slug}`}
                className={cn(
                  'group relative overflow-hidden rounded-2xl',
                  index === 0 ? 'lg:row-span-2' : ''
                )}
              >
                <div className={cn('relative', index === 0 ? 'h-[400px] lg:h-full' : 'h-[250px]')}>
                  <Image
                    src={post.image}
                    alt={post.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
                </div>
                <div className="absolute bottom-0 left-0 right-0 p-6 lg:p-8">
                  <span className="inline-flex items-center gap-1 px-3 py-1 bg-primary text-black text-xs font-bold rounded-full mb-3">
                    <Tag className="size-3" />
                    {post.category}
                  </span>
                  <h3 className={cn(
                    'font-bold text-white mb-2 group-hover:text-primary transition-colors',
                    index === 0 ? 'text-2xl lg:text-3xl' : 'text-xl'
                  )}>
                    {post.title}
                  </h3>
                  <p className="text-slate-300 text-sm mb-4 line-clamp-2">{post.excerpt}</p>
                  <div className="flex items-center gap-4 text-xs text-slate-400">
                    <span className="flex items-center gap-1">
                      <Calendar className="size-3" />
                      {new Date(post.publishedAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="size-3" />
                      {post.readTime}
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* All Posts */}
      <section className="py-12 px-4 bg-white dark:bg-slate-800">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-8">Latest Articles</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {regularPosts.map((post) => (
              <Link
                key={post.id}
                href={`/blog/${post.slug}`}
                className="group bg-slate-50 dark:bg-slate-700/50 rounded-2xl overflow-hidden hover:shadow-lg transition-shadow"
              >
                <div className="relative h-48">
                  <Image
                    src={post.image}
                    alt={post.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="p-6">
                  <span className="inline-flex items-center gap-1 px-2 py-1 bg-slate-200 dark:bg-slate-600 text-slate-700 dark:text-slate-300 text-xs font-medium rounded-full mb-3">
                    {post.category}
                  </span>
                  <h3 className="font-bold text-slate-900 dark:text-white mb-2 group-hover:text-primary transition-colors line-clamp-2">
                    {post.title}
                  </h3>
                  <p className="text-slate-600 dark:text-slate-400 text-sm mb-4 line-clamp-2">{post.excerpt}</p>
                  <div className="flex items-center justify-between text-xs text-slate-500">
                    <span className="flex items-center gap-1">
                      <User className="size-3" />
                      {post.author}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="size-3" />
                      {post.readTime}
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          {/* Load More */}
          <div className="text-center mt-12">
            <button className="inline-flex items-center gap-2 px-8 py-3 bg-slate-100 dark:bg-slate-700 text-slate-900 dark:text-white font-bold rounded-xl hover:bg-slate-200 dark:hover:bg-slate-600 transition-colors">
              Load More Articles
              <ArrowRight className="size-4" />
            </button>
          </div>
        </div>
      </section>

      {/* Newsletter CTA */}
      <section className="py-16 px-4 bg-primary">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-2xl md:text-3xl font-black text-black mb-4">
            Get Iceland Travel Tips in Your Inbox
          </h2>
          <p className="text-slate-800 mb-8">
            Subscribe to our newsletter for exclusive travel tips, special offers, and Northern Lights alerts.
          </p>
          <form className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-4 py-3 rounded-xl border-2 border-black/10 bg-white/50 text-black placeholder:text-black/50 focus:outline-none focus:border-black/30"
            />
            <button
              type="submit"
              className="px-6 py-3 bg-black text-white font-bold rounded-xl hover:bg-slate-800 transition-colors"
            >
              Subscribe
            </button>
          </form>
        </div>
      </section>
    </>
  );
}
