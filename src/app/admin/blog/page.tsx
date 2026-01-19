'use client';

import { useState } from 'react';
import Image from 'next/image';
import {
  FileText,
  Search,
  Plus,
  MoreVertical,
  Eye,
  Edit,
  Trash2,
  X,
  Calendar,
  Clock,
  Tag,
  Image as ImageIcon,
  Bold,
  Italic,
  List,
  Link as LinkIcon,
  Save,
  ArrowLeft,
} from 'lucide-react';
import { cn } from '@/lib/utils';

// Sample blog posts data
const initialPosts = [
  {
    id: '1',
    title: 'The Best Time to See Northern Lights in Iceland',
    slug: 'best-time-northern-lights-iceland',
    excerpt: 'Planning to chase the Aurora Borealis? Learn when and where to see the magical Northern Lights.',
    status: 'published',
    category: 'Travel Tips',
    author: 'Jónas Gunnarsson',
    publishedAt: '2024-01-15',
    views: 1234,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCk0iDzJFS5IZBLpTWewxYw5leR1y4O_MbUU9RqbyLUXfcDTSHIl9UvOKrkFzRPhKW93Ymc7cqjsAKqXnhU9ANQYFVqes9U79cSo5651HXzfZui3bXewJwgDMmnM9waJ7KMi1FqJH4parVXHGn6TZX_OY8FMzQ6YPGc2Tt88nEHQAj_yacHyR3o-WfEsWvurjLI_bKTKYszNFsBGsDqCcKPb-F7CZVemjISx36raDWENU0D_3FG5_jDaJTKjjx1kvmldOsntIBJ5ys1',
  },
  {
    id: '2',
    title: "The Complete Guide to Iceland's Golden Circle",
    slug: 'golden-circle-complete-guide',
    excerpt: "Everything you need to know about visiting Thingvellir, Geysir, and Gullfoss.",
    status: 'published',
    category: 'Destinations',
    author: 'Sigríður Ólafsdóttir',
    publishedAt: '2024-01-10',
    views: 987,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuC10Q-hY2ws9134hG20NMVDn8vGv-tytWbsLHTDxUGTgf8pe5Dsy3bpH5wZCtizwFcL3I5Ga--PZhMCx_bdWYkEwX_sFssIF1EwdrKoLgMC4XaYECNsLMoXIAjzjOKYMD6VxpffKEd9YVT5C5OjaWyr8NyyD0W6TWaJsyyrWU5DVkV4ZanpPaEQppc03CO1XqfHQrHNjbcIWItbD04yDM4ciLseawjJL5Ux9122v_RtFeaa2YclITWf1yjVhqZv3rdyjKcvPd3Zxej9',
  },
  {
    id: '3',
    title: 'Essential Winter Driving Tips for Iceland',
    slug: 'iceland-winter-driving-tips',
    excerpt: "Stay safe on Iceland's roads with our expert tips for driving in winter conditions.",
    status: 'draft',
    category: 'Travel Tips',
    author: 'Magnús Ólafsson',
    publishedAt: null,
    views: 0,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAqSHelj7tuPiGCpHEDjjUoN2Ya8U2VNeYvul3FZWALp27_job5h2-idvL1W5So0IfXMEUhBt7NcVke75hC7_qNG1b3TNh_xePzwFLcb4GJL1JJGmE2uO0XK4VzfB6L2SU7I_M88R4komC5LI0wJdHt_t0m9m05pVzPioz-HueN-cTOZ5hrjiXKOW9N4S4oZefwEq6Z73GcCETvh-vzFibMuJFUIM8FZF65MHm2s_tFmRcMfS8xiZ31aRjYGl60YJmgD51WoRf1HBpK',
  },
];

const categories = ['Travel Tips', 'Destinations', 'News', 'Local Guide', 'Company Updates'];

const statusConfig = {
  published: { label: 'Published', style: 'bg-green-50 text-green-700 border-green-200' },
  draft: { label: 'Draft', style: 'bg-yellow-50 text-yellow-700 border-yellow-200' },
  archived: { label: 'Archived', style: 'bg-slate-100 text-slate-600 border-slate-200' },
};

