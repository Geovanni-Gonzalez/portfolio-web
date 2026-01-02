import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';

export async function GET(context) {
    const posts = await getCollection('blog');
    return rss({
        title: 'Geovanni Gonzalez | Blog',
        description: 'Artículos sobre desarrollo web, tecnología y mis experiencias como desarrollador.',
        site: context.site,
        items: posts.map((post) => ({
            title: post.data.title,
            pubDate: post.data.date,
            description: post.data.description,
            link: `/blog/${post.slug}/`,
            customData: `<language>${post.data.lang}</language>`,
        })),
        customData: `<language>es-ES</language>`,
    });
}