export default function AdminBlogPage() {
  const [posts, setPosts] = useState(initialPosts);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [showEditor, setShowEditor] = useState(false);
  const [editingPost, setEditingPost] = useState<typeof initialPosts[0] | null>(null);

  // Editor form state
  const [formData, setFormData] = useState({
    title: '',
    slug: '',
    excerpt: '',
    content: '',
    category: 'Travel Tips',
    status: 'draft',
    image: '',
  });

  const filteredPosts = posts.filter((post) => {
    const matchesSearch = post.title.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === 'all' || post.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const handleNewPost = () => {
    setEditingPost(null);
    setFormData({
      title: '',
      slug: '',
      excerpt: '',
      content: '',
      category: 'Travel Tips',
      status: 'draft',
      image: '',
    });
    setShowEditor(true);
  };

  const handleEditPost = (post: typeof initialPosts[0]) => {
    setEditingPost(post);
    setFormData({
      title: post.title,
      slug: post.slug,
      excerpt: post.excerpt,
      content: '',
      category: post.category,
      status: post.status,
      image: post.image,
    });
    setShowEditor(true);
  };

  const handleDeletePost = (id: string) => {
    if (confirm('Are you sure you want to delete this post?')) {
      setPosts(posts.filter((p) => p.id !== id));
    }
  };

  const generateSlug = (title: string) => {
    return title
      .toLowerCase()
      .replace(/[^\w\s-]/g, '')
      .replace(/[\s_-]+/g, '-')
      .replace(/^-+|-+$/g, '');
  };

  if (showEditor) {
    return (
      <div className="max-w-5xl mx-auto">
        {/* Editor Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <button
              onClick={() => setShowEditor(false)}
              className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-lg transition-colors"
            >
              <ArrowLeft className="size-5" />
            </button>
            <div>
              <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
                {editingPost ? 'Edit Post' : 'New Post'}
              </h2>
              <p className="text-sm text-slate-500">Create and publish blog content</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <button className="px-4 py-2 text-slate-600 hover:bg-slate-100 rounded-lg text-sm font-medium transition-colors">
              Save Draft
            </button>
            <button className="flex items-center gap-2 px-4 py-2 bg-primary text-black rounded-lg text-sm font-bold hover:bg-yellow-400 transition-colors">
              <Save className="size-4" />
              Publish
            </button>
          </div>
        </div>

        {/* Editor Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Editor */}
          <div className="lg:col-span-2 space-y-6">
            {/* Title */}
            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Title</label>
              <input
                type="text"
                value={formData.title}
                onChange={(e) => {
                  setFormData({
                    ...formData,
                    title: e.target.value,
                    slug: generateSlug(e.target.value),
                  });
                }}
                placeholder="Enter post title..."
                className="w-full px-4 py-3 rounded-lg border border-slate-200 text-lg font-medium focus:border-primary focus:ring-primary dark:bg-slate-800 dark:border-slate-700 dark:text-white"
              />
            </div>

            {/* Slug */}
            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Slug</label>
              <div className="flex items-center gap-2">
                <span className="text-sm text-slate-500">/blog/</span>
                <input
                  type="text"
                  value={formData.slug}
                  onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                  className="flex-1 px-3 py-2 rounded-lg border border-slate-200 text-sm focus:border-primary focus:ring-primary dark:bg-slate-800 dark:border-slate-700 dark:text-white font-mono"
                />
              </div>
            </div>

            {/* Excerpt */}
            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Excerpt</label>
              <textarea
                value={formData.excerpt}
                onChange={(e) => setFormData({ ...formData, excerpt: e.target.value })}
                placeholder="Write a brief summary..."
                rows={2}
                className="w-full px-4 py-3 rounded-lg border border-slate-200 text-sm focus:border-primary focus:ring-primary dark:bg-slate-800 dark:border-slate-700 dark:text-white resize-none"
              />
            </div>

            {/* Content Editor */}
            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Content</label>
              <div className="border border-slate-200 dark:border-slate-700 rounded-lg overflow-hidden">
                {/* Toolbar */}
                <div className="flex items-center gap-1 p-2 bg-slate-50 dark:bg-slate-800 border-b border-slate-200 dark:border-slate-700">
                  <button className="p-2 text-slate-600 hover:bg-slate-200 dark:hover:bg-slate-700 rounded transition-colors">
                    <Bold className="size-4" />
                  </button>
                  <button className="p-2 text-slate-600 hover:bg-slate-200 dark:hover:bg-slate-700 rounded transition-colors">
                    <Italic className="size-4" />
                  </button>
                  <div className="w-px h-6 bg-slate-200 dark:bg-slate-600 mx-1" />
                  <button className="p-2 text-slate-600 hover:bg-slate-200 dark:hover:bg-slate-700 rounded transition-colors">
                    <List className="size-4" />
                  </button>
                  <button className="p-2 text-slate-600 hover:bg-slate-200 dark:hover:bg-slate-700 rounded transition-colors">
                    <LinkIcon className="size-4" />
                  </button>
                  <button className="p-2 text-slate-600 hover:bg-slate-200 dark:hover:bg-slate-700 rounded transition-colors">
                    <ImageIcon className="size-4" />
                  </button>
                </div>
                {/* Editor Area */}
                <textarea
                  value={formData.content}
                  onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                  placeholder="Write your post content here... (Markdown supported)"
                  rows={15}
                  className="w-full px-4 py-3 text-sm focus:outline-none dark:bg-slate-800 dark:text-white resize-none"
                />
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Featured Image */}
            <div className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 p-4">
              <h4 className="font-semibold text-slate-900 dark:text-white mb-4">Featured Image</h4>
              {formData.image ? (
                <div className="relative aspect-video rounded-lg overflow-hidden mb-3">
                  <Image src={formData.image} alt="Featured" fill className="object-cover" />
                  <button
                    onClick={() => setFormData({ ...formData, image: '' })}
                    className="absolute top-2 right-2 p-1 bg-black/50 text-white rounded-full hover:bg-black/70"
                  >
                    <X className="size-4" />
                  </button>
                </div>
              ) : (
                <div className="aspect-video rounded-lg border-2 border-dashed border-slate-300 dark:border-slate-600 flex items-center justify-center mb-3">
                  <div className="text-center">
                    <ImageIcon className="size-8 text-slate-400 mx-auto mb-2" />
                    <p className="text-sm text-slate-500">Upload image</p>
                  </div>
                </div>
              )}
              <input
                type="text"
                value={formData.image}
                onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                placeholder="Or paste image URL..."
                className="w-full px-3 py-2 rounded-lg border border-slate-200 text-sm focus:border-primary focus:ring-primary dark:bg-slate-700 dark:border-slate-600 dark:text-white"
              />
            </div>

            {/* Category */}
            <div className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 p-4">
              <h4 className="font-semibold text-slate-900 dark:text-white mb-4">Category</h4>
              <select
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                className="w-full px-3 py-2 rounded-lg border border-slate-200 text-sm focus:border-primary focus:ring-primary dark:bg-slate-700 dark:border-slate-600 dark:text-white"
              >
                {categories.map((cat) => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
            </div>

            {/* Status */}
            <div className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 p-4">
              <h4 className="font-semibold text-slate-900 dark:text-white mb-4">Status</h4>
              <div className="space-y-2">
                {['draft', 'published'].map((status) => (
                  <label key={status} className="flex items-center gap-3 cursor-pointer">
                    <input
                      type="radio"
                      name="status"
                      value={status}
                      checked={formData.status === status}
                      onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                      className="text-primary focus:ring-primary"
                    />
                    <span className="text-sm text-slate-700 dark:text-slate-300 capitalize">{status}</span>
                  </label>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto flex flex-col gap-8">
      {/* Page Heading */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div className="flex flex-col gap-1">
          <h2 className="text-3xl lg:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Blog Management
          </h2>
          <p className="text-slate-500 dark:text-slate-400 font-medium">
            Create and manage blog posts for your website
          </p>
        </div>
        <button
          onClick={handleNewPost}
          className="flex items-center gap-2 px-4 py-2.5 bg-primary text-black rounded-lg text-sm font-bold shadow-md shadow-primary/20 hover:bg-yellow-400 transition-all"
        >
          <Plus className="size-4" />
          New Post
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: 'Total Posts', value: posts.length, color: 'text-slate-900' },
          { label: 'Published', value: posts.filter((p) => p.status === 'published').length, color: 'text-green-600' },
          { label: 'Drafts', value: posts.filter((p) => p.status === 'draft').length, color: 'text-yellow-600' },
          { label: 'Total Views', value: posts.reduce((acc, p) => acc + p.views, 0).toLocaleString(), color: 'text-blue-600' },
        ].map((stat) => (
          <div key={stat.label} className="bg-white dark:bg-slate-800 p-4 rounded-xl border border-slate-100 dark:border-slate-700">
            <p className="text-sm text-slate-500 dark:text-slate-400">{stat.label}</p>
            <p className={cn('text-2xl font-bold', stat.color, 'dark:text-white')}>{stat.value}</p>
          </div>
        ))}
      </div>

      {/* Filters */}
      <div className="flex flex-col md:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 size-4" />
          <input
            type="text"
            placeholder="Search posts..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-slate-200 text-sm focus:border-primary focus:ring-primary dark:bg-slate-800 dark:border-slate-700 dark:text-white"
          />
        </div>
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="px-4 py-2.5 rounded-lg border border-slate-200 text-sm font-medium text-slate-700 focus:border-primary focus:ring-primary dark:bg-slate-800 dark:border-slate-700 dark:text-white"
        >
          <option value="all">All Status</option>
          <option value="published">Published</option>
          <option value="draft">Drafts</option>
        </select>
      </div>

      {/* Posts Table */}
      <div className="bg-white dark:bg-slate-800 rounded-xl border border-slate-100 dark:border-slate-700 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50/50 dark:bg-slate-900/50 text-xs uppercase tracking-wider text-slate-500 font-semibold border-b border-slate-100 dark:border-slate-700">
                <th className="px-6 py-4">Post</th>
                <th className="px-6 py-4">Category</th>
                <th className="px-6 py-4">Author</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4">Views</th>
                <th className="px-6 py-4">Date</th>
                <th className="px-6 py-4"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-700">
              {filteredPosts.map((post) => {
                const status = statusConfig[post.status as keyof typeof statusConfig];
                return (
                  <tr key={post.id} className="hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-4">
                        <div className="relative size-16 rounded-lg overflow-hidden shrink-0">
                          <Image src={post.image} alt={post.title} fill className="object-cover" />
                        </div>
                        <div>
                          <h4 className="font-semibold text-slate-900 dark:text-white line-clamp-1">{post.title}</h4>
                          <p className="text-sm text-slate-500 line-clamp-1">{post.excerpt}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="inline-flex items-center gap-1 px-2 py-1 bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300 text-xs font-medium rounded-full">
                        <Tag className="size-3" />
                        {post.category}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm text-slate-600 dark:text-slate-400">{post.author}</td>
                    <td className="px-6 py-4">
                      <span className={cn('inline-flex px-2.5 py-1 rounded-full text-xs font-bold border', status.style)}>
                        {status.label}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm text-slate-600 dark:text-slate-400">{post.views.toLocaleString()}</td>
                    <td className="px-6 py-4 text-sm text-slate-600 dark:text-slate-400">
                      {post.publishedAt ? new Date(post.publishedAt).toLocaleDateString() : '-'}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-1">
                        <button
                          onClick={() => handleEditPost(post)}
                          className="p-2 text-slate-400 hover:text-primary hover:bg-slate-100 rounded-lg transition-colors"
                        >
                          <Edit className="size-4" />
                        </button>
                        <button
                          onClick={() => handleDeletePost(post.id)}
                          className="p-2 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                        >
                          <Trash2 className="size-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {filteredPosts.length === 0 && (
          <div className="text-center py-12">
            <FileText className="size-12 text-slate-300 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-2">No posts found</h3>
            <p className="text-slate-500">Create your first blog post to get started</p>
          </div>
        )}
      </div>
    </div>
  );
}
